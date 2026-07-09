import { blue, purple } from "../utils";
import microsoft from "../assets/images/microsoft.png";
import mac from "../assets/images/mac.png";

export const experiences = [
  {
    logo: microsoft,
    name: "Microsoft",
    joined: "May'26",
    end: "Jul'26",
    title: "Software Engineering Intern",
    bio: [
      "Built a two-tier caching library (in-memory + Redis) in C#/.NET for the Xbox publishing pipeline, cutting P95 latency by 42%.",
      "Shipped a cache-operations developer portal with live inspection and P50/P95/P99 latency insights.",
      "Built an AI onboarding agent that auto-generates production-ready cache integration code.",
    ],
    color: blue,
  },
  {
    logo: mac,
    name: "IIT Jodhpur",
    joined: "Feb'26",
    end: "Present",
    title: "Undergraduate Researcher",
    bio: [
      "Developing physics-informed deep learning for cross-field MRI synthesis (3T → 7T).",
      "Generating high-fidelity 7T MRI from low-field scans while preserving clinical accuracy and avoiding hallucinated anatomy.",
      "Advised by Dr. Angshuman Paul.",
    ],
    color: purple,
  },
];
