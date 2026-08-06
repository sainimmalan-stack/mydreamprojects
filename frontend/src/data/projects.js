const pad = (n) => String(n).padStart(2, "0");

const MY_DREAM_NEST = {
  id: 1,
  slug: "my-dream-nest",
  index: "01",
  title: "My Dream Nest",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2020",
  floors: "G+5",
  description:
    "My Dream Nest represents the beginning of the My Dream Projects journey. Completed in 2020, the residential development combines practical planning, comfortable living spaces and a contemporary architectural approach in Ameenpur.",
  cover: "/assets/projects/my-dream-nest/elevation.jpg",
  floorPlan: {
    pdf: "/assets/projects/my-dream-nest/floor-plan.pdf",
    preview: "/assets/projects/my-dream-nest/floor-plan-p1.jpg",
    fileName: "My-Dream-Nest-Floor-Plan.pdf",
  },
};

const placeholders = Array.from({ length: 18 }, (_, i) => {
  const n = i + 2;
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

export const projects = [MY_DREAM_NEST, ...placeholders];

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
