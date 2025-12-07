# 🐊 Navi-Gator — Campus Navigation Center

The **Campus Navigation Center (Navi-Gator)** is a smart, user-friendly platform built to simplify navigation across a university or college campus. It provides an interactive campus map, optimized routing, and detailed facility information to help students, faculty, and visitors find their way quickly and confidently.

This project is implemented as a modern frontend application (React + TypeScript) with GeoJSON-powered maps (Mapbox GL) and a lightweight UI built with Tailwind CSS & shadcn UI.

---

## 🚀 Features

- 📍 **Interactive Campus Map** — Visual, zoomable map with buildings and paths (GeoJSON + Mapbox).
- 🧭 **Smart Navigation & Routing** — Shortest/convenient routes computed on the client using routing logic.
- 🏢 **Points-of-Interest (POI) Directory** — Browse buildings, departments, labs, cafeterias, hostels, and other campus facilities.
- 🔎 **Search & Filter** — Find locations by name or category (academic, residential, recreational, etc.).
- 📱 **Responsive UI** — Clean, modern UI built with Tailwind CSS and shadcn components, works on mobile and desktop.
- 🌐 **Cross-Platform** — Deployable as a web app with progressive UX for small-screen devices.
- 🗺️ **GeoJSON Data** — Campus building data lives in `public/data/*.geojson` and `src/data/buildings.ts`.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling / Components:** Tailwind CSS, shadcn/ui
- **Mapping:** Mapbox GL JS, GeoJSON
- **Icons:** lucide-react
- **Routing & Algorithms:** React Router, client-side routing algorithms (Dijkstra-based pathfinding)
- **Build / Dev:** npm, Vite

> Note: There is no required backend in the current repository. If you plan to add server-side features (API, auth, persistent data), Node.js/Express and a database such as MySQL or PostgreSQL can be added later.

---

## Getting Started (Local Development)

Clone the repo, install dependencies, and run the dev server:

```bash
git clone <YOUR_GIT_URL>
cd project-liftoff
npm install
npm run dev
```

The dev server will print the local URL (e.g. `http://localhost:5173` or another port). Open that in your browser.

Useful commands:

```bash
npm run dev        # Start dev server with hot reload
npm run build      # Build for production
npm run preview    # Preview the production build locally
./node_modules/.bin/tsc --noEmit  # TypeScript typecheck
```

---

## Project Structure (high level)

Important files & folders:

```
public/                 # static assets & GeoJSON data
	└─ data/              # campus GeoJSON files (map, buildings)
src/
	├─ pages/
	│   ├─ Landing.tsx    # New landing page (home)
	│   ├─ MapView.tsx    # Map page
	│   ├─ Buildings.tsx  # Buildings directory
	│   └─ Navigate.tsx   # Navigation tool
	├─ components/        # shared UI components (Navigation, MapboxMap, etc.)
	└─ data/              # typed building records (src/data/buildings.ts)

LANDING_PAGE_CONTENT.md  # Marketing & copy package
IMPLEMENTATION_SUMMARY.md # Implementation & launch checklist
CTA_COPY_REFERENCE.md     # CTA and marketing copy library
QUICK_REFERENCE.md        # One-page quick guide
```

---

## Routes

- `/` → Landing page (home)
- `/map` → Campus map view
- `/buildings` → Buildings directory
- `/navigate` → Navigation tool

---

## Documentation & Marketing Assets

We included a complete content and implementation package to help with launch and handoff:

- `LANDING_PAGE_CONTENT.md` — Full landing page copy (headlines, feature descriptions, FAQ, CTAs)
- `IMPLEMENTATION_SUMMARY.md` — What changed, file list, launch checklist
- `CTA_COPY_REFERENCE.md` — CTA variants, email templates, social copy
- `QUICK_REFERENCE.md` — One-page quick start and overview

---

## Launch Checklist

Before deploying to production, consider the following:

- Update the contact email and social links in the footer (`navigator@rtu.ac.in` is a placeholder).
- Add analytics (Google Analytics 4) and conversion tracking for CTAs.
- Run accessibility and performance tests (Lighthouse).
- Verify Open Graph / Twitter Card previews for link sharing.
- Configure your hosting (Vercel, Netlify, or any static host) and point DNS for custom domains.

Deployment example (Vercel/Netlify):

1. Push the `main` branch to your repo.
2. Connect the repo to Vercel/Netlify and set the build command `npm run build` and output directory `dist`.

---

## Contribution

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make changes, run tests and format
4. Open a PR with a clear description

Please run `npm run dev` locally and ensure TypeScript checks pass before submitting a PR.

---

## Support / Contact

If you need help or want to report issues, open an issue in the repository or email the project contact: `nitinjun006@gmail.com` (replace with your real contact before launch).

---

## License

This repository does not include a license file by default. Add a `LICENSE` file if you plan to open-source this project.

---

## Acknowledgements

- Built with Vite, React, TypeScript, Tailwind CSS, shadcn/ui, and Mapbox GL.
- Landing page copy and marketing assets were created as part of the project deliverables.

Enjoy navigating your campus! 🐊
