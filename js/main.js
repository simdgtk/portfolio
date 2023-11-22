//making the text invisible
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => { 
  button.style.color = "transparent";
  button.style.userSelect = "none";
 });
function toggle (btnText) {
  let tagCurrent = document.getElementsByClassName(btnText.innerText)[0];
  if (tagCurrent.style.display === "block") {
    tagCurrent.style.display = "none";
  } else {
    tagCurrent.style.display = "block";
  }
}

const toggleMode = document.querySelector(".toggle-mode");
toggleMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');  
});