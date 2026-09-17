import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join,relative} from 'node:path';
import assert from 'node:assert/strict';
import {projectContent} from './content-visibility.mjs';
const site=process.argv[2];assert(['isuntv','isun1'].includes(site));
const root=`artifacts/${site}`;
const profile=JSON.parse(readFileSync('sites.json'))[site];
const release=JSON.parse(readFileSync(join(root,'release.json')));
assert.equal(release.siteId,site);assert.equal(release.publicOrigin,profile.publicOrigin);assert.equal(release.defaultLocale,profile.defaultLocale);
const names=['videos','programmes','drafts','display-titles','people','thumbnail-cache'];
const source=Object.fromEntries(names.map(n=>[n,JSON.parse(readFileSync(`content/${n}.json`))]));
const policy=JSON.parse(readFileSync('content/visibility-policy.json'));
const projected=projectContent(source,policy,site);
const forbidden=site==='isun1'?[...projected.globalOnlyIds,...policy.globalOnlyPlaylistIds,'personal-accounts','oral-history']:[];
const escaped=forbidden.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
const pattern=escaped.length?new RegExp(escaped.join('|')):null;
let files=0,html=0,bytes=0;
function visit(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){
 const path=join(dir,entry.name);const rel=relative(root,path);
 assert(!entry.name.startsWith('._')&&!entry.name.includes('.dev.vars')&&!entry.name.includes('.env'),'Private/tool artifact '+rel);
 if(pattern)assert(!pattern.test(rel),'Restricted filename '+rel);
 if(entry.isDirectory()){visit(path);continue;}
 const data=readFileSync(path);files++;bytes+=data.length;
 assert(data.length<25*1024*1024,'Oversized file '+rel);
 if(/\.(html|js|json|rsc|txt|xml|css)$/.test(entry.name)){
  const text=data.toString();if(pattern){const hit=text.match(pattern);assert(!hit,'Restricted content '+hit?.[0]+' in '+rel);}
  assert(!/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(text),'Private key '+rel);
 }
 if(entry.name.endsWith('.html'))html++;
}}
visit(root);
if(site==='isun1'){
 const page=readFileSync(join(root,'interviews/index.html'),'utf8');
 assert(page.includes('lang="zh-Hans"'));
 for(const slug of policy.interviews.isun1)assert(page.includes(`/programmes/${slug}/`),'Missing interview '+slug);
 for(const id of projected.globalOnlyIds)assert(!existsSync(join(root,`videos/${id}/index.html`)));
 const sm=readFileSync(join(root,'sitemap.xml'),'utf8');assert(sm.includes('https://isun1.com/'));assert(!sm.includes('https://isuntv.com/'));
}
console.log(JSON.stringify({artifact:site,files,html,bytes,restrictedIdsChecked:forbidden.length,result:'PASS'}));
