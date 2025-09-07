import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = { title: "Contact — Dylan Perrill" };

export default function Contact() {
  return (
    <>
      <NavBar />
      <section style={{marginTop:"1rem"}}>
        <h1>Contact</h1>
        <p>
          The quickest way to reach me is email:
          {" "} <a href="mailto:dperrill001@csbsju.edu">dperrill001@csbsju.edu</a>
        </p>
        <p>
          I’m also on <a href="https://www.linkedin.com/in/dylan-perrill-455789294/" target="_blank" rel="noreferrer">LinkedIn</a> and
          {" "} <a href="https://github.com/dylan-perrill" target="_blank" rel="noreferrer">GitHub</a>.
        </p>
      </section>
      <Footer />
    </>
  );
}
