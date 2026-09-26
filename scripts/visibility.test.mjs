import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {projectContent} from './content-visibility.mjs';
const names=['videos','programmes','drafts','display-titles','people','thumbnail-cache'];
const source=Object.fromEntries(names.map(n=>[n,JSON.parse(readFileSync(`content/${n}.json`,'utf8'))]));
const policy=JSON.parse(readFileSync('content/visibility-policy.json','utf8'));
const global=projectContent(source,policy,'isuntv');
const mainland=projectContent(source,policy,'isun1');
test('global site retains every source video',()=>assert.deepEqual(global.visibleIds,new Set(source.videos.flatMap(p=>p.entries.map(v=>v.id)))));
test('restricted IDs are absent from all Mainland data',()=>{
 for(const id of global.globalOnlyIds){assert(!mainland.visibleIds.has(id));for(const key of ['drafts','display-titles','thumbnail-cache'])assert(!(id in mainland[key]));}
 assert.equal(mainland.programmes.length,source.programmes.length-2);
 for(const id of policy.interviews.isun1)assert(mainland.programmes.some(p=>p.slug===id));
 assert.deepEqual(policy.interviews.isun1,['masters','life-online','love-marriage','national-tragedy']);
});
test('duplicate video in another playlist cannot bypass restriction; labels do not control policy',()=>{
 const changed=structuredClone(source);const id=[...global.globalOnlyIds][0];
 const allowed=changed.videos.find(p=>!policy.globalOnlyPlaylistIds.includes(p.id));
 allowed.entries.push({id,title:'An innocent new title'});
 for(const p of changed.videos)p.title='renamed';
 const result=projectContent(changed,policy,'isun1');assert(!result.visibleIds.has(id));assert.deepEqual(result.visibleIds,mainland.visibleIds);
});
test('unknown target and missing classification fail closed',()=>{
 assert.throws(()=>projectContent(source,policy,'typo'));
 assert.throws(()=>projectContent(source,{...policy,globalOnlyPlaylistIds:['missing']},'isun1'));
});
test('all referenced people and thumbnail files have a visible source',()=>{
 for(const id of Object.keys(mainland['thumbnail-cache']))assert(mainland.visibleIds.has(id));
 const used=new Set(Object.values(mainland.drafts).flatMap(d=>d.people??[]));for(const id of Object.keys(mainland.people))assert(used.has(id));
});

test('English iSunMedia receives exactly the complete iSunTV catalogue',()=>{
 const english=projectContent(source,policy,'isunmedia');
 assert.deepEqual(english,global);
});
