/** 
 *!WAITING MODE ANIMATION
 */

function animWaitingMaze() {

    addObstacle(3, 0, 6)
    addObstacle(3, 2, 6)
    addObstacle(3, 2, 5)
    addObstacle(3, 2, 4)
    addObstacle(3, 2, 3)
    addObstacle(3, 3, 3)
    addObstacle(3, 4, 3)
    addObstacle(3, 5, 3)
    addObstacle(3, 0, 8)
    addObstacle(3, 1, 8)
    addObstacle(3, 2, 8)
    addObstacle(3, 3, 8)
    addObstacle(3, 4, 8)
    addObstacle(3, 4, 7)
    addObstacle(3, 4, 6)
    addObstacle(3, 4, 5)
    addObstacle(3, 6, 5)
    addObstacle(3, 6, 6)
    addObstacle(3, 6, 7)
    addObstacle(3, 6, 8)
    addObstacle(3, 6, 9)
    addObstacle(3, 6, 10)
    addObstacle(3, 7, 10)
    addObstacle(3, 8, 10)
    addObstacle(3, 9, 10)
    addObstacle(3, 10, 10)
    addObstacle(3, 10, 8)
    addObstacle(3, 10, 7)
    addObstacle(3, 10, 6)
    addObstacle(3, 10, 5)
    addObstacle(3, 11, 5)
    addObstacle(3, 12, 5)
    addObstacle(3, 12, 6)
    addObstacle(3, 12, 7)
    addObstacle(3, 12, 8)
    addObstacle(3, 13, 8)
    addObstacle(3, 14, 8)
    addObstacle(3, 8, 8)
    addObstacle(3, 8, 7)
    addObstacle(3, 8, 6)
    addObstacle(3, 8, 5)
    addObstacle(3, 8, 4)
    addObstacle(3, 8, 3)
    addObstacle(3, 8, 2)
    addObstacle(3, 6, 3)
    addObstacle(3, 11, 4)
    addObstacle(3, 5, 10)
    for (let index = 0; index < 15; index++) {
        addObstacle(3, index, 0)
    }
    for (let index = 0; index < 7; index++) {
        addObstacle(3, 0, index)
    }
    for (let index = 9; index < 15; index++) {
        addObstacle(3, 0, index)
    }
    for (let index = 0; index < 15; index++) {
        addObstacle(3, index, 14)
    }
    for (let index = 0; index < 7; index++) {
        addObstacle(3, 14, index)
    }
    for (let index = 9; index < 15; index++) {
        addObstacle(3, 14, index)
    }
    for (let index = 9; index < 14; index++) {
        addObstacle(3, index, 2)
    }
    for (let index = 3; index < 6; index++) {
        addObstacle(3, index, 1)
    }
    for (let index = 2; index < 8; index++) {
        addObstacle(3, index, 12)
    }
    for (let index = 9; index < 11; index++) {
        addObstacle(3, 3, index)
    }
    for (let index = 11; index < 13; index++) {
        addObstacle(3, 10, index)
    }

    addObstacle(2, 5, 11)
    addObstacle(2, 1, 6)
    addObstacle(2, 5, 5)
    addObstacle(4, 1, 9)
    addObstacle(4, 13, 13)
    addObstacle(4, 13, 1)
    addObstacle(5, 4, 9)
    addObstacle(5, 9, 11)
    addObstacle(5, 6, 2)
    addObstacle(1, 1, 1)
    addObstacle(1, 1, 13)
    addObstacle(1, 10, 9)
        // ANIMATION 

    let timeSet = 300
    if (cancelled) { return true }
    setTimeout(() => {
        animationChoose()
        clearPreviousPosition()
        player.x += player.moveSize;
        player.cooX += 1;
        if (cancelled) { return true }
        drawPlayerInDaGame('right');
        setTimeout(() => {
            animationChoose()
            clearPreviousPosition()
            player.x += player.moveSize;
            player.cooX += 1;
            if (cancelled) { return true }
            drawPlayerInDaGame('right');
            setTimeout(() => {
                animationChoose()
                clearPreviousPosition()
                player.x += player.moveSize;
                player.cooX += 1;
                if (cancelled) { return true }
                drawPlayerInDaGame('right');
                setTimeout(() => {
                    animationChoose()
                    clearPreviousPosition()
                    player.y -= player.moveSize;
                    player.cooY -= 1;
                    if (cancelled) { return true }
                    drawPlayerInDaGame('forward');
                    setTimeout(() => {
                        animationChoose()
                        clearPreviousPosition()
                        player.y -= player.moveSize;
                        player.cooY -= 1;
                        if (cancelled) { return true }
                        drawPlayerInDaGame('forward');
                        setTimeout(() => {
                            animationChoose()
                            clearPreviousPosition()
                            player.y -= player.moveSize;
                            player.cooY -= 1;
                            if (cancelled) { return true }
                            drawPlayerInDaGame('forward');
                            setTimeout(() => {
                                animationChoose()
                                clearPreviousPosition()
                                player.x += player.moveSize;
                                player.cooX += 1;
                                if (cancelled) { return true }
                                drawPlayerInDaGame('right');
                                setTimeout(() => {
                                    animationChoose()
                                    clearPreviousPosition()
                                    player.x += player.moveSize;
                                    player.cooX += 1;
                                    if (cancelled) { return true }
                                    drawPlayerInDaGame('right');
                                    setTimeout(() => {
                                        animationChoose()
                                        clearPreviousPosition()
                                        player.x += player.moveSize;
                                        player.cooX += 1;
                                        if (cancelled) { return true }
                                        drawPlayerInDaGame('right');
                                        setTimeout(() => {
                                            animationChoose()
                                            clearPreviousPosition()
                                            player.x += player.moveSize;
                                            player.cooX += 1;
                                            if (cancelled) { return true }
                                            drawPlayerInDaGame('right');
                                            setTimeout(() => {
                                                animationChoose()
                                                clearPreviousPosition()
                                                player.y += player.moveSize;
                                                player.cooY += 1;
                                                if (cancelled) { return true }
                                                drawPlayerInDaGame('backward');
                                                setTimeout(() => {
                                                    animationChoose()
                                                    clearPreviousPosition()
                                                    player.y += player.moveSize;
                                                    player.cooY += 1;
                                                    if (cancelled) { return true }
                                                    drawPlayerInDaGame('backward');
                                                    setTimeout(() => {
                                                        animationChoose()
                                                        clearPreviousPosition()
                                                        player.y += player.moveSize;
                                                        player.cooY += 1;
                                                        if (cancelled) { return true }
                                                        drawPlayerInDaGame('backward');
                                                        setTimeout(() => {
                                                            animationChoose()
                                                            clearPreviousPosition()
                                                            player.y += player.moveSize;
                                                            player.cooY += 1;
                                                            if (cancelled) { return true }
                                                            drawPlayerInDaGame('backward');
                                                            setTimeout(() => {
                                                                animationChoose()
                                                                clearPreviousPosition()
                                                                player.y += player.moveSize;
                                                                player.cooY += 1;
                                                                if (cancelled) { return true }
                                                                drawPlayerInDaGame('backward');
                                                                setTimeout(() => {
                                                                    animationChoose()
                                                                    clearPreviousPosition()
                                                                    player.x += player.moveSize;
                                                                    player.cooX += 1;
                                                                    if (cancelled) { return true }
                                                                    drawPlayerInDaGame('right');
                                                                    setTimeout(() => {
                                                                        animationChoose()
                                                                        clearPreviousPosition()
                                                                        player.x += player.moveSize;
                                                                        player.cooX += 1;
                                                                        if (cancelled) { return true }
                                                                        drawPlayerInDaGame('right');
                                                                        setTimeout(() => {
                                                                            animationChoose()
                                                                            clearPreviousPosition()
                                                                            player.y -= player.moveSize;
                                                                            player.cooY -= 1;
                                                                            if (cancelled) { return true }
                                                                            drawPlayerInDaGame('forward');
                                                                            setTimeout(() => {
                                                                                animationChoose()
                                                                                clearPreviousPosition()
                                                                                player.y -= player.moveSize;
                                                                                player.cooY -= 1;
                                                                                if (cancelled) { return true }
                                                                                drawPlayerInDaGame('forward');
                                                                                setTimeout(() => {
                                                                                    animationChoose()
                                                                                    clearPreviousPosition()
                                                                                    player.y -= player.moveSize;
                                                                                    player.cooY -= 1;
                                                                                    if (cancelled) { return true }
                                                                                    drawPlayerInDaGame('forward');
                                                                                    setTimeout(() => {
                                                                                        animationChoose()
                                                                                        clearPreviousPosition()
                                                                                        player.y -= player.moveSize;
                                                                                        player.cooY -= 1;
                                                                                        if (cancelled) { return true }
                                                                                        drawPlayerInDaGame('forward');
                                                                                        setTimeout(() => {
                                                                                            animationChoose()
                                                                                            clearPreviousPosition()
                                                                                            player.y -= player.moveSize;
                                                                                            player.cooY -= 1;
                                                                                            if (cancelled) { return true }
                                                                                            drawPlayerInDaGame('forward');
                                                                                            setTimeout(() => {
                                                                                                animationChoose()
                                                                                                clearPreviousPosition()
                                                                                                player.y -= player.moveSize;
                                                                                                player.cooY -= 1;
                                                                                                if (cancelled) { return true }
                                                                                                drawPlayerInDaGame('forward');
                                                                                                setTimeout(() => {
                                                                                                    animationChoose()
                                                                                                    clearPreviousPosition()
                                                                                                    player.x += player.moveSize;
                                                                                                    player.cooX += 1;
                                                                                                    if (cancelled) { return true }
                                                                                                    drawPlayerInDaGame('right');
                                                                                                    setTimeout(() => {
                                                                                                        animationChoose()
                                                                                                        clearPreviousPosition()
                                                                                                        player.x += player.moveSize;
                                                                                                        player.cooX += 1;
                                                                                                        if (cancelled) { return true }
                                                                                                        drawPlayerInDaGame('right');
                                                                                                        setTimeout(() => {
                                                                                                            animationChoose()
                                                                                                            clearPreviousPosition()
                                                                                                            player.x += player.moveSize;
                                                                                                            player.cooX += 1;
                                                                                                            if (cancelled) { return true }
                                                                                                            drawPlayerInDaGame('right');
                                                                                                            setTimeout(() => {
                                                                                                                animationChoose()
                                                                                                                clearPreviousPosition()
                                                                                                                player.x += player.moveSize;
                                                                                                                player.cooX += 1;
                                                                                                                if (cancelled) { return true }
                                                                                                                drawPlayerInDaGame('right');
                                                                                                                setTimeout(() => {
                                                                                                                    animationChoose()
                                                                                                                    clearPreviousPosition()
                                                                                                                    player.y += player.moveSize;
                                                                                                                    player.cooY += 1;
                                                                                                                    if (cancelled) { return true }
                                                                                                                    drawPlayerInDaGame('backward');
                                                                                                                    setTimeout(() => {
                                                                                                                        animationChoose()
                                                                                                                        clearPreviousPosition()
                                                                                                                        player.y += player.moveSize;
                                                                                                                        player.cooY += 1;
                                                                                                                        if (cancelled) { return true }
                                                                                                                        drawPlayerInDaGame('backward');
                                                                                                                        setTimeout(() => {
                                                                                                                            animationChoose()
                                                                                                                            clearPreviousPosition()
                                                                                                                            player.y += player.moveSize;
                                                                                                                            player.cooY += 1;
                                                                                                                            if (cancelled) { return true }
                                                                                                                            drawPlayerInDaGame('backward');
                                                                                                                            setTimeout(() => {
                                                                                                                                animationChoose()
                                                                                                                                clearPreviousPosition()
                                                                                                                                player.y += player.moveSize;
                                                                                                                                player.cooY += 1;
                                                                                                                                if (cancelled) { return true }
                                                                                                                                drawPlayerInDaGame('backward');
                                                                                                                                setTimeout(() => {
                                                                                                                                    animationChoose()
                                                                                                                                    clearPreviousPosition()
                                                                                                                                    player.x += player.moveSize;
                                                                                                                                    player.cooX += 1;
                                                                                                                                    if (cancelled) { return true }
                                                                                                                                    drawPlayerInDaGame('right');
                                                                                                                                    setTimeout(() => {
                                                                                                                                        player.x = startX
                                                                                                                                        player.y = startY
                                                                                                                                        player.cooX = 0
                                                                                                                                        player.cooY = 7
                                                                                                                                        if (cancelled) { return true }
                                                                                                                                        drawPlayer("../img/right/character_moving_right.png", player.x, player.y)
                                                                                                                                        setTimeout(() => {
                                                                                                                                            if (cancelled) { return true }
                                                                                                                                            animWaitingMaze()
                                                                                                                                        }, 0);
                                                                                                                                    }, timeSet);
                                                                                                                                }, timeSet);
                                                                                                                            }, timeSet);
                                                                                                                        }, timeSet);
                                                                                                                    }, timeSet);
                                                                                                                }, timeSet);
                                                                                                            }, timeSet);
                                                                                                        }, timeSet);
                                                                                                    }, timeSet);
                                                                                                }, timeSet);
                                                                                            }, timeSet);
                                                                                        }, timeSet);
                                                                                    }, timeSet);
                                                                                }, timeSet);
                                                                            }, timeSet);
                                                                        }, timeSet);
                                                                    }, timeSet);
                                                                }, timeSet);
                                                            }, timeSet);
                                                        }, timeSet);
                                                    }, timeSet);
                                                }, timeSet);
                                            }, timeSet);
                                        }, timeSet);
                                    }, timeSet);
                                }, timeSet);
                            }, timeSet);
                        }, timeSet);
                    }, timeSet);
                }, timeSet);
            }, timeSet);
        }, timeSet);
    }, timeSet);
}


/**
 * !GAME LOST
 */

function gameLostAnimation() {
    document.getElementById("gamelost").style.display = "flex"
    setTimeout(() => {
        document.getElementById("gamelost").style.display = "none"
    }, 1000);
}