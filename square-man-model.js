class SquareMan {

    constructor() {
        // initial the SquareMan location.
        this.x = INITX;
        this.y = INITY;
        // initial the previous circle colour.
        this.isPrevColourBlack = false
        this.draw();
    }


    /** Draws the square on the screen. */
    draw() {
        drawRectangle(this.x, this.y, size, size, false);
    }

    /** Erases the square from the screen. */
    erase() {
        drawRectangle(this.x, this.y, size, size, true);
    }

    /** return the score. */
    score() {
        return score;
    }

    /** Does teh square reach the end? */
    isSuccess() {
        if (((this.x > 340) && (this.x < 354)) && (this.y + size == canvas.height)) {
            return true;
        }
        else {
            return false;
        }
    }

    /** Moves the square up by 1 pixels. */
    moveUp() {
        let result = recognition(this.x, this.y, "up");
        let isObstacle = result[0];
        let isCircle = result[1];
        let isCircleBlack = result[2];
        // move 1 pixel
        if (!isObstacle) {
            drawRectangle(this.x, this.y + size - 1, size, 1, true);
            drawRectangle(this.x, this.y - 1, size, 1, false);
            this.y = this.y - 1;
        }
        else {
            // if is correct circle, skip it.
            if (isCircle && (isCircleBlack ^ this.isPrevColourBlack)) {
                this.erase();
                this.y = this.y - SKIP;
                this.draw();
                this.isPrevColourBlack = isCircleBlack;
                let nextColour;
                if (isCircleBlack) {
                    nextColour = "white";
                }
                else {
                    nextColour = "black";
                }
                drawRectangle(0, 0, canvas.width, 13, true);
                printString("You can only pass the " + nextColour + " circle next.", 1, 0)
                score = score - 1;
            }
            // if is obstacle, kick square back.
            else {
                if ((this.y + size + KICK) <= canvas.height) {
                    this.erase();
                    this.y = this.y + KICK;
                    this.draw();
                }
                score = score - 1;
            }
        }
    }

    /** Moves the square down by 1 pixels. */
    moveDown() {
        let result = recognition(this.x, this.y, "down");
        let isObstacle = result[0];
        let isCircle = result[1];
        let isCircleBlack = result[2];
        // move 1 pixel
        if (!isObstacle) {
            drawRectangle(this.x, this.y, size, 1, true);
            drawRectangle(this.x, this.y + size, size, 1, false);
            this.y = this.y + 1;
        }
        else {
            // if is correct circle, skip it.
            if (isCircle && (isCircleBlack ^ this.isPrevColourBlack)) {
                this.erase();
                this.y = this.y + SKIP;
                this.draw();
                this.isPrevColourBlack = isCircleBlack;
                let nextColour;
                if (isCircleBlack) {
                    nextColour = "white";
                }
                else {
                    nextColour = "black";
                }
                drawRectangle(0, 0, canvas.width, 13, true);
                printString("You can only pass the " + nextColour + " circle next.", 1, 0)
                score = score - 1;
            }
            // if is obstacle, kick square back.
            else {
                if ((this.y - KICK) >= 0) {
                    this.erase();
                    this.y = this.y - KICK;
                    this.draw();
                }
                score = score - 1;
            }
        }
    }

    /** Moves the square left by 1 pixels. */
    moveLeft() {
        let result = recognition(this.x, this.y, "left");
        let isObstacle = result[0];
        let isCircle = result[1];
        let isCircleBlack = result[2];
        // move 1 pixel
        if (!isObstacle) {
            drawRectangle(this.x + size - 1, this.y, 1, size, true);
            drawRectangle(this.x - 1, this.y, 1, size, false);
            this.x = this.x - 1;
        }
        else {
            // if is correct circle, skip it.
            if (isCircle && (isCircleBlack ^ this.isPrevColourBlack)) {
                this.erase();
                this.x = this.x - SKIP;
                this.draw();
                this.isPrevColourBlack = isCircleBlack;
                let nextColour;
                if (isCircleBlack) {
                    nextColour = "white";
                }
                else {
                    nextColour = "black";
                }
                drawRectangle(0, 0, canvas.width, 13, true);
                printString("You can only pass the " + nextColour + " circle next.", 1, 0)
                score = score - 1;
            }
            // if is obstacle, kick square back.
            else {
                if ((this.x + size + KICK) <= canvas.height) {
                    this.erase();
                    this.x = this.x + KICK;
                    this.draw();
                }
                score = score - 1;
            }
        }
    }

    /** Moves the square right by 1 pixels. */
    moveRight() {
        let result = recognition(this.x, this.y, "right");
        let isObstacle = result[0];
        let isCircle = result[1];
        let isCircleBlack = result[2];
        // move 1 pixel
        if (!isObstacle) {
            drawRectangle(this.x, this.y, 1, size, true);
            drawRectangle(this.x + size, this.y, 1, size, false);
            this.x = this.x + 1;
        }
        else {
            // if is correct circle, skip it.
            if (isCircle && (isCircleBlack ^ this.isPrevColourBlack)) {
                this.erase();
                this.x = this.x + SKIP;
                this.draw();
                this.isPrevColourBlack = isCircleBlack;
                let nextColour;
                if (isCircleBlack) {
                    nextColour = "white";
                }
                else {
                    nextColour = "black";
                }
                drawRectangle(0, 0, canvas.width, 13, true);
                printString("You can only pass the " + nextColour + " circle next.", 1, 0)
                score = score - 1;
            }
            // if is obstacle, kick square back.
            else {
                if ((this.x - KICK) >= 0) {
                    this.erase();
                    this.x = this.x - KICK;
                    this.draw();
                }
                score = score - 1;
            }
        }
    }

    incSize() {
        if (((this.y + size) <= canvas.height - SCALE) & ((this.x + size) <= canvas.width - SCALE)) {
            this.erase();
            size = size + SCALE;
            this.draw();
        }
    }

    decSize() {
        if (size > SCALE) {
            this.erase();
            size = size - SCALE;
            this.draw();
        }
    }

    incSpeed() {
        if(speed<100){
            speed += 1;
        }
    }

    decSpeed() {
        if(speed>1){
            speed -= 1;
        }
    }
}