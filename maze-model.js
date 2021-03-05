class MazeModel {
	constructor() {
		this.initial()
	}

	initial() {
		//draw the left half maze.
		this.drawHalf(OX, OY, 1);
		// draw the right half maze.
		this.drawHalf(AXIS - OX + AXIS, OY, -1);
		// draw circles.
		this.drawCircles();
		// draw other things.
		this.drawOtherThings(OX, OY);
	}

	/** draw the half maze; */
	drawHalf(ox, oy, c) {
		// c is to control draw the left or right
		// if c==1,draw the left
		// if c==-1,draw the right
		drawLine(ox, oy, ox, oy - (3 * L) - (3 * W));
		drawLine(ox + (W * c), oy, ox + (W * c), oy - L);
		drawLine(ox + (W * c), oy - L, ox + (((2 * L) + (3 * W)) * c), oy - L);
		drawLine(ox + (((2 * L) + (3 * W)) * c), oy - L, ox + (((2 * L) + (3 * W)) * c), oy - (3 * L) - (2 * W));
		drawLine(ox + (((2 * L) + (3 * W)) * c), oy - (3 * L) - (2 * W), ox + (((2 * L) + (3 * W) + (L / 2)) * c), oy - (3 * L) - (2 * W));
		drawLine(ox, oy - (3 * L) - (3 * W), ox + ((L + W) * c), oy - (3 * L) - (3 * W));
		drawLine(ox + ((L + W) * c), oy - (3 * L) - (3 * W), ox + ((L + W) * c), oy - (4 * L) - (4 * W));
		drawLine(ox + ((L + W) * c), oy - (4 * L) - (4 * W), ox + (((L * 2) + (W * 3) + (L / 2)) * c), oy - (4 * L) - (4 * W));
		drawLine(ox + ((L + (2 * W)) * c), oy - (4 * L) - (3 * W), ox + ((L + (2 * W)) * c), oy - (3 * L) - (3 * W));
		drawLine(ox + ((L + (2 * W)) * c), oy - (4 * L) - (3 * W), ox + (((L * 2) + (W * 3) + (L / 2)) * c), oy - (4 * L) - (3 * W));
		drawLine(ox + ((L + (2 * W)) * c), oy - (3 * L) - (3 * W), ox + (((L * 2) + (W * 3) + (L / 2)) * c), oy - (3 * L) - (3 * W));
		// draw right top square
		drawLine(ox + ((L + (2 * W)) * c), oy - (3 * L) - (2 * W), ox + (((2 * L) + (2 * W)) * c), oy - (3 * L) - (2 * W));
		drawLine(ox + ((L + (2 * W)) * c), oy - (3 * L) - (2 * W), ox + ((L + (2 * W)) * c), oy - (2 * L) - (2 * W));
		drawLine(ox + (((2 * L) + (2 * W)) * c), oy - (3 * L) - (2 * W), ox + (((2 * L) + (2 * W)) * c), oy - (2 * L) - (2 * W));
		drawLine(ox + ((L + (2 * W)) * c), oy - (2 * L) - (2 * W), ox + (((2 * L) + (2 * W)) * c), oy - (2 * L) - (2 * W));
		// draw left top square
		drawLine(ox + (W * c), oy - (3 * L) - (2 * W), ox + ((L + W) * c), oy - (3 * L) - (2 * W));
		drawLine(ox + (W * c), oy - (3 * L) - (2 * W), ox + (W * c), oy - (2 * L) - (2 * W));
		drawLine(ox + ((L + W) * c), oy - (3 * L) - (2 * W), ox + ((L + W) * c), oy - (2 * L) - (2 * W));
		drawLine(ox + (W * c), oy - (2 * L) - (2 * W), ox + ((L + W) * c), oy - (2 * L) - (2 * W));
		// draw right bottom square
		drawLine(ox + ((L + (2 * W)) * c), oy - (2 * L) - W, ox + (((2 * L) + (2 * W)) * c), oy - (2 * L) - W);
		drawLine(ox + ((L + (2 * W)) * c), oy - (2 * L) - W, ox + ((L + (2 * W)) * c), oy - L - W);
		drawLine(ox + (((2 * L) + (2 * W)) * c), oy - (2 * L) - W, ox + (((2 * L) + (2 * W)) * c), oy - L - W);
		drawLine(ox + ((L + (2 * W)) * c), oy - L - W, ox + (((2 * L) + (2 * W)) * c), oy - L - W);
		// draw left bottom square
		drawLine(ox + (W * c), oy - (2 * L) - W, ox + ((L + W) * c), oy - (2 * L) - W);
		drawLine(ox + (W * c), oy - (2 * L) - W, ox + (W * c), oy - L - W);
		drawLine(ox + ((L + W) * c), oy - (2 * L) - W, ox + ((L + W) * c), oy - L - W);
		drawLine(ox + (W * c), oy - L - W, ox + ((L + W) * c), oy - L - W);
	}

	drawCircles(){
		for(let coordinate of blackCircles){
			drawCircle(coordinate[0],coordinate[1], R, true);
		}
		for(let coordinate of whiteCircles){
			drawCircle(coordinate[0],coordinate[1], R, false);
		}
		// fix visual bug
		// drawCircle(0,0,0,false)
	}

	/** Draw the other things for the maze; */
	drawOtherThings(ox, oy) {
		// draw the end lines.
		drawLine(ox + (5 * W) + (5 * L), oy, ox + (5 * W) + (5 * L), 255);
		drawLine(ox + (6 * W) + (5 * L), oy, ox + (6 * W) + (5 * L), 255);
		// write some words
		printString("Enter", 21, 10);
		printString("Exit", 21, 38);
		printString("find the path to", 5, 46);
		printString("exit.Pass through", 7, 46);
		printString("colored circle in", 9, 46);
		printString("order black,white,", 11, 46);
		printString("black,white,and so", 13, 46);
		printString("on.", 15, 46);
		printString("Use 'w' 's' 'a' 'd'", 17, 46);
		printString("to control,press 'r' ", 19, 46);
		printString("to restart.", 21, 46);
	}
}

