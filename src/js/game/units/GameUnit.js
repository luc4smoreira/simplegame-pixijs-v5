import Trigonometry from "./Trigonometry";

export default class GameUnit {



	constructor(speed, rotationSpeed, x, y, world, PIXI) {
		this._speed = speed;
		this._rotationSpeed = rotationSpeed;

		this._sprite = new PIXI.Sprite();

		let graphics = new PIXI.Graphics();
		graphics.beginFill(0x999999);
		graphics.drawRoundedRect(-16, -16, 32, 32, 5);

		//turret
		graphics.beginFill(0x000000);
		graphics.drawRoundedRect(-8, -5, 40, 10, 5);

		//sight
		let dist = 80;
		let sigthSize = 5;

		graphics.beginFill(0xff0000);
		graphics.drawRect(dist, -sigthSize-3, 1, sigthSize);
		graphics.drawRect(dist, 3, 1, sigthSize);

		graphics.drawRect(dist-sigthSize-3, 0, sigthSize, 1);
		graphics.drawRect(dist+3, 0, sigthSize, 1);


		this._sprite.addChild(graphics);

		this._sprite.anchor.set(0.5);
		this._sprite.x = x;
		this._sprite.y = y;

		world.addChild(this._sprite);
		this._destination = new PIXI.Point(x, y);
	}


	execute(delta) {

		let vector = {
			x: this._destination.x - this._sprite.x,
			y: this._destination.y - this._sprite.y
		};

		//angle
		let angle = Trigonometry.getAngle(vector);

		let h = Trigonometry.getDistance(vector);


		if(h > this._speed) {

			this._sprite.angle = angle;

			let component = Trigonometry.getAxisSpeed(vector, h, this._speed);

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