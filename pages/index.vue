<script setup>
import CenteredText from '@/components/CenteredText.vue';
import HeaderText from '@/components/HeaderText.vue';
import LinksList from '@/components/LinksList.vue';
import ScrollText from '@/components/ScrollText.vue';
import FloatingModels from '@/components/FloatingModels.vue';

import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const gridRef = ref(null);
const mainRef = ref(null);
const cellSize = 50;



useHead({
  meta: [
    {
      name: 'description',
      content: 'Portfolio de Simon Daguet-Kargl, je suis un développeur front-end basé sur Bordeaux et Nantes. Découvrez mon portfolio de développeur frontend.'
    }
  ],
  link: [
    {
      rel: 'preload',
      href: '/fonts/subset-EBGaramond-MediumItalic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: ''
    },
    {
      rel: 'preload',
      href: '/fonts/EBGaramond-Italic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: ''
    },
    {
      rel: 'preload',
      href: '/fonts/EBGaramond-Regular.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: ''
    }
  ]
})

const projectsRef = ref([
  {
    link: "https://bacchanight-room.vercel.app/",
    image: "/projects/project_bacchanight.webp",
    imageAlt: "Projet Bacchanight",
    title: "Fresque numérique collaborative",
    description: "Projet scolaire, les visiteurs du musée peuvent créer leur salle en 3D qui s'ajoute à une fresque collaborative.",
    tags: ["React Three Fiber", "Front / Back"]
  },
  {
    link: "https://grand-budapest.vercel.app/",
    image: "/projects/project_budapest.webp",
    imageAlt: "Projet Grand Budapest Hôtel",
    title: "Grand Budapest Hotel",
    description: "Site pensé d'après le film de Wes Anderson, avec des animations au scroll et autres effets JS.",
    tags: ["Anime.js", "GSAP"]
  },
  {
    link: "https://www.youtube.com/watch?v=6LYfe4mrv_s",
    image: "/projects/project_motiondesign.webp",
    imageAlt: "Projet de motion design",
    title: "Motion design d'une minute",
    description: "Motion design réalisé avec Tom Wainberg. Il nous fallait vulgariser une théorie scientifique.",
    tags: ["After Effects", "Illustrator", "Premiere pro"]
  },
  {
    link: "https://github.com/simdgtk/befake",
    image: "/projects/project_befake.webp",
    imageAlt: "Projet Befake, parodie de Bereal",
    title: "Application web avec Ruby on Rails",
    description: "Projet backend avec le framework Ruby on Rails, parodie du réseau social BeReal avec Midjourney.",
    tags: ["Midjourney", "Front / Back", "Ruby"]
  },
  {
    link: "https://nousnavonspasnumerise.mmibordeaux.com/",
    image: "/projects/project_nousnavonspasnumerise.webp",
    imageAlt: "Projet Nous n'avons pas numérisé",
    title: "Nous n'avons pas numérisé",
    description: "Site présentant une remise en question de la création d'une application web",
    tags: ["Print", "Retour d'expérience"]
  },
  {
    link: "https://treejs-one.vercel.app/",
    image: "/projects/project_treejs.webp",
    imageAlt: "Projet Tree.js",
    title: "Tree.js",
    description: "Premier site que j'avais réalisé avec Three.JS. La plante grandit au scroll de l'utilisateur et l'animation de la plante est faite sur Blender",
    tags: ["Three.js", "GSAP", "Blender"]
  },
])
const projects = projectsRef.value;
const containerRef = ref(null);
const projectsContainerRef = ref(null);
const cursorCenterRef = ref(null);
const cursorOutlineRef = ref(null);


onMounted(() => {
  const cloneProjects = [...projects];

  // GRILLE
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
        // décalage de 8px pour pas coller au bord
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
      const windowHeight = window.innerHeight;
      const gridWidth = Math.floor(windowWidth / cellSize) * cellSize;
      const gridHeight = Math.floor(windowHeight / cellSize) * cellSize;
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

  // CUSTOM CURSOR
  // window.addEventListener('mousemove', (e) => {
  //   const x = e.clientX
  //   const y = e.clientY

  //   cursorCenterRef.value.style.left = `${x}px`
  //   cursorCenterRef.value.style.top = `${y}px`
  //   cursorOutlineRef.value.style.left = `${x}px`;
  //   cursorOutlineRef.value.style.top = `${y}px`;
  // })
  const projectElements = Array.from(projectsContainerRef.value.children);
  // projectElements.forEach((project) => {
  //   project.addEventListener('mouseover', () => {
  //     cursorCenterRef.value.style.opacity = '1';
  //     cursorOutlineRef.value.style.opacity = '1';
  //   });
  //   project.addEventListener('mouseout', () => {
  //     cursorCenterRef.value.style.opacity = '0';
  //     cursorOutlineRef.value.style.opacity = '0';
  //   });
  // });

  // SCROLL PROJECTS
  const addMoreProjects = () => {
    const newProjects = cloneProjects.map((project, index) => {
      return {
        ...project,
        id: `project-${projects.length + index}`
      }
    });
    projectsRef.value.push(...newProjects);
    newProjects.forEach((project, index) => {
      console.log(project.id);
    })
  }
  const height = window.innerHeight * 1.2;
  const infiniteScroll = () => {
    ScrollTrigger.create({
      trigger: containerRef.value,
      start: `bottom bottom-${height}`,
      onEnter: () => {
        console.log('add');
        addMoreProjects();
        ScrollTrigger.refresh();
      }
    })
  }
  infiniteScroll()

  // Si utilisateur inactif, scroll vers le haut
  function inactivityTimeout() {
    let timer;
    const IDLE_TIMEOUT = 6000;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // User is inactive, do something like displaying a warning or logging out
        projectsContainerRef.value.style.opacity = 0;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setTimeout(() => {
          projectsContainerRef.value.style.opacity = 1;
        }, 800);

      }, IDLE_TIMEOUT);
    };

    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onmousedown = resetTimer;
    document.onscroll = () => {
      resetTimer();
    };

  }

  // Call the function to initiate
  // inactivityTimeout();
});
</script>

<template>
  <div class="container" ref="containerRef">
    <main ref="mainRef">
      <GrainFixed />
      <HeaderText />
      <CenteredText />
      <FloatingModels />
      <LinksList />
      <div class="background-grid">
        <div class="grid" ref="gridRef">
        </div>
      </div>
    </main>
    <div class="projects" ref="projectsContainerRef">
      <ProjectCard :container="mainRef" v-for="(project, index) in projects" :key="index" v-bind="project"
        :keynumber="index" :id="'project-' + index" class="project" />
    </div>
    <!--<div class="cursor-dot" ref="cursorCenterRef"></div>
    <div class="cursor-outline" ref="cursorOutlineRef"></div>-->
    <ScrollText />

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
  // display: none;
  pointer-events: none;
  z-index: 1000;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

main {
  height: 100vh;
  position: fixed;
}

.projects {
  max-width: 100vw;
  overflow: hidden;
  transform: translateY(120vh);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  padding: 0 8vw;

  .project {
    margin-bottom: 400px;
    align-self: center;

    // &:nth-child(even) {
    //   align-self: flex-end;
    // }

    &:nth-child(6n) {
      margin-bottom: 130vh;
    }
  }

}

.container {
  // height: 800vh !important;
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
  height: 100vh;
  overflow: hidden;

  &__cell {
    width: $cell-size;
    height: $cell-size;
    border: 1px solid $gray-border;
    background-color: $background-color;
    // background-color: blue !important;
    transition: background-color 0.2s ease-in-out;

    &--gray {
      background-color: $gray;
    }
  }
}
</style>
