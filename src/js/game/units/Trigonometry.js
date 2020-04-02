export default class Trigonometry {

	static radToAngle(rad) {
		return (180*rad)/Math.PI;
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
		if(angle > 360 || angle < 0) {
			console.log("Angle > 360 or < 0!!! "+angle);
		}

		return angle;
	}

	static getDistance(vector) {
		return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	}
}