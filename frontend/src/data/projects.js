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
