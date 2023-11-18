const button = document.querySelector("button");
const tag = document.getElementsByClassName("name-js")[0];
tag.style.display = "none";

button.addEventListener("click", () => {
  if (tag.style.display === "none") {
    tag.style.display = "block";
  } else {
    tag.style.display = "none";
  }
});
console.log(tag.textContent, button);
