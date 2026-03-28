import { NavLink } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { useScrollHideTopbar } from "../hooks/useScrollHideTopbar";

export function Topbar() {
  const hidden = useScrollHideTopbar();

  return (
    <header className={`topbar${hidden ? " hidden" : ""}`}>
      <ThemeToggle />
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
      </nav>
    </header>
  );
}
