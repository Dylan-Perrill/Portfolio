export const about = {
  availability: "Graduating May 2027 — open to new-grad software engineering roles.",
  bio: [
    "I'm Dylan, a computer science student at Saint John's University in Minnesota, with a minor in finance. I build web and mobile products end to end — the app, the API, the data model — and I like owning the machine they run on as much as the code.",
    "Most of what I've shipped lately pairs a real product with an AI layer that earns its place: an idea journal that re-scores itself as the news changes, a finance app whose advisor is deliberately unable to trade, a front end that babysits video-generation jobs. The infrastructure is part of the work — the API behind neurship.dev runs on a Raspberry Pi in my room, deployed by a GitHub Actions runner on that same Pi. At WAND Digital I turned my own agent-assisted workflow into a library of Claude Code skills and rules the team installs with one command.",
    "Off the keyboard: disc golf, club ultimate, intramural basketball, and one mountain I'll let you guess.",
  ],
  mountainLink: { href: "/mountain", label: "Guess the mountain →" },
  experience: [
    {
      role: "HTML Developer & Content Deployment Specialist",
      org: "WAND Digital",
      place: "Eden Prairie, MN",
      when: "May 2025 — present",
      note: "Full-time summers 2025 and 2026; part-time remote during the academic year. Built the Integrations Search Tool — a React + Vite app that catalogs ~15 restaurant POS integrations and normalizes every vendor's response into one canonical field set, with ~1,260 automated tests, deployed on Vercel. Built an automated QA tool that renders finished menu boards in the production runtime and measures layout defects and text overflow, and an hourly Supabase pg_cron + edge-function pipeline that versions a third-party signage contract only when it changes. Develop live menu boards in HTML, CSS and JavaScript for national restaurant brands under legacy-browser constraints.",
    },
    {
      role: "Classroom & A/V Support Technician",
      org: "CSB/SJU",
      place: "St. Joseph, MN",
      when: "Aug 2023 — present",
      note: "Support classroom technology and partner with faculty so presentations and campus events run smoothly; edit and optimize recorded lectures for clarity and accessibility.",
    },
    {
      role: "Finance Intern",
      org: "Perrill",
      place: "Minnetonka, MN",
      when: "May — Aug 2024",
      note: "Balanced account statements, validated transactions, and analyzed client financial data for reporting and process improvement.",
    },
  ],
  leadership: [
    {
      role: "Treasurer",
      org: "Computer Science Club, Saint John's University",
      when: "2026 — present",
      note: "Manage the club budget and funding requests; help organize the club's game jams and hackathons.",
    },
    {
      role: "Co-led class session — “AI & Automation”",
      org: "Ethical Issues in Computing",
      when: "Fall 2025",
      note: "Ran a live exercise in which classmates rebuilt their semester-long course project in about twenty minutes using Claude, Bolt and Codex, then led the discussion on what agentic tools change about software work.",
    },
    {
      role: "1st place — Stearns Bank Hackathon",
      org: "CSB/SJU",
      when: "April 2024",
      note: "Prototyped an AI-powered customer-support assistant and designed accessibility features (translation and text-to-speech) to improve banking inclusivity.",
    },
  ],
  education: {
    school: "Saint John's University, Collegeville, MN",
    degree: "B.A. Computer Science, minor in Finance",
    when: "Expected May 2027",
    note: "Coursework includes Data Structures, Software Development, Computer Organization, Data Communication & Networks, Operating Systems, and Theory of Investments.",
  },
  certifications: [
    "Anthropic — Claude Code in Action (Aug 2026)",
    "Anthropic — Claude Code 101 and Claude 101 (Jun 2026)",
  ],
  skills: {
    "AI & agentic": [
      "Claude Code — skills, rules, subagents",
      "Context engineering",
      "Agent-assisted development workflows",
      "LLM APIs (Anthropic, OpenAI)",
    ],
    Languages: ["TypeScript", "JavaScript", "Python", "Java", "SQL"],
    Frameworks: ["React", "Next.js", "React Native / Expo", "Vite", "Node", "Fastify", "Three.js", "Prisma", "Tailwind CSS"],
    "Infra & tools": [
      "Supabase / Postgres",
      "Vercel",
      "Raspberry Pi",
      "Cloudflare Tunnel",
      "GitHub Actions",
      "Vitest",
      "JUnit",
      "Git",
      "Linux",
    ],
  },
  headshot: {
    /** Dylan supplies this file; until then Monogram renders. */
    src: "/about/headshot.jpg",
    alt: "Dylan Perrill",
  },
  credential: {
    label: "Stearns Bank Hackathon — 1st place",
    when: "April 2024",
    note: "AI customer-support assistant and accessibility features for banking, CSB/SJU.",
  },
} as const;
