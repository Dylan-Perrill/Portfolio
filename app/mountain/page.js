import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Quiz from "@/components/Quiz";
import Image from "next/image"; 
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
                </div>
            </section>
            {/* <Form /> */}
            <div style={{ maxWidth: 420, marginTop: "1rem" }}>
                <Image
                    src="/mountain.jpg"
                    alt="Me on the summit of a mountain"
                    width={420}
                    height={560}
                    style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    border: "1px solid var(--border,#333)"
                    }}
                    priority
                />
                <p style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.4rem" }}>
                    Summit photo from my mountain climb.
                </p>
            </div>
            <Quiz
                title="Guess the Mountain"
                items={[
                    {
                    question: "What is the name of the mountain?",
                    choices: ["Denali", "The Grand Teton", "Mt. Whitney", "Longs Peak"],
                    answer: "The Grand Teton"
                    },
                    {
                    question: "What state is it located in?",
                    choices: ["Montana", "Wyoming", "Colorado", "Utah"],
                    answer: "Wyoming"
                    },
                    {
                    question: "Approximate elevation?",
                    choices: ["12,005 ft", "13,775 ft", "14,411 ft", "15,200 ft"],
                    answer: "13,775 ft"
                    }
                ]}
                />
            <Footer />
        </>
    );
}
