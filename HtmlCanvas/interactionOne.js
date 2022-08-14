const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

// STEPS: 

// - create a init function which produces circle array with circle objects as per the page size
// - circle objects are made using function contructors and have random values for colors, center, radius etc.
// - circle objects also have two methods 
//     > draw: used to create circle each time of Animation
//     > update: to change the position of center, and mouse interactivity
// - interactivity is done with some conditions and using mouse events

// - Process: init -> draw -> update(update size and position)

var mouse = {
  x: undefined,
  y: undefined,
};

var maxRadius = 60;

var color = ["blue", "skyblue", "crimson", "orange", "yellow"];

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function Circle(x, y, dx, dy, r) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.minR = r;
  this.color = color[Math.floor(Math.random() * 4)];

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();

    // ctx.stroke(); removing this as it creates edges
  };

  this.update = function () {
    if (this.x + this.r >= innerWidth || this.x - this.r < 0)
      this.dx = -this.dx;
    if (this.y + this.r >= innerHeight || this.y - this.r < 0)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
    //   interactivity
    if (
      mouse.x - this.x < 80 &&
      mouse.x - this.x > -80 &&
      mouse.y - this.y < 80 &&
      mouse.y - this.y > -80
    ) {
      if (this.r < maxRadius) {
        this.r += 5;
      }
    } else if (this.r > this.minR) {
      this.r -= 1;
    }
    this.draw();
  };
}

// creating all the circles
let circleArray = [];
function init() {
  circleArray = [];

  for (var i = 0; i < 300; i++) {
    var r = Math.random() * 3 + 1; //+1 to prevent subtraction from 0 and negative radius
    var x = Math.random() * (innerWidth - r * 2) + r;
    var y = Math.random() * (innerHeight - r * 2) + r;
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;

    circleArray.push(new Circle(x, y, dx, dy, r));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
