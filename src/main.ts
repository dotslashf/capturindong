import fs from 'fs'
import { createCanvas } from 'canvas'

const width = 800
const height = 500

const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | { tl: number; tr: number; br: number; bl: number } = 5,
  fill = false,
  stroke = true,
) {
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius }
  } else {
    radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius }
  }
  ctx.beginPath()
  ctx.moveTo(x + radius.tl, y)
  ctx.lineTo(x + width - radius.tr, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  ctx.lineTo(x + width, y + height - radius.br)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
  ctx.lineTo(x + radius.bl, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  ctx.lineTo(x, y + radius.tl)
  ctx.quadraticCurveTo(x, y, x + radius.tl, y)
  ctx.closePath()
  if (fill) {
    ctx.fill()
  }
  if (stroke) {
    ctx.stroke()
  }
}

// background
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, width, height)

ctx.fillStyle = '#1da1f2'
ctx.beginPath()
roundRect(ctx, width / 2 / 4 / 2, 30, width - width / 2 / 4, 200, 25, true, false)
ctx.font = '24px Arial'
ctx.textAlign = 'left'
ctx.fillStyle = 'white'
ctx.fillText('Ceritanya Ini Tweet Puh Yang Panjang Lebar', 155, 75)

ctx.beginPath()
ctx.arc(105, 75, 30, 0, 2 * Math.PI, false)
ctx.fillStyle = 'white'
ctx.fill()

const imgBuffer = canvas.toBuffer('image/png')
fs.writeFileSync('image.png', imgBuffer)
