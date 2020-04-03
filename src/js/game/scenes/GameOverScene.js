import Scene from "../../framework/Scene";
import {UI} from "../../framework/UI";

export default class GameOverScene extends Scene {

	constructor(PIXI, gameWidth, gameHeight) {
		super(PIXI);

		this.init(gameWidth, gameHeight);
	}

	init(gameWidth, gameHeight) {

		this.btFinish = UI.createButton(this.PIXI, "Game Over", 0xaa0000);
		this.btFinish.container.x = gameWidth / 2 - this.btFinish.container.width / 2;
		this.btFinish.container.y = gameHeight / 2 - this.btFinish.container.height / 2;

		this._scene.addChild(this.btFinish.container);


		this._message = new this.PIXI.Text();
		this._message.x = gameWidth / 2;
		this._message.y = gameHeight / 2 + 100;

		this._message.anchor.set(0.5);
		this._scene.addChild(this._message);
	}

	updateMessage(playerDead) {
		let messageText = "You win";
		if(playerDead) {
			messageText = "You lose";
		}

		this._message.text = messageText;

	}



	onClickButton(callback) {
		this.btFinish.container.on('pointerdown', callback);
	}

}