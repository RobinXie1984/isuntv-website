import {prepare} from './project-site.mjs';
import {spawnSync} from 'node:child_process';
import {cpSync,mkdirSync,rmSync,writeFileSync,readdirSync} from 'node:fs';
import {join,relative} from 'node:path';
import {build} from 'esbuild';
const site=process.argv[2];
const {profile}=prepare(site);
const run=(command,args,extra={})=>{const result=spawnSync(command,args,{stdio:'inherit',env:{...process.env,...extra}});if(result.status!==0)process.exit(result.status??1);};
run('node_modules/.bin/tsc',['--noEmit']);
run(process.execPath,['--test','scripts/visibility.test.mjs','scripts/contact-proxy.test.mjs','scripts/localization.test.mjs']);
run(process.execPath,['scripts/check-consumers.mjs']);
if(profile.staticExport)run(process.execPath,['scripts/build-static.mjs']);
else run('node_modules/.bin/vinext',['build'],{ISUN_STATIC_EXPORT:'0'});
const out=`artifacts/${site}`;
rmSync(out,{recursive:true,force:true});mkdirSync(out,{recursive:true});
cpSync('dist/client',out,{recursive:true});
if(profile.staticExport)writeFileSync(join(out,'CNAME'),new URL(profile.publicOrigin).hostname+'\n');
else {
 const assets=[];
 function visit(p){for(const e of readdirSync(p,{withFileTypes:true})){const f=join(p,e.name);if(e.isDirectory())visit(f);else assets.push('/'+relative('dist/client',f));}}
 visit('dist/client');
 const hostname=new URL(profile.publicOrigin).hostname;
 writeFileSync('.generated/pages-entry.js',`import app from '../dist/server/index.js';
 import {errorDocument} from '../lib/error-page.mjs';
 import {forwardContact} from '../scripts/contact-proxy.mjs';
 const assets=new Set(${JSON.stringify(assets)});
 export default {async fetch(request,env,ctx){
  const url=new URL(request.url);
  if(url.hostname==='www.${hostname}')return Response.redirect('${profile.publicOrigin}'+url.pathname+url.search,308);
  if(${JSON.stringify(site)}==='isunmedia' && url.pathname==='/api/contact')return forwardContact(request);
  const result=assets.has(url.pathname)?await env.ASSETS.fetch(request):await app.fetch(request,env,ctx);
  const response=result.status===404 && result.headers.get('content-type')?.includes('text/html')
    ? new Response(request.method==='HEAD'?null:errorDocument(url.pathname,${JSON.stringify(profile.defaultLocale)}),{status:404,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex, follow'}})
    : new Response(result.body,result);
  if(url.hostname!=='${hostname}')response.headers.set('X-Robots-Tag','noindex, follow');
  return response;
 }};`);
 await build({entryPoints:['.generated/pages-entry.js'],outfile:join(out,'_worker.js'),bundle:true,format:'esm',platform:'neutral',target:'es2022',minify:true,external:['node:*','cloudflare:*'],conditions:['worker','browser','import']});
 writeFileSync(join(out,'_routes.json'),JSON.stringify({version:1,include:['/*'],exclude:[]}));
}
// Vinext's generated Worker redirect must not override the separate Pages adapter config.
rmSync('.wrangler/deploy/config.json',{force:true});
run(process.execPath,['scripts/check-artifact.mjs',site]);
