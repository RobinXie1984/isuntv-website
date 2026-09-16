import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const [a,b]=['isuntv','isun1'].map(s=>JSON.parse(readFileSync(`artifacts/${s}/release.json`)));
for(const key of ['sourceCommit','sharedSourceSha256','visibilityPolicySha256'])assert.equal(a[key],b[key],key);
if(process.env.GITHUB_SHA)assert.equal(a.sourceCommit,process.env.GITHUB_SHA);
assert.equal(a.defaultLocale,'zh-Hant');assert.equal(b.defaultLocale,'zh-Hans');assert(a.visibleVideoCount>b.visibleVideoCount);
console.log(JSON.stringify({pairedArtifacts:'PASS',commit:a.sourceCommit,sourceDigest:a.sharedSourceSha256}));
