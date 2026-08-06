import { useEffect, Suspense, lazy } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";

const Projects = lazy(() => import("@/pages/Projects"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <div className="grain min-h-screen bg-ink text-bone relative">
        <a
          href="#main-content"
          data-testid="skip-to-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:bg-ember focus:text-ink focus:px-5 focus:py-3 focus:font-display focus:text-xs focus:uppercase focus:tracking-[0.2em]"
        >
          Skip to content
        </a>
        <div className="grid-lines hidden md:flex" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main id="main-content" className="relative z-10">
            <Suspense fallback={<div className="min-h-[100svh] bg-ink" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </ReactLenis>
  );
}

export default App;
