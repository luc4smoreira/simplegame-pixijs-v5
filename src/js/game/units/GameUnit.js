
export default class GameUnit {

	constructor(speed, rotationSpeed, x, y, world, PIXI) {
		this._speed = speed;

		this._sprite = new PIXI.Sprite();

		let graphics = new PIXI.Graphics();
		graphics.beginFill(0xff0000);
		graphics.drawRoundedRect(-30, -30, 60, 60, 10);
		graphics.beginFill(0x000000);
		graphics.drawRoundedRect(-15, -10, 80, 20, 10);

		this._sprite.addChild(graphics);

		this._sprite.anchor.set(0.5);
		this._sprite.x = x;
		this._sprite.y = y;

		world.addChild(this._sprite);
		this._destination = new PIXI.Point(x, y);
	}



	radToAngle(rad) {
		return (180*rad)/Math.PI;
	}

	angleToRad(angle) {
		return angle * (Math.PI / 180);
	}


	execute(delta) {


		let vector = {
			x: this._destination.x - this._sprite.x,
			y: this._destination.y - this._sprite.y
		};


		//angle
		let tanAngle = vector.y / vector.x;
		let arcTan = Math.atan(tanAngle);
		let angle = this.radToAngle(arcTan);
		if(vector.x < 0) {
			angle+=180;
		}



		let h = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

		if(h > this._speed) {

			this._sprite.angle = angle;

			let component = {
				x: (this._speed * vector.x) / h,
				y: (this._speed * vector.y) / h,
			};


			this._sprite.x += component.x;
			this._sprite.y += component.y;
		}
		else {
			//in position
			console.log("in position");
			this._sprite.x = this._destination.x;
			this._sprite.y = this._destination.y;
		}



		// //
		// this._sprite.x += component.x;
		// this._sprite.y += component.y;


		// if(this._sprite.x < this._destination.x) {
		// 	this._sprite.x += this._speed;
		// }
		// else if(this._sprite.x > this._destination.x) {
		// 	this._sprite.x -= this._speed;
		// }
		//
		// if(this._sprite.y < this._destination.y) {
		// 	this._sprite.y += this._speed;
		// }
		// else if(this._sprite.y > this._destination.y) {
		// 	this._sprite.y -= this._speed;
		// }
		//
		//
		// if(Math.abs(this._destination.x - this._sprite.x) < this._speed) {
		// 	this._sprite.x = this._destination.x;
		// }
		//
		// if(Math.abs(this._destination.y - this._sprite.y) < this._speed) {
		// 	this._sprite.y= this._destination.y;
		// }


	}

	setDestination(position) {
		this._destination = position;
	}

}