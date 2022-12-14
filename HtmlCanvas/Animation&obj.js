const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let hue = 0;

function Circle(x, y, dx, dy, r) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)'
    ctx.fill();
  };

  this.update = function () {
    this.draw();

    if (this.x + this.r >= innerWidth || this.x - this.r < 0)
      this.dx = -this.dx;
    if (this.y + this.r >= innerHeight || this.y - this.r < 0)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
  };
}

// creating all the circles
let circleArray = [];

for (var i = 0; i < 200; i++) {
    var r = Math.random() * 10;
  var x = Math.random() * (innerWidth - r*2) + r; //this is basically limiting the center positions to just 'r' before edges
  var y = Math.random() * (innerHeight - r*2) + r;
  var dx = (Math.random() - 0.5) * 10;
  var dy = (Math.random() - 0.5) * 10;
  circleArray.push(new Circle(x, y, dx, dy, r));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);

  hue++;
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();
