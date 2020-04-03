export default class Trigonometry {

	static radToAngle(rad) {
		return (180*rad)/Math.PI;
	}

	static getQuadrant(angle) {
		angle = this.adjustAngle(angle);

		let quadrant;
		if(angle >= 0 && angle < 90) {
			quadrant = 1;
		}
		else if(angle >= 90 && angle < 180 ) {
			quadrant = 2;
		}
		else if(angle >= 180 && angle < 270 ) {
			quadrant = 3;
		}
		else if(angle >= 270 && angle < 360 ) {
			quadrant = 4;
		}
		return quadrant;
	}

	static adjustAngle(angle) {

		while(angle < 0) {
			angle += 360;
		}

		angle %= 360;
		return angle;
	}

	static angleToRad(angle) {
		return angle * (Math.PI / 180);
	}

	static getAxisSpeed(vector, dist, speed) {

		return {
			x: (speed * vector.x) / dist,
			y: (speed * vector.y) / dist,
		}

	}

	static getAngle(vector) {
		let tanAngle = vector.y / vector.x;
		let arcTan = Math.atan(tanAngle);

		let angle = this.radToAngle(arcTan);
		if(vector.x < 0) {
			angle+=180;
		}
		// if(angle > 360 || angle < 0) {
		// 	console.log("Angle > 360 or < 0!!! "+angle);
		// }
		angle = this.adjustAngle(angle);
		return angle;
	}

	static getDistance(vector) {
		return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	}
}