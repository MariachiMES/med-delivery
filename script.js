function qs(selector) {
    return document.querySelector(selector)
}
const clientName = qs("#client-name")
const date = qs("#date")
const clearBtn = qs("#clear")
const cmClearBtn = qs("#cm-clear")

date.value = new Date().toLocaleDateString()

const canvas = qs("#canvas")
const cmCanvas = qs("#cm-canvas")

canvas.height = 60
canvas.width = window.innerWidth - 60

cmCanvas.height = 60
cmCanvas.width = window.innerWidth - 60



const ctx = canvas.getContext('2d')
ctx.fillStyle = "white"
ctx.fillRect(0,0,canvas.width, canvas.height)

const cmCtx = cmCanvas.getContext('2d')
cmCtx.fillStyle = 'White'
cmCtx.fillRect(0,0,cmCanvas.width, cmCanvas.height)

let DRAW_COLOR = "black"
let DRAW_WIDTH = "2"
let isDrawing = false;
 
clientName.addEventListener('input', changeTitle)

clearBtn.addEventListener('click', clearCanvas)
cmClearBtn.addEventListener('click', cmClearCanvas)

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false)
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false)

canvas.addEventListener('mouseout', stop, false)
canvas.addEventListener('touchend', stop, false)
canvas.addEventListener('mouseup', stop, false)

cmCanvas.addEventListener('touchstart', cmStart, false);
cmCanvas.addEventListener('touchmove', cmDraw, false)
cmCanvas.addEventListener('mousedown', cmStart, false);
cmCanvas.addEventListener('mousemove', cmDraw, false)

cmCanvas.addEventListener('mouseout', cmStop, false)
cmCanvas.addEventListener('touchend', cmStop, false)
cmCanvas.addEventListener('mouseup', cmStop, false)


function changeTitle () {
  const today = new Date().toLocaleDateString()
  document.title =  `Medication Delivery Form - ${clientName.value} - ${today}`
  window.document.documentURI = ""
  console.log(document.title)
}

function start(event) {
  isDrawing = true
  ctx.beginPath()
  ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)

  event.preventDefault()
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

function cmClearCanvas(){
  cmCtx.clearRect(0,0, cmCanvas.width, cmCanvas.height)
}


function cmStart(event) {
  isDrawing = true
  cmCtx.beginPath()
  cmCtx.moveTo(event.clientX - cmCanvas.offsetLeft, event.clientY - cmCanvas.offsetTop)

  event.preventDefault()
}

function cmDraw(event){
  if(event.touches){
    let touch = event.touches[0]
    let mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    cmCanvas.dispatchEvent(mouseEvent)
  }
  if(isDrawing){
   
    cmCtx.lineTo(event.clientX - cmCanvas.offsetLeft,
      event.clientY - cmCanvas.offsetTop)
    cmCtx.lineCap = 'round'
    cmCtx.lineJoin = 'round';
    cmCtx.stroke()
  }
}

function cmStop(event) {
  if (isDrawing){
    cmCtx.stroke()
    cmCtx.closePath()
    isDrawing = false
  }
  event.preventDefault()
}