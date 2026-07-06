export interface ExperienceButton {
  label: string;
  /** Primary buttons render the circular arrow glyph; secondary do not. */
  withArrow: boolean;
}

export interface ExperienceCopy {
  eyebrow: string;
  /** Heading split into lines — each entry was a `<br>`-separated row. */
  titleLines: string[];
  subtitle: string;
  buttons: ExperienceButton[];
}

export interface StatCardContent {
  id: string;
  title: string;
  stat: string;
  description: string;
}

export interface HomeContent {
  hero: ExperienceCopy;
  cards: StatCardContent[];
  wave: ExperienceCopy;
  galaxy: ExperienceCopy;
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Spatial digital studio",
    titleLines: ["Websites designed like", "living celestial systems"],
    subtitle:
      "We build immersive digital environments where motion, narrative and engineering work as one polished experience.",
    buttons: [
      { label: "Enter the system", withArrow: true },
      { label: "View capabilities", withArrow: false },
    ],
  },
  cards: [
    {
      id: "interface",
      title: "Interface",
      stat: "3D Web",
      description:
        "Scroll-led particle systems, atmospheric depth and refined micro-interactions built for modern brands.",
    },
    {
      id: "identity",
      title: "Identity",
      stat: "Brand OS",
      description:
        "A visual language that extends beyond a template — typography, motion, spacing and digital behaviour aligned.",
    },
    {
      id: "performance",
      title: "Performance",
      stat: "Fast Core",
      description:
        "Premium visuals engineered with responsive rendering, lean components and production-grade structure.",
    },
  ],
  wave: {
    eyebrow: "Built beyond the first impression",
    titleLines: ["Every scroll becomes", "a guided cinematic reveal"],
    subtitle:
      "The experience is shaped as a journey: arrival, orbit, expansion and conversion. Each section earns attention instead of asking for it.",
    buttons: [
      { label: "Plan a build", withArrow: true },
      { label: "See the system", withArrow: false },
    ],
  },
  galaxy: {
    eyebrow: "A website with its own gravity",
    titleLines: ["Distinct, immersive and ready to be remembered."],
    subtitle:
      "A richer space-led interface with atmospheric particles, editorial hierarchy, premium glass surfaces and enough restraint to feel credible — not decorative.",
    buttons: [
      { label: "Start the conversation", withArrow: true },
      { label: "Explore the orbit", withArrow: false },
    ],
  },
};
