import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Quiz from "@/components/Quiz";
import Gallery from "@/components/Gallery";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
    return (
        <>
            <NavBar />
            <section style={{ marginTop: "1rem" }}>
            {/* a quiz to guess what mountain I have climbed (The Grand Teton */}
                <h1>Guess the Mountain 🏔️</h1>
                <p>Hint: it’s the crown of the range — the tallest peak, with routes that test you but reward you with unbelievable scenery. Can you guess which mountain I climbed?</p>
                <p>(Also, look below the quiz for some photos to help you guess)</p>
                <div className="card-grid">
                </div>
            </section>
            {/* <Form /> */}
            
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
                <Gallery photos={[
                    {
                        src: "/gallery/mountain1.jpg",
                        alt: "A picture of me on top of the mountain",
                        caption: "A picture of me at the summit of the mountain"
                    },
                    {
                        src: "/gallery/mountain2.jpg",
                        alt: "A climber ascending a steep rocky slope",
                        caption: "Climbing the Grand Teton"
                    },
                    {
                        src: "/gallery/mountain3.jpg",
                        alt: "A climber ascending a steep rocky slope",
                        caption: "Climbing the Grand Teton"
                    },
                    {
                        src: "/gallery/mountain4.jpg",
                        alt: "A climber ascending a steep rocky slope",
                        caption: "Me and my friend at the lower saddle of the mountain"
                    },
                    {
                        src: "/gallery/mountain5.jpg",
                        alt: "A car with a mountain range in the background",
                        caption: "A view of the mountain range from the bottom"
                    },
                    {
                        src: "/gallery/mountain6.jpg",
                        alt: "A room with a bunk bed and a door with lots of gear.",
                        caption: "The inside of the hut we spent the night in before summiting"
                    }
                ]} columns={4} />

            <Footer />
        </>
    );
}
