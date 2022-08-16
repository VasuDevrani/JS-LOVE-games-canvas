import * as utils from "./utils.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

addEventListener("dblclick", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  draw();
  window.addEventListener("mousemove", myFunc);
});

function myFunc(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    draw();
}
window.addEventListener("click", (event) => {
  window.removeEventListener("mousemove", myFunc);
  c.beginPath();
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// Objects

c.beginPath();
function draw() {
    //   c.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2, false);
    c.lineTo(mouse.x, mouse.y)
    c.stroke();
}
