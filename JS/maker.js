/**
 * !MAKER ANIM START
 */

const SIZE_MAP = 15
let making = false

let clicked = true

let maker_button = document.getElementById("maker_button")
let maker_panel = document.getElementById("container_make")
let wall_button = document.getElementById("add_wall")
let door_button = document.getElementById("add_door")
let lever_button = document.getElementById("add_button")
let hole_button = document.getElementById("add_hole")
let torch_button = document.getElementById("add_torch")
let erase_button = document.getElementById("erase")
let save_button = document.getElementById("disquette")

let wallTest = false,
    doorTest = false,
    leverTest = false,
    holeTest = false,
    torchTest = false,
    eraseTest = false
maker_button.addEventListener("click", initMaker)
wall_button.addEventListener("click", function() { if (clicked == true) { addWall() } })
door_button.addEventListener("click", function() { if (clicked == true) { addDoor() } })
lever_button.addEventListener("click", function() { if (clicked == true) { addLever() } })
hole_button.addEventListener("click", function() { if (clicked == true) { addHole() } })
torch_button.addEventListener("click", function() { if (clicked == true) { addTorch() } })
erase_button.addEventListener("click", function() { if (clicked == true) { erase() } })
save_button.addEventListener("click", function() { if (clicked == true) { savemapMaker() } })
document.getElementById("resetMaker").addEventListener("click", function() { if (clicked == true) { resetMaker() } })
document.getElementById("cancel_save").addEventListener("click", function() {
    clicked = true;
    document.getElementById("askForSave").style.display = "none";
})
document.getElementById("save_save").addEventListener("click", function() { if (clicked == false) { sendToDB() } })
let count = 0


function savemapMaker() {
    document.getElementById("askForSave").style.display = "flex";
    clicked = false
}

function sendToDB() {
    let name = document.getElementById("nameOfMap").value
    if (name == "") {
        document.getElementById("gamelost").innerHTML = "PLEASE NAME YOUR MAP"
        document.getElementById("gamelost").style.zIndex = "101"
        document.getElementById("gamelost").style.display = "flex"
        setTimeout(() => {
            document.getElementById("gamelost").style.display = "none"
            document.getElementById("gamelost").style.zIndex = "100"
            document.getElementById("gamelost").innerHTML = "GAME LOST !"
        }, 1000);
    } else {
        const author = document.getElementById('username_field').value;
        uploadCurrentMap(name, author)
        clicked = true;
        document.getElementById("askForSave").style.display = "none";
    }
}

function initMaker() {
    if (count == 0) {
        maker_button.innerHTML = "PLAY"
        maker_panel.style.display = "flex";
        maker_panel.style.marginLeft = "calc(50vw - 50vh)";
        playing = false
        count = 1
        document.getElementById("obstacles").style.zIndex = "100"
        document.getElementById("bouton_commande").style.display = "none";
        document.getElementById("bottom_line").style.display = "none";
        document.getElementById("instructions").style.display = "flex";
        making = true

    } else {
        maker_button.innerHTML = "MAKE"
        maker_panel.style.display = "none";
        maker_panel.style.marginLeft = "calc(50vw)";
        playing = true
        document.getElementById("obstacles").style.zIndex = "0"
        document.getElementById("bottom_line").style.display = "flex";
        document.getElementById("bouton_commande").style.display = "flex";
        document.getElementById("instructions").style.display = "none";
        document.getElementById("askForSave").style.display = "none";

        making = false
        count = 0
        cancelled = false
        getStarted()
        return false
    }
    initMapMaker()
}

function initMapMaker() {
    cancelled = true
    clearMap()
}

function resetMaker() {
    clearMap()
}

function resetButtons() {
    wall_button.style.border = "2px solid transparent"
    wall_button.style.filter = "grayscale(1)"
    door_button.style.border = "2px solid transparent"
    door_button.style.filter = "grayscale(1)"
    lever_button.style.border = "2px solid transparent"
    lever_button.style.filter = "grayscale(1)"
    hole_button.style.border = "2px solid transparent"
    hole_button.style.filter = "grayscale(1)"
    torch_button.style.border = "2px solid transparent"
    torch_button.style.filter = "grayscale(1)"
    erase_button.style.border = "2px solid transparent"
    erase_button.style.filter = "grayscale(1)"
}

function addWall() {
    resetButtons()
    wall_button.style.border = "2px solid black"
    wall_button.style.filter = "none"
    doorTest = false
    wallTest = true
    leverTest = false
    holeTest = false
    torchTest = false
    eraseTest = false
}

function erase() {
    resetButtons()
    erase_button.style.border = "2px solid black"
    erase_button.style.filter = "none"
    doorTest = false
    wallTest = false
    leverTest = false
    holeTest = false
    torchTest = false
    eraseTest = true
}

function addDoor() {
    resetButtons()
    door_button.style.border = "2px solid black"
    door_button.style.filter = "none"
    doorTest = true
    wallTest = false
    leverTest = false
    holeTest = false
    torchTest = false
    eraseTest = false
}

function addLever() {
    resetButtons()
    lever_button.style.border = "2px solid black"
    lever_button.style.filter = "none"
    doorTest = false
    wallTest = false
    leverTest = true
    holeTest = false
    eraseTest = false
    torchTest = false
}

function addHole() {
    resetButtons()
    hole_button.style.border = "2px solid black"
    hole_button.style.filter = "none"
    doorTest = false
    wallTest = false
    leverTest = false
    holeTest = true
    eraseTest = false
    torchTest = false
}

function addTorch() {
    resetButtons()
    torch_button.style.border = "2px solid black"
    torch_button.style.filter = "none"
    doorTest = false
    wallTest = false
    leverTest = false
    eraseTest = false
    holeTest = false
    torchTest = true
}

function drawWallClick(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (obstaclesArray[y * 15 + x].id === undefined) {
            addObstacle(3, x, y)
        }
    }
}

function drawDoorClick(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (obstaclesArray[y * 15 + x].id === undefined) {
            if (x != 0 && x != 14 && y != 0 && y != 14) {
                createDoor(x, y, 2);
            } else {
                createDoorBorder(x, y, 2)
            }
        }
    }
}
let IsAnyDoorAvailable = () => {
    for (let index = 0; index < obstaclesArray.length; index++) {
        if (obstaclesArray[index].id == 2) {
            return true
        }
    }
    document.getElementById("gamelost").innerHTML = "NO DOOR AVAILABLE"
    document.getElementById("gamelost").style.display = "flex"
    setTimeout(() => {
        document.getElementById("gamelost").style.display = "none"
        document.getElementById("gamelost").innerHTML = "GAME LOST !"

    }, 1000);
    return false
}



function drawLeverClick(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (clicked == true && obstaclesArray[y * 15 + x].id === undefined && IsAnyDoorAvailable()) {
            addObstacle(1, x, y)
            clicked = false
            setTimeout(() => {
                darkenExcept()
                let saveUsagesForLeverInUse = obstaclesArray[y * 15 + x].usages
                addObstacle(1, x, y)
                obstaclesArray[y * 15 + x].usages = saveUsagesForLeverInUse
            }, 10);
        } else if (clicked == false) {
            for (let index = 0; index < 15; index++) {
                if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                    for (let index2 = 0; index2 < 15; index2++) {
                        if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                            if (obstaclesArray[index2 * 15 + index].id == 1) {
                                resetObstacleAfterLink()
                                clicked = true
                                return true
                            }
                        }
                    }
                }

            }
            for (let index = 0; index < 15; index++) {
                if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                    for (let index2 = 0; index2 < 15; index2++) {
                        if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                            if (obstaclesArray[index2 * 15 + index].id == 2) {
                                //clicked = true
                                linkToDoor(x, y, index, index2)
                                resetObstacleAfterLink()
                                setTimeout(() => {
                                    darkenExcept()
                                    makeRedDoors(x, y)
                                    let saveUsagesForLeverInUse = obstaclesArray[y * 15 + x].usages
                                    addObstacle(1, x, y)
                                    obstaclesArray[y * 15 + x].usages = saveUsagesForLeverInUse
                                }, 10);
                            }
                        }
                    }
                }
            }
        }

    }

}

function darkenExcept() {
    for (let index = 0; index < 15; index++) {
        for (let index2 = 0; index2 < 15; index2++) {
            context.fillStyle = "rgba(0,0,0,.6)";
            if (obstaclesArray[index * 15 + index2].id != 2) {
                context.fillRect(index2 * 100 - 10, index * 100, 100, 100);
            }
        }
    }
}

function makeRedDoors(leverx, levery) {
    context.fillStyle = "rgba(255,0,0,0.3)";
    for (let o = 0; o < obstaclesArray[levery * 15 + leverx].usages.length; o++) {
        for (let index = 0; index < 15; index++) {
            for (let index2 = 0; index2 < 15; index2++) {
                if (obstaclesArray[levery * 15 + leverx].usages[o].x == obstaclesArray[index * 15 + index2].x && obstaclesArray[levery * 15 + leverx].usages[o].y == obstaclesArray[index * 15 + index2].y) {
                    context.fillRect(obstaclesArray[index * 15 + index2].x * 100 - 10, obstaclesArray[index * 15 + index2].y * 100, 100, 100);
                    let saveUsagesForLeverInUse = obstaclesArray[index * 15 + index2].usages
                    addObstacle(2, index2, index)
                    obstaclesArray[index * 15 + index2].usages = saveUsagesForLeverInUse
                }

            }
        }
    }
}

function resetObstacleAfterLink() {
    for (let index = 0; index < 15; index++) {
        for (let index2 = 0; index2 < 15; index2++) {
            context.clearRect(index2 * 100 - 10, index * 100, 100, 100)
            addObstacle(obstaclesArray[index * 15 + index2].id, obstaclesArray[index * 15 + index2].x, obstaclesArray[index * 15 + index2].y)
        }
    }
}

function drawHoleClick(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (obstaclesArray[y * 15 + x].id === undefined) {
            addObstacle(4, x, y)
        }
    }
}

function drawTorchClick(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (obstaclesArray[y * 15 + x].id === undefined) {
            addObstacle(5, x, y)
        }
    }
}

function eraseObstacleMaker(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (obstaclesArray[y * 15 + x].id != undefined && obstaclesArray[y * 15 + x].id != 1 && obstaclesArray[y * 15 + x].id != 2) {
            context.clearRect(x * 100 - 10, y * 100, 100, 100)
            obstaclesArray[y * 15 + x] = { id: undefined, x: undefined, y: undefined, usages: [] }
        } else
        if (obstaclesArray[y * 15 + x].id == 1 || obstaclesArray[y * 15 + x].id == 2) {
            context.clearRect(x * 100 - 10, y * 100, 100, 100)
            let usageWithout = obstaclesArray[y * 15 + x].usages
            obstaclesArray[y * 15 + x] = {
                id: undefined,
                x: undefined,
                y: undefined,
                usages: []
            }
            for (var i = 0; i < usageWithout.length; i++) {
                xtemp = usageWithout[i].x
                ytemp = usageWithout[i].y
                for (let index = 0; index < obstaclesArray[ytemp * 15 + xtemp].usages.length; index++) {
                    if (x == obstaclesArray[ytemp * 15 + xtemp].usages[index].x && y == obstaclesArray[ytemp * 15 + xtemp].usages[index].y) {
                        obstaclesArray[ytemp * 15 + xtemp].usages.splice(index, 1);
                    }
                }
            }

        }
    }
}

/**
 * !Link a lever to a door by editing 'obstaclesArray'
 * @param {int} lever_x
 * @param {int} lever_y
 * @param {int} door_x
 * @param {int} door_y
 * @returns If it's ok or not (bool)
 */
function linkToDoor(lever_x, lever_y, door_x, door_y) {
    const idx_lever = lever_y * SIZE_MAP + lever_x
    const idx_door = door_y * SIZE_MAP + door_x

    // Check params
    if (obstaclesArray[idx_lever].id === undefined || obstaclesArray[idx_door].id === undefined)
        return false
    if (obstaclesArray[idx_lever].id !== 1 || obstaclesArray[idx_door].id !== 2)
        return false

    // Add the door to the lever usages
    obstaclesArray[idx_lever].usages.push({
            id: obstaclesArray[idx_door].id,
            x: obstaclesArray[idx_door].x,
            y: obstaclesArray[idx_door].y,
            usages: []
        })
        // Add the lever to the door usages
    obstaclesArray[idx_door].usages.push({
        id: obstaclesArray[idx_lever].id,
        x: obstaclesArray[idx_lever].x,
        y: obstaclesArray[idx_lever].y,
        usages: []
    })

    return true
}

/**
 * Turn the map array to a server friendly array
 * @param {Object[]} obstacles 
 * @returns The items array to send to the server
 */
function toItemsArray(obstacles) {
    let items = []
    for (let y = 0; y < SIZE_MAP; y++) {
        for (let x = 0; x < SIZE_MAP; x++) {
            const el = obstacles[y * SIZE_MAP + x]
            if (el.id !== undefined)
                items.push(el)
        }
    }
    return items
}

/**
 * Upload the current maked map
 * @param {String} name The map name
 * @param {String} author The maker name
 */
function uploadCurrentMap(name, author) {
    // The map object
    const map = {
        name,
        author,
        items: toItemsArray(obstaclesArray)
    }
    console.log(map)
        // Upload this map to the server
    uploadNewMap(map)
        .then(() => console.log('Map uploaded !'))
        .catch((err) => {
            alert("Error...")
            console.error(err)
        })
}

/**
 * !DEBUG FUNCTIONS
 */
function findItem(id) {
    for (let y = 0; y < SIZE_MAP; y++) {
        for (let x = 0; x < SIZE_MAP; x++) {
            const el = obstaclesArray[y * SIZE_MAP + x]
            if (el.id === id) return el
        }
    }
    return null
}

/**
 * MOVES 
 */
let largeurCase = 30


function handleMouseMove(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    console.log(mouseX, mouseY)
        //!Create a wall
    if (clicked && wallTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        drawWallClick(index, index2)
                    }
                }
            }

        }
    }
    //!DELETE 
    if (clicked && eraseTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        eraseObstacleMaker(index, index2)
                    }
                }
            }

        }
    }
    //!Create a door
    if (clicked && doorTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        drawDoorClick(index, index2)
                    }
                }
            }

        }
    }
    //!Create a Lever
    if (clicked && leverTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        drawLeverClick(index, index2)
                    }
                }
            }

        }
    }
    //!Create a Hole
    if (clicked && holeTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        drawHoleClick(index, index2)
                    }
                }
            }

        }
    }
    //!Create a Torch
    if (clicked && torchTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        drawTorchClick(index, index2)
                    }
                }
            }

        }
    }
}
let canvaOver = false
document.getElementById("obstacles").addEventListener("mouseover", function() {
    canvaOver = true
})
document.getElementById("obstacles").addEventListener("mouseout", function() {
    canvaOver = false
})

$("#obstacles").mousemove(function(e) {
    handleMouseMove(e);
});

var canvasOffset = $("#obstacles").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;