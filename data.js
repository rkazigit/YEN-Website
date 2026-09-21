/* ==========================================================
   YEN — everything you'll edit lives in this one file.
   Three sections: 1) settings  2) opportunities  3) projects
   Edit the words inside the "quotes". Keep the commas and brackets.
   ========================================================== */


/* ---------- 1) SETTINGS ---------- */
window.YEN_CONFIG = {
  // Your contact email (shown in the footer, and used by the sign-up form
  // until you connect a form service).
  email: "hello@yourdomain.com",

  // Optional: paste a Formspree form URL here, e.g. "https://formspree.io/f/abcdwxyz"
  // Leave empty and the Send button will open the visitor's email app instead.
  formEndpoint: ""
};


/* ---------- 2) OPPORTUNITIES BOARD ----------
   To add one: copy a { ... } block, paste it under the last one, and put a comma between blocks.
   category must be exactly one of:
     "Hackathons", "Scholarships", "Internships", "Competitions",
     "Youth programs", "Research", "Networking events", "Free courses"
   deadline: "YYYY-MM-DD" or null (for ongoing). Listings vanish automatically after the deadline.
   cost: optional, like "Free". link: the web address for details, or "".
   The entries below are EXAMPLES. Delete the line  example: true  when you replace them with real ones.
*/
window.YEN_OPPORTUNITIES = [
  {
    category: "Hackathons",
    title: "Weekend hackathon for high school students",
    organization: "Add the organizer's name",
    description: "Build a working project in a weekend with a team. Beginners welcome.",
    deadline: null,
    cost: "Free",
    link: "",
    example: true
  },
  {
    category: "Scholarships",
    title: "Entrepreneurship scholarship for first-year students",
    organization: "Add the organizer's name",
    description: "Say who can apply, what it covers and what the application needs.",
    deadline: "2027-03-01",
    cost: "",
    link: "",
    example: true
  },
  {
    category: "Internships",
    title: "Summer internship in finance or technology",
    organization: "Add the company's name",
    description: "Say what students will work on and which grade or age it is open to.",
    deadline: "2027-01-31",
    cost: "",
    link: "",
    example: true
  },
  {
    category: "Competitions",
    title: "Youth business pitch competition",
    organization: "Add the organizer's name",
    description: "Pitch an idea to a panel of judges. Say what the prizes are and how to enter.",
    deadline: "2026-12-15",
    cost: "Free",
    link: "",
    example: true
  },
  {
    category: "Free courses",
    title: "Intro to investing and personal finance",
    organization: "Add the provider's name",
    description: "A self-paced course covering budgeting, saving and investing basics.",
    deadline: null,
    cost: "Free",
    link: "",
    example: true
  },
  {
    category: "Networking events",
    title: "Student founders meetup",
    organization: "Add the organizer's name",
    description: "Meet other young builders and mentors. Add the date, place and how to register.",
    deadline: null,
    cost: "Free",
    link: "",
    example: true
  }
];


/* ---------- 3) "BUILT BY YEN" PROJECTS ----------
   type: e.g. "App", "Business", "Research", "Community initiative",
         "Investment project", "Website", "Social enterprise".
   Delete the line  example: true  for real projects. Make the list empty [ ] to show
   a "first projects coming soon" message instead.
*/
window.YEN_PROJECTS = [
  {
    type: "App",
    title: "Project name goes here",
    description: "One or two sentences on what it does and who it helps.",
    builtBy: "Member name(s)",
    link: "",
    example: true
  },
  {
    type: "Business",
    title: "Student-run business name",
    description: "What the business offers and what problem it solves.",
    builtBy: "Member name(s)",
    link: "",
    example: true
  },
  {
    type: "Community initiative",
    title: "Community project name",
    description: "What the group set out to change in their neighbourhood and what happened.",
    builtBy: "Member name(s)",
    link: "",
    example: true
  }
];
