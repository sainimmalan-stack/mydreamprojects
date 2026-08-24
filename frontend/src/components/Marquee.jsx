import FastMarquee from "react-fast-marquee";
import { Reg } from "./BrandMark";

const ITEMS = ["YOU DREAM", "WE BUILD", "MY DREAM PROJECTS", "EST. 2020", "HYDERABAD"];

export const Marquee = ({ className = "" }) => (
  <div
    data-testid="editorial-marquee"
    className={`relative border-y border-line py-5 md:py-8 overflow-hidden ${className}`}
  >
    <FastMarquee speed={28} gradient={false} pauseOnHover={false}>
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="font-display font-semibold uppercase tracking-tight text-5xl md:text-7xl lg:text-8xl text-outline whitespace-nowrap px-6 md:px-10">
            {item}
            {item === "MY DREAM PROJECTS" && <Reg />}
          </span>
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-ember shrink-0" />
        </span>
      ))}
    </FastMarquee>
  </div>
);

export default Marquee;
