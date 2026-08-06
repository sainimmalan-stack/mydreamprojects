import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin, Phone, MessageCircle, Navigation } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

import { PHONE_SAI, PHONE_AKHIL, WHATSAPP_GREETING, MAPS_URL, waLink } from "../data/contact";
import useSeo from "../hooks/useSeo";

const PROJECT_OPTIONS = [
  "My Dream Aurelia",
  "My Dream Elysium",
  "My Dream Aura",
  "My Dream Echelon",
  "My Dream Vale",
  "My Dream Ivy",
  "General Enquiry",
];

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

const QuickActions = () => (
  <div data-testid="contact-quick-actions" className="grid grid-cols-3 gap-3 md:hidden mt-10">
    <a
      href={PHONE_SAI.tel}
      data-testid="quick-call-link"
      className="flex flex-col items-center gap-2.5 border border-line py-5 text-bone hover:border-ember/50 transition-colors duration-400"
    >
      <Phone className="w-4 h-4 text-ember" strokeWidth={1.5} />
      <span className="text-[9px] uppercase tracking-[0.25em]">Call</span>
    </a>
    <a
      href={waLink(WHATSAPP_GREETING)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="quick-whatsapp-link"
      className="flex flex-col items-center gap-2.5 border border-line py-5 text-bone hover:border-ember/50 transition-colors duration-400"
    >
      <MessageCircle className="w-4 h-4 text-ember" strokeWidth={1.5} />
      <span className="text-[9px] uppercase tracking-[0.25em]">WhatsApp</span>
    </a>
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="quick-directions-link"
      className="flex flex-col items-center gap-2.5 border border-line py-5 text-bone hover:border-ember/50 transition-colors duration-400"
    >
      <Navigation className="w-4 h-4 text-ember" strokeWidth={1.5} />
      <span className="text-[9px] uppercase tracking-[0.25em]">Directions</span>
    </a>
  </div>
);

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", project: "General Enquiry", message: "" });
  const [error, setError] = useState("");

  useSeo({
    title: "Contact My Dream Projects | Ameenpur, Hyderabad",
    description:
      "Talk to My Dream Projects about residential developments in Ameenpur, Hyderabad — call, WhatsApp or visit our two-level container office.",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("Please fill in your name, phone number and message.");
      return;
    }
    setError("");
    const message = [
      "Hello My Dream Projects,",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Interested In: ${form.project}`,
      `Message: ${form.message.trim()}`,
    ].join("\n");
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div data-testid="contact-page" className="pt-28 md:pt-40">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 pb-24 md:pb-40">
        <header className="pb-14 md:pb-24">
          <Reveal className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">
            <p>Contact</p>
          </Reveal>
          <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-[10.5vw] md:text-[6.2vw] text-bone">
            <span className="block overflow-hidden">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: EASE }}>
                Let's build something
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block text-concrete" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.25, ease: EASE }}>
                together.
              </motion.span>
            </span>
          </h1>
          <Reveal delay={0.35} className="mt-8 max-w-xl">
            <p className="text-sm md:text-base text-bone/75 leading-relaxed">
              Planning your next home? Talk to us about our current developments, upcoming
              projects or visit us at the My Dream Projects office in Ameenpur.
            </p>
          </Reveal>
          <QuickActions />
        </header>

        <div className="grid grid-cols-12 gap-6 border-t border-line pt-14 md:pt-20">
          <div className="col-span-12 md:col-span-5 space-y-14 md:space-y-16">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-concrete mb-6">Contact Details</p>
              <p className="font-display font-semibold uppercase tracking-tight text-xl text-bone mb-6">
                My Dream Projects
              </p>
              <div className="space-y-6">
                {[PHONE_SAI, PHONE_AKHIL].map((p) => (
                  <div key={p.tel}>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-concrete mb-1.5">{p.name}</p>
                    <a
                      href={p.tel}
                      data-testid={p.name === "Nimmala Sai" ? "contact-call-sai" : "contact-call-akhil"}
                      className="font-display text-2xl md:text-3xl tracking-tight text-bone hover:text-ember transition-colors duration-300"
                    >
                      {p.display}
                    </a>
                  </div>
                ))}
              </div>
              <a
                href={waLink(WHATSAPP_GREETING)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="whatsapp-chat-link"
                className="group inline-flex items-center gap-3 mt-10 border border-ember/60 text-ember font-display font-semibold text-[11px] uppercase tracking-[0.25em] px-7 py-4 hover:bg-ember hover:text-ink transition-[color,background-color] duration-400"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Chat on WhatsApp
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-400" strokeWidth={2} />
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-concrete mb-6">Visit Our Office</p>
              <p className="flex items-start gap-2.5 text-sm text-bone/80 leading-relaxed max-w-sm">
                <MapPin className="w-4 h-4 text-ember mt-0.5 shrink-0" strokeWidth={1.5} />
                Come meet us at our two-level container office in Ameenpur and talk to us about
                our projects.
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="get-directions-link"
                className="group inline-flex items-center gap-3 mt-8 border border-bone/25 text-bone font-display font-semibold text-[11px] uppercase tracking-[0.25em] px-7 py-4 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
              >
                Get Directions
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-400" strokeWidth={2} />
              </a>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Reveal delay={0.15}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-concrete mb-8">Enquiry Form</p>
              <form data-testid="contact-form" onSubmit={onSubmit} className="space-y-10">
                <div className="grid sm:grid-cols-2 gap-10">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-[0.35em] text-concrete mb-1">
                      Name *
                    </label>
                    <input id="contact-name" data-testid="contact-name-input" type="text" value={form.name} onChange={set("name")} placeholder="Your full name" className="field-input" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-[10px] uppercase tracking-[0.35em] text-concrete mb-1">
                      Phone Number *
                    </label>
                    <input id="contact-phone" data-testid="contact-phone-input" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91" className="field-input" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-project" className="block text-[10px] uppercase tracking-[0.35em] text-concrete mb-1">
                    Project Interested In
                  </label>
                  <select
                    id="contact-project"
                    data-testid="contact-project-select"
                    value={form.project}
                    onChange={set("project")}
                    className="field-input appearance-none cursor-pointer"
                  >
                    {PROJECT_OPTIONS.map((o) => (
                      <option key={o} value={o} className="bg-ink text-bone">{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-[0.35em] text-concrete mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    data-testid="contact-message-input"
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us about the home you imagine…"
                    className="field-input resize-none"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <button
                    type="submit"
                    data-testid="contact-submit-button"
                    className="group inline-flex items-center gap-3 bg-ember text-ink font-display font-semibold text-xs uppercase tracking-[0.2em] px-8 py-5 hover:bg-bone transition-colors duration-400"
                  >
                    Send Enquiry
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
                  </button>
                  {error && (
                    <p data-testid="contact-form-error" className="text-xs text-ember">{error}</p>
                  )}
                  {!error && (
                    <p className="text-xs text-concrete max-w-[240px] leading-relaxed">
                      Sends your enquiry to us on WhatsApp — no details are stored.
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
