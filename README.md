# Rohit Lifting — Gym Website

A responsive black-theme gym website made with plain HTML, CSS and JavaScript.

## Features
- Responsive layout for phones and desktop
- Exercise library with search and muscle-group filter
- Six-day workout split planner and workout completion log
- Editable calorie/protein targets and meal checklist
- Body-weight/progress log
- Demo coach chat with built-in training tips
- Demo login/sign-up
- Browser localStorage persistence

## Run on Android
1. Download and extract `rohit-lifting-website.zip`.
2. Open `index.html` in a browser if your file manager supports it, or use an HTML editor app that can preview local websites.
3. For editing, open `index.html`, `style.css`, and `script.js` in an editor such as Acode.
4. For a public website, upload the three files to a static host (for example, GitHub Pages, Netlify, or Cloudflare Pages).

## Important limitations
- **Login is demo-only.** It stores credentials in browser localStorage and is not secure. Do not use real passwords. Production authentication requires a backend/auth provider and secure password handling.
- **AI chat is demo-only.** It uses preset replies. For real AI, create a backend endpoint that calls your chosen AI provider; keep API keys on the server, never in `script.js`.
- Exercise photos are loaded from Unsplash, so image loading requires internet access. They are reference/gym photos, not guaranteed anatomically exact 3D exercise renders.
- Progress and meal data stay in this browser/device and do not sync across devices.
- This starter website does not provide medical or individualized coaching advice.

## Files
- `index.html` — page structure
- `style.css` — styling and responsive layout
- `script.js` — interactions and demo data
