/** Primary site navigation — consumed by the header on every page. */

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Services", href: "/our-services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
];
