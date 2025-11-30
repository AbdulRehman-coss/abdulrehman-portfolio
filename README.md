
# Charan Goud — Portfolio (React + Vite)

This repository is a personal portfolio website built with React and Vite. It showcases projects, skills, experience, education, and a contact section — wrapped in a modern, animated UI with a lightweight interactive background.

If you're working on this project locally, the sections below explain how the project is organized and how to run, build, and customize it.

## Key features

- Responsive single-page portfolio with sections: Hero, About, Skills, Projects, Experience & Education (alternating timeline), Contact, and Footer
- Animated background using a combination of CSS blobs + Vanta.NET (three.js) mesh lines for a modern look
- Glassmorphism-style cards and accessible color tokens (CSS variables in `src/App.css`)
- Project cards with icons and external links
- Simple chatbot widget (local stub) and social links
- Build-ready with Vite (fast dev server and production build)

## Tech stack

- React  (functional components + hooks)
- Vite (dev server + build)
- lucide-react (icons)
- three.js + Vanta.NET (animated mesh background loaded from CDN)
- Plain CSS (located in `src/App.css`)

## Run locally

Open a terminal in the project root and run (PowerShell / Windows):

```powershell
cd "c:\Users\chara\OneDrive\Desktop\Charan New Portfolio\portfolio"
npm install
npm run dev
```

This starts the Vite dev server at http://localhost:5173/. For a production build run:

```powershell
npm run build
npm run preview
```

## Important files

- `index.html` — base HTML and CDN scripts (three.js + Vanta) used for the animated background
- `src/main.jsx` — React entry point
- `src/App.jsx` — main application component; contains sections, data arrays (projects, experience, education), and Vanta initialization
- `src/App.css` — entire visual styling (variables, layout, animations)
- `src/Charan.jpg` — profile image (imported into `App.jsx`)

## Customization notes

- Change text/content: Edit `src/App.jsx` where `personalInfo`, `projects`, `experience`, and `education` are defined.
- Replace profile image: update `src/Charan.jpg` (keep the import name in `App.jsx` if you replace the file with the same name).
- Background: The animated mesh is initialized via Vanta in `App.jsx` and loads three.js + Vanta from CDN (scripts added to `index.html`). You can tune the Vanta options in the `useEffect` that initializes `VANTA.NET` (color, spacing, size, backgroundAlpha).
- Styling: Tweak variables at the top of `src/App.css` (for example `--text-primary`, `--bg-primary`, `--accent`) to change the theme quickly.

## Accessibility & performance

- The site uses a subtle animated background; if you want to reduce motion for accessibility or performance, consider disabling Vanta initialization by guarding it behind a user preference or an environment flag.
- The project is optimized for modern browsers with WebGL support (Vanta/three.js). On devices without WebGL it will gracefully degrade to the static CSS gradient and blobs.

## Notes for deployment

- The app is static and can be deployed to Netlify, Vercel, GitHub Pages, or any static host. Ensure the CDN scripts are reachable (or switch to local npm packages if you prefer bundling everything).

## Credits

- Built and maintained by Charan Goud Ediga.

---

If you'd like, I can expand this README with screenshots, contribution notes, or automated deploy instructions (Netlify/Vercel). What would you like to add next?
