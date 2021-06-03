/**
 *  !Global Var
 */

let canvas = document.getElementById('myCanvas')
let x = canvas.getAttribute('width') / 2;
let y = canvas.getAttribute('height') / 2;
let startX = 320;
let startY = canvas.getAttribute('height') / 2;
let endX = 14;
let endY = 7;
let alive = true;
let playing = false
let state
    /*! ODD NUMBER FOR THE MAP LENGHT !*/
let mapLenght = 15;
let sizeOfCircle = (x / mapLenght) - 2;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let wait = 0
let wall




/**
 * !Game settings
 */

var light = {
    width: 4000000,
    torch: 200,
    background_big: 40000000,
    background_small: 400000000
}

var game = {
    lenght: mapLenght,
    bcc: "white",
}

var player = {
    cooX: 0,
    cooY: 7,
    x: startX,
    y: startY,
    radius: 25,
    moveSize: 61,
    left: false,
    forward: false,
    right: false,
    backward: false,
    torch: 0
}

/**
 * !DETECTION OF KEYS FOR MOVEMENT
 */

var leftKey = 37;
var upKey = 38;
var rightKey = 39;
var downKey = 40;
var enterKey = 13;

/**
 * !MOVING THE CHARACTER
 */

$(window).keydown(function(e) { // Key pushed
    if (making == true) { return true }
    if ((alive == false || playing == false)) { return false }
    if (this.className === 'hold') { return false; }
    this.className = 'hold';
    var keyCode = e.keyCode;
    if (keyCode == leftKey) {
        player.left = true;
        player.right = false;
        player.backward = false;
        player.forward = false;
        updateStageObject()
        checkTorch()
    } else if (keyCode == upKey) {
        player.left = false;
        player.right = false;
        player.backward = false;
        player.forward = true;
        updateStageObject()
        checkTorch()
    } else if (keyCode == rightKey) {
        player.left = false;
        player.right = true;
        player.backward = false;
        player.forward = false;
        updateStageObject()
        checkTorch()
    } else if (keyCode == downKey) {
        player.left = false;
        player.right = false;
        player.backward = true;
        player.forward = false;
        updateStageObject()
        checkTorch()
    } else if (keyCode == enterKey) {
        player.left = false;
        player.right = false;
        player.backward = false;
        player.forward = false;
        if (obstaclesArray[player.cooY * 15 + player.cooX].id == 1) {
            activateLever(player.cooX, player.cooY)
        } else
        if (player.cooY != 0 && obstaclesArray[(player.cooY - 1) * 15 + player.cooX].id == 1) {
            activateLever(player.cooX, player.cooY - 1)
        } else
        if (player.cooY != 14 && obstaclesArray[(player.cooY + 1) * 15 + player.cooX].id == 1) {
            activateLever(player.cooX, player.cooY + 1)
        } else
        if (player.cooX != 14 && obstaclesArray[player.cooY * 15 + player.cooX + 1].id == 1) {
            activateLever(player.cooX + 1, player.cooY)
        } else
        if (player.cooX != 0 && obstaclesArray[player.cooY * 15 + player.cooX - 1].id == 1) {
            activateLever(player.cooX - 1, player.cooY)
        }
        updateStageObject()
        checkTorch()
    }

});

$(window).keyup(function(e) { // Key stop push
    if (playing == false) { return false }
    this.className = '';
    var keyCode = e.keyCode;
    if (keyCode == leftKey) {
        player.left = false;
        drawPlayerWait('left', player.x, player.y)
    } else if (keyCode == upKey) {
        player.forward = false;
        drawPlayerWait('forward', player.x, player.y)
    } else if (keyCode == rightKey) {
        player.right = false;
        drawPlayerWait('right', player.x, player.y)
    } else if (keyCode == downKey) {
        player.backward = false;
        drawPlayerWait('backward', player.x, player.y)
    }
})


/**
 * !ANIMATION PLAYER
 */
let walkCount = 1

document.getElementById("bruits_pas_1").volume = "0.3"
document.getElementById("bruits_pas_2").volume = ".3"

function soundWalk() {
    if (walkCount == 1) {
        document.getElementById("bruits_pas_1").play()
        walkCount = 0
    } else {
        document.getElementById("bruits_pas_2").play()
        walkCount = 1
    }
}

function animationChoose() {
    if (state == 0) {
        state = 1;
    } else if (state == 1) {
        state = 2
    } else { state = 1 }
}

/**
 * !DRAW PLAYER AND ERASE PLAYER
 */

function drawPlayer(url, x, y) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
        lightsOnPlayer()
        ctx.drawImage(image, x - player.radius, y - player.radius, player.radius * 2, player.radius * 2)
    }
}

function drawPlayerWait(goTo, x, y) {
    ctx.clearRect(player.x - player.radius - 2, player.y - player.radius - 2, player.radius * 2, player.radius * 2);
    const image = new Image();
    image.src = '../img/' + goTo + '/character_stopped.png';
    image.onload = () => {
        ctx.drawImage(image, x - player.radius, y - player.radius, player.radius * 2, player.radius * 2)
    }
}

function clearPreviousPosition() {
    ctx.clearRect(player.x - player.radius - 2, player.y - player.radius - 2, player.radius * 2, player.radius * 2);
}

function drawPlayerInDaGame(goTo) {
    switch (state) {
        case 1:
            drawPlayer('../img/' + goTo + '/character_moving_left.png', player.x, player.y)
            break;

        case 2:
            drawPlayer('../img/' + goTo + '/character_moving_right.png', player.x, player.y)
            break;
    }
}



/**
 * !UPDATE OF THE MOVEMENT
 */

function updateStageObject() {
    if (player.left && player.x - player.moveSize > 0) {
        if (player.cooX % 15 != 0 && obstaclesArray[player.cooY * 15 + player.cooX - 1].id != 3 && obstaclesArray[player.cooY * 15 + player.cooX - 1].id != 2 && obstaclesArray[player.cooY * 15 + player.cooX - 1].id != 1 && obstaclesArray[player.cooY * 15 + player.cooX - 1].id != 0) {
            soundWalk()
            animationChoose()
            clearPreviousPosition()
            player.x -= player.moveSize;
            player.cooX -= 1;
            drawPlayerInDaGame('left');
        }
    }
    if (player.right && player.x + player.moveSize + player.radius < canvas.getAttribute('width')) {
        if (player.cooX % 15 != 14 && obstaclesArray[player.cooY * 15 + player.cooX + 1].id != 3 && obstaclesArray[player.cooY * 15 + player.cooX + 1].id != 2 && obstaclesArray[player.cooY * 15 + player.cooX + 1].id != 1 && obstaclesArray[player.cooY * 15 + player.cooX + 1].id != 0) {
            soundWalk()
            animationChoose()
            clearPreviousPosition()
            player.x += player.moveSize;
            player.cooX += 1;
            drawPlayerInDaGame('right');
        }
    }
    if (player.forward && player.y - player.moveSize > 0) {
        if (player.cooY % 15 != 0 && obstaclesArray[(player.cooY - 1) * 15 + player.cooX].id != 3 && obstaclesArray[(player.cooY - 1) * 15 + player.cooX].id != 2 && obstaclesArray[(player.cooY - 1) * 15 + player.cooX].id != 1 && obstaclesArray[(player.cooY - 1) * 15 + player.cooX].id != 0) {
            soundWalk()
            animationChoose()
            clearPreviousPosition()
            player.y -= player.moveSize;
            player.cooY -= 1;
            drawPlayerInDaGame('forward');
        }
    }
    if (player.backward && player.y + player.moveSize < canvas.getAttribute('height')) {
        if (player.cooY % 15 != 14 && obstaclesArray[(player.cooY + 1) * 15 + player.cooX].id != 3 && obstaclesArray[(player.cooY + 1) * 15 + player.cooX].id != 2 && obstaclesArray[(player.cooY + 1) * 15 + player.cooX].id != 1 && obstaclesArray[(player.cooY + 1) * 15 + player.cooX].id != 0) {
            soundWalk()
            clearPreviousPosition()
            animationChoose()
            player.y += player.moveSize;
            player.cooY += 1;
            drawPlayerInDaGame('backward');
        }
    }
    checkEnd()
    checkObstacles();

}