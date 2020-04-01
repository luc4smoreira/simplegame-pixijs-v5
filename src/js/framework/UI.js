class UI {

	constructor() {
	}



	static createButton(PIXI, text) {

		let container = new  PIXI.Container();
		let txt = new PIXI.Text(text, {fontSize:40, fill: 0xffffff});

		let graphics = new PIXI.Graphics();
		graphics.beginFill(0x000000);

		let bounds = txt.getBounds();
		graphics.drawRoundedRect(bounds.x, bounds.y, bounds.width, bounds.height, 10);

		graphics.endFill();

		container.addChild(graphics);
		container.addChild(txt);
		container.interactive = true;
		container.buttonMode = true;

		return new Button(container, graphics, txt);
	}
}

class Button {

	constructor(conatiner, graphics, txt) {
		this._container = conatiner;
		this._graphics = graphics;
		this._txt = txt;
	}

	get container() {
		return this._container;
	}

	get graphics() {
		return this._graphics;
	}

	get txt() {
		return this._txt;
	}
}

export {UI, Button}