// Compatibility entry point: the former clone now has one shared-source audit.
import {spawnSync} from 'node:child_process';
const result=spawnSync(process.execPath,['--test','scripts/visibility.test.mjs'],{stdio:'inherit'});process.exit(result.status??1);
