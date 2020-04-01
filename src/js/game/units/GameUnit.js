
export default class GameUnit {

	constructor(speed, x, y, world, PIXI) {
		this._speed = speed;

		this._sprite = new PIXI.Sprite();

		let graphics = new PIXI.Graphics();
		graphics.beginFill(0xff0000);
		graphics.drawRect(-25, -25, 50, 50);

		this._sprite.addChild(graphics);

		this._sprite.anchor.set(0.5);
		this._sprite.x = x;
		this._sprite.y = y;

		world.addChild(this._sprite);
		this._destination = new PIXI.Point(x, y);
	}




	execute(delta) {
		const stickThresholding = 0.05;
		let vector = {
			x: this._destination.x - this._sprite.x,
			y: this._destination.y - this._sprite.y
		};

		let h = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

		if(h > 0) {
			let component = {
				x: (this._speed * vector.x) / h,
				y: (this._speed * vector.y) / h,
			};


			if(Math.abs(component.x) < stickThresholding) {
				this._sprite.x = this._destination.x;
			}
			else {
				this._sprite.x += component.x;
			}


			if(Math.abs(component.y) < stickThresholding) {
				this._sprite.y = this._destination.y;
			}
			else {
				this._sprite.y += component.y;
			}
		}
		else {
			//in position
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