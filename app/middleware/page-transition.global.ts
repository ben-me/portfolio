export const pageOrder = [
  { label: "Home", route: "/" },
  { label: "Projects", route: "/projects" },
  { label: "Blog", route: "/blog" },
  { label: "About", route: "/about" },
  { label: "Contact", route: "/contact" },
];

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.meta.pageTransition === false)
    return;

  const crossesHome = (from.path === "/") !== (to.path === "/");
  if (crossesHome) {
    to.meta.pageTransition = false;
    from.meta.pageTransition = false;
    return;
  }

  const toIdx = pageOrder.findIndex(p => p.route === to.path);
  const fromIdx = pageOrder.findIndex(p => p.route === from.path);
  const name = toIdx < fromIdx ? "slide-right" : "slide-left";
  to.meta.pageTransition = { name };
  from.meta.pageTransition = { name };
});
