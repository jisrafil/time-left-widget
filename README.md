# Joni Widget Studio

Self-hosted, subscription-free widgets for Joni's Notion hubs.

## Widgets

- Clock and date
- Animated flip clock
- Bookish analog clock with three face styles
- Reading soundtrack for public Spotify playlists
- Pomodoro focus timer
- Live weather forecast powered by Open-Meteo
- Countdown
- Time left in the current month
- Time-aware greeting
- Rotating quote
- Progress ring
- Quick-link button bar
- Chairapy appointment-status card
- Recipe roulette using Joni's real cookbook

Open `index.html` through GitHub Pages to use the visual builder and copy a finished embed URL.

## Themes

`master`, `chairapy`, `reading`, `breast-cancer`, `boho`, `autumn`, `cookbook`, `tech`, `kenwood`, `purple`, and `neutral`.

Choose `custom` in the visual builder to set a one-off palette without editing code. Custom colors are stored in the generated URL.

## Optional custom images

Every widget can display a public HTTPS image as a corner decoration, centered watermark, or background image. The builder stores the image URL, style, position, and opacity in the generated embed URL. Use stable public image hosting; private files, local computer paths, and temporary signed URLs will not work. External image hosts receive the normal web request when a widget loads, so do not use sensitive or private images.

## Notion

Type `/embed` in Notion and paste the generated HTTPS URL. Do not put private or sensitive information in query parameters because GitHub Pages is public.

## Legacy widget

`Untitled-1.html` is intentionally preserved at its existing path.
