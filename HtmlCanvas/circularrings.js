import * as utils from "./utils.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#00bdff", "#4d39ce", "#088eff"];

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
class blob {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.fixedX = x;
    this.fixedY = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = Math.random()* 0.05 + 0.02;
    this.distanceFromCenter = utils.randomIntFromRange(80, 170)
    this.lastMouse = {x: x, y: y}
  }

  update() {
    var lastPoint = {
      x: this.x,
      y: this.y
    }
    this.radians += this.velocity;

    // now lastmouse becomes the center of circle and it is updated, 0.05 is needed for small pixel
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    // this.x += Math.cos(this.radians);
    // this.y += Math.sin(this.radians);
    this.x =
      this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y =
      this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint);
  }

  draw(lastPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for (var i = 0; i < 80; i++)
    particles.push(new blob(canvas.width / 2, canvas.height / 2, utils.randomIntFromRange(3,7), colors[Math.floor(Math.random() * 3)]));
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  // trail effect 
  c.fillStyle = 'rgba(255, 255, 255, 0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < 200; i++) particles[i].update();
}

init();
animate();
