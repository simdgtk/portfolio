<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProjectCard from '@/components/ProjectCard.vue';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    link: "https://treejs-one.vercel.app/",
    image: "/projects/project_treejs.webp",
    imageAlt: "Projet Tree.js",
    title: "Tree.js",
    description: "Premier site que j'avais réalisé avec Three.JS. La plante grandit au scroll de l'utilisateur et l'animation de la plante est faite sur Blender",
    tags: ["Three.js", "GSAP", "Blender"]
  },
  {
    link: "https://www.youtube.com/watch?v=6LYfe4mrv_s",
    image: "/projects/project_motiondesign.webp",
    imageAlt: "Projet de motion design",
    title: "Motion design d'une minute",
    description: "Motion design réalisé à deux. Il nous fallait vulgariser une théorie scientifique.",
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
    link: "https://nousnavonspasnumerise.mmibordeaux.com/",
    image: "/projects/project_nousnavonspasnumerise.webp",
    imageAlt: "Projet Nous n'avons pas numérisé",
    title: "Nous n'avons pas numérisé",
    description: "Site présentant une remise en question de la création d'une application web",
    tags: ["Print", "Retour d'expérience"]
  },
]

const allProjectsRef = ref(null);
const scrollContainerRef = ref(null);
</script>
<template>
  <div class="infinite-scroll" ref="scrollContainerRef">
    <div class="infinite-scroll__fixed" ref="allProjectsRef">
      <ProjectCard v-for="(project, index) in projects" :key="index" v-bind="project" :id="'project-' + index"
        class="project" />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/_utils' as *;
@use '@/assets/styles/_variables' as *;

.infinite-scroll {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  z-index: 200;
  pointer-events: auto;

  &__fixed {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .project {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}

.scroll-container {
  position: relative;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100vw;
  height: 400vh;
  background-color: blue;
}

.all-projects {
  &:first-child {
    display: block;
  }
}
</style>