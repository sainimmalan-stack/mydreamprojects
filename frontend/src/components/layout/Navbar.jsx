import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home", testid: "nav-home-link" },
  { to: "/projects", label: "Projects", testid: "nav-projects-link" },
  { to: "/about", label: "About", testid: "nav-about-link" },
  { to: "/contact", label: "Contact", testid: "nav-contact-link" },
];

export const Logo = ({ onClick }) => (
  <Link
    to="/"
    onClick={onClick}
    data-testid="nav-logo"
    className="flex items-center gap-3 group"
  >
    <img
      src="/assets/logo-icon.png"
      alt="My Dream Projects"
      className="h-8 md:h-9 w-auto group-hover:scale-105 transition-transform duration-300"
    />
    <span className="font-display font-semibold text-sm md:text-base tracking-[0.18em] uppercase text-bone">
      My Dream Projects
    </span>
  </Link>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        data-testid="site-header"
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
          scrolled
            ? "bg-ink/70 backdrop-blur-xl border-line"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-5 md:px-10 h-16 md:h-20">
          <Logo />
          <nav className="hidden md:flex items-center gap-10">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={l.testid}
                className={({ isActive }) =>
                  `nav-link text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                    isActive ? "active text-bone" : "text-concrete hover:text-bone"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              data-testid="nav-lets-talk-cta"
              className="hidden md:inline-flex items-center gap-2 bg-ember text-ink font-display font-semibold text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-bone transition-colors duration-400"
            >
              Let's Talk
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
            <button
              data-testid="mobile-menu-button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="md:hidden flex flex-col justify-center items-end gap-1.5 w-10 h-10"
            >
              <span className="block w-7 h-px bg-bone" />
              <span className="block w-5 h-px bg-ember" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-ink flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-20 border-b border-line">
              <Link to="/" onClick={() => setOpen(false)} data-testid="mobile-menu-logo">
                <img src="/assets/logo-full-dark.png" alt="My Dream Projects" className="h-14 w-auto" />
              </Link>
              <button
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="relative w-10 h-10 flex items-center justify-center"
              >
                <span className="absolute w-6 h-px bg-bone rotate-45" />
                <span className="absolute w-6 h-px bg-bone -rotate-45" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-6 gap-2">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={l.to}
                    data-testid={`mobile-${l.testid}`}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 py-3 font-display font-semibold uppercase tracking-tight text-4xl ${
                        isActive ? "text-ember" : "text-bone"
                      }`
                    }
                  >
                    <span className="text-xs text-concrete font-body tracking-[0.3em]">
                      0{i + 1}
                    </span>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="pt-8"
              >
                <Link
                  to="/contact"
                  data-testid="mobile-lets-talk-cta"
                  className="inline-flex items-center gap-3 bg-ember text-ink font-display font-semibold text-sm uppercase tracking-[0.2em] px-8 py-4"
                >
                  Let's Talk
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              </motion.div>
            </nav>
            <div className="px-6 pb-8 text-[10px] uppercase tracking-[0.3em] text-concrete">
              Ameenpur, Hyderabad — Est. 2020
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
