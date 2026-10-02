import {readFileSync,appendFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const profiles=JSON.parse(readFileSync('sites.json'));
const expected=process.env.EXPECTED_COMMIT;
const attempts=Number(process.env.DRIFT_ATTEMPTS??1);
let last;
async function check(){
 const rows=await Promise.all(Object.entries(profiles).map(async([id,profile])=>{
  const request=await fetch(`${profile.publicOrigin}/release.json?check=${Date.now()}`,{signal:AbortSignal.timeout(20000),headers:{'cache-control':'no-cache','user-agent':'iSun-release-verifier/1.0'}});
  assert.equal(request.status,200,`${id}: release marker HTTP ${request.status}`);
  const release=await request.json();assert.equal(release.siteId,id);assert.equal(release.publicOrigin,profile.publicOrigin);assert.equal(release.defaultLocale,profile.defaultLocale);
  if(expected)assert.equal(release.sourceCommit,expected,`${id}: wrong deployed commit`);
  const home=await fetch(profile.publicOrigin+'/',{signal:AbortSignal.timeout(20000)});assert.equal(home.status,200,`${id}: homepage`);
  const html=await home.text();assert(html.includes(`lang="${profile.defaultLocale}"`),`${id}: default language`);assert(html.includes(`href="${profile.publicOrigin}/"`),`${id}: canonical`);
  const korean=await fetch(profile.publicOrigin+'/ko/',{signal:AbortSignal.timeout(20000)});assert.equal(korean.status,200,`${id}: Korean homepage`);
  const koreanHtml=await korean.text();assert(koreanHtml.includes('lang="ko"'),`${id}: Korean page language`);
  assert(new RegExp(`<link rel="canonical" href="${profile.publicOrigin.replaceAll('.', '\\.')}/ko/?"`).test(koreanHtml),`${id}: Korean canonical`);
  const menu=koreanHtml.match(/<nav class="language-options"[^>]*>(.*?)<\/nav>/s)?.[1];
  assert(menu&&menu.indexOf('hrefLang="ja"')>=0&&menu.indexOf('hrefLang="ko"')>menu.indexOf('hrefLang="ja"')&&menu.indexOf('hrefLang="hi"')>menu.indexOf('hrefLang="ko"'),`${id}: Korean menu order`);
  return release;
 }));
 for(const row of rows.slice(1))for(const key of ['sourceCommit','sharedSourceSha256','visibilityPolicySha256'])assert.equal(rows[0][key],row[key],`DEPLOYMENT DRIFT: ${row.siteId} ${key}`);
 assert.equal(rows.find(r=>r.siteId==='isunmedia').visibleVideoCount,rows.find(r=>r.siteId==='isuntv').visibleVideoCount);
 assert.match(rows[0].sourceCommit,/^[a-f0-9]{40}$/);assert.match(rows[0].sharedSourceSha256,/^[a-f0-9]{64}$/);
 return rows;
}
for(let attempt=1;attempt<=attempts;attempt++){
 try {const rows=await check();console.log(JSON.stringify({result:'PASS',deployments:rows},null,2));if(process.env.GITHUB_STEP_SUMMARY)appendFileSync(process.env.GITHUB_STEP_SUMMARY,`All three domains verified at commit ${rows[0].sourceCommit}. Shared content digest ${rows[0].sharedSourceSha256}.\n`);process.exit(0);}
 catch(error){last=error.message;console.error(`Check ${attempt}/${attempts}: ${last}`);if(attempt<attempts)await new Promise(r=>setTimeout(r,10000));}
}
const report=`DEPLOYMENT DRIFT / FAILURE: ${last}. Do not mark the release complete. Inspect all deployment jobs; repair or roll all domains back to the last verified commit.\n`;
console.error(report);if(process.env.GITHUB_STEP_SUMMARY)appendFileSync(process.env.GITHUB_STEP_SUMMARY,report);process.exit(1);
