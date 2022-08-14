import * as utils from "./utils.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// STEPS
// collision is taken care by using the pgt formula to calculate distance

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: 10,
  y: 10,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let circle1;
let circle2;

function init() {
  circle1 = new Circle(10, 10, 30, "red");
  circle2 = new Circle(300, 300, 100, "skyblue");
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circle1.x = mouse.x;
  circle1.y = mouse.y;
  
  if (
      utils.distance(circle1.x, circle1.y, circle2.x, circle2.y) <=
    circle1.radius + circle2.radius
  ) {
    circle1.color = "blue";
    if(circle2.radius < 200)
        circle2.radius += 10;
} else {
    circle1.color = "skyblue";
    if(circle2.radius > 100)
        circle2.radius -= 10;
}

circle2.update();
circle1.update();
}

init();
animate();
