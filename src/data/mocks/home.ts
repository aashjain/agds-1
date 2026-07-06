export interface ExperienceButton {
  label: string;
  withArrow: boolean;
}

export interface ExperienceCopy {
  eyebrow: string;
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
    eyebrow: "AG Designs Studio",
    titleLines: ["Marketing systems", "built like orbits"],
    subtitle:
      "A digital marketing studio shaping brands through strategy, design, content, search, media and measurable growth.",
    buttons: [
      { label: "View services", withArrow: true },
      { label: "Start a brief", withArrow: false },
    ],
  },
  cards: [
    {
      id: "strategy",
      title: "Brand Gravity",
      stat: "Strategy",
      description:
        "Positioning, campaign thinking and digital direction that give every brand a clear centre of pull.",
    },
    {
      id: "content",
      title: "Signal System",
      stat: "Content",
      description:
        "Social-first storytelling, design language and platform-ready assets built to move with intent.",
    },
    {
      id: "performance",
      title: "Growth Orbit",
      stat: "SEO + Ads",
      description:
        "Search, paid media and optimisation loops designed around visibility, conversion and sustained momentum.",
    },
  ],
  wave: {
    eyebrow: "From attention to action",
    titleLines: ["Every channel", "aligned to one trajectory"],
    subtitle:
      "We connect creative direction with performance marketing, so campaigns look refined, feel consistent and move the right audience closer to enquiry.",
    buttons: [
      { label: "Our services", withArrow: true },
      { label: "Contact us", withArrow: false },
    ],
  },
  galaxy: {
    eyebrow: "A complete marketing ecosystem",
    titleLines: ["Strategy, creative, media and growth working as one."],
    subtitle:
      "For brands that need more than isolated posts, AG Designs Studio builds the full digital architecture — from identity and content to campaigns, SEO, websites and conversion-led marketing.",
    buttons: [
      { label: "Plan a project", withArrow: true },
      { label: "Read insights", withArrow: false },
    ],
  },
};
