export interface ArticleSection {
  title: string;
  paragraphs: string[];
}

export interface PhotoEntry {
  src: string;
  caption: string;
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  featured?: boolean;
  images?: string[];
  photos?: PhotoEntry[];
  article?: ArticleSection[];
}

export const projects: Project[] = [
  {
    id: "transducer",
    title: "Underwater Transducer",
    description:
      "Designed and built a high-efficiency underwater transducer, optimised for acoustic performance and minimal energy loss in submerged conditions.",
    image: "/images/projects/transducer/transducer01.jpg",
    alt: "Underwater Transducer",
    tags: ["Acoustics", "Engineering", "Electronics"],
    featured: true,
    images: [
      "/images/projects/transducer/transducer01.jpg",
      "/images/projects/transducer/transducer02.jpg",
      "/images/projects/transducer/transducer03.jpg",
    ],
    article: [
      {
        title: "Overview",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        ],
      },
      {
        title: "Design Process",
        paragraphs: [
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        ],
      },
      {
        title: "Results",
        paragraphs: [
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
        ],
      },
    ],
  },
  {
    id: "bracket",
    title: "Structural Bracket",
    description:
      "CAD-designed bracket with FEA optimisation in ANSYS. Engineered to withstand 3 kN upward and 4 kN downward loading while minimising material use.",
    image: "/images/projects/structural bracket/bracket01.png",
    alt: "Structural Bracket",
    tags: ["CAD", "ANSYS", "FEA", "Structural"],
    article: [
      {
        title: "Overview",
        paragraphs: [
          "A load-bearing bracket designed in CAD and validated through finite element analysis in ANSYS. The brief required the component to survive 3 kN upward and 4 kN downward loading while keeping mass to a minimum.",
        ],
      },
      {
        title: "Design Process",
        paragraphs: [
          "Initial geometry was modelled around the mounting constraints and load paths identified from the brief. Several iterations were run through static structural analysis in ANSYS, with material removed in low-stress regions between each pass.",
          "Stress concentrations around the fixing holes were addressed through fillet radii, and wall thicknesses were tuned to keep peak von Mises stress within acceptable limits across both load cases.",
        ],
      },
      {
        title: "Results",
        paragraphs: [
          "The final design met both load requirements with a comfortable factor of safety while achieving a meaningful reduction in mass compared to the initial solid geometry. The FEA-driven approach allowed material to be removed with confidence rather than guesswork.",
        ],
      },
    ],
  },
  {
    id: "box",
    title: "Ball Transport Box",
    description:
      "3D printed mechanism designed to autonomously move a ball from one end of an enclosure to the other, exploring passive mechanical motion.",
    image: "/images/projects/boxproject/box01.jpg",
    alt: "Ball Transport Box",
    tags: ["3D Printing", "Mechanism Design"],
    article: [
      {
        title: "Overview",
        paragraphs: [
          "A self-contained 3D printed box that moves a ball from one end to the other without any electronics or external input. The project was an exercise in passive mechanical motion \u2014 using only geometry, gravity, and stored energy to drive the sequence.",
        ],
      },
      {
        title: "Design Process",
        paragraphs: [
          "The mechanism was designed around a series of ramps, gates, and a spring-loaded release that trips as the ball reaches a set position. Each stage was modelled in CAD and printed iteratively, with tolerances adjusted between runs to ensure reliable actuation.",
          "Getting the timing of the release consistent required careful tuning of the spring preload and the ramp angle feeding into it. The enclosure was designed to make the internal mechanism visible from the outside.",
        ],
      },
      {
        title: "Results",
        paragraphs: [
          "The final version reliably transports the ball end-to-end in a single smooth sequence. The project demonstrated how much mechanical work can be done through careful geometry alone, without any powered components.",
        ],
      },
    ],
  },
  {
    id: "multitool",
    title: "SLS Multitool Keychain",
    description:
      "A compact, non-movable multitool keychain produced via selective laser sintering in aluminium. Designed for everyday carry with multiple integrated functions.",
    image: "/images/projects/sls multitool/multitool01.jpg",
    alt: "Multitool Keychain",
    tags: ["SLS", "Aluminium", "CAD"],
    article: [
      {
        title: "Overview",
        paragraphs: [
          "A compact multitool keychain produced via selective laser sintering in aluminium. The design integrates multiple functions into a single rigid body \u2014 no moving parts, no assembly required. Built to sit on a keyring and survive daily carry.",
        ],
      },
      {
        title: "Design Process",
        paragraphs: [
          "The challenge was fitting useful tool geometry into a form factor small enough to be unobtrusive on a keychain. Each function had to share material with the others, so the design was developed as a single interlocking profile rather than a collection of separate tools bolted together.",
          "SLS in aluminium was chosen for its ability to produce fine detail and sharp edges without the constraints of traditional machining or FDM printing. Several iterations were produced, with edge geometry and ergonomics refined between runs based on handling feedback.",
        ],
      },
      {
        title: "Results",
        paragraphs: [
          "The final part is lightweight, durable, and comfortably fits alongside keys without snagging. The SLS process produced clean, consistent surfaces with no post-processing required beyond a light media blast.",
        ],
      },
    ],
  },
  {
    id: "keyboard",
    title: "Keyboard Enhancements",
    description:
      "Hotswap modded a keyboard by hand-soldering Mill-Max sockets, allowing switches to be swapped without desoldering. Improved feel and repairability.",
    image: "/images/projects/keyboard enhancements/keyboard01.jpg",
    alt: "Keyboard Enhancements",
    tags: ["Soldering", "Hotswap", "Keyboards"],
  },
  {
    id: "mouse",
    title: "Mouse Repairs & Enhancements",
    description:
      "Repaired and upgraded mice by replacing worn microswitches and scroll wheel encoders, restoring click feel and extending hardware life.",
    image: "/images/projects/mouse enhancements/mouse1.jpg",
    alt: "Mouse Repairs",
    tags: ["Soldering", "Repair", "Peripherals"],
  },
  {
    id: "film-scanner",
    title: "35mm Film Scanning Setup",
    description:
      "Built a dedicated film scanning rig for 35mm negatives, balancing colour accuracy, resolution, and workflow speed for analogue-to-digital archiving.",
    image: "/images/projects/film scanner/film01.jpg",
    alt: "Film Scanning Setup",
    tags: ["Film", "Photography", "DIY"],
  },
  {
    id: "camera-repair",
    title: "Camera Repair",
    description:
      "Serviced and cleaned several film cameras through complete lens and aperture overhauls (CLAs), restoring accurate shutter speeds and clear optics.",
    image: "/images/projects/camera repair/repair01.jpg",
    alt: "Camera Repair",
    tags: ["Film", "Repair", "CLA"],
  },
  {
    id: "lamp",
    title: "Glass Pane Lamp Stand",
    description:
      "Designed and 3D printed a custom stand to hold four laminated glass panes as a lamp for a friend. Modelled around the exact pane dimensions for a secure fit.",
    image: "/images/projects/lamp/lamp01.webp",
    alt: "Glass Pane Lamp Stand",
    tags: ["3D Printing", "CAD", "Custom Design"],
  },
  {
    id: "photography",
    title: "Photography Events",
    description:
      "Shot a range of events on both film and digital, covering portraits, candid moments, and environments with a focus on natural light and composition.",
    image: "/images/projects/photography/photo01.jpg",
    alt: "Photography Events",
    tags: ["Photography", "Events", "Film"],
    photos: [
      {
        src: "/images/projects/photography/photo01.jpg",
        caption: "Graduation Photos",
        link: "#",
      },
      {
        src: "/images/projects/photography/photo02.jpg",
        caption: "test 1",
      },
    ],
    article: [
      {
        title: "Experience",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        ],
      },
    ],
  },
];
