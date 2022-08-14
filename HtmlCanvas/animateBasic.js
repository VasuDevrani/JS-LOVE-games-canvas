const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5) * 20; //randomizing the value of displacement as negative or positive
var dy = (Math.random() - 0.5) * 20;
var r = 30;

// Create Circle -> clear screen -> change its position -> clear screen

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight); //for clearing the screen and showing animation
  ctx.beginPath();
  ctx.arc(x, y, r, Math.PI * 2, false);
  //   ctx.bezierCurveTo(0,0,100,100,100,100)
  ctx.strokeStyle = "green";
  //   ctx.fillStyle = "crimson";
  //   ctx.fill();
  ctx.stroke();
  if (x + r >= innerWidth || x - r < 0) dx = -dx; //for bouncing by walls
  if (y + r >= innerHeight || y - r < 0) dy = -dy;
  x += dx;
  y += dy;

  //   r++;
}
// animate(); this calls the function multiple times
animate();
