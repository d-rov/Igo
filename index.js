const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const side = 47
const offset = 27

const background = new Image()
background.src = "assets/kaya-wood-grain-original.jpeg"

// 0 unplayed
// 1 black
// 2 white
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

function draw() {
    // redraw squares
    // paint the stones to the board
}

function checkLiberties(x, y) {
    // take an X and Y pos and check if the stone has any liberties left
    let liberties = 4 // start with 4 and remove
    // if x is 0 or 18 remove a liberty
    if (x == 0 || x == 18) {
        liberties--
    }
    // if y is 0 or 18 remove a liberty
    if (y == 0 || y == 18) {
        liberties--
    }
    // stone has enemy next to it remove a liberty
    // need to account for groups of stones. tricky?
}

function updateGrid(grid) {
    let redraw = false
    let gridCopy = grid
    // check each stone to make sure all stones have at least one liberty
    // if a stone has no liberties switch it to 0
    for (let i = 0; i < grid.length; i++) {
        for (let k = 0; k < grid.length; k++) {
            // checkLiberties
            // if none remove stone/group
            // if stone removed redraw = true
        }
    }
    // need to update a copy of grid while checking original
    //    will prevent only removing patial groups
    // if stones were removed redraw
    if (redraw) {
        grid = gridCopy // replace grid with update
        draw()
    }
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

    turn++
    playing = !playing
})