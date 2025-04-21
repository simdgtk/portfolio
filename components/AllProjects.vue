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

onMounted(() => {
  let tl = gsap.timeline();
  if (allProjectsRef.value && allProjectsRef.value.children) {
    const cards = Array.from(allProjectsRef.value.children);
    console.log(cards);
    function infiniteScroll() {
      ScrollTrigger.create({
        start: 1,
        end: "max",
        onLeaveBack: self => self.scroll(ScrollTrigger.maxScroll(window) - 2),
        onLeave: self => self.scroll(2),
      }).scroll(2);
    }
    infiniteScroll();
  }


  // cards.forEach((card, i) => {
  //   gsap.set(card, {
  //     y: i * cardHeight * 2 + window.innerHeight,
  //     x: window.innerWidth / 2 + 200,
  //     transform: "rotate(-13.94deg)",
  //   });
  // });
  // console.log(cards[0].y)

  // gsap.to(cards, {
  //   y: 0,
  //   x: - window.innerWidth / 2,
  //   transform: "rotate(30.59deg)",
  //   stagger: 0.1,
  //   duration: 1,
  //   scrollTrigger: {
  //     trigger: scrollContainerRef.value,
  //     start: "top 0%",
  //     end: "center 20%",
  //     scrub: true,
  //     markers: true,
  //   },
  //   onComplete: () => {
  //     console.log("Animation complete");
  //     gsap.to(cards, {
  //       y: 0,
  //       x: - window.innerWidth / 2,
  //       transform: "rotate(30.59deg)",
  //       stagger: 0.1,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: scrollContainerRef.value,
  //         start: "top 0%",
  //         end: "center 20%",
  //         scrub: true,
  //         markers: true,
  //       },
  //     })
  //   },
  // })

  // gsap.to("#project-0", {
  //   scrollTrigger: {
  //     trigger: allProjectsRef.value,
  //     start: "top 0%",
  //     end: "bottom 50%",
  //     scrub: true,
  //     markers: true,
  //   },
  //   scale: 3,
  //   // duration: 1,
  // })

  // gsap.fromTo("#project-0", {
  //   x: window.innerWidth / 2 + 200,
  //   y: window.innerHeight + 200,
  //   transform: "rotate(13.94deg)"
  // }, {
  //   scrollTrigger: {
  //     trigger: scrollContainerRef.value,
  //     start: "top 0%",
  //     end: "center 20%",
  //     scrub: true,
  //     markers: true,
  //   },
  //   x: - window.innerWidth / 2,
  //   y: - window.innerHeight,
  //   transform: "rotate(-30.59deg)",
  //   onComplete: () => {

  //   },

  // })

  // gsap.fromTo("#project-1", {
  //   x: window.innerWidth / 2 + 200,
  //   y: window.innerHeight * 2 + 200,
  //   transform: "rotate(13.94deg)",
  // }, {
  //   scrollTrigger: {
  //     trigger: scrollContainerRef.value,
  //     start: "top 0%",
  //     end: "center 20%",
  //     scrub: true,
  //     markers: true,
  //   },
  //   x: - window.innerWidth / 2,
  //   y: - window.innerHeight,
  //   transform: "rotate(-30.59deg)"

  // })

})
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

// body {
//   overflow: hidden;
//   /* empêche le scroll global */
// }

// .infinite-scroll {
//   position: absolute;
//   z-index: 90000000;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   overflow-y: scroll;
// }

.infinite-scroll {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  /* pour les iOS */
  overscroll-behavior: contain;
  /* évite les débordements vers le body */
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
  // position: absolute;
  // z-index: 10;
  // top: 0;
  // left: 0;
  // width: 100vw;
  // height: 100vh;


  &:first-child {
    display: block;
  }
}
</style>