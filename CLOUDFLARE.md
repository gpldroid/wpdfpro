# Cloudflare setup — WPDF

## 1. Production D1 database

Database name: `wpdf-production`

Database ID: `09339c53-6f74-4d35-b9f4-04e7cfd19246`

The production D1 binding is configured in `wrangler.toml` as `DB`.

## 2. Initialize or migrate the schema

For a fresh database, run:

```bash
npx wrangler d1 execute wpdf-production --remote --file=./schema.sql
```

If the original schema is already installed, run the incremental tool-usage migration:

```bash
npx wrangler d1 execute wpdf-production --remote --file=./migrations/001_tool_usage.sql
```

The schema stores application settings, privacy-friendly visit analytics, and tool-usage counts. PDF document contents are never stored in D1.

## 3. Deploy to Cloudflare Pages

Connect `gpldroid/wpdf` to Cloudflare Pages and use the repository root as the build output directory. No build command is required for the static application.

Make sure the D1 binding is named exactly `DB` for the production environment.

## 4. Protect the administration area

Use Cloudflare Zero Trust Access to protect:

- `/admin/*`
- `/api/admin/*`

Only the site owner should be allowed to access these paths. The dashboard intentionally does not implement a second password system in browser JavaScript.

## 5. Owner

The configured site owner is **عماد الدين لمراني**. The value is also stored in D1 under `site_settings.owner_name`.

## 6. PDF editor

The public editor is available at `/pdf-editor.html` and supports:

- PDF upload
- camera capture on supported mobile browsers
- image upload and conversion to PDF
- page preview using PDF.js
- adding text
- freehand drawing
- local save/download using pdf-lib

Files remain in the browser during editing; the editor does not upload document contents to D1.

## 7. Analytics and PWA

The repository now includes a privacy-friendly analytics module at `assets/js/analytics.js`, a tool-usage API at `/api/tool-usage`, and a PWA shell cache update in `sw.js`.

The repository quality workflow validates JavaScript syntax, required production files, and the runtime integration test.

## Important

The D1 database is for application metadata/analytics, not for storing users' PDF documents. Do not add PDF contents or sensitive document data to the analytics tables.
