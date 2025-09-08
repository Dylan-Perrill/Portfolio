import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
    return (
        <>
            <NavBar />
            <section style={{ marginTop: "1rem" }}>
            {/* a quiz to guess what mountain I have climbed (The Grand Teton */}
                <h1>Guess the Mountain 🏔️</h1>
                <p>Can you guess which mountain I've climbed? Here's a hint: it's the highest peak in the Teton Range and a popular destination for climbers and hikers. It's known for its stunning views and challenging routes. Take a guess!</p>
                <div className="card-grid">
                    <Form />
                </div>
            </section>
            <Footer />
        </>
    );
}
