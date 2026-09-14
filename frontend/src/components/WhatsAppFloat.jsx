import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { projects } from "../data/projects";
import { waLink } from "../data/contact";

const PROMPT_KEY = "mdp-wa-prompt-seen";

/**
 * WhatsAppFloat — site-wide enquiry button (bottom-right, every page).
 * Context-aware: on a project page the pre-filled message names that project;
 * elsewhere it sends a generic enquiry. A subtle "Chat with us" prompt appears
 * once per session, then tucks itself away — the button always stays.
 */
export const WhatsAppFloat = () => {
  const { pathname } = useLocation();
  const [promptOpen, setPromptOpen] = useState(false);
  const hideTimer = useRef(null);

  const match = pathname.match(/^\/projects\/([a-z0-9-]+)/);
  const project = match ? projects.find((p) => p.slug === match[1]) : null;
  const url = waLink(
    project
      ? `Hello My Dream Projects®, I'm interested in ${project.title} at Ameenpur, Hyderabad. Please share price and availability details.`
      : "Hello My Dream Projects®, I'm interested in your residential projects in Ameenpur, Hyderabad. Please share details."
  );

  // one gentle prompt per session: appears shortly after arrival,
  // then minimises on its own — the floating button stays visible
  useEffect(() => {
    if (sessionStorage.getItem(PROMPT_KEY)) return undefined;
    const show = setTimeout(() => {
      setPromptOpen(true);
      sessionStorage.setItem(PROMPT_KEY, "1");
      hideTimer.current = setTimeout(() => setPromptOpen(false), 6000);
    }, 2800);
    return () => {
      clearTimeout(show);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      data-testid="whatsapp-float"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 flex items-end gap-3"
    >
      <AnimatePresence>
        {promptOpen && (
          <motion.div
            data-testid="whatsapp-float-prompt"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 bg-coal/95 backdrop-blur-md border border-line px-4 py-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-float-prompt-link"
              className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-bone hover:text-ember transition-colors duration-300"
            >
              Chat with us on WhatsApp
            </a>
            <button
              type="button"
              aria-label="Dismiss WhatsApp prompt"
              data-testid="whatsapp-float-prompt-close"
              onClick={() => setPromptOpen(false)}
              className="text-concrete hover:text-bone transition-colors duration-300 -mr-1"
            >
              <X className="w-3 h-3" strokeWidth={2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          project
            ? `Enquire about ${project.title} on WhatsApp`
            : "Chat with us on WhatsApp"
        }
        data-testid="whatsapp-float-button"
        className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-ember text-ink shadow-[0_16px_40px_-10px_rgba(232,93,34,0.55)] hover:bg-bone transition-[background-color,transform] duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember focus-visible:outline-offset-2"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.8} />
      </a>
    </div>
  );
};

export default WhatsAppFloat;
