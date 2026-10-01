export default defineNuxtPlugin(() => {
  let originalTitle = "";

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      originalTitle = document.title;
      document.title = "Vous partez déjà ?";
    } else if (originalTitle) {
      document.title = originalTitle;
    }
  });
});
