const button = document.querySelector("button");
const tag = document.getElementsByClassName("name")[0];
tag.style.display = "none";
/* hidding the tag when clicked */
button.addEventListener("click", () => {
  if (tag.style.display === "none") {
    tag.style.display = "block";
  } else {
    tag.style.display = "none";
  }
});
console.log(tag.textContent);
