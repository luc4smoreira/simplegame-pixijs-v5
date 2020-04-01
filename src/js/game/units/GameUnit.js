
export default class GameUnit {

	constructor(speed, x, y, world, PIXI) {
		this._speed = speed;

		this._sprite = new PIXI.Sprite();

		let graphics = new PIXI.Graphics();
		graphics.beginFill(0xff0000);
		graphics.drawRect(0, 0, 50, 50);

		this._sprite.addChild(graphics);

		this._sprite.anchor.set(0.5);

		world.addChild(this._sprite);
		this._destination = new PIXI.Point(x, y);
	}


	execute(delta) {

		if(this._sprite.x < this._destination.x) {
			this._sprite.x += this._speed;
		}
		else if(this._sprite.x > this._destination.x) {
			this._sprite.x -= this._speed;
		}

		if(this._sprite.y < this._destination.y) {
			this._sprite.y += this._speed;
		}
		else if(this._sprite.y > this._destination.y) {
			this._sprite.y -= this._speed;
		}


		if(Math.abs(this._destination.x - this._sprite.x) < this._speed) {
			this._sprite.x = this._destination.x;
		}

		if(Math.abs(this._destination.y - this._sprite.y) < this._speed) {
			this._sprite.y= this._destination.y;

		}

	}

	setDestination(position) {
		this._destination = position;
	}

}