/**
 * !BACKGROUND LIGHTS
 */
var tempIdx = 0

function setLightsBackgroundSmall(x, y) {
    cutCircle(ctx, x, y, light.background_small)
        /*ctx.beginPath();
        ctx.globalCompositeOperation = "source-over";
        ctx.arc(x, y, light.background_small, 0, 2 * Math.PI);
        gradient = ctx.createRadialGradient(x, y, 0, x, y, light.background_small);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "rgba(0,0,0,1)");
        ctx.fillStyle = gradient;
        ctx.fill();*/
}

function setLightsBackgroundBig(x, y) {
    cutCircle(ctx, x, y, light.background_big)
        /*ctx.beginPath();
        ctx.arc(x, y, light.background_big, 0, 2 * Math.PI);
        ctx.globalCompositeOperation = "source-over";
        gradient = ctx.createRadialGradient(x, y, 0, x, y, light.background_big);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "rgba(0,0,0,1)");
        ctx.fillStyle = gradient;
        ctx.fill();*/
}

function drawLightsBack() {

    setLightsBackgroundSmall(330, 170)
    setLightsBackgroundSmall(330, y * 2 - 170)
    setLightsBackgroundSmall(x * 2 - 330, y * 2 - 170)
    setLightsBackgroundSmall(x * 2 - 330, 170)
    setLightsBackgroundSmall(x * 2 - 170, 330)
    setLightsBackgroundSmall(170, 330)
    setLightsBackgroundSmall(170, y * 2 - 330)
    setLightsBackgroundSmall(x * 2 - 170, y * 2 - 330)

    setLightsBackgroundBig(x + 2, 210)
    setLightsBackgroundBig(x - 5, y * 2 - 210)
    setLightsBackgroundBig(210, y + 150)
    setLightsBackgroundBig(x * 2 - 210, y + 150)
    setLightsBackgroundBig(210, y - 150)
    setLightsBackgroundBig(x * 2 - 210, y - 150)


    /*ctx.clearRect(0, y - 1.5 * player.moveSize, 5 * player.moveSize, 3 * player.moveSize)
    gradient = ctx.createLinearGradient(0, 0, tempIdx * player.moveSize, 0);
    gradient.addColorStop(0, "rgba(0,0,0,1)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, y - 1.5 * player.moveSize, 6 * player.moveSize, 6 * player.moveSize);

    */
    /*ctx.clearRect(x * 2 - 3 * player.moveSize, y - 1.5 * player.moveSize, 3 * player.moveSize, 3 * player.moveSize)
    gradient = ctx.createLinearGradient(x * 2 - tempIdx * player.moveSize, 0, x * 2, 0);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x * 2 - 3 * player.moveSize, y - 1.5 * player.moveSize, 3 * player.moveSize, 3 * player.moveSize);
*/

}