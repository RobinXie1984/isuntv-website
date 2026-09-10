"""Stage immutable build output before invoking the Sites package-site.sh helper.
Usage: python3 scripts/stage-release.py /absolute/new/staging/directory
Keep local Wrangler state out of release archives. Never mutate the build tree.
"""
from pathlib import Path
import argparse,hashlib,json,shutil
parser=argparse.ArgumentParser();parser.add_argument('destination');args=parser.parse_args()
root=Path(__file__).resolve().parents[1];dest=Path(args.destination).expanduser().absolute()
if dest.exists() or dest.is_relative_to(root/'dist'):
 parser.error('Destination must be new and outside dist')
required=['dist/server/index.js','.openai/hosting.json']
for name in required:
 if not (root/name).is_file():parser.error('Required build file missing: '+name)
for base in [root/'dist',root/'.openai']:
 if any(p.is_symlink() for p in base.rglob('*')):parser.error('Refuse symlinks in release inputs')
dest.mkdir(parents=True)
shutil.copytree(root/'dist',dest/'dist',ignore=shutil.ignore_patterns('.wrangler'))
(dest/'.openai').mkdir();shutil.copy2(root/'.openai/hosting.json',dest/'.openai/hosting.json')
files={str(p.relative_to(dest)):hashlib.sha256(p.read_bytes()).hexdigest() for p in dest.rglob('*') if p.is_file()}
assert not any('.wrangler' in Path(name).parts for name in files)
for name,h in files.items():assert hashlib.sha256((root/name).read_bytes()).hexdigest()==h
print(json.dumps({'destination':str(dest),'files':len(files),'sha256':files},indent=2))
