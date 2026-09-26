import {readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {projectContent} from './content-visibility.mjs';
export const profiles = JSON.parse(readFileSync('sites.json','utf8'));
export function prepare(siteId) {
  const profile = profiles[siteId]; if (!profile) throw new Error('Use isuntv, isun1 or chinasuntv');
  const names = ['videos','programmes','drafts','display-titles','people','thumbnail-cache'];
  const source = Object.fromEntries(names.map(name => [name,JSON.parse(readFileSync(`content/${name}.json`,'utf8'))]));
  const policy = JSON.parse(readFileSync('content/visibility-policy.json','utf8'));
  const projection = projectContent(source,policy,siteId);
  const generated = 'lib/generated';
  // These paths are exclusively generated, ignored build products. Source is never deleted.
  for (const dir of [generated,'.generated/public']) {rmSync(dir,{recursive:true,force:true});mkdirSync(dir,{recursive:true});}
  for (const name of names) writeFileSync(`${generated}/${name}.json`,JSON.stringify(projection[name]));
  writeFileSync(`${generated}/site.json`,JSON.stringify({...profile,siteId,interviews:policy.interviews[siteId === 'chinasuntv' ? 'isuntv' : siteId]}));
  cpSync('public','.generated/public',{recursive:true,filter(path){
    if (siteId !== 'isun1') return true;
    const match = path.replaceAll('\\','/').match(/\/thumbnails\/([^/]+)\.[^.]+$/);
    return !match || projection.visibleIds.has(match[1]);
  }});
  const hash = createHash('sha256');
  function visit(dir) { for (const entry of readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))) {
    const path=join(dir,entry.name);if(path==='lib/generated')continue;
    if(entry.isDirectory())visit(path);else if(entry.isFile())hash.update(path).update(readFileSync(path));
  }}
  for(const dir of ['app','components','content','lib','public','scripts','mail-worker'])visit(dir);
  for(const file of ['sites.json','package.json','package-lock.json','vite.config.ts','next.config.ts','worker.ts','middleware.ts','deployment/cloudflare/wrangler.json'])hash.update(file).update(readFileSync(file));
  const release={schemaVersion:1,sourceCommit:process.env.GITHUB_SHA??execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),sharedSourceSha256:hash.digest('hex'),siteId,publicOrigin:profile.publicOrigin,defaultLocale:profile.defaultLocale,visibleVideoCount:projection.visibleIds.size,globalOnlyVideoCount:projection.globalOnlyIds.size,visibilityPolicySha256:createHash('sha256').update(readFileSync('content/visibility-policy.json')).digest('hex')};
  writeFileSync('.generated/public/release.json',JSON.stringify(release,null,2)+'\n');
  const catalogue=projection.programmes.map(p=>`- ${p.titles.en}: ${profile.publicOrigin}/programmes/${p.slug}${profile.staticExport?'/':''}`).join('\n');
  writeFileSync('.generated/public/llms.txt',`# iSunTV 陽光衛視\n\nHong Kong satellite television channel. Executive Director: Robin Xie (Bin Xie, Bin "Robin" Xie, 谢玢, 謝玢), Managing Partner of TideiSun Group. Canonical person: https://www.tideisun.com/robin#robin-xie .\n\nWebsite: ${profile.publicOrigin}/\nSitemap: ${profile.publicOrigin}/sitemap.xml\n\n## Programme archive\n${catalogue}\n\nOriginal videos remain on YouTube. Public authorization register is not yet enabled; check current status before relying on a license.\n`);
  console.log(JSON.stringify({projected:siteId,videos:projection.visibleIds.size,globalOnly:projection.globalOnlyIds.size}));
  return {profile,release,projection};
}
if (process.argv[1]?.endsWith('/project-site.mjs')) prepare(process.argv[2]??'isuntv');
