import Scene from "../ui/Scene";
import {UI} from "../ui/UI";

export default class GameOverScene extends Scene {

	constructor(PIXI) {
		super(PIXI);

		this.init();
	}

	init() {

		this.btFinish = UI.createButton(this.PIXI, "Game Over", 0xaa0000);

		this._scene.addChild(this.btFinish.container);
	}

	onClickButton(callback) {
		this.btFinish.container.on('pointerdown', callback);
	}

}