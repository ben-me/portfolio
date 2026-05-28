export const pages = [
  { key: "nav_home", route: "/", name: "index" },
  { key: "nav_projects", route: "/projects", name: "projects" },
  { key: "nav_about", route: "/about", name: "about" },
  { key: "nav_contact", route: "/contact", name: "contact" },
] as const satisfies ReadonlyArray<{ key: string; route: string; name: string }>;
