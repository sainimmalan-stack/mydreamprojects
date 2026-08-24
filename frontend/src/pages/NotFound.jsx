import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import useSeo from "../hooks/useSeo";

export default function NotFound() {
  useSeo({
    title: "Page Not Found | My Dream Projects®",
    description: "The page you're looking for couldn't be found. Explore My Dream Projects® residential developments in Ameenpur, Hyderabad.",
  });

  return (
    <div
      data-testid="not-found-page"
      className="min-h-[100svh] flex flex-col items-center justify-center text-center px-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-display font-bold tracking-tighter leading-none text-[34vw] md:text-[16vw] text-outline select-none">
          404
        </p>
        <h1 className="font-display font-semibold uppercase tracking-tight text-2xl md:text-4xl text-bone -mt-4 md:-mt-10">
          This one isn't in the plan.
        </h1>
        <p className="text-sm text-concrete mt-5">
          The page you're looking for couldn't be found.
        </p>
        <Link
          to="/"
          data-testid="not-found-home-button"
          className="group inline-flex items-center gap-3 bg-ember text-ink font-display font-semibold text-[11px] uppercase tracking-[0.2em] px-8 py-4 mt-10 hover:bg-bone transition-colors duration-400"
        >
          Back to Home
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
        </Link>
      </motion.div>
    </div>
  );
}
