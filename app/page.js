import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  return (
    <>
      <NavBar />
      <section className="hero" style={{marginTop:"1rem"}}>
        <div>
          <h1 style={{marginTop:0, fontSize:"clamp(2rem, 5vw, 3rem)"}}>Hi, I'm Dylan Perrill 👋</h1>
          <p>
            I build fast, clean web apps and love solving real-world problems with code.
            I'm currently looking for internship opportunities.
          </p>
          <div style={{display:"flex", gap:"0.75rem", marginTop:"0.75rem"}}>
            <a className="btn" href="/Resume.pdf" target="_blank" rel="noreferrer">Resume</a>
            <a className="btn secondary" href="https://github.com/dylan-perrill" target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn secondary" href="https://www.linkedin.com/in/dylan-perrill-455789294/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Quick facts</h3>
          <ul style={{marginTop:0}}>
            <li>Based in Plymouth, Minnesota.</li>
            <li>Favorite stack: Next.js, Node, Postgres.</li>
              <li>I have climbed a mountain <a href={"/mountain"}>(guess which one)</a></li>
            <li>Interested in frontend, full‑stack, and data.</li>
          </ul>
        </div>
      </section>

      <section style={{marginTop:"2rem"}}>
        <h2 style={{marginBottom:"0.75rem"}}>Featured Projects</h2>
        <div className="card-grid">
          <ProjectCard
            title="Project One"
            description="A short sentence about the problem, solution, and impact."
            tech={["Next.js", "Node", "Postgres"]}
            demo="https://example.com"
            code="https://github.com/yourusername/project-one"
          />
          <ProjectCard
            title="Project Two"
            description="What it does, and ideally a metric (e.g., cut load time by 35%)."
            tech={["React", "Vite", "Firebase"]}
            demo="https://example.com"
            code="https://github.com/yourusername/project-two"
          />
          <ProjectCard
            title="Project Three"
            description="Another highlight project with a concise, outcome‑oriented line."
            tech={["TypeScript", "Tailwind", "Vercel"]}
            demo="https://example.com"
            code="https://github.com/yourusername/project-three"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
