const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const side = 47
const offset = 27

const background = new Image()
background.src = "assets/kaya-wood-grain-original.jpeg"

background.onload = function() {
    ctx.drawImage(background, 0, 0, 900, 900)
    for (let i = 0; i < 18; i++) {
        for (let k = 0; k < 18; k++) {
            ctx.strokeRect(i * side + offset, k * side + offset, side, side)
        }
    }
}

let turn = 1; // turn number
let playing = true // true = black, false = white

function getMousePos(canvas, e) {
    let rect = canvas.getBoundingClientRect()
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

canvas.addEventListener('click', (e) => {
    let pos = getMousePos(canvas, e)
    console.log(`${pos.x} ${pos.y}`)
    if (playing) {
        ctx.fillStyle = 'black'
    } else {
        ctx.fillStyle = 'white'
    }
    let snapX = offset + side * (Math.floor(( pos.x * 0.992 ) / side))
    let snapY = offset + side * (Math.floor(( pos.y * 0.992 ) / side))

    console.log(`${snapX}, ${snapY}`)
    console.log(`${Math.floor(pos.x / side)}, ${Math.floor(pos.y / side)}`)

    ctx.fillRect(snapX - 20, snapY - 20, 41, 41)

    turn++
    playing = !playing
})