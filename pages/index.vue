<script setup>
import { ref, onMounted } from 'vue';
import { useHead } from '#app';
import CenteredText from '@/components/CenteredText.vue';
import HeaderText from '@/components/HeaderText.vue';
import LinksList from '@/components/LinksList.vue';
import ScrollText from '@/components/ScrollText.vue';
import FloatingModels from '@/components/FloatingModels.vue';
import GrainFixed from '@/components/GrainFixed.vue';
import AsciiConsole from '@/components/AsciiConsole.vue';
import ProjectCard from '@/components/ProjectCard.vue';

const gridRef = ref(null);
const mainRef = ref(null);
const cellSize = 50;

useHead({
  meta: [
    {
      name: 'description',
      content: 'Portfolio de Simon Daguet-Kargl, je suis un développeur front-end et web créatif basé sur Bordeaux et Nantes. Découvrez mon portfolio de développeur frontend.'
    }
  ],
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'preload',
      href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap',
      as: 'style'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap'
    }
  ]
})

const projectsRef = ref([
  {
    link: "https://bacchanight-room.vercel.app/",
    image: "/projects/project_bacchanight.webp",
    imageAlt: "Projet Bacchanight",
    title: "Fresque numérique collaborative",
    description: "Projet scolaire, les visiteurs du musée peuvent créer leur salle en 3D qui s'ajoute à une fresque collaborative",
    tags: ["React Three Fiber", "Front / Back"]
  },
  {
    link: "https://interactive-posters.simondaguetkargl.fr/",
    image: "/projects/project_interactive_posters.webp",
    imageAlt: "Posters webgl interactifs",
    title: "Posters webgl interactifs - WIP",
    description: "Site pour m'entraîner au webgl, avec des shaders et du postprocessing, en Three.js",
    tags: ["Three.js", "Webgl", "Shaders"]
  },
  {
    link: "https://grand-budapest.vercel.app/",
    image: "/projects/project_budapest.webp",
    imageAlt: "Projet Grand Budapest Hôtel",
    title: "Grand Budapest Hotel",
    description: "Site inspiré du film de Wes Anderson, avec des animations au scroll et autres effets JS",
    tags: ["Anime.js", "GSAP"]
  },
  {
    link: "https://www.youtube.com/watch?v=6LYfe4mrv_s",
    image: "/projects/project_motiondesign.webp",
    imageAlt: "Projet de motion design",
    title: "Motion design de théorie scientifique",
    description: "Motion design réalisé à deux (avec Tom Wainberg). Il nous fallait vulgariser une théorie scientifique",
    tags: ["After Effects", "Illustrator", "Premiere pro"]
  },
  {
    link: "https://github.com/simdgtk/befake",
    image: "/projects/project_befake.webp",
    imageAlt: "Projet Befake, parodie de Bereal",
    title: "Application web avec Ruby on Rails",
    description: "Projet fullstack avec le framework Ruby on Rails, parodie du réseau social BeReal avec Midjourney",
    tags: ["Midjourney", "Front / Back", "Ruby"]
  },
  {
    link: "https://nousnavonspasnumerise.mmibordeaux.com/",
    image: "/projects/project_nousnavonspasnumerise.webp",
    imageAlt: "Projet Nous n'avons pas numérisé",
    title: "Nous n'avons pas numérisé",
    description: "Site présentant une remise en question de la création d'une application web, pour des raisons éthiques et écologiques",
    tags: ["Print / web", "Retour d'expérience"]
  },
  {
    link: "https://treejs-one.vercel.app/",
    image: "/projects/project_treejs.webp",
    imageAlt: "Projet Tree.js",
    title: "Tree.js",
    description: "Premier site que j'avais réalisé avec Three.JS. La plante grandit au scroll de l'utilisateur et son animation est faite sur Blender",
    tags: ["Three.js", "GSAP", "Blender"]
  },
  {
    link: "https://airann.itch.io/rhumflow",
    image: "/projects/project_rumflow.webp",
    imageAlt: "Projet Rum Flow",
    title: "Rum Flow",
    description: "Un jeu vidéo 2D fait sur Unity en 2 semaines. Reliez des îles entre elles, empêchez les attaques pirates et récoltez le plus de rhum possible !",
    tags: ["Unity", "C#", "Jeu vidéo"]
  },
])

const projects = projectsRef.value;

onMounted(() => {
  const gridElement = gridRef.value;
  const cells = ref([]);

  const coordo2dTo1d = (x, y, cellSize) => {
    return y * cellSize + x;
  }

  const createGrid = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const gridWidth = Math.floor(windowWidth / cellSize) * cellSize;
    const gridHeight = Math.floor(windowHeight / cellSize) * cellSize;
    const gridElement = gridRef.value;

    for (let j = 0; j < gridHeight / cellSize + 2; j++) {
      for (let i = 0; i < gridWidth / cellSize + 2; i++) {
        const cell = document.createElement('div');
        cell.style.transform = `translate(${i * cellSize - 8}px, ${j * cellSize - 8}px)`;
        cell.className = 'grid__cell';
        cell.style.position = 'absolute';
        gridElement.appendChild(cell);
        cells.value.push(cell);
      }
    }
  }
  createGrid();

  if ('ontouchstart' in window) {
    return;
  } else {
    mainRef.value.addEventListener('mousemove', (event) => {
      const windowWidth = window.innerWidth;
      const gridWidth = Math.floor(windowWidth / cellSize) * cellSize;
      const x = Math.floor(event.clientX / cellSize);
      const y = Math.floor(event.clientY / cellSize);
      const index = coordo2dTo1d(x, y, gridWidth / cellSize + 2);

      if (cells.value[index]) {
        cells.value[index].classList.add('grid__cell--gray');
        cells.value[index + 1].classList.add('grid__cell--gray');
        cells.value[index + gridWidth / cellSize + 2].classList.add('grid__cell--gray');

        setTimeout(() => {
          if (cells.value[index]) {
            cells.value[index].classList.remove('grid__cell--gray');
          }
        }, 2500);
        setTimeout(() => {
          if (cells.value[index + gridWidth / cellSize + 2]) {
            cells.value[index + gridWidth / cellSize + 2].classList.remove('grid__cell--gray');
          }
        }, 2500);
        setTimeout(() => {
          if (cells.value[index + 1]) {
            cells.value[index + 1].classList.remove('grid__cell--gray');
          }
        }, 2500);
      }
    });
  }

  window.addEventListener('resize', () => {
    if (gridRef.value) {
      gridElement.innerHTML = '';
      cells.value = [];
    }
    createGrid();
  });
});
</script>

<template>
  <div class="container">
    <main ref="mainRef">
      <GrainFixed />
      <HeaderText />
      <CenteredText />
      <FloatingModels />
      <LinksList />
      <div class="background-grid">
        <div class="grid" ref="gridRef"></div>
      </div>
    </main>
    <div class="projects">
      <ProjectCard :container="mainRef" v-for="(project, index) in projects" :key="'project-' + index" v-bind="project"
        :class="{ 'last-child': index === projects.length - 1 }" :keynumber="index" :id="'project-' + index"
        class="project" />
    </div>
    <ScrollText />
    <AsciiConsole />
  </div>
</template>
<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

$cell-size: 50px;

.cursor-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: white;
}

.cursor-outline {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid white;
}

.cursor-dot,
.cursor-outline {
  position: fixed;
  opacity: 0;
  pointer-events: none;
  z-index: 1000;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

main {
  height: 100dvh;
  position: fixed;
}

.container {
  position: relative;
}

.projects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: fit-content;
  max-width: 100vw;
  transform: translateY(140vh);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  padding: 0 8vw;

  @media screen and (max-width: 750px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
    overflow: hidden;
  }

  .project {
    margin-bottom: 400px;
    align-self: center;
    transition: filter 0.2s ease-in-out;

    &:hover {
      filter: brightness(0.95);
    }

    &:last-child {
      margin-bottom: 140vh;
    }

    &.last-child {
      margin-bottom: 140vh !important;
    }
  }

}

.container {
  height: fit-content;
}

.grid {
  pointer-events: all;
  z-index: -10;
  gap: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;

  &__cell {
    width: $cell-size;
    height: $cell-size;
    border: 1px solid $gray-border;
    background-color: $background-color;
    transition: background-color 0.2s ease-in-out;

    &--gray {
      background-color: $gray;
    }
  }
}
</style>
