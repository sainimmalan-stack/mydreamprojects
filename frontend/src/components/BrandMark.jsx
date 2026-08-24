/**
 * Reg — the registered-trademark mark for the My Dream Projects® brand.
 * Subtle superscript treatment for display/typographic brand mentions.
 * Plain-string contexts (meta, alt, messages) use the ® character directly.
 */
export const Reg = () => (
  <sup aria-hidden="true" className="align-super text-[0.5em] leading-none font-normal">
    ®
  </sup>
);

export default Reg;
