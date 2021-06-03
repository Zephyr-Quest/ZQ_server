/**
 *  !Global Var
 */

let canvasObstacles = document.getElementById('obstacles')
let obstaclesArray = []
var context = canvasObstacles.getContext("2d");
let doorIndex = 0
let leverIndex = 0
let saveUsage = []

/**
 * !Game settings
 */

var obstacle = {
    size: 100
}

/**
 * !OBSTACLES CREATION 
 */
function initializeObstacles() {
    obstaclesArray.splice(0, 225)
    clearMap()
    for (let index = 0; index < map.length; index++) {
        if (map[index].id == 3) {
            addObstacle(map[index].id, map[index].x, map[index].y)
        }
    }
    for (let index = 0; index < map.length; index++) {
        if (map[index].id != 3) {
            addObstacle(map[index].id, map[index].x, map[index].y)
        }
    }
}

function addObstacle(id, xpos, ypos) { //ID en fonction de l'obstacle

    switch (id) {
        case 1:
            createLever(xpos, ypos, id)
            break;
        case 2:
            if (xpos != 0 && xpos != 14 && ypos != 0 && ypos != 14) {
                createDoor(xpos, ypos, id);
            } else {
                createDoorBorder(xpos, ypos, id)
            }
            break;
        case 3:
            createWall(xpos, ypos, id)
            break;
        case 4:
            createHole(xpos, ypos, id)
            break;
        case 5:
            createTorch(xpos, ypos, id)
            break;
    }
}

function checkObstacles() {
    try {
        id = obstaclesArray[player.cooY * 15 + player.cooX].id
        switch (id) {
            case 4:
                reset()
                gameLostAnimation()
                player.x = startX
                player.y = startY
                player.cooX = 0
                player.cooY = 7
                break;
        }
    } catch (error) {
        return true
    }
}

function createLever(xpos, ypos, id) {
    const image = new Image();
    image.src = '../img/obstacles/Button_close.png';
    image.onload = () => {
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    saveUsage = obstaclesArray[ypos * 15 + xpos].usages
    obstaclesArray[ypos * 15 + xpos] = { id: id, x: xpos, y: ypos, usages: saveUsage }
}

function createDoor(xpos, ypos, id) {
    if ((obstaclesArray[ypos * 15 + xpos - 1].id == 3 && obstaclesArray[ypos * 15 + xpos + 1].id == 3) || (xpos == 0 && obstaclesArray[ypos * 15 + xpos + 1].id == 3) || (xpos == 14 && obstaclesArray[ypos * 15 + xpos - 1].id == 3)) { // Door on x axis
        const image = new Image();
        image.src = '../img/obstacles/Door_closedX.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        saveUsage = obstaclesArray[ypos * 15 + xpos].usages
        obstaclesArray[ypos * 15 + xpos] = { id: id, x: xpos, y: ypos, usages: saveUsage }
    } else if ((obstaclesArray[(ypos - 1) * 15 + xpos].id == 3 && obstaclesArray[(ypos + 1) * 15 + xpos].id == 3) || (obstaclesArray[(ypos - 1) * 15 + xpos].id == 3 && ypos == 14) || (obstaclesArray[(ypos + 1) * 15 + xpos].id == 3 && ypos == 0)) { // Door on y axis
        const image = new Image();
        image.src = '../img/obstacles/Door_closedY.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        saveUsage = obstaclesArray[ypos * 15 + xpos].usages
        obstaclesArray[ypos * 15 + xpos] = { id: id, x: xpos, y: ypos, usages: saveUsage }
    }
}

function createDoorBorder(xpos, ypos, id) {
    if (xpos == 0 && obstaclesArray[ypos * 15 + xpos + 1].id == 3) {
        const image = new Image();
        image.src = '../img/obstacles/Door_closedX.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        saveUsage = obstaclesArray[ypos * 15 + xpos].usages
        obstaclesArray[ypos * 15 + xpos] = { id: id, x: xpos, y: ypos, usages: saveUsage }
        return true
    }
    if (xpos == 14 && obstaclesArray[ypos * 15 + xpos - 1].id == 3) {
        const image = new Image();
        image.src = '../img/obstacles/Door_closedX.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        saveUsage = obstaclesArray[ypos * 15 + xpos].usages
        obstaclesArray[ypos * 15 + xpos] = { id: id, x: xpos, y: ypos, usages: saveUsage }
        return true
    }
    if (ypos == 0 && obstaclesArray[(ypos + 1) * 15 + xpos].id == 3) {
        const image = new Image();
        image.src = '../img/obstacles/Door_closedY.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        saveUsage = obstaclesArray[ypos * 15 + xpos].usages
        obstaclesArray[ypos * 15 + xpos] = { id: id, x: xpos, y: ypos, usages: saveUsage }
        return true
    }
    if (ypos == 14 && obstaclesArray[(ypos - 1) * 15 + xpos].id == 3) {
        const image = new Image();
        image.src = '../img/obstacles/Door_closedY.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        saveUsage = obstaclesArray[ypos * 15 + xpos].usages
        obstaclesArray[ypos * 15 + xpos] = { id: id, x: xpos, y: ypos, usages: saveUsage }
        return true
    }
}

function createWall(xpos, ypos, id) {
    const image = new Image();
    image.src = '../img/obstacles/Wall.png';
    image.onload = () => {
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    saveUsage = obstaclesArray[ypos * 15 + xpos].usages
    obstaclesArray[ypos * 15 + xpos] = { id: id, x: xpos, y: ypos, usages: saveUsage }



}

function createHole(xpos, ypos, id) {
    const image = new Image();
    image.src = '../img/obstacles/Hole.png';
    image.onload = () => {
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    saveUsage = obstaclesArray[ypos * 15 + xpos].usages
    obstaclesArray[ypos * 15 + xpos] = { id: id, x: xpos, y: ypos, usages: saveUsage }


}

function createTorch(xpos, ypos, id) {
    if (obstaclesArray[ypos * 15 + xpos].id === undefined) {
        const image = new Image();
        image.src = '../img/obstacles/Torche.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        saveUsage = obstaclesArray[ypos * 15 + xpos].usages
        obstaclesArray[ypos * 15 + xpos] = { id: id, x: xpos, y: ypos, usages: saveUsage }

    }
}


/**
 * !MANAGE AND CREATE LIGHTS
 */

function lightsOnPlayer() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, x * 2, y * 2);
    cutCircle(ctx, player.x, player.y, light.width / 2)
        /*ctx.beginPath();
        ctx.arc(player.x, player.y, light.width / 2, 0, 2 * Math.PI);
        gradient = ctx.createRadialGradient(player.x, player.y, 40, player.x, player.y, light.width / 2);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "black");
        ctx.fillStyle = gradient;
        ctx.fill();*/
    drawLightsBack()
}

/**
 * !TORCH DETECTION AND CHANGE LIGHT
 */

function checkTorch() {
    if (obstaclesArray[player.cooY * 15 + player.cooX].id == 5) { //If torch on our way
        player.torch += 1
            //saveArray = obstaclesArray
        obstaclesArray[player.cooY * 15 + player.cooX].id = undefined
        context.clearRect(player.cooX * 100 - 10, player.cooY * 100, player.moveSize * 2 - 20, player.moveSize * 2 - 20);
        light.width += 100;
        document.getElementById("torche_prise").play()

    }
}

/**
 * !DOOR SYSTEM (OPENING AND CLOSING)
 */

function openDoor(xpos, ypos) {
    document.getElementById("porte").play()
    obstaclesArray[ypos * 15 + xpos].id = undefined
    context.clearRect(xpos * 100 - 10, ypos * 100, player.moveSize * 2 - 20, player.moveSize * 2 - 20)
}

function closeDoor(xpos, ypos) {
    document.getElementById("porte").play()
    if (xpos != 0 && xpos != 14 && ypos != 0 && ypos != 14) {
        createDoor(xpos, ypos, 2);
    } else {
        createDoorBorder(xpos, ypos, 2)
    }
}

/**
 * !DOOR SYSTEM ACTIVATION
 */
let doorState = undefined

function isOpen(xpos, ypos) {
    if (obstaclesArray[ypos * 15 + xpos].id === undefined) {
        return true
    } else {
        return false
    }
}

document.getElementById("engrenage").volume = '.1'

function activateLever(xpos, ypos) {
    if (numberOfTry == 0) {
        reset()
        document.getElementById("gamelost").innerHTML = "YOU MADE TOO MANY INTERACTIONS !<br>YOU LOST !"
        document.getElementById("gamelost").style.zIndex = "101"
        document.getElementById("gamelost").style.display = "flex"
        setTimeout(() => {
            document.getElementById("gamelost").style.display = "none"
            document.getElementById("gamelost").style.zIndex = "100"
            document.getElementById("gamelost").innerHTML = "GAME LOST !"
        }, 1000);
        return false
    }
    tryNumber()
    const image = new Image();
    image.src = '../img/obstacles/Button_open.png';
    image.onload = () => {
        context.clearRect(xpos * 100 - 10, ypos * 100, player.moveSize * 2 - 20, player.moveSize * 2 - 20);
        //context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    obstaclesArray[ypos * 15 + xpos] = { id: undefined, x: undefined, y: undefined, usages: [] }
    document.getElementById("engrenage").play()
    for (let index = 0; index < map.length; index++) {
        if (map[index].x == xpos && map[index].y == ypos) {
            for (let i = 0; i < map[index].usages.length; i++) {
                doorState = isOpen(map[index].usages[i].x, map[index].usages[i].y)
                if (doorState) {
                    closeDoor(map[index].usages[i].x, map[index].usages[i].y)
                } else {
                    openDoor(map[index].usages[i].x, map[index].usages[i].y)
                }

            }
        }

    }
}

function desactivateLever(xpos, ypos) {
    tryNumber()
    const image = new Image();
    image.src = '../img/obstacles/Button_close.png';
    image.onload = () => {
        context.clearRect(xpos * 100 - 10, ypos * 100, player.moveSize * 2 - 20, player.moveSize * 2 - 20);
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    obstaclesArray[ypos * 15 + xpos].id = 1
    document.getElementById("engrenage").play()
    for (let index = 0; index < map.length; index++) {
        if (map[index].x == xpos && map[index].y == ypos) {
            for (let i = 0; i < map[index].usages.length; i++) {
                doorState = isOpen(map[index].usages[i].x, map[index].usages[i].y)
                if (doorState) {
                    closeDoor(map[index].usages[i].x, map[index].usages[i].y)
                } else {
                    openDoor(map[index].usages[i].x, map[index].usages[i].y)
                }

            }
        }

    }
}

/**
 * !DISABLE NO LIGHT
 */

function sun() {
    light.width = 200000
}