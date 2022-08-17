var canvas = document.querySelector("canvas");
const res = document.querySelectorAll(".score");
const button = document.querySelector(".result button");
const result = document.querySelector(".result");
const select = document.querySelector('#levels')
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.onselectstart = function () { return false; }

// mouse position
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// event listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

//class of characters
class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "white";
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Projectile {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "white";
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.speedX;
    this.y += this.velocity.speedY;
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.speedX;
    this.y += this.velocity.speedY;
  }
}

const friction = 0.97;
class Particles {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.draw();

    this.velocity.speedX *= friction;
    this.velocity.speedY *= friction;
    this.x += this.velocity.speedX;
    this.y += this.velocity.speedY;

    this.alpha -= 0.02;
  }
}

// characters
let projectiles = [];
let particles = [];
let player;
let enemies = [];
let score;

function init() {
  projectiles = [];
  particles = [];
  player = new Player(canvas.width / 2, canvas.height / 2, 30);
  enemies = [];
  score = 0;
}

// functions
function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * 30 + 5;

    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    let angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    
    let val = parseInt(select.value) * 0.1;
    console.log(val);
    let velocity = {
      speedX: Math.cos(angle) * val,
      speedY: Math.sin(angle) * val,
    };
    enemies.push(
      new Enemy(x, y, radius, `hsl(${Math.random() * 360}, 50%, 50%)`, velocity)
    );
  }, 1000);
}

addEventListener("click", (e) => {
  let angle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );

  let velocity = {
    speedX: Math.cos(angle) * 5,
    speedY: Math.sin(angle) * 5,
  };

  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, velocity)
  );
});

button.addEventListener("click", () => {
  init();
  animate();
  spawnEnemies();
  result.style.display = "none";
});

// animations
let animationId = undefined;

function animate() {
  animationId = requestAnimationFrame(animate);
  res.forEach((item) => {
    item.innerHTML = score;
  });
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw();
  particles.forEach((particle, ind) => {
    particle.update();
    if (particle.alpha <= 0) particles.splice(ind, 1);
  });
  projectiles.forEach((ball, ind) => {
    ball.update();

    if (
      ball.x - ball.radius < 0 ||
      ball.x > canvas.width ||
      ball.y - ball.radius < 0 ||
      ball.y > canvas.height
    ) {
      // settimeout for removing flash effect
      setTimeout(() => {
        projectiles.splice(ind, 1);
      }, 0);
    }
  });
  enemies.forEach((enemy, i) => {
    enemy.update();
    const disp = Math.hypot(player.x - enemy.x, player.y - enemy.y);

    // when player hit enemy
    if (disp - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
      result.style.display = "flex";
    }

    // when projectiles hit enemy
    projectiles.forEach((ball, ind) => {
      const dis = Math.hypot(ball.x - enemy.x, ball.y - enemy.y);
      if (dis - enemy.radius - ball.radius < 1) {
        // explosions
        for (var j = 0; j < enemy.radius * 2; j++) {
          particles.push(
            new Particles(ball.x, ball.y, Math.random() * 2, enemy.color, {
              speedX: (Math.random() - 0.5) * 6,
              speedY: (Math.random() - 0.5) * 6,
            })
          );
        }

        if (enemy.radius - 10 > 5) {
          score = score + 100;
          //   enemy.radius -= 10;
          //   gsap smoothness
          gsap.to(enemy, {
            radius: enemy.radius / 3,
          });
          projectiles.splice(ind, 1);
        } else {
          score += 250;
          setTimeout(() => {
            enemies.splice(i, 1);
            projectiles.splice(ind, 1);
          }, 0);
        }
      }
    });
  });
}
