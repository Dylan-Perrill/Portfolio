import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = { title: "About — Dylan Perrill" };

export default function About() {
  return (
    <>
      <NavBar />
      <section style={{marginTop:"1rem"}}>
        <h1>About</h1>
        <p>
          I’m a computer science student focused on building useful, performant web apps.
          I enjoy working across the stack and shipping features that help people.
        </p>
        <h3>Skills</h3>
        <ul>
          <li>Frontend: React, Next.js, HTML/CSS</li>
          <li>Backend: Node/Express, REST APIs</li>
          <li>Tools: Git/GitHub, Vercel</li>
        </ul>
      </section>
      <Footer />
    </>
  );
}
