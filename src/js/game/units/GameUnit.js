import Trigonometry from "./Trigonometry";

const states = {

}

export default class GameUnit {



	constructor(speed, rotationSpeed, x, y, scene, PIXI, tintColor, explosionTexure, type) {
		this._explosionMc = new PIXI.AnimatedSprite(explosionTexure);
		this._state = 0;
		this._type = type;


		this._dead = false;
		this.PIXI = PIXI;
		this._speed = speed;
		this._rotationSpeed = rotationSpeed;
		this._aim = new PIXI.Point(80, 0);

		this._sprite = new PIXI.Sprite();

		let graphics = new PIXI.Graphics();
		graphics.beginFill(0x999999);


		let rectangleBase = new PIXI.Rectangle(-16, -16, 32, 32);

		graphics.drawRoundedRect(rectangleBase.x, rectangleBase.y, rectangleBase.width, rectangleBase.height, 5);

		//turret
		graphics.beginFill(0x000000);
		graphics.drawRoundedRect(-8, -5, 40, 10, 5);



		//sight

		let sigthSize = 5;

		graphics.beginFill(0xff0000);
		graphics.drawRect(this._aim.x, -sigthSize-3+this._aim.y, 1, sigthSize);
		graphics.drawRect(this._aim.x, 3+this._aim.y, 1, sigthSize);

		graphics.drawRect(this._aim.x-sigthSize-3, this._aim.y, sigthSize, 1);
		graphics.drawRect(this._aim.x+3, this._aim.y, sigthSize, 1);



		graphics.tint = tintColor;


		this._sprite.addChild(graphics);




		this._sprite.anchor.set(0.5);
		this._sprite.x = x;
		this._sprite.y = y;

		scene.addChild(this._sprite);

		console.log(this._explosionMc);
		this._destination = new PIXI.Point(x, y);

		this._inPosition = true;
	}

	get dead() {
		return this._dead;
	}

	set dead(value) {
		this._dead = value;
	}


	get sprite() {
		return this._sprite;
	}


	hitted(point) {

		let hit = false;


		if(Math.abs(point.x - this.x) < 16 && Math.abs(point.y - this.y) < 16) {
			hit = true;
			if(this._state === 0 ) {
				this.sprite.addChild(this._explosionMc);
				this._explosionMc.anchor.set(0.5);
				this._explosionMc.gotoAndPlay(1);
				this._state = 1;
			}

		}
		return hit;
	}



	get aim() {

		let rad = Trigonometry.angleToRad(this._sprite.angle);

		return {
			x: (Math.cos(rad) * 80) + this.x,
			y: (Math.sin(rad) * 80) + this.y
		};
	}

	get inPosition() {
		return this._inPosition;
	}

	get x() {
		return this._sprite.x;
	}

	get y() {
		return this._sprite.y;
	}

	getBounds() {
		return this._sprite.getBounds();
	}

	get angle() {
		return this._sprite.angle;
	}


	set id(id) {
		this._id = id;
	}
	get id() {
		return this._id;
	}


	move(delta, destination) {

		if(this._state === 0) {
			this.sprite.angle = Trigonometry.adjustAngle(this.sprite.angle);

			let vector = {
				x: destination.x - this._sprite.x,
				y: destination.y - this._sprite.y
			};

			//angle
			let angle = Trigonometry.getAngle(vector);

			let h = Trigonometry.getDistance(vector);


			if (h > this._speed) {


				let angDif = Math.abs(this._sprite.angle - angle);


				if (angDif < (this._rotationSpeed + 5)) {
					this._sprite.angle = angle;

					let component = Trigonometry.getAxisSpeed(vector, h, this._speed);

					this._sprite.x += component.x;
					this._sprite.y += component.y;
				} else {
					if (this._type === "player") {
						console.log(`sprite.angle: ${this.sprite.angle} angle: ${angle} dif: ${angDif}`);
					}

					let quadDest = Trigonometry.getQuadrant(angle);
					let quadOrigin = Trigonometry.getQuadrant(this._sprite.angle);


					let increaseAngle = true;
					if (quadOrigin === quadDest) {
						if (this._sprite.angle > angle) {
							increaseAngle = false;
						}
					} else if (quadOrigin === 1 && quadDest === 4) {
						increaseAngle = false;
					} else if (quadOrigin === quadDest + 1) {
						increaseAngle = false;
					}

					if (increaseAngle) {
						this._sprite.angle += this._rotationSpeed;
					} else {
						this._sprite.angle -= this._rotationSpeed;
					}


				}


			} else {
				//in position
				console.log("in position: " + this.id);
				this._sprite.x = destination.x;
				this._sprite.y = destination.y;

				this._inPosition = true;


			}
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



	execute(delta) {




		if(this._state === 1) {

			if(this._explosionMc.currentFrame === this._explosionMc.totalFrames -1 ) {
				this._explosionMc.stop();
				this._dead = true;
			}
		}
		else {
			if(this._type === "IA") {
				if(this._inPosition) {
					this.setDestination({
						x: Math.floor(Math.random() * 300) + 100,
							y: Math.floor(Math.random() * 300) + 100,
					});
				}
			}

		}

	}

	setDestination(position) {
		this._inPosition = false;
		this._destination = position;
	}


	get destination() {
		return this._destination;
	}
}