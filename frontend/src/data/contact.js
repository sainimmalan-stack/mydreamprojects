export const PHONE_SAI = { name: "Nimmala Sai", display: "+91 77804 29845", tel: "tel:+917780429845" };
export const PHONE_AKHIL = { name: "Kotapati Akhil", display: "+91 95660 67922", tel: "tel:+919566067922" };
export const WHATSAPP_NUMBER = "917780429845";
export const WHATSAPP_NUMBER_AKHIL = "919566067922";
export const WHATSAPP_GREETING =
  "Hello My Dream Projects, I’m interested in knowing more about your residential projects in Ameenpur.";
export const MAPS_URL =
  "https://www.google.com/maps?q=G8MG+VFG+MY+DREAM+PROJECTS%2C+Ameenpur+Coco+Cola+Road%2C+Narendra+Nagar+Colony%2C+Ameenpur%2C+Miyapur%2C+Hyderabad%2C+Telangana+502033&ftid=0x3bcb8d6d4959d47b%3A0xe454901ec9e2e003";
// Office coordinates decoded from the plus code (G8MG+VFG → 7J9WG8MG+VFG)
// embedded in the office's own Google Maps place link above — the exact
// configured office destination, not a guessed location.
export const OFFICE = {
  name: "My Dream Projects",
  kind: "Office / Studio",
  address: "Ameenpur, Hyderabad",
  lat: 17.5346875,
  lng: 78.3262031,
};
export const COMPANY_EMAIL = {
  display: "adminmydreamprojects@gmail.com",
  mailto: "mailto:adminmydreamprojects@gmail.com",
};

export const waLinkTo = (number, message) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const founderIntroMessage = (firstName) =>
  `Hello ${firstName}, I came across My Dream Projects and would like to talk to you about your projects.`;

export const waLink = (message) => waLinkTo(WHATSAPP_NUMBER, message);
