# Adding an app to the portfolio

Follow these steps in order. Use an existing page (`fitapp.html`) as the template for a new one.

## 1. Assets in `img/`

Name every file with the app's slug, for example `gpulse`:

- Icons: `<slug>-icon.png` (512), `<slug>-icon-512.png`, `<slug>-icon-192.png`, `<slug>-apple-touch-icon.png` (180), `<slug>-favicon-32.png`. Keep the icon's own background shape; do not crop it to a circle.
- Screenshots: portrait PNGs of the app only, with no status bar. Use the app's own screens (blurred or sample data if the real numbers are private). Mark sample data on the page.

## 2. The app page `<slug>.html`

Copy `fitapp.html` and change:

- `<title>` to `<Name> | Yurii Arnautov`, and the four icon links in `<head>`.
- Hero: icon, category (the small kicker), name, one-line lede, tags, hero screenshot (leave it out and add `solo` to the hero, as `gpulse.html` does, when there is none).
- Sections: why it exists, what it does, screens (a `.screens` strip, which the lightbox in `gallery.js` picks up on its own), how it is built.
- Describe the app that is actually built. Check the branch or build you are describing.

## 3. The page order (the pager)

Pages form a chain, in the order they appear on the home page: Subscription Tracker, FitApp, Show Tracker, French Grammar Quest, GPulse, then back to All apps.

When a new app is added at the end:

- In the old last page, change the "Back to All apps" link to "Next" pointing at `/<slug>`.
- In the new page, "Previous" points at the old last app and "Next" is "Back to All apps".

## 4. The home page card in `index.html`

Add one `<a class="cell c-<id> reveal" href="/<slug>">` inside `.bento`, in the same order as the chain. Copy an existing cell: icon, name, category, one sentence, `.shots` with the screenshots. Also update the `<meta name="description">` if the new app changes what the site claims.

### Row layout rule

The grid has 6 columns. Cards sit in pairs of 4 + 2 columns, alternating (4 + 2, then 2 + 4, then 4 + 2, and so on).

- The 4-column card shows 4 screenshots in a row. The 2-column card shows one, with a second hidden screenshot (`class="alt"`) for the narrower layouts.
- With an odd number of apps the last card spans all 6 columns. Show 4 screenshots at 66% width, centered (`.c-gp` is the example).
- When the next app arrives, pair it with that last card. Make the last card 4 or 2 columns following the alternation, and give the new app the other width. Then delete the full-width special case.
- Tablet (up to 1023px) shows every card at 3 columns with 2 screenshots, and phone (up to 767px) shows one column. Add the new class to the media-query lists in the `<style>` block of `index.html` so those rules cover it.

## 5. Check before pushing

Open `index.html` and the new page at desktop and phone width. Check the icon, the screenshots, the pager links both ways, and that nothing shows a status bar or private numbers.

## When the list grows (more than about eight apps)

The bento grid with screenshots is built for a handful of apps. Past about eight it becomes a very long page, and the hand-edited pager chain becomes easy to break. At that point:

- Keep the bento only for the three to five strongest apps and mark them as featured.
- Put every other app in a compact "More apps" grid below it: icon, name, category and one line each, no screenshots, three or four per row on desktop. Each still links to its own page.
- Drop the previous/next pager from the app pages, or limit it to apps in the same category. A "Back to All apps" link is enough.
- Group the compact grid by category (Finance, Health &amp; fitness, Entertainment, Education), with a heading per group, once any group has more than a few apps.
- Move the app list into one data file (name, slug, category, one line, icon, screenshots, featured or not) and generate the home cards and the pagers from it with a small script. Doing this by hand for dozens of apps will cause broken links.
