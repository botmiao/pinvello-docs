# Pinvello Public Site, Privacy Policy & Store Support

Public landing page, Privacy Policy, and Support Center for **Pinvello** (Windows 11 wallpaper-layer sticky notes), hosted on GitHub Pages at `https://botmiao.github.io/pinvello-docs/`.

## Live Pages

- **Landing Page**: https://botmiao.github.io/pinvello-docs/
- **Privacy Policy**: https://botmiao.github.io/pinvello-docs/privacy.html (`#zh` / `#en`)
- **Support & FAQ**: https://botmiao.github.io/pinvello-docs/support.html
- **Microsoft Store**: https://apps.microsoft.com/detail/9NRGMTLZ4JXN
- **Issue Tracker**: https://github.com/botmiao/pinvello-docs/issues

## Architecture

- Pure static HTML5 + CSS Design Tokens + native ES Modules (`assets/css/*`, `assets/js/*`), zero build toolchain required (`main /` GitHub Pages).
- Both `privacy.html` and `support.html` include full static Chinese and English text in the HTML document so crawlers and users without JavaScript can read every disclosure verbatim.
- Optimized visual assets (`assets/img/*.webp`, `assets/media/trailer-*.mp4`) and `PRIVACY.md` are exported from the upstream private repository via `tools/export-web-assets.py`.
