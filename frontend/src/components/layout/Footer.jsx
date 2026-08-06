import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => (
  <footer data-testid="site-footer" className="relative border-t border-line bg-ink">
    <div className="max-w-[1600px] mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-8">
      <div className="grid grid-cols-12 gap-8 md:gap-6 pb-16 md:pb-24">
        <div className="col-span-12 md:col-span-6">
          <p className="font-display font-bold uppercase tracking-tight text-4xl md:text-6xl leading-[0.95] text-bone">
            You Dream.
            <br />
            <span className="text-ember">We Build.</span>
          </p>
        </div>
        <div className="col-span-6 md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-concrete mb-5">Sitemap</p>
          <ul className="space-y-3">
            {[
              { to: "/", label: "Home", id: "footer-home-link" },
              { to: "/projects", label: "Projects", id: "footer-projects-link" },
              { to: "/about", label: "About", id: "footer-about-link" },
              { to: "/contact", label: "Contact", id: "footer-contact-link" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={l.id}
                  className="text-sm text-bone/70 hover:text-ember transition-colors duration-300"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-6 md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-concrete mb-5">Studio</p>
          <p className="text-sm text-bone/70 leading-relaxed">
            Ameenpur, Hyderabad
            <br />
            Telangana, India
          </p>
          <Link
            to="/contact"
            data-testid="footer-lets-talk-link"
            className="inline-flex items-center gap-1.5 mt-5 text-sm text-ember hover:text-bone transition-colors duration-300"
          >
            Start a project
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6 border-t border-line">
        <p className="text-[10px] uppercase tracking-[0.3em] text-concrete">
          © {new Date().getFullYear()} My Dream Projects
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-concrete">
          Nimmala Sai · Kotapati Akhil
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
