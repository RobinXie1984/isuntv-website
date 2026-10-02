import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {errorCopy,errorLocale,errorDocument,recoveryPath} from '../lib/error-page.mjs';
const bundled = await build({stdin:{contents:`export {copy,locales} from './lib/catalogue'; export {detailCopy} from './lib/editorial'; export {searchCopy} from './lib/search-copy'; export {globalContent} from './lib/global-content'; export {videoAvailability} from './lib/video-availability'; export {coverageCopy,translationCoverage} from './lib/translation-coverage'; export {searchVideos} from './lib/search'; export {videoMetadata} from './lib/metadata'; export {translator} from './lib/brand-i18n';`,resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',write:false,plugins:[{name:'not-found',setup(b){b.onResolve({filter:/^next\/navigation$/},()=>({path:'navigation',namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:'export function notFound(){throw new Error("not found")}'}));}}]});
const modules=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text).toString('base64'));
const profiles=JSON.parse(readFileSync('sites.json'));
function shape(value){if(Array.isArray(value))return value.map(shape);if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(k=>[k,shape(value[k])]));assert.equal(typeof value,'string');assert(value.trim());return 'string';}
test('all nine language packages retain matching nonempty structures',()=>{
 for(const name of ['copy','detailCopy','searchCopy','globalContent','videoAvailability','coverageCopy'])for(const l of modules.locales)assert.deepEqual(shape(modules[name][l]),shape(modules[name].en),`${name}/${l}`);
 const business=JSON.parse(readFileSync('lib/brand-translations.json'));for(const [source,targets] of Object.entries(business))for(const l of modules.locales.filter(l=>!['en','zh-Hant'].includes(l)))assert.equal(modules.translator(l)('',source),targets[l]);
 assert.throws(()=>modules.translator('ko')('','INTENTIONALLY_MISSING_KEY'),/Missing ko translation/);
});
test('27 locale/domain error paths preserve language, direction and recovery; unsafe paths are never rendered',()=>{
 for(const p of Object.values(profiles))for(const l of modules.locales){const path=(l===p.defaultLocale?'':'/'+l)+'/missing';assert.equal(errorLocale(path,p.defaultLocale),l);const html=errorDocument(path,p.defaultLocale);assert(html.includes(`lang="${l}" dir="${l==='he'?'rtl':'ltr'}"`));assert(html.includes(`href="${recoveryPath(l,p.defaultLocale)}"`));assert(html.includes(errorCopy[l][0]));}
 assert.equal(errorLocale('/constructor/missing','en'),'en');assert.equal(errorLocale('/xx/missing','en'),'en');assert(!errorDocument('/<script>alert(1)</script>','en').includes('alert(1)'));
 const static404=errorDocument('/','zh-Hans',true);for(const l of modules.locales)assert(static404.includes(`href="${recoveryPath(l,'zh-Hans',true)}"`));assert(static404.includes('<noscript>'));assert(static404.includes('noindex,follow'));
});
test('priority translations preserve unknowns and unlock indexing only for completed episodes',()=>{
 const all=JSON.parse(readFileSync('content/drafts.json'));const titles=JSON.parse(readFileSync('content/display-titles.json'));const batch=JSON.parse(readFileSync('content/translation-batches.json'))[0];
 for(const id of batch.videoIds)for(const l of batch.locales){const f=all[id].fields[l];assert.deepEqual(Object.keys(f).sort(),Object.keys(all[id].fields.en).sort());for(const [k,v] of Object.entries(f)){if(all[id].fields.en[k]===null)assert.equal(v,null);else assert(v?.trim());}assert(titles[id][l]);assert.equal(modules.videoMetadata(l,id).robots.index,true);}
 const pending=Object.keys(all).find(id=>!all[id].fields.ko&&modules.searchVideos(id).length);assert(pending);assert.equal(modules.videoMetadata('ko',pending).robots.index,false);
 for(const l of batch.locales)assert.equal(modules.translationCoverage(l).translated,4);
});
test('localized name search and original-name search find the same selected episode',()=>{
 for(const q of ['Li Delun','李德倫','리더룬','ली देलुन','לי דלון'])assert(modules.searchVideos(q).some(v=>v.id==='anL-lcfB2y0'),q);
 assert.equal(modules.searchVideos('nonexistent-audit-query-20261002').length,0);
});
