export default class UI {

	constructor() {
	}

	static createButton(PIXI, text) {

		let container = new  PIXI.Container();
		this.txt = new PIXI.Text(text, {fontSize:40, fill: 0xffffff});

		let graphics = new PIXI.Graphics();
		graphics.beginFill(0x000000);

		let bounds = this.txt.getBounds();
		graphics.drawRoundedRect(bounds.x, bounds.y, bounds.width, bounds.height, 10);

		graphics.endFill();

		container.addChild(graphics);
		container.addChild(this.txt);
		container.interactive = true;
		container.buttonMode = true;

		return {
			container: container,
			button: graphics,
			txt: text
		};
	}
}