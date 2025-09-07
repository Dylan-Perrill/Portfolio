import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

export const metadata = { title: "Projects — Dylan Perrill" };

const projects = [
  {
    title: "Project One",
    description: "Brief description of what you built, who it helps, and your role.",
    tech: ["Next.js", "Node", "Postgres"],
    demo: "https://example.com",
    code: "https://github.com/yourusername/project-one",
  },
  {
    title: "Project Two",
    description: "One‑liner with any notable result (e.g., 500+ users, 35% faster).",
    tech: ["React", "Vite", "Firebase"],
    demo: "https://example.com",
    code: "https://github.com/yourusername/project-two",
  },
];

export default function Projects() {
  return (
    <>
      <NavBar />
      <section style={{marginTop:"1rem"}}>
        <h1>Projects</h1>
        <p>Selected work. See more on my <a href="https://github.com/dylan-perrill" target="_blank" rel="noreferrer">GitHub</a>.</p>
        <div className="card-grid">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
