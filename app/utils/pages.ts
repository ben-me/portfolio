import type { m } from "~/paraglide/messages.js";

export const pages = [
  { key: "nav_home", route: "/" },
  { key: "nav_projects", route: "/projects" },
  { key: "nav_blog", route: "/blog" },
  { key: "nav_about", route: "/about" },
  { key: "nav_contact", route: "/contact" },
] as const satisfies ReadonlyArray<{ key: keyof typeof m; route: string }>;
