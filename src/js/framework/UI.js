class UI {

	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
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



	fitGameScaleToWindow(htmlContainer, pixiApp) {
		const w = htmlContainer.offsetWidth;
		const h = htmlContainer.offsetHeight;

		let aspectWindow = w / h;
		let aspectGame = this.gameWidth / this.gameHeight;


		let proportion;
		if(aspectWindow > aspectGame) {
			proportion = h / this.gameHeight;
		}
		else {
			proportion = w / this.gameWidth;
		}


		pixiApp.stage.scale.x = proportion;
		pixiApp.stage.scale.y = proportion;

		//center stage
		pixiApp.stage.x = (w - (this.gameWidth * proportion)) / 2;
		pixiApp.stage.y = (h - (this.gameHeight * proportion)) / 2;


		pixiApp.renderer.resize(w, h);

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