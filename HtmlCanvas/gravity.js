import * as utils from "./utils.js";

// STEPS:
// ball should speed up while going down and speed down while bouncing back
// this can be done by adding a +ve variable
// - when ball going down, means speed is +ve, then speed up
// - when ball going up, means speed is -ve, then speed down
//  friction is introduced as a speed reducer

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
canvas.addEventListener("click", () => {
  init();
});
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
class ball {
  constructor(x, y, dy, dx, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
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
    if (this.y + this.radius + this.dy >= canvas.height || this.y - this.radius <= 0)
      this.dy = -this.dy * 0.95;
    else this.dy += 1; //this is responsible for speeding up when ball goes down and reducing the speed when it moves up

    if (this.x + this.radius + this.dx >= canvas.width - 50 || this.x - this.radius <= 50)
      this.dx = -this.dx;

    this.y += this.dy;
    this.x += this.dx;
    this.draw();
  }
}

// Implementation
var Ball = [];
function init() {
  Ball = [];

  // var y = randomIntFromRange()

  for (var i = 0; i < 100; i++) {
    var radius = Math.random() * 40 + 2;
    var x = utils.randomIntFromRange(50, canvas.width - 50);
    var y = utils.randomIntFromRange(50, canvas.height - 100);
    var color = utils.randomColor(colors);
    var dy = Math.random() * 2 + 1; 
    var dx = utils.randomIntFromRange(-2, 2); 
    Ball.push(new ball(x, y, dy, dx, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < Ball.length; i++) Ball[i].update();
}

init();
animate();
