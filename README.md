# LiveProfile

Live demo: https://kubuuus.pl (production)

LiveProfile is a small, personal Node.js/Express site that shows live presence and music information with server-rendered Handlebars templates. It’s lightweight and reusable — if you like the UI or the idea, feel free to reuse it for your own profile site.

## What it does
- Renders a personal homepage from Handlebars templates in `views/` and `views/partials/`.
- Shows Discord presence (via Lanyard) and listening data (via Stats.fm).
- Provides small API endpoints under `routes/api/`.
- Includes lightweight styling and particle visuals with assets in `public/`.
- Tracks visitor views using MongoDB (optional).

## Stack
- Language: JavaScript (Node.js)
- Framework: Express
- Templates: Handlebars (.hbs)
- Notable libs: express, hbs, mongoose, dotenv, tailwindcss

## Database (MongoDB)
This project uses MongoDB via Mongoose to collect simple view analytics:

- Models:
  - View: { ip, userAgent, timestamp } — stores one record per visit for basic analytics or to show recent view activity.
  - Counter: { totalViews } — aggregated total views counter.
- Connection:
  - The helper and models are in `database.js`. The server connects using the `MONGO` environment variable (a MongoDB connection string).
  - If a MongoDB connection is not provided or fails, the site will still run but view tracking/counting will not work.

## Quick start

1. Clone:
   git clone https://github.com/xKubuuus/LiveProfile.git
   cd kubuuus.pl

2. Install dependencies:
   npm install

3. Configure:
   - Copy `config.example.js` to `config.js` and edit values, or set equivalent environment variables.
   - Important config keys:
     - `lanyard.discordId` — your Discord user ID (for presence)
     - `statsfm.username` — Stats.fm username (must be public)
     - `embed` — OG metadata shown in `views/partials/Head.hbs`
     - Visual assets: `backgroundUrl`, `albumArt`, `songSource` point to files in `public/`
     - `MONGO` — MongoDB connection string (e.g. `mongodb+srv://user:pass@cluster.example/dbname`) to enable view tracking

4. Build CSS (optional):
   npm run build:css

5. Run:
   node app.js
   or
   npm start

6. Open:
   http://localhost:3000

## Project structure
```
app.js              — main Express server
config.example.js   — configuration example
database.js         — DB helper (mongoose) and models (View, Counter)
package.json        — scripts and dependencies
providers/          — external-data providers (lanyard.js, statsfm.js)
routes/             — web and API routes (web.js, routes/api/*)
views/              — Handlebars templates and partials
public/             — static assets (particles GIFs, video, audio, images)
styles/             — Tailwind input (styles/tailwind.css)
```

## Configuration notes
- The server periodically fetches presence / music data — see `providers/lanyard.js` and `providers/statsfm.js` for details.
- `config.example.js` documents available options (colors, particle effect, visibility toggles).
- Production site (for reference) is available at https://kubuuus.pl.

## Contributing
- Open an issue or PR with improvements. Branch from `main` and include a short description of your change.

## License
See the LICENSE file in this repository.
