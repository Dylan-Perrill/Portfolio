# Portfolio (Next.js on Vercel) — Starter

A clean, beginner‑friendly Next.js starter for a personal portfolio. File‑based routes, responsive layout, and simple components. Ready for Vercel.

## Quick start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run locally**
   ```bash
   npm run dev
   # open http://localhost:3000
   ```

3. **Edit content**
   - `app/page.js` — homepage (hero + featured projects)
   - `app/projects/page.js` — projects list
   - `app/about/page.js` — about section
   - `app/contact/page.js` — contact details
   - `components/ProjectCard.jsx` — project cards
   - Add your resume as `public/Resume.pdf` and link to `/Resume.pdf`

4. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "My portfolio start"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```

5. **Deploy on Vercel**
   - Go to https://vercel.com → **Add New → Project** → import your repo
   - Framework is auto‑detected (Next.js). Click **Deploy**.

## Customize

- Replace links, text, and placeholder content.
- Add images to `/public` and reference them via `/your-image.jpg`.
- To add a blog later, create routes under `app/blog/`.

## Notes

- Requires Node 18+.  
- SEO basics are included via `<head>` in `app/layout.js`. Update social preview image when you add one.
