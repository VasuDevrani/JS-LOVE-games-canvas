import * as utils from "./utils.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("click", () => {
  var hue = 0;
  for (var i = 0; i < 200; i++) {
    hue += 10;
    particles.push(new Particle("hsl(" + hue + ", 100%, 30%)"));
  }
});

// addEventListener("resize", () => {
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;

//   init();
// });

let particles = [];
// Objects
class Particle {
  constructor(color) {
    this.x = mouse.x;
    this.y = mouse.y;
    (this.speedX = (Math.random() - 0.5) * 15 + 0.1),
      (this.speedY = (Math.random() - 0.5) * 15 + 0.1),
      (this.radius = Math.random() * 6);
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX += 0.01;
    this.speedY += 0.05;
    this.draw();
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.03)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  //   c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}

animate();
