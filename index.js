/*

checking liberties of groups:
- build the groups
- store lists of each color groups globally?
- each group will be an object with a list of its member stones
- can keep track of liberties so it's not necessary to calculate on the fly
- can subtract a liberty if it gets filled, when it gets filled
- single stones will be groups as well
- if multiple groups contain the same member stone, merge them

*/

const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const side = 47
const offset = 27

const grid = [] // 0 : empty, 1 : black, 2 : white
const blackGroups = []
const whiteGroups = []

const background = new Image()
background.src = "assets/kaya-wood-grain-original.jpeg"

background.onload = function() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
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
    console.log('redraw initiated')
    // clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    // might need to redraw background
    // redraw squares
    for (let i = 0; i < 18; i++) {
        for (let k = 0; k < 18; k++) {
            ctx.strokeRect(i * side + offset, k * side + offset, side, side)
        }
    }
    // paint the stones to the board
    for (let i = 0; i < grid.length; i++) { // row
        for (let k = 0; k < grid.length; k++) { // column
            switch (grid[i][k]) {
                case 1:
                    // black stone
                    ctx.fillStyle = 'black'
                    ctx.fillRect(offset + side * k - 20, offset + side * i - 20, 41, 41)
                    break
                case 2:
                    // white stone
                    ctx.fillStyle = 'white'
                    ctx.fillRect(offset + side * k - 20, offset + side * i - 20, 41, 41)
                    break
                case 0:
                    // no stone
            }
        }
    }
}

function checkLiberties(x, y) {
    // TODO:
    // fix the way I planned this method as it wont work for groups
    //    groups will have more than 4 total liberties potentially

    // take an X and Y pos and check if the stone has any liberties left
    let liberties = 0 // start with 0 and add liberties
    let color = grid[x][y]
    // stone has enemy next to it remove a liberty
    // need to account for groups of stones. tricky?

    return liberties
}

function updateGrid(grid) {
    let redraw = false
    let gridCopy = grid
    // check each stone to make sure all stones have at least one liberty
    // if a stone has no liberties switch it to 0
    for (let i = 0; i < grid.length; i++) {
        for (let k = 0; k < grid.length; k++) {
            // checkLiberties
            let liberties = checkLiberties(k, i)
            // if none remove stone/group
            // if stone removed redraw = true
            if (liberties === 0) {
                gridCopy[k][i] = 0
                redraw = true
            }
        }
    }
    // need to update a copy of grid while checking original
    //    will prevent only removing partial groups
    // if stones were removed redraw
    if (redraw) {
        grid = gridCopy // replace grid with update
        draw()
    }
}

function checkForNeighbors(x, y) {
    // check if a newly placed stone has any neighbors of SAME color
    if ( x > 0 && y > 0 && grid[x - 1][y - 1] !== 0 && grid[x][y] === grid[x - 1][y - 1]) {
        // neighbor found
        // mergeGroups()
    } else if (x > 0 && y < 18 && grid[x - 1][y + 1] !== 0 && grid[x][y] === grid[x - 1][y + 1] ) {
        // neighbor found
        // mergeGroups()
    } else if (x < 18 && y > 0 && grid[x + 1][y - 1] !== 0 && grid[x][y] === grid[x + 1][y - 1]) {
        // ...
    } else if (x < 18 && y < 18 && grid[x + 1][y + 1] !== 0 && grid[x][y] === grid[x + 1][y + 1]) {
        // ...
    }
}

// TODO:
// add inWhatGroup() helper func

function mergeGroups(grp1, grp2) {
    // create a newGrp
    // make sure newGrp contains all members of grp1 + grp2
    // remove grp1, grp2 from group lists
    // add newGrp to group list
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

    draw() // TESTING
    // change to updateGrid() when it's ready

    turn++
    playing = !playing
})