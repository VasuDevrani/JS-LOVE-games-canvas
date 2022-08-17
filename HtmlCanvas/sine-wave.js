const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gui = new dat.GUI();

var hue = 0;
const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 50,
  frequency: 0.01,
};
const strokeColor = {
    h: 200,
    s: 50,
    l: 50
}
const bgColor ={
    r: 0,
    g: 0,
    b: 0,
    a: 0.01
}

// setting the (parent of variable, changing variable, start, end)
// or 
const waveFolder = gui.addFolder('wave')
waveFolder.add(wave, "y", 0, canvas.height);
waveFolder.add(wave, "length", -0.06, 0.06);
waveFolder.add(wave, "amplitude", -300, 300);
waveFolder.add(wave, "frequency", 0.01, 1);
waveFolder.open();

const strokeFolder = gui.addFolder('stroke')
strokeFolder.add(strokeColor, 'h', 0, 255);
strokeFolder.add(strokeColor, 's', 0, 100);
strokeFolder.add(strokeColor, 'l', 0, 100);
strokeFolder.open();

const bgFolder = gui.addFolder('bgColor')
bgFolder.add(bgColor, "r", 0, 255);
bgFolder.add(bgColor, "g", 0, 255);
bgFolder.add(bgColor, "b", 0, 255);
bgFolder.add(bgColor, "a", 0, 1);
bgFolder.open();

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// anaimate function is for changing again and again
var inc = wave.frequency;
function animate() {
//   c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  c.fillStyle = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  for (var i = 0; i < canvas.width; i++) {
    c.lineTo(i, wave.y + Math.cos(i * wave.length + inc) * wave.amplitude * Math.cos(inc));
  }
  hue++;
  c.strokeStyle = `hsl(${strokeColor.h * Math.abs(Math.sin(inc))}, ${strokeColor.s}%, ${strokeColor.l}%)`
  c.stroke();
  inc += wave.frequency;
}
animate();
