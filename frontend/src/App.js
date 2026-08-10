import { useEffect, Suspense, lazy } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";

const Projects = lazy(() => import("@/pages/Projects"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const ProjectMap = lazy(() => import("@/pages/ProjectMap"));
const EmiCalculator = lazy(() => import("@/pages/EmiCalculator"));
const Concierge = lazy(() => import("@/pages/Concierge"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

// subtle mobile-only entry to the AI Property Concierge — never an auto popup
const FloatingConcierge = () => {
  const { pathname } = useLocation();
  if (pathname === "/concierge") return null;
  return (
    <Link
      to="/concierge"
      data-testid="floating-concierge-button"
      aria-label="Open the AI Property Concierge"
      className="md:hidden fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 bg-ember text-ink font-display font-semibold text-[10px] uppercase tracking-[0.2em] pl-3.5 pr-4 py-3 shadow-[0_12px_30px_-8px_rgba(232,93,34,0.55)]"
    >
      <Sparkles className="w-4 h-4" strokeWidth={2} />
      Concierge
    </Link>
  );
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
                <Route path="/project-map" element={<ProjectMap />} />
                <Route path="/emi-calculator" element={<EmiCalculator />} />
                <Route path="/concierge" element={<Concierge />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <FloatingConcierge />
        </BrowserRouter>
      </div>
    </ReactLenis>
  );
}

export default App;
