import * as utils from "./utils.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["green", "white", "orange"];

// Event Listeners
let particles = [];
let hue = 0;

addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  hue += 2;

  for (var i = 0; i <10; i++) particles.push(new Particle());
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = mouse.x;
    this.y = mouse.y;
    this.speedX = (Math.random() - 0.5) * 10+ 0.01;
    this.speedY = (Math.random() - 0.5) * 10+ 0.01;
    this.radius = Math.random() * 6 + 1;
    this.color = 'hsl(' + hue + ', 70%, 50%)';
    // this.color = colors[Math.floor(Math.random() * 3)];
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
    if (this.radius > 0.3) this.radius -= 0.1;

    this.draw();
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);
  
//   trail effect
//   c.fillStyle = 'rgba(0,0,0,0.1)'
//   c.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();

    for(var j=i;j<particles.length; j++)
    {
        var dis = utils.distance(particles[i].x, particles[i].y, particles[j].x, particles[j].y);

        if(dis < 100)
        {
            c.beginPath();
            c.moveTo(particles[i].x, particles[i].y);
            c.lineTo(particles[j].x, particles[j].y);
            c.lineWidth = particles[i].radius
            c.strokeStyle = particles[j].color;
            c.stroke();
        }
    }

    if (particles[i].radius < 1) {
      particles.splice(i, 1);
      i--;
    }
  }
}

animate();
