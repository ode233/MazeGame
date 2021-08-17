/**
 * Implements the Maze game.
 * This simple game allows the user to move a black square around
 * the screen. The user controls the square as follows.
 * The 'w' 's' 'a' 'd' keys are used to move the square up, down, left, and right.
 */


var maze;
var squareMan;

var successFlag = false;
var lastPoint = new Point();

/** initial a MazeGame. */
function initMazeGame() {
	clearCanvas();
	size = SIZE;
	score = SCORE;
	speed = SPEED;
	successFlag = false;
	maze = new MazeModel();
	squareMan = new SquareMan();
}

/** Moves the square in the current direction. */
function moveSquare(direction) {
	for (let i = 0; i < speed; i++) {
		switch (direction) {
			case 1:
				squareMan.moveUp();
				break;
			case 2:
				squareMan.moveDown();
				break;
			case 3:
				squareMan.moveLeft();
				break;
			case 4:
				squareMan.moveRight();
				break;
		}
		// get success only when reach the end point in the first time
		if (squareMan.isSuccess() && !successFlag) {
			successFlag = true;
			clearCanvas();
			printString("Congratulations!", 1, 0);
			printString("Your score is: " + this.squareMan.score() + "/100", 3, 0);
			if ((this.squareMan.score() < 100)) {
				printString("try to get 100 points", 5, 0);
			}
			else if ((this.squareMan.score() > 99) && (this.squareMan.score() < 119)) {
				printString("Can you get more score?", 5, 0);
			}
			else if ((this.squareMan.score() == 119)) {
				printString("You've got the highest score !!!", 5, 0);
			}
			printString("press 'r' to restart.", 7, 0);
		}
	}
}

window.addEventListener('keydown', handle, false);
/** handles the user's inputs and moves the square accordingly */
function handle(e) {
	switch (e.keyCode) {
		// r key for restart
		case 82:
			initMazeGame();
			break
		// 'w' for up
		case 87:
			moveSquare(1);
			break;
		// 's' for down
		case 83:
			moveSquare(2);
			break;
		// 'a' for left
		case 65:
			moveSquare(3);
			break;
		// 'd' for right
		case 68:
			moveSquare(4);
			break;
		// '-' key
		case 189:
			squareMan.decSpeed();
			break
		// '=' key
		case 187:
			squareMan.incSpeed();
			break
		// '<' key
		case 188:
			squareMan.decSize();
			break
		// '>' key
		case 190:
			squareMan.incSize();
			break
	}
}

handleMobileDevice()
/** handles the user's inputs and moves the square accordingly for mobile device*/
function handleMobileDevice(){
	// let canvas = document.getElementById("maze_canvas");

	// canvas.ontouchstart = function (e) {
	// 	lastPoint.x = e.touches[0].clientX;
	// 	lastPoint.y = e.touches[0].clientY;
	// };

	// canvas.ontouchmove = function (e) {
	// 	let newPoint = new Point(e.touches[0].clientX, e.touches[0].clientY);
	// 	moveSquare(getDirection(newPoint))
	// 	lastPoint = newPoint
	// };

	document.addEventListener("touchstart",function(e){
        lastPoint.x = e.touches[0].clientX;
		lastPoint.y = e.touches[0].clientY;
    })
	
    document.addEventListener("touchmove",function(e){
        let newPoint = new Point(e.touches[0].clientX, e.touches[0].clientY);
		moveSquare(getDirection(newPoint));
		lastPoint = newPoint
    })
}