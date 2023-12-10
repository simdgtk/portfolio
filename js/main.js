//making the text invisible
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.style.color = "transparent";
  button.style.userSelect = "none";
});
function toggle(btnText) {
  let tagCurrent = document.getElementsByClassName(btnText.innerText)[0];
  if (tagCurrent.style.display === "block") {
    tagCurrent.style.display = "none";
  } else {
    tagCurrent.style.display = "block";
  }
}

let toggleMode = document.querySelector(".toggle-mode");
let img = document.querySelector(".dark");
let burgerIcon = document.querySelector(".burger-white");
let closeBurgerIcon = document.querySelector(".burger-burger");
toggleMode.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    img.setAttribute("src", "images/icons/light.svg");
    img2.setAttribute("src", "images/icons/light.svg");
    burgerIcon.setAttribute("src", "images/icons/burger_open_white.svg");
    futureIcon.setAttribute("src", "images/futur_dark.svg");
  } else {
    img.setAttribute("src", "images/icons/dark.svg");
    img2.setAttribute("src", "images/icons/dark.svg");
    burgerIcon.setAttribute("src", "images/icons/burger_open.svg");
    futureIcon.setAttribute("src", "images/futur.svg");
  }
  document.body.classList.toggle("dark-mode");

  if (img.getAttribute("src") === "images/icons/light.svg") {
    img.setAttribute("src", "images/icons/dark.svg");
  } else {
    img.setAttribute("src", "images/icons/light.svg");
  }
  if (burgerIcon.getAttribute("src") === "images/icons/burger_open_white.svg") {
    burgerIcon.setAttribute("src", "images/icons/burger_open.svg");
  } else {
    burgerIcon.setAttribute("src", "images/icons/burger_open_white.svg");
  }
  if (
    closeBurgerIcon.getAttribute("src") ===
    "images/icons/burger_close_white.svg"
  ) {
    closeBurgerIcon.setAttribute("src", "images/icons/burger_close.svg");
  } else {
    closeBurgerIcon.setAttribute("src", "images/icons/burger_close_white.svg");
  }
});

const toggleMode2 = document.querySelector(".toggle-mode2");
const img2 = document.querySelector(".dark2");
const futureIcon = document.querySelector(".future-svg");
futureIcon.setAttribute("src", "images/futur_dark.svg");
toggleMode2.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    img.setAttribute("src", "images/icons/light.svg");
    img2.setAttribute("src", "images/icons/light.svg");
    futureIcon.setAttribute("src", "images/futur_dark.svg");
  } else {
    img.setAttribute("src", "images/icons/dark.svg");
    img2.setAttribute("src", "images/icons/dark.svg");
    futureIcon.setAttribute("src", "images/futur.svg");
  }
  console.log("clicked2");
  document.body.classList.toggle("dark-mode");
  if (img2.getAttribute("src") === "images/icons/light.svg") {
    img2.setAttribute("src", "images/icons/dark.svg");
  } else {
    img2.setAttribute("src", "images/icons/light.svg");
  }
});

document.querySelector(".date").textContent = new Date().getFullYear();

//hidding the mobile nav
let closingIcon = document.querySelector(".burger-burger");
let mobileMenu = document.querySelector(".burger-menu-div");
function hide() {
  mobileMenu.style.display = "none";
}
// show the mobile nav
let openIcon = document.querySelector(".burger");
function show() {
  mobileMenu.style.display = "block";
}
