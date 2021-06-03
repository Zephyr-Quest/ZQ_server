/**
 * !TOOLS
 */

function clearMap() {
    for (let index = 0; index < 225; index++) {
        obstaclesArray[index] = { id: undefined, x: undefined, y: undefined, usages: [] }
    }
    context.clearRect(0, 0, x * 2, y * 2)
}

function cutCircle(context, x, y, radius) {
    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.globalCompositeOperation = 'source-over';
    context.restore();
}

function arcCircle(xpos, ypos, x4, y4, x5, y5, from, to, r, style) {
    ctx.save();
    ctx.beginPath();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.arc(xpos, ypos, r, from, to);
    ctx.moveTo(xpos, ypos);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x5, y5);
    ctx.lineTo(xpos, ypos);
    ctx.closePath();
    ctx.fill();
    ctx.restore()
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(xpos, ypos, r, from, to);
    ctx.moveTo(xpos, ypos);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x5, y5);
    ctx.lineTo(xpos, ypos);
    ctx.closePath();
    ctx.globalCompositeOperation = "xor";
    ctx.fillStyle = style
    ctx.fill();
}

function clearArc(xpos, ypos, from, to, r) {
    ctx.save();
    ctx.beginPath();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.arc(xpos, ypos, r, from, to);
    ctx.moveTo(xpos, ypos);
    ctx.closePath();
    ctx.fill();
    ctx.restore()
    ctx.globalCompositeOperation = "source-over";
}