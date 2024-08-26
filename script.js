function qs(selector) {
    return document.querySelector(selector)
}

const date = qs("#date")

date.innerText = new Date().toLocaleDateString()

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 10
canvas.height = window.innerHeight/3
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 20;
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 360;
let direction = true;

function draw(e) {
    console.log(e)
  if (!isDrawing) return; // stop the fn from running when they are not moused down

  ctx.strokeStyle = `hsl(${hue}, 100%, 0%)`;
  ctx.beginPath();
  console.log('begin stroke')
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
 

}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  console.log('drawing')
});

canvas.addEventListener('touchstart', (e)=>{
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    console.log('touching')
})

canvas.addEventListener('touchmove', draw)
canvas.addEventListener('touchcancel', ()=> isDrawing = false)
canvas.addEventListener('touchend', ()=> isDrawing = false)

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
