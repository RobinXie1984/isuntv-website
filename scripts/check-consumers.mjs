import {build} from 'esbuild';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const profile=JSON.parse(readFileSync('lib/generated/site.json'));
const source=JSON.parse(readFileSync('content/videos.json'));
const policy=JSON.parse(readFileSync('content/visibility-policy.json'));
const ids=[...new Set(source.filter(p=>policy.globalOnlyPlaylistIds.includes(p.id)).flatMap(p=>p.entries.map(v=>v.id)))];
const code=`import assert from 'node:assert/strict';
import {findVideo,getProgramme} from './lib/collection';
import {searchVideos} from './lib/search';
import {videoMetadata,programmeMetadata} from './lib/metadata';
import sitemap from './app/sitemap';
import robots from './app/robots';
import {brandMetadata} from './lib/brand-pages';
import {robin} from './lib/brand-identity';
const ids=${JSON.stringify(ids)},profile=${JSON.stringify(profile)};
for(const id of ids){
 if(profile.siteId==='isun1'){assert.equal(findVideo(id),undefined);assert.equal(searchVideos(id).length,0);assert.throws(()=>videoMetadata(profile.defaultLocale,id));}
 else assert(findVideo(id));
}
if(profile.siteId==='isun1')for(const slug of ['personal-accounts','oral-history']){assert.equal(getProgramme(slug),undefined);assert.throws(()=>programmeMetadata(profile.defaultLocale,slug));}
const sm=JSON.stringify(sitemap());
if(profile.siteId==='isun1')for(const id of ids)assert(!sm.includes(id));
assert.equal(robots().sitemap,profile.publicOrigin+'/sitemap.xml');
assert(robin.alternateName.includes('谢玢'));assert(robin.jobTitle.includes('Executive Director of iSunTV'));
console.log(JSON.stringify({consumers:profile.siteId,directVideoChecks:ids.length,result:'PASS'}));`;
const built=await build({stdin:{contents:code,resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',write:false,define:{'process.env.ISUN_STATIC_EXPORT':JSON.stringify(profile.staticExport?'1':'0')},plugins:[{name:'navigation-test',setup(b){b.onResolve({filter:/^next\/navigation$/},()=>({path:'navigation',namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:'export function notFound(){throw new Error("NOT_FOUND")}'}));}}]});
const result=spawnSync(process.execPath,['--input-type=module'],{input:built.outputFiles[0].text,encoding:'utf8',stdio:['pipe','inherit','inherit']});process.exit(result.status??1);
