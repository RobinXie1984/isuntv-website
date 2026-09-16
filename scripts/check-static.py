from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, sys
root=Path(sys.argv[1] if len(sys.argv)>1 else 'dist/client')
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]; self.lang=None; self.canonical=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html': self.lang=a.get('lang')
        for k in ['href','src']:
            if a.get(k): self.refs.append(a[k])
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href')
errors=[]; refs=set(); counts={}; pages=list(root.rglob('*.html'))
for f in pages:
    p=Page(); p.feed(f.read_text()); relative=f.relative_to(root).as_posix()
    is404=relative in ['404.html','404/index.html']
    expected=relative.split('/')[0] if relative.split('/')[0] in ['zh-Hant','en','fr','es','ja','hi','he'] else 'zh-Hans'
    if p.lang!=expected: errors.append([relative,'lang',p.lang,expected])
    if not is404 and (not p.canonical or not p.canonical.startswith('https://isun1.com/')): errors.append([relative,'canonical',p.canonical])
    counts[expected]=counts.get(expected,0)+1
    for ref in p.refs:
        u=urlsplit(ref)
        if u.scheme or u.netloc or not u.path: continue
        if not u.path.startswith('/'): errors.append([relative,'relative-reference',ref]);continue
        refs.add(unquote(u.path))
for ref in refs:
    target=root/ref.lstrip('/')
    if not target.is_file() and not (target/'index.html').is_file(): errors.append(['missing-target',ref])
result={'html_pages':len(pages),'local_targets':len(refs),'locales':counts,'errors':errors}
print(json.dumps(result,ensure_ascii=False,indent=2));sys.exit(bool(errors))
