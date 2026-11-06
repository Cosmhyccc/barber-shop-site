# Barber Shop Site

A local-first QQ Barbershop website prototype. Cream, cobalt, original die-cut graphics, and the real North Lamar team.

## Preview

```sh
npm run dev
```

Open http://localhost:4318. No dependencies or installation required; uses Node.js.

## Build

```sh
npm run check
npm run build
```

`dist/` is a standalone static site. All URLs are relative, so it also works under a GitHub Pages repository path. GitHub Pages is intentionally not enabled until the local design is approved.

## Content

- All 11 barbers, photos, Instagram links, individual Squire links, shop details, and hours come from [QQ Barbershop's existing website](https://www.qqbarbershoplamar.com), retrieved November 6, 2026.
- Full source provenance: `research/source-content.json`.
- $40 haircut / $50 haircut + beard are **walk-in prices**. Appointment pricing stays in Squire.
- No invented barber bios, reviews, or parking directions.
- Barber pole, scissors, and badge are original SVG illustrations. QQ bubble logo was created with built-in imagegen; prompt in `research/logo-prompt.md`. Full-resolution PNG retained; the site serves a lightweight transparent WebP.
- Self-hosted DM Sans and Bricolage Grotesque. OFL licenses in `public/fonts/`.

## Interaction

Responsive sticky navigation, accessible mobile menu, barber carousel with keyboard/arrow controls, expandable full lineup, direct booking/Instagram/map/phone links, and reduced-motion support. Booking opens the shop's existing real booking flow.

## Verification

Syntax and static build pass. Source audit verified all barber booking and social links, anchors, and local assets. Visually reviewed in Arc at desktop and 390px mobile width; mobile navigation and full-lineup expansion tested.
