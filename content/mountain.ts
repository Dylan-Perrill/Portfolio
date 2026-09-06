import { img } from "./images";

export const mountain = {
  title: "Guess the Mountain",
  intro:
    "Hint: it's the crown of its range — the tallest peak, with routes that test you and reward you with unbelievable scenery. Can you guess which mountain I climbed? The photos below might help.",
  quiz: [
    {
      question: "What is the name of the mountain?",
      choices: ["Denali", "The Grand Teton", "Mt. Whitney", "Longs Peak"],
      answer: "The Grand Teton",
    },
    {
      question: "What state is it in?",
      choices: ["Montana", "Wyoming", "Colorado", "Utah"],
      answer: "Wyoming",
    },
    {
      question: "Approximate elevation?",
      choices: ["12,005 ft", "13,775 ft", "14,411 ft", "15,200 ft"],
      answer: "13,775 ft",
    },
  ],
  photos: [
    { ...img("gallery/mountain1.jpg", "Dylan at the summit of the Grand Teton"), caption: "At the summit" },
    { ...img("gallery/mountain2.jpg", "Sunrise over a neighboring peak in the Teton range"), caption: "Sunrise on another peak in the range" },
    { ...img("gallery/mountain3.jpg", "Inside the hut: bunk beds and climbing gear by the door"), caption: "The hut, the night before the summit" },
    { ...img("gallery/mountain4.jpg", "Two climbers at the Lower Saddle"), caption: "Me and a friend at the Lower Saddle" },
    { ...img("gallery/mountain5.jpg", "A van driving toward the Teton range on a highway"), caption: "The range from the valley floor" },
    { ...img("gallery/mountain6.jpg", "The outside of the hut"), caption: "The hut from outside" },
  ],
} as const;
