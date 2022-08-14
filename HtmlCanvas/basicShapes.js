const canvas = document.querySelector("canvas");

// setting the canvas for art, comes with handy methods and function that are not posiible in simple divs
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// creating a 2d object of canvas
const ctx = canvas.getContext("2d");

// creating shapes
console.log(ctx);

// RECTANGLES
ctx.fillStyle = "red"; //changing styles of shapes
ctx.fillRect(100, 100, 100, 100);
ctx.fillStyle = "blue";
ctx.fillRect(300, 300, 100, 100);
ctx.fillStyle = "green";
ctx.fillRect(500, 200, 100, 100);

// LINES
ctx.beginPath(); //starts a continuous path
ctx.moveTo(20, 20); //beginning of path
ctx.lineTo(500, 200); //creates a line
ctx.lineTo(163, 223); //starts line from the last end
ctx.strokeStyle = "yellow";
ctx.stroke(); //for displaying drawings

// CIRCLES
ctx.beginPath(); //starts a new path
ctx.strokeStyle = "black";
ctx.arc(230, 230, 40, 0, 360, false);
ctx.stroke();

for (let i = 0; i < 80; i++) {
  ctx.beginPath();
  var x = Math.random() * window.innerHeight;
  var y = Math.random() * window.innerWidth;
  var n1 = Math.random() * 255;
  var n2 = Math.random() * 255;
  var n3 = Math.random() * 255;

  ctx.strokeStyle = `rgb(${n1}, ${n2}, ${n3})`;
  ctx.arc(y, x, 20, Math.PI * 2, false);
  ctx.stroke();
}
