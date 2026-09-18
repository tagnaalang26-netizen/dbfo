# Vercel deployment

The root `vercel.json` overrides the Vite preset. Vite still builds Laravel's
assets into `public/build`; the build then copies safe public assets into
`.vercel-static`, preserving `/build/...` URLs. All other requests go through
`api/index.php` using the community PHP 8.5 runtime (`vercel-php@0.9.0`). The
runtime installs production Composer dependencies.

Set these secrets and project-specific values in Vercel's environment settings
for each deployment environment:

- `APP_KEY`: the existing Laravel application key. Keep it stable.
- `APP_URL`: the HTTPS application URL.
- `DB_CONNECTION`: `pgsql`.
- `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, and
  `DB_SSLMODE`: the database connection settings (use `require` for SSL).
- Mail service settings if password-reset emails are needed.

Do not upload `.env`. Database migrations must be applied separately with
`php artisan migrate --force` against the intended database. They are not run
during a deployment build. Sessions and cache use the database; compiled views
and package discovery caches use writable temporary storage.

Commit and push these configuration files, then redeploy. A successful frontend
build alone does not validate the PHP function: verify `/up`, `/`, and a complete
login/logout flow on the deployed URL.

Runtime documentation: https://github.com/vercel-community/php
