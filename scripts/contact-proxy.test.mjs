import test from 'node:test';
import assert from 'node:assert/strict';
import {forwardContact} from './contact-proxy.mjs';
test('third-domain relay rejects untrusted origins before network access',async()=>{
 for(const origin of ['', 'https://evil.example','https://chinasuntv.com.evil.example']) {
 const response=await forwardContact(new Request('https://chinasuntv.com/api/contact',{method:'POST',headers:{origin},body:'{}'}),()=>{throw Error('network should not run')});
 assert.equal(response.status,403);
 }
});
test('authorized alias delegates only to existing contact endpoint without credentials',async()=>{
 let captured;
 const response=await forwardContact(new Request('https://chinasuntv.com/api/contact',{method:'POST',headers:{origin:'https://chinasuntv.com',cookie:'test-only',authorization:'test-only','content-type':'application/json'},body:'{}'}),async r=>{captured=r;return new Response('Invalid fields',{status:400})});
 assert.equal(response.status,400);assert.equal(captured.url,'https://isuntv.com/api/contact');
 assert.equal(captured.headers.get('origin'),'https://isuntv.com');assert.equal(captured.headers.get('cookie'),null);assert.equal(captured.headers.get('authorization'),null);assert.equal(await captured.text(),'{}');
});
test('unsupported methods do not forward',async()=>assert.equal((await forwardContact(new Request('https://chinasuntv.com/api/contact',{headers:{origin:'https://chinasuntv.com'}}),()=>{throw Error('network')})).status,405));
