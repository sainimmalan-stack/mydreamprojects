import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => (
  <footer data-testid="site-footer" className="relative border-t border-line bg-ink">
    <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12 md:gap-y-0 pb-10 md:pb-14">
        <div className="col-span-2 md:col-span-6 flex justify-center md:justify-start">
          <img
            src="/assets/logo-full-dark.png"
            alt="My Dream Projects — You Dream, We Build"
            data-testid="footer-logo"
            className="w-40 md:w-48 h-auto"
          />
        </div>
        <div className="col-span-1 md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-concrete mb-6">Sitemap</p>
          <ul className="space-y-3.5">
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
        <div className="col-span-1 md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-concrete mb-6">Our Office</p>
          <p className="text-sm text-bone/70 leading-relaxed">
            Ameenpur, Hyderabad
            <br />
            Telangana, India
          </p>
          <div className="mt-6 space-y-3.5">
            <a
              href="tel:+917780429845"
              data-testid="footer-call-sai"
              className="block text-sm text-bone/70 hover:text-ember transition-colors duration-300"
            >
              +91 77804 29845
            </a>
            <a
              href="tel:+919566067922"
              data-testid="footer-call-akhil"
              className="block text-sm text-bone/70 hover:text-ember transition-colors duration-300"
            >
              +91 95660 67922
            </a>
          </div>
          <a
            href="https://maps.app.goo.gl/oPvjJJn6EHedKRz89?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-directions-link"
            className="inline-flex items-center gap-1.5 mt-6 text-sm text-ember hover:text-bone transition-colors duration-300"
          >
            Get Directions
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pt-6 border-t border-line">
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
