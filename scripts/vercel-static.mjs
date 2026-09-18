import { cp, lstat, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';

// Publish only public assets, never the PHP front controller or dev-server URL.
const output = path.resolve('.vercel-static');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of await readdir('public')) {
    await cp(path.join('public', entry), path.join(output, entry), {
        recursive: true,
        filter: async (source) => {
            const name = path.basename(source);

            return (
                !name.startsWith('.') &&
                name !== 'hot' &&
                name !== 'fonts-manifest.dev.json' &&
                !name.endsWith('.php') &&
                !(await lstat(source)).isSymbolicLink()
            );
        },
    });
}
