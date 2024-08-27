function qs(selector) {
    return document.querySelector(selector)
}
const clientName = qs("#client-name")
const date = qs("#date")
const clearBtn = qs("#clear")

date.innerText = new Date().toLocaleDateString()

const canvas = qs("#canvas")

canvas.height = 100
canvas.width = window.innerWidth - 60

const ctx = canvas.getContext('2d')
ctx.fillStyle = "white"
ctx.fillRect(0,0,canvas.width, canvas.height)

let DRAW_COLOR = "black"
let DRAW_WIDTH = "2"
let isDrawing = false;
 
clientName.addEventListener('input', changeTitle)

clearBtn.addEventListener('click', clearCanvas)

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

function changeTitle () {
  const today = new Date().toLocaleDateString()
  document.title =  `Medication Delivery Form - ${clientName.value} - ${today}`
  console.log(document.title)
}

function draw(event){
  if(event.touches){
    let touch = event.touches[0]
    let mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    canvas.dispatchEvent(mouseEvent)
  }
  if(isDrawing){
    console.log(event)
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