import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div data-testid="contact-page" className="pt-28 md:pt-40">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 pb-24 md:pb-40">
        <div className="grid grid-cols-12 gap-10 md:gap-6">
          <div className="col-span-12 md:col-span-5">
            <Reveal className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">
              <p>Contact</p>
            </Reveal>
            <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-[12vw] md:text-[5.5vw] text-bone">
              <span className="block overflow-hidden">
                <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: EASE }}>
                  Let's talk
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block text-concrete" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.25, ease: EASE }}>
                  about your plot.
                </motion.span>
              </span>
            </h1>
            <Reveal delay={0.3} className="mt-12 md:mt-20 space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-concrete mb-3">Studio</p>
                <p className="flex items-start gap-2.5 text-sm text-bone/80 leading-relaxed">
                  <MapPin className="w-4 h-4 text-ember mt-0.5 shrink-0" strokeWidth={1.5} />
                  Ameenpur, Hyderabad, Telangana
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-concrete mb-3">Hours</p>
                <p className="text-sm text-bone/80">Mon — Sat, 10:00 — 19:00</p>
              </div>
              <p className="text-xs text-concrete leading-relaxed max-w-xs border-l border-ember pl-4">
                Phone and email details will be added here. The form is a design preview for now.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Reveal delay={0.2}>
              <form data-testid="contact-form" onSubmit={onSubmit} className="space-y-10 md:pt-24">
                <div className="grid sm:grid-cols-2 gap-10">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-[0.35em] text-concrete mb-1">
                      Name
                    </label>
                    <input id="contact-name" data-testid="contact-name-input" type="text" placeholder="Your full name" className="field-input" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-[10px] uppercase tracking-[0.35em] text-concrete mb-1">
                      Phone
                    </label>
                    <input id="contact-phone" data-testid="contact-phone-input" type="tel" placeholder="+91" className="field-input" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-[0.35em] text-concrete mb-1">
                    Email
                  </label>
                  <input id="contact-email" data-testid="contact-email-input" type="email" placeholder="you@example.com" className="field-input" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-[0.35em] text-concrete mb-1">
                    Your dream
                  </label>
                  <textarea
                    id="contact-message"
                    data-testid="contact-message-input"
                    rows={4}
                    placeholder="Plot location, size, the home you imagine…"
                    className="field-input resize-none"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <button
                    type="submit"
                    data-testid="contact-submit-button"
                    className="group inline-flex items-center gap-3 bg-ember text-ink font-display font-semibold text-xs uppercase tracking-[0.2em] px-8 py-5 hover:bg-bone transition-colors duration-400"
                  >
                    Send Enquiry
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
                  </button>
                  {sent && (
                    <p data-testid="contact-form-note" className="text-xs text-ember">
                      Design preview — submissions not wired yet.
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
