import {UI} from "../ui/UI";
import Scene from "../ui/Scene"

export default class MainMenu extends Scene {

	constructor(PIXI) {
		super(PIXI);

		this.init();
	}

	init() {

		this.btStartGame = UI.createButton(this.PIXI, "start game", 0xffffff);

		this._scene.addChild(this.btStartGame.container);
	}

	onStartGame(callback) {
		this.btStartGame.container.on('pointerdown', callback);
	}

}
