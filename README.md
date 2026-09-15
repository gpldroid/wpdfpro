# WPDF

WPDF is a browser-based PDF tools application focused on client-side file processing.

## Current application

The application is implemented in `index.html` with runtime logic in `assets/js/app.js` and modular PDF operations under `assets/js/pdf/`.

## Development

The `main` branch is the published version. The `develop` branch was used to complete the modernization and restructuring work before promotion to `main`.

## Architecture

The PDF runtime is organized into focused modules under `assets/js/pdf/`:

- core PDF loading, byte handling, downloads, and page-range parsing
- PDF merge
- PDF page extraction and per-page splitting
- page deletion and reordering
- page numbering
- image-to-PDF conversion
- security capability detection
- conversion-library boundaries for Word, Excel, and PowerPoint workflows
- dedicated conversion implementations for the existing browser libraries

The production runtime in `assets/js/app.js` now uses the extracted modules for merge, image-to-PDF, split/extract, page deletion, page reordering, and page numbering. Compression, security/protection, and the remaining document-conversion flows stay on their existing implementations until their browser fidelity is audited.

## Testing

A browser-based smoke test is available at `tests/pdf-modules.html`. It creates in-memory PDFs and verifies merge, split, delete, reorder, page numbering, and image-to-PDF behavior without modifying production application state.

The repository also includes a GitHub Actions validation workflow that checks JavaScript syntax, runtime module wiring, required project files, and pull requests targeting `main` or `develop`.

## SEO and PWA foundation

The project includes:

- `robots.txt`
- `sitemap.xml`
- `manifest.webmanifest`
- `sw.js` offline application-shell foundation

The service worker remains a deployment foundation; registration and production icon work are intentionally separate follow-up tasks.

## Privacy and dependency policy

The application is designed around client-side processing for supported operations. Third-party libraries are currently loaded from CDNs. Conversion fidelity and browser compatibility should be audited before replacing or removing these dependencies.

## Roadmap

- [x] Establish a protected development branch.
- [x] Add project license and ignore rules.
- [x] Separate CSS and JavaScript from `index.html`.
- [x] Establish PDF module boundaries.
- [x] Extract PDF split, edit, numbering, and image operations.
- [x] Extract Word, Excel, and PowerPoint conversion boundaries.
- [x] Add browser smoke coverage for core PDF modules.
- [x] Add CI syntax and structure validation.
- [x] Add SEO crawling assets (`robots.txt` and `sitemap.xml`).
- [x] Add PWA manifest and service-worker foundation.
- [x] Switch PDF merge from the legacy runtime to the new module.
- [x] Switch remaining core PDF organization operations from the legacy runtime to tested modules.
- [ ] Audit conversion fidelity and browser compatibility on real browsers/devices.
- [ ] Wire PWA registration and add production application icons.
- [ ] Complete mobile UX/accessibility audit.
- [ ] Replace remaining monolithic UI/processing paths with tested modules.
- [ ] Reduce unnecessary external dependencies where practical.

## License

See `LICENSE` for the MIT License.
