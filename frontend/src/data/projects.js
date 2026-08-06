const TEXTURES = [
  "https://images.unsplash.com/photo-1617713965103-9fda56c89fad?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxyYXclMjBjb25jcmV0ZSUyMHRleHR1cmUlMjBtaW5pbWFsfGVufDB8fHx8MTc4NjAyMjU4OHww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1579492450119-80542d516179?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwxfHxyYXclMjBjb25jcmV0ZSUyMHRleHR1cmUlMjBtaW5pbWFsfGVufDB8fHx8MTc4NjAyMjU4OHww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1637088059539-ad62cba57895?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGFyY2hpdGVjdHVyYWwlMjBtaW5pbWFsJTIwc2hhZG93fGVufDB8fHx8MTc4NjAyMjU4OHww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1632667680404-572c57873c21?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFyY2hpdGVjdHVyYWwlMjBtaW5pbWFsJTIwc2hhZG93fGVufDB8fHx8MTc4NjAyMjU4OHww&ixlib=rb-4.1.0&q=85",
];

const pad = (n) => String(n).padStart(2, "0");

export const projects = Array.from({ length: 19 }, (_, i) => {
  const n = i + 1;
  const status = n <= 13 ? "completed" : "ongoing";
  return {
    id: n,
    slug: `project-${pad(n)}`,
    index: pad(n),
    title: `Project ${pad(n)}`,
    status,
    location: "Ameenpur, Hyderabad",
    type: "Residential",
    year: "—",
    description:
      "Full project narrative, specifications and photography will be added here. This template is ready to receive the real content.",
    texture: TEXTURES[i % TEXTURES.length],
  };
});

export const projectStats = {
  total: projects.length,
  completed: projects.filter((p) => p.status === "completed").length,
  ongoing: projects.filter((p) => p.status === "ongoing").length,
};

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const getAdjacent = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};
