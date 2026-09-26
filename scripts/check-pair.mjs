import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const profiles=JSON.parse(readFileSync('sites.json'));
const rows=Object.keys(profiles).map(s=>JSON.parse(readFileSync(`artifacts/${s}/release.json`)));
for(const row of rows){
 for(const key of ['sourceCommit','sharedSourceSha256','visibilityPolicySha256'])assert.equal(row[key],rows[0][key],key);
 assert.equal(row.defaultLocale,profiles[row.siteId].defaultLocale);
 if(process.env.GITHUB_SHA)assert.equal(row.sourceCommit,process.env.GITHUB_SHA);
}
const tv=rows.find(r=>r.siteId==='isuntv'),mainland=rows.find(r=>r.siteId==='isun1'),english=rows.find(r=>r.siteId==='chinasuntv');
assert.equal(tv.visibleVideoCount,english.visibleVideoCount);assert(tv.visibleVideoCount>mainland.visibleVideoCount);
console.log(JSON.stringify({artifacts:'PASS',count:rows.length,commit:tv.sourceCommit,sourceDigest:tv.sharedSourceSha256}));
