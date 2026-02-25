/**
 * Hace scroll a la sección indicada por el hash. Debe usarse en onClick de enlaces
 * para que siempre se haga scroll aunque la URL ya tenga ese hash (ej. click en "About" estando en /#about).
 */
export function scrollToHashOnClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  const id = href.slice(1);
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  window.history.replaceState(undefined, "", href);
}
