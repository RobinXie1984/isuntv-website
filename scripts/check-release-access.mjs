// Read-only release gate. Never log response bodies, environment values or tokens.
import assert from 'node:assert/strict';
const cf=process.env.CLOUDFLARE_API_TOKEN;
assert(cf,'Missing approved Cloudflare Pages deployment permission; neither site may publish.');
const account='c805fea6fe0eb47cd90cd5e19f0ff00e';
const response=await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/pages/projects/isuntv-public`,{headers:{Authorization:`Bearer ${cf}`},signal:AbortSignal.timeout(20000)});
assert.equal(response.status,200,'Cloudflare project access failed');
const body=await response.json();assert(body.success&&body.result?.name==='isuntv-public','Wrong Cloudflare destination');
const gh=await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/pages`,{headers:{Authorization:`Bearer ${process.env.GITHUB_TOKEN}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},signal:AbortSignal.timeout(20000)});
assert.equal(gh.status,200,'GitHub Pages destination is not ready');
const pages=await gh.json();assert.equal(pages.build_type,'workflow');assert.equal(pages.cname,'isun1.com');
console.log('Both existing deployment destinations are ready.');
