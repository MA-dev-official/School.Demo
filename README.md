# JPS School System

Static website for **JPS School System**, originally hosted on Vercel and now running on Replit. The site presents the school, its classes, facilities, vision, mission, and contact information.

## Tech Stack

- **HTML** for content (`index.html`, `about/index.html`)
- **Tailwind CSS v4** compiled via the Tailwind CLI to a single static `output.css`
- **Express + compression** as the static file server with gzip and `Cache-Control` / `Expires` headers
- **System font stack** — no external font requests

## Project Structure

```
.
├── index.html              # Home page
├── about/index.html        # About page (vision & mission)
├── src/input.css           # Tailwind source (theme + base styles)
├── output.css              # Compiled Tailwind CSS (built artifact)
├── server.js               # Express static server with gzip + cache headers
├── images/                 # Original image assets
│   └── optimized/          # WebP/MP4 versions used by the site
├── package.json
├── replit.md
└── README.md
```

## Running on Replit

The "Start application" workflow runs both the Tailwind watcher and the Express server on port **5000**:

```bash
npx tailwindcss -i ./src/input.css -o ./output.css --watch & node server.js
```

Open the preview pane to see the site.

## Available Scripts

| Script              | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `npm run build:css` | Build a minified `output.css` from `src/input.css`            |
| `npm run watch:css` | Rebuild `output.css` whenever HTML or source CSS changes      |
| `npm start`         | Start the Express server on port 5000                         |
| `npm run dev`       | Build CSS once, then start the Express server                 |

## Performance

- All images converted to **WebP** (max 1200px, quality 80)
- `banner.gif` (384 KB) replaced with `banner.mp4` (90 KB)
- `loading="lazy"` + explicit `width`/`height` on every below-the-fold image
- Google Maps iframe loads lazily
- Tailwind output is minified
- Server applies **gzip** to text responses and tiered cache headers:
  - Images / fonts / video → `max-age=31536000, immutable`
  - CSS / JS → `max-age=2592000`
  - HTML → `max-age=3600`

## Deployment

Use Replit's deployment feature to publish the project. The production
process should run `npm run build:css && npm start`.
