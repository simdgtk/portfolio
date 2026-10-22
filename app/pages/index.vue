<script setup lang="ts">
import { projects } from "~/data/projects";

useSeoMeta({
  description:
    "Portfolio de Simon Daguet-Kargl, je suis un développeur front-end et web créatif basé sur Paris et Nantes. Découvrez mon portfolio de développeur frontend.",
});

const modelsLoaded = useModelsLoaded();
modelsLoaded.value = false;

useConsoleArt();
</script>

<template>
  <main class="container">
    <div class="home">
      <GrainFixed />
      <HeaderText />
      <CenteredText />
      <LazyFloatingModels @loaded="modelsLoaded = true" />
      <LinksList />
      <GridBackground animated :revealed="modelsLoaded" />
    </div>
    <section class="projects-container" aria-label="Projets">
      <div class="projects">
        <ProjectCard
          v-for="(project, index) in projects"
          :id="`project-${index}`"
          :key="project.link"
          v-bind="project"
          :index="index"
          class="project"
        />
      </div>
    </section>
    <ScrollText />
  </main>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  height: fit-content;
}

.home {
  height: 100dvh;
  position: fixed;
}

.projects-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: fit-content;
  max-width: 100vw;
  pointer-events: none;
}

.projects {
  position: relative;
  margin-top: 140vh;
  display: flex;
  flex-direction: column;
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
  }
}
</style>
