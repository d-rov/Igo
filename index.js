const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const side = 47
const offset = 27

const background = new Image()
background.src = "assets/kaya-wood-grain-original.jpeg"

let grid = []

background.onload = function() {
    ctx.drawImage(background, 0, 0, 900, 900)
    for (let i = 0; i < 18; i++) {
        let row = []
        for (let k = 0; k < 18; k++) {
            row.push(0)
            ctx.strokeRect(i * side + offset, k * side + offset, side, side)
        }
        row.push(0)
        grid.push(row)
    }

    // need one more row for the grid
    let extraRow = []
    for (let p = 0; p < 19; p++) {
        extraRow.push(0)
    }
    grid.push(extraRow)
}

console.log(grid)

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

    let gridX = Math.floor(( pos.x * 0.992 ) / side)
    let gridY = Math.floor(( pos.y * 0.992 ) / side)

    let snapX = offset + side * gridX
    let snapY = offset + side * gridY

    console.log(`${pos.x} ${pos.y}`)
    console.log(`${snapX}, ${snapY}`)
    console.log(`${Math.floor(pos.x / side)}, ${Math.floor(pos.y / side)}`)

    if (playing) {
        ctx.fillStyle = 'black'
        grid[gridY][gridX] = 1
    } else {
        ctx.fillStyle = 'white'
        grid[gridY][gridX] = 2
    }

    console.log(grid)

    ctx.fillRect(snapX - 20, snapY - 20, 41, 41)
    playing = !playing
})