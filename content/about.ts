export const about = {
  availability: "Graduating May 2027 — open to new-grad software engineering roles.",
  bio: [
    "I'm Dylan, a computer science student at the College of Saint Benedict and Saint John's University in Minnesota, with a minor in finance. I build web and mobile products end to end — the app, the API, the data model — and I like owning the machine they run on as much as the code.",
    "Most of what I've shipped lately pairs a real product with an AI layer that earns its place: an idea journal that re-scores itself as the news changes, a finance app whose advisor is deliberately unable to trade, a front end that babysits video-generation jobs. The infrastructure is part of the work — the API behind neurship.dev runs on a Raspberry Pi in my room, deployed by a GitHub Actions runner on that same Pi.",
    "Off the keyboard: disc golf, club ultimate, intramural basketball, and one mountain I'll let you guess.",
  ],
  mountainLink: { href: "/mountain", label: "Guess the mountain →" },
  experience: [
    {
      role: "HTML Developer Intern",
      org: "WAND Digital",
      place: "Eden Prairie, MN",
      when: "Summer 2024",
      note: "Built dynamic digital menu boards in HTML, CSS and JavaScript for the “Wandification” project; trained the hire who took over.",
    },
    {
      role: "Finance Intern",
      org: "Perrill",
      place: "Minnetonka, MN",
      when: "Summer 2024",
      note: "Reconciled account statements and analyzed client financial data for reporting.",
    },
    {
      role: "Classroom & A/V Support Technician",
      org: "CSB/SJU",
      place: "St. Joseph, MN",
      when: "2023 — present",
      note: "Real-time support for classroom technology; edited recorded lectures for clarity and accessibility.",
    },
    {
      role: "Operations Intern",
      org: "Compute North",
      place: "Eden Prairie, MN",
      when: "Summers 2020–2022",
      note: "Diagnosed hardware and software issues in a data-center environment; fixed supply-chain labeling workflows.",
    },
  ],
  education: {
    school: "College of Saint Benedict & Saint John's University",
    degree: "B.A. Computer Science, minor in Finance",
    when: "Expected May 2027",
    note: "Sterns Bank Hackathon — 1st place, April 2024: accessibility features (translation, text-to-speech) and an AI customer-support assistant.",
  },
  skills: {
    Languages: ["TypeScript", "JavaScript", "Python", "Java", "SQL"],
    Frameworks: ["Next.js", "React", "React Native / Expo", "Fastify", "Node", "Three.js", "Prisma", "Tailwind CSS"],
    "Infra & tools": ["Supabase / Postgres", "Vercel", "Raspberry Pi", "Cloudflare Tunnel", "GitHub Actions", "Git", "Linux"],
  },
  headshot: {
    /** Dylan supplies this file; until then Monogram renders. */
    src: "/about/headshot.jpg",
    alt: "Dylan Perrill",
  },
  credential: {
    label: "Sterns Bank Hackathon — 1st place",
    when: "April 2024",
    note: "Accessibility features and an AI support assistant for banking, CSB/SJU.",
  },
} as const;
