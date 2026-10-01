export interface Project {
  link: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    link: "https://bacchanight-room.vercel.app/",
    image: "/projects/project_bacchanight.webp",
    imageAlt: "Projet Bacchanight",
    title: "Fresque numérique collaborative",
    description:
      "Projet scolaire, les visiteurs du musée peuvent créer leur salle en 3D qui s'ajoute à une fresque collaborative",
    tags: ["React Three Fiber", "Front / Back"],
  },
  {
    link: "https://interactive-posters.simondaguetkargl.fr/",
    image: "/projects/project_interactive_posters.webp",
    imageAlt: "Posters webgl interactifs",
    title: "Posters webgl interactifs - WIP",
    description:
      "Site pour m'entraîner au webgl, avec des shaders et du postprocessing, en Three.js",
    tags: ["Three.js", "Webgl", "Shaders"],
  },
  {
    link: "https://grand-budapest.vercel.app/",
    image: "/projects/project_budapest.webp",
    imageAlt: "Projet Grand Budapest Hôtel",
    title: "Grand Budapest Hotel",
    description:
      "Site inspiré du film de Wes Anderson, avec des animations au scroll et autres effets JS",
    tags: ["Anime.js", "GSAP"],
  },
  {
    link: "https://3d-genealogy-tapestry.vercel.app/",
    image: "/projects/project_tapestry.webp",
    imageAlt: "Fresque généalogique en 3D",
    title: "Fresque généalogique en 3D",
    description:
      "Projet scolaire, la consigne était de faire un arbre généalogique, pour un projet full-stack. J'ai utilisé la lib EZ-Tree, et les utilisateurs peuvent créer leur arbre généalogique et le visualiser en 3D.",
    tags: ["Mongo DB", "Nuxt", "Three.js"],
  },
  {
    link: "https://tsl-intro.vercel.app/",
    image: "/projects/project_tsl.webp",
    imageAlt: "Projet d'introduction au TSL",
    title: "Découverte du TSL / WebGPU",
    description:
      "TSL, Three.js Shading Language, pour découvrir le webGPU, avec du postprocessing avec un effet de motion blur. J'ai modélisé les caméras sur Blender.",
    tags: ["Three.js", "WebGPU", "Blender"],
  },
  {
    link: "https://www.youtube.com/watch?v=6LYfe4mrv_s",
    image: "/projects/project_motiondesign.webp",
    imageAlt: "Projet de motion design",
    title: "Motion design de théorie scientifique",
    description:
      "Motion design réalisé à deux (avec Tom Wainberg). Il nous fallait vulgariser une théorie scientifique",
    tags: ["After Effects", "Illustrator", "Premiere pro"],
  },
  {
    link: "https://github.com/simdgtk/befake",
    image: "/projects/project_befake.webp",
    imageAlt: "Projet Befake, parodie de Bereal",
    title: "Application web avec Ruby on Rails",
    description:
      "Projet fullstack avec le framework Ruby on Rails, parodie du réseau social BeReal avec Midjourney",
    tags: ["Midjourney", "Front / Back", "Ruby"],
  },
  {
    link: "https://nousnavonspasnumerise.mmibordeaux.com/",
    image: "/projects/project_nousnavonspasnumerise.webp",
    imageAlt: "Projet Nous n'avons pas numérisé",
    title: "Nous n'avons pas numérisé",
    description:
      "Site présentant une remise en question de la création d'une application web, pour des raisons éthiques et écologiques",
    tags: ["Print / web", "Retour d'expérience"],
  },
  {
    link: "https://treejs-one.vercel.app/",
    image: "/projects/project_treejs.webp",
    imageAlt: "Projet Tree.js",
    title: "Tree.js",
    description:
      "Premier site que j'avais réalisé avec Three.JS. La plante grandit au scroll de l'utilisateur et son animation est faite sur Blender",
    tags: ["Three.js", "GSAP", "Blender"],
  },
  {
    link: "https://airann.itch.io/rhumflow",
    image: "/projects/project_rumflow.webp",
    imageAlt: "Projet Rum Flow",
    title: "Rum Flow",
    description:
      "Un jeu vidéo 2D fait sur Unity en 2 semaines. Reliez des îles entre elles, empêchez les attaques pirates et récoltez le plus de rhum possible !",
    tags: ["Unity", "C#", "Jeu vidéo"],
  },
];
