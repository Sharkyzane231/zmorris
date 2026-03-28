import { Routes, Route, useLocation } from "react-router";
import { useEffect } from "react";
import { ThemeProvider } from "./hooks/useTheme";
import { Topbar } from "./components/Topbar";
import { Footer } from "./components/Footer";
import Home from "./routes/home";
import Projects from "./routes/projects";
import Gallery from "./routes/gallery";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Topbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}
