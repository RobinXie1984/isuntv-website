"""Cache source-owned catalogue thumbnails for independent, local image delivery."""
import concurrent.futures, hashlib, json, pathlib, subprocess
root=pathlib.Path(__file__).resolve().parents[1]
data=json.loads((root/'content/videos.json').read_text())
items={v['id']:v.get('thumbnail') for p in data for v in p['entries'] if v.get('thumbnail')}
out=root/'public/thumbnails';out.mkdir(exist_ok=True)
def one(item):
 vid,url=item;p=out/(vid+'.jpg')
 try:
  if not p.exists():
   b=subprocess.check_output(['curl','--fail','--silent','--show-error','--location','--max-time','12',url.split('?')[0]],stderr=subprocess.DEVNULL)
   if not b.startswith(b'\xff\xd8'): raise ValueError('Not a JPEG')
   p.write_bytes(b)
  b=p.read_bytes(); return vid,{'file':'/thumbnails/'+p.name,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)}
 except Exception as e:return vid,{'error':type(e).__name__}
results=dict(concurrent.futures.ThreadPoolExecutor(8).map(one,items.items()))
(root/'content/thumbnail-cache.json').write_text(json.dumps({k:v['file'] for k,v in results.items() if 'file' in v},ensure_ascii=False,indent=2)+'\n')
e=root/'evidence';e.mkdir(exist_ok=True);(e/'thumbnail-cache.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps({'total':len(results),'cached':sum('file' in x for x in results.values()),'errors':{k:v for k,v in results.items() if 'error' in v}}))
