@AGENTS.md

# Forest Hills Garden (FHG) Developer Guide

## Quick Commands
- `npm run dev` - Run local development server
- `npm run build` - Production compilation check
- `npm run lint` - Run ESLint checks
- `python scripts/make_favicons.py` - Favicon generator

## Best Practices
- Strict TypeScript: No `any`.
- Lenis Smooth Scroll: Use `useLenisScrollLock(isOpen)` for any modal or overlay.
- Images: Specify `sizes` on all `<Image />` elements.
- Clean component boundaries: Sub-features modularized under `src/components/profile/` and `src/components/rfp/`.
