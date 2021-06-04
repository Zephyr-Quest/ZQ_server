/**
 * !MODE ATTENTE
 */
let cancelled = false
let map = undefined
let solutions = undefined

function waitingBeforeStart() {
    ctx.clearRect(player.x - x / 2 / 2, player.y - y / 2, x, y);
    const image = new Image();
    image.src = '../img/right/character_stopped.png';
    image.onload = () => {
        ctx.drawImage(image, player.x - player.radius, player.y - player.radius, player.radius * 2, player.radius * 2)
    }
    animWaitingMaze()

}
var canvasOffsett = $("#obstacles").offset();
var offsetYY = canvasOffsett.top;
// console.log(offsetYY)
let numberOfTry = 0

window.onload = () => {
    document.getElementById("music").volume = '0.2'
    document.getElementById("music").play()
        //console.log(offsetX, offsetY)
        // if (offsetYY != 276) {
        //     canvas.style.display = 'none'
        //     canvasObstacles.style.display = 'none'
        // } else {
        // }
    getStarted()
}

function getNumberOfTry() {
    for (let index = 0; index < map.length; index++) {
        if (map[index].id == 1) {
            numberOfTry++
        }
    }
    numberOfTry++
}


onWindowSize = () => {
    //console.log(offsetX, offsetY)
    offsetYY = canvasOffsett.top;
    // console.log(offsetYY)
    if (offsetYY != 276) {
        canvas.style.display = 'none'
        canvasObstacles.style.display = 'none'
        document.getElementById("gamelost").innerHTML = "GAME NOT AVAILABLE ! YOU NEED A 16:9 SCREEN AND A RESOLUTION OF 100% (USE ISEN COMPUTER)"
        document.getElementById("gamelost").style.display = "flex"
        setTimeout(() => {
            document.getElementById("gamelost").style.display = "none"
            document.getElementById("gamelost").innerHTML = "GAME LOST !"

        }, 1000);
    } else {
        canvas.style.display = 'flex'
        canvasObstacles.style.display = 'flex'
    }
}

// window.addEventListener('resize', onWindowSize, false)

function getStarted() {

    making = false
    player.x = startX
    player.y = startY
    player.cooX = 0
    player.cooY = 7
    clearMap()
    const urlParams = new URLSearchParams(window.location.search);
    console.log(window.location.href)
    if (urlParams.has('map_name')) {
        const map_name = urlParams.get('map_name');
        console.log(map_name)
        getMapByName(map_name)
            .then((data) => {
                if (data.solvable) {
                    map = data.items
                    console.log(data);
                    solutions = data.solutions
                } else {
                    // The map is not solvable
                }
            })
            .catch((err) => {
                // The map was not found
                console.error(err);
            })
        waitingBeforeStart()

    } else {
        // The map param is not found
    }
}
/**
 * !BEGIN GAME
 */

function start() {
    //document.getElementById("music").pause()
    getNumberOfTry()

    document.getElementById("r_shots").innerHTML = "Remaining Shots : " + numberOfTry
    timer()
    console.log("C'est parti ! (START)")
    light.width = 200
    state = 0;
    setTimeout(() => {
        player.x = startX
        player.y = startY
        player.cooX = 0
        player.cooY = 7
        light.background_big = 140
        light.background_small = 90
        const img = new Image();
        img.src = '../img/right/character_stopped.png';
        img.onload = () => {
            ctx.drawImage(img, player.x - player.radius, player.y - player.radius, player.radius * 2, player.radius * 2)
        }
        ctx.fillStyle = "black";
        ctx.globalCompositeOperation = "source-over";
        ctx.fillRect(0, 0, 2 * x, 2 * y);
        cutCircle(ctx, player.x, player.y, light.width / 2)
            /*gradient = ctx.createRadialGradient(player.x, player.y, 40, player.x, player.y, light.width / 2);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "black");
            ctx.beginPath();
            ctx.arc(player.x, player.y, light.width / 2, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.fill();*/
        initializeObstacles()
        drawLightsBack()

    }, 350);
}

/**
 * !BUTTON
 */

document.getElementById("play_button").addEventListener("click", init);
document.getElementById("pause_button").addEventListener("click", pause);
document.getElementById("reset_button").addEventListener("click", reset);

function init() {
    document.getElementById("gamelost").style.display = "none"
    document.getElementById("gamelost").innerHTML = "GAME LOST !"
    cancelled = true
    drawLightsBack()
    lightsOnPlayer()
    drawPlayerWait('right', player.x, player.y)

    if (
        document.getElementById("pause_button").style.color == "gray"
    ) {
        playing = true
        document.getElementById("play_button").style.color = "gray"
        document.getElementById("play_button").setAttribute("disabled", "")
        document.getElementById("pause_button").style.color = "white"
        document.getElementById("reset_button").style.color = "white"
        timer()
    } else {
        document.getElementById("play_button").setAttribute("disabled", "")
        document.getElementById("play_button").style.color = "gray"
        document.getElementById("pause_button").style.color = "white"
        document.getElementById("reset_button").style.color = "white"
        start()
    }

    alive = true;
    playing = true
}

function pause() {
    document.getElementById("gamelost").innerHTML = "PAUSE"
    document.getElementById("gamelost").style.display = "flex"
    console.log("PAUSE")
    clearInterval(timeVar)
    document.getElementById("timer").innerHTML = minute + ":" + second
    timerPlay = false
    document.getElementById("play_button").style.color = "white"
    document.getElementById("pause_button").style.color = "gray"
    document.getElementById("reset_button").style.color = "white"
    playing = false;
}

/**
 * !RESET GAME
 */

function reset() {
    // numberOfTry = getNumberOfTry
    minute = 0
    second = 0
    document.getElementById("timer").innerHTML = "00:00"
    clearInterval(timeVar)
    timerPlay = false
    timer()
    console.log("C'est parti ! (RESET)")
    document.getElementById("play_button").style.color = "gray"
    document.getElementById("pause_button").style.color = "white"
    document.getElementById("reset_button").style.color = "white"
    light.width = 200
    state = 0;
    tempIdx = 3
    playing = true
    setTimeout(() => {
        ctx.clearRect(0, 0, x * 2, y * 2)
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 2 * x, 2 * y);
        cutCircle(ctx, player.x, player.y, light.width / 2)
            /*gradient = ctx.createRadialGradient(player.x, player.y, 60, player.x, player.y, light.width / 2);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "black");
            ctx.beginPath();
            ctx.arc(player.x, player.y, light.width / 2, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.stroke();*/
        const img = new Image();
        img.src = '../img/right/character_stopped.png';
        ctx.drawImage(img, player.x - player.radius, player.y - player.radius, player.radius * 2, player.radius * 2)

        initializeObstacles()
        drawLightsBack()
        drawPlayerWait('right', player.x, player.y)

    }, 50);
    player.x = startX
    player.y = startY
    player.cooX = 0
    player.cooY = 7
}


/**
 *  !END GAME
 */

function checkEnd() {
    if (player.cooX == endX && player.cooY == endY) {
        console.log("Bien joué ! (FIN)")
        playing = false
        document.getElementById("title_win").innerHTML = "WELL DONE !<br>MAP FINISHED IN " + minute + ":" + second
        document.getElementById("gamewin").style.display = "flex"
        document.getElementById("timer").innerHTML = minute + ":" + second
        clearInterval(timeVar)
        timerPlay = false
    }
}

/**
 * !TIMER
 */


let string
const zeroPad = (num, places) => String(num).padStart(places, '0')

let minute = 0
let second = 0
var timeVar
var timerPlay = false

function timer() {
    if (!timerPlay) {
        timeVar = setInterval(() => {
            if (second == 59) {
                minute++
                second = 0
            } else { second++ }
            second = zeroPad(second, 2)
            minute = zeroPad(minute, 2)
            string = minute + ":" + second
            document.getElementById("timer").innerHTML = string
            timerPlay = true
        }, 1000);
    }

}

/**
 * !NUMBER OF TRY
 */

function tryNumber() {
    numberOfTry -= 1
    let r_shots = "Remaining Shots : " + numberOfTry
    document.getElementById("r_shots").innerHTML = r_shots
}

/**
 * !cookie
 */

/**
 * Get a specific cookie by its name
 * @param  {String} cname The cookie name
 * @return {String} The cookies value
 */
function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Add / set a cookie
 * @param {String} cname The cookie name
 * @param {String} cvalue The cookie value
 */
function setCookie(cname, cvalue) {
    let d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/**
 * !DAY NIGHT
 */

daynighticon = document.getElementById("daynight")
daynighticon.addEventListener("click", dayNight)
let saveLightWidth
let saveLightBig
let saveLightSmall

function dayNight() {

    if (daynighticon.className == "fas fa-sun") {
        daynighticon.className = "far fa-moon";
        saveLightWidth = light.width
        saveLightBig = light.background_big
        saveLightSmall = light.background_small
        light.background_big = 40000000
        light.background_small = 40000000
        sun()
        lightsOnPlayer()
        drawPlayerWait('right', player.x, player.y)

    } else {
        daynighticon.className = "fas fa-sun"
        light.width = saveLightWidth
        light.background_big = saveLightBig
        light.background_small = saveLightSmall
        lightsOnPlayer()
        drawPlayerWait('right', player.x, player.y)

    }
}


/**
 * !SOUND
 */

document.getElementById("cut_volume").addEventListener("click", cutVolume)
let volumeCount = 1

function cutVolume() {
    switch (volumeCount) {
        case 1:
            document.getElementById("cut_volume").className = "fas fa-volume-mute"
            document.getElementById("engrenage").volume = '0'
            document.getElementById("torche_prise").volume = "0"
            document.getElementById("porte").volume = "0"
            document.getElementById("bruits_pas_1").volume = "0"
            document.getElementById("bruits_pas_2").volume = "0"
            document.getElementById("bruits_divers").volume = "0"
            document.getElementById("music").volume = '0'

            volumeCount = 2
            break;
        case 2:
            document.getElementById("cut_volume").className = "fas fa-volume-up"
            document.getElementById("music").volume = '0.2'
            document.getElementById("porte").volume = "1"
            document.getElementById("torche_prise").volume = "1"
            document.getElementById("bruits_pas_1").volume = "0.3"
            document.getElementById("bruits_pas_2").volume = "0.3"
            document.getElementById("bruits_divers").volume = "0.3"
            document.getElementById("engrenage").volume = '.1'

            volumeCount = 1
            break;
    }
}


/**
 * !GIVE CLUE
 */

document.getElementById("giveClue").addEventListener("click", giveClue)

function giveClue() {
    console.log("INDICE")
    pause()
    console.log(solutions)
    for (let index = 0; index < solutions.length; index++) {
        let xtempsol = solutions[index].x
        let ytempsol = solutions[index].y
        ctx.clearRect(xtempsol * player.moveSize + startX - 31, ytempsol * player.moveSize + startX - 25, player.moveSize, player.moveSize);
        drawPlayerWait('right', player.x, player.y)
    }
    setTimeout(() => {
        ctx.fillStyle = "black"
        for (let index = 0; index < solutions.length; index++) {
            let xtempsol = solutions[index].x
            let ytempsol = solutions[index].y
            ctx.fillRect(xtempsol * player.moveSize + startX - 31, ytempsol * player.moveSize + startX - 25, player.moveSize, player.moveSize);
        }
        drawPlayerWait('right', player.x, player.y)
        init()
    }, 5000);
}