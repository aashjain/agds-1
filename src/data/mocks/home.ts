/**
 * Homepage copy for AG Designs Studio. Passed into the view via props; never
 * imported directly into a component (see component-conventions.md → Data
 * rules).
 */

import { services, type ServiceEntry } from "./services";

export interface ExperienceButton {
  label: string;
  href: string;
  /** Primary buttons render the circular arrow glyph; secondary do not. */
  withArrow: boolean;
}

export interface ExperienceCopy {
  eyebrow: string;
  /** Heading split into lines. */
  titleLines: string[];
  subtitle: string;
  buttons: ExperienceButton[];
}

export interface SignalStep {
  label: string;
  description: string;
}

export interface HomeContent {
  hero: ExperienceCopy;
  services: Omit<ExperienceCopy, "buttons"> & { items: ServiceEntry[] };
  signal: ExperienceCopy & { steps: SignalStep[] };
  ecosystem: ExperienceCopy;
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "AG Designs Studio — Digital Marketing",
    titleLines: ["Marketing built with", "its own gravity"],
    subtitle:
      "We design the systems behind visibility — brand, content, search and paid media working as one connected orbit around your growth.",
    buttons: [
      { label: "Start a project", href: "/contact-us", withArrow: true },
      { label: "Explore our services", href: "/our-services", withArrow: false },
    ],
  },
  services: {
    eyebrow: "What we do",
    titleLines: ["Every channel,", "one orbit"],
    subtitle:
      "Eight disciplines planned and run as a single system — so creative, content and media reinforce each other instead of competing for budget.",
    items: services,
  },
  signal: {
    eyebrow: "How we work",
    titleLines: ["Creative direction,", "measured to the click"],
    subtitle:
      "Every campaign we run is a signal you can trace — from the first concept to the dashboard. We connect brand work to pipeline with clear attribution, honest reporting and a testing rhythm that never stops.",
    steps: [
      {
        label: "Plan",
        description: "One strategy across brand, content and media.",
      },
      {
        label: "Launch",
        description: "Campaigns shipped in coordinated waves, not silos.",
      },
      {
        label: "Prove",
        description: "Attribution and reporting tied to real revenue.",
      },
    ],
    buttons: [
      { label: "Book a consultation", href: "/contact-us", withArrow: true },
    ],
  },
  ecosystem: {
    eyebrow: "The full ecosystem",
    titleLines: ["Your brand, at the centre of everything we build"],
    subtitle:
      "Strategy, creative, content, search and media — run by one team, on one plan, reported in one place. That is AG Designs Studio.",
    buttons: [
      { label: "Talk to us", href: "/contact-us", withArrow: true },
      { label: "View all services", href: "/our-services", withArrow: false },
    ],
  },
};
