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
      id: "website-development",
      title: "Digital Presence",
      stat: "Website Development",
      description:
        "Conversion-focused websites shaped around experience, clarity and business intent.",
    },
    {
      id: "social-media-marketing",
      title: "Community Orbit",
      stat: "Social Media Marketing",
      description:
        "Platform-ready campaigns, calendars and creative systems built for consistent brand visibility.",
    },
    {
      id: "seo",
      title: "Search Momentum",
      stat: "SEO",
      description:
        "Technical, on-page and content-led search work designed to improve discovery and qualified traffic.",
    },
    {
      id: "branding-designing",
      title: "Visual Gravity",
      stat: "Branding & Designing",
      description:
        "Identity, layouts and design language that make every touchpoint feel intentional and recognisable.",
    },
    {
      id: "content-writing",
      title: "Signal Language",
      stat: "Content Writing",
      description:
        "Clear, persuasive content for websites, campaigns, blogs and social communication.",
    },
    {
      id: "strategy-planning",
      title: "Growth Architecture",
      stat: "Strategy & Planning",
      description:
        "Marketing direction, campaign planning and channel roadmaps aligned to measurable outcomes.",
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
