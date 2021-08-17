let canvas = document.getElementById("maze_canvas");

// adjust content size
if (window.screen.height < window.screen.width) {
    canvas.style.height = "80%"
}
else {
    canvas.style.width = "80%"
}

let ctx = canvas.getContext("2d");
ctx.lineWidth = 1

// the maze's unit length and width,to help me draw the maze.
const W = 14;
const L = 42;
// the circle outer radius;
const R = 5;
// the maze bottom left location.
const OX = 60;
const OY = 239;
// the symmetrival axis of maze.
const AXIS = OX + (2 * L) + (3 * W) + (L / 2);
// the center coordinates of maze circle
var blackCircles = new Array();
var whiteCircles = new Array();
generateSymmetricCircles(OX, OY, 1);
generateSymmetricCircles(AXIS - OX + AXIS, OY, -1);
generateAsymmetricCircles(OX, OY);

// the SquareMan initial location.
const INITX = 63;
const INITY = 235;
// the SquareMan kicked distance
const KICK = 5;
// the SquareMan skip distance
const SKIP = 20;
const SCALE = 2;
// the SquareMan move speed.
const SPEED = 3
var speed = SPEED;
// the SquareMan outer size.
const SIZE = 7
var size = SIZE;
// the highest socre
const SCORE = 119
var score = SCORE;


class Point{

    constructor(x, y) {
        this.x = x;
        this.y = y
    }
}


function generateSymmetricCircles(ox, oy, c) {
    // c is to control generate the left or right
    // if c==1,generate the left
    // if c==-1,generate the right

    // generate the black circles.
    blackCircles.push([ox + ((W / 2) * c), oy - (L / 2)]);
    blackCircles.push([ox + ((W + (L / 2)) * c), oy - L - (W / 2)]);
    blackCircles.push([ox + (((2 * W) + L + (L / 2)) * c), oy - (2 * L) - W - (W / 2)]);
    blackCircles.push([ox + ((W + L + (W / 2)) * c), oy - (2 * L) - (L / 2) - (2 * W)]);
    blackCircles.push([ox + ((W / 2) * c), oy - (2 * L) - (L / 2) - (2 * W)]);
    // generate the white circles.
    whiteCircles.push([ox + ((W / 2) * c), oy - L - W - (L / 2)]);
    whiteCircles.push([ox + ((W + (L / 2)) * c), oy - (2 * L) - W - (W / 2)]);
    whiteCircles.push([ox + ((W + L + (W / 2)) * c), oy - (3 * L) - (3 * W) - (L / 2)]);
}

function generateAsymmetricCircles(ox, oy) {
    // generate the black asymmetric circles.
    blackCircles.push([ox + (2 * W) + (W / 2) + (2 * L), oy - (2 * L) - (L / 2) - (2 * W)]);
    blackCircles.push([ox + (4 * W) + (3 * L) + (L / 2), oy - (3 * L) - (2 * W) - (W / 2)]);
    blackCircles.push([ox + (3 * W) + (2 * L) + (L / 2), oy - (4 * L) - (3 * W) - (W / 2)]);
    // generate the white asymmetric circles.
    whiteCircles.push([ox + W + L + (W / 2), oy - L - W - (L / 2)]);
    whiteCircles.push([ox + W + (L / 2), oy - (3 * L) - (2 * W) - (W / 2)]);
    whiteCircles.push([ox + (2 * W) + (L / 2) + L, oy - (3 * L) - (2 * W) - (W / 2)]);
    whiteCircles.push([ox + (3 * W) + (W / 2) + (3 * L), oy - (2 * L) - (L / 2) - (2 * W)]);
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1+0.5, y1+0.5);
    ctx.lineTo(x2+0.5, y2+0.5);
    ctx.stroke();
}
/**
 * default edge width is 2px, r is the distanse between the endpoint
 *
 * @param {*} x
 * @param {*} y
 * @param {*} r
 * @param {*} isBlack
 */
function drawCircle(x, y, r, isBlack) {
    ctx.beginPath();
    if (isBlack) {
        // will not fill for 0.5 px
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }
    else {
        ctx.arc(x, y, r - 0.5, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function drawRectangle(x1, y1, width, height, isClean) {
    ctx.beginPath();
    if (isClean) {
        ctx.clearRect(x1, y1, width, height);
    }
    else {
        ctx.fillRect(x1, y1, width, height);
    }
}

/**
 * seem screen as 23 rows of 64 characters, every character width is 8px, height is 11px
 *
 * @param {*} text
 * @param {*} row row index
 * @param {*} column column index
 */
function printString(text, row, column) {
    ctx.beginPath();
    ctx.font = '13px Monospace';
    ctx.fillText(text, column * 8, row * 11);
}
/**
 * identify objects in the direction of movement
 *
 * @param {*} x
 * @param {*} y
 * @param {*} direction
*/
function recognition(x, y, direction) {
    let isObstacle = true;
    let isCircle = false;
    let isCircleBlack;
    switch (direction) {
        case "up":
            if (y > 0) {
                let hasBlackPixel = false;
                for (let i = 0; i < size; i++) {
                    if (isBlackPixel(x + i, y - 1)) {
                        hasBlackPixel = true;
                        let coordinate = [x + i, y - R];
                        if (arrayHasElement(blackCircles, coordinate)) {
                            isCircle = true;
                            isCircleBlack = true;
                            break
                        }
                        else if (arrayHasElement(whiteCircles, coordinate)) {
                            isCircle = true;
                            isCircleBlack = false;
                            break
                        }
                    }
                }
                if (!hasBlackPixel) {
                    isObstacle = false;
                }
            }
            break;
        case "down":
            if ((y + size) < canvas.height) {
                let hasBlackPixel = false;
                for (let i = 0; i < size; i++) {
                    if (isBlackPixel(x + i, y + size)) {
                        hasBlackPixel = true;
                        let coordinate = [x + i, y + size + R];
                        if (arrayHasElement(blackCircles, coordinate)) {
                            isCircle = true;
                            isCircleBlack = true;
                            break
                        }
                        else if (arrayHasElement(whiteCircles, coordinate)) {
                            isCircle = true;
                            isCircleBlack = false;
                            break
                        }
                    }
                }
                if (!hasBlackPixel) {
                    isObstacle = false;
                }
            }
            break;
        case "left":
            if (x > 0) {
                let hasBlackPixel = false;
                for (let i = 0; i < size; i++) {
                    if (isBlackPixel(x - 1, y + i)) {
                        hasBlackPixel = true;
                        let coordinate = [x - R, y + i];
                        if (arrayHasElement(blackCircles, coordinate)) {
                            isCircle = true;
                            isCircleBlack = true;
                            break
                        }
                        else if (arrayHasElement(whiteCircles, coordinate)) {
                            isCircle = true;
                            isCircleBlack = false;
                            break
                        }
                    }
                }
                if (!hasBlackPixel) {
                    isObstacle = false;
                }
            }
            break;
        case "right":
            if ((x + size) < canvas.width) {
                let hasBlackPixel = false;
                for (let i = 0; i < size; i++) {
                    if (isBlackPixel(x + size, y + i)) {
                        hasBlackPixel = true;
                        let coordinate = [x + size + R, y + i];
                        if (arrayHasElement(blackCircles, coordinate)) {
                            isCircle = true;
                            isCircleBlack = true;
                            break
                        }
                        else if (arrayHasElement(whiteCircles, coordinate)) {
                            isCircle = true;
                            isCircleBlack = false;
                            break
                        }
                    }
                }
                if (!hasBlackPixel) {
                    isObstacle = false;
                }
            }
            break;
    }
    return [isObstacle, isCircle, isCircleBlack];
}

function isBlackPixel(x, y) {
    let data = ctx.getImageData(x, y, 1, 1).data;
    if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] > 0) {
        return true
    }
    else {
        return false
    }
}

function clearCanvas() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function arrayHasElement(array, element) {
    for (var el of array) {
        if (el.length === element.length) {
            for (var index in el) {
                if (el[index] !== element[index]) {
                    break;
                }
                if (index == (el.length - 1)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function getDirection(newPoint) {
    let xDiff = newPoint.x - lastPoint.x;
    let yDiff = newPoint.y - lastPoint.y;
    if (Math.abs(xDiff) < Math.abs(yDiff)) {
        if (yDiff < 0) {
            return 1
        } 
        else {
            return 2
        }
    }
    else {
        if (xDiff < 0) {
            return 3
        }
        else {
            return 4
        }
    }
}

