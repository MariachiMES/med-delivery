function qs(selector) {
    return document.querySelector(selector)
}

const date = qs("#date")

date.innerText = new Date().toLocaleDateString()

const canvas = qs("#canvas")

canvas.height = 200
canvas.width = window.innerWidth - 60

const ctx = canvas.getContext('2d')
ctx.fillStyle = "white"
ctx.fillRect(0,0,canvas.width, canvas.height)

let DRAW_COLOR = "black"
let DRAW_WIDTH = "2"
let isDrawing = false;

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false)
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false)

canvas.addEventListener('mouseout', stop, false)
canvas.addEventListener('touchend', stop, false)
canvas.addEventListener('mouseup', stop, false)
function start(event) {
  isDrawing = true
  ctx.beginPath()
  ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)

  event.preventDefault()
}

function draw(event){
  if(isDrawing){
    ctx.lineTo(event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round';
    ctx.stroke()
  }
}

function stop(event) {
  if (isDrawing){
    ctx.stroke()
    ctx.closePath()
    isDrawing = false
  }
  event.preventDefault()
}
function clearCanvas(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
}