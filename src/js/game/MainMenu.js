import {UI} from "../framework/UI";
import Scene from "../framework/Scene"

export default class MainMenu extends Scene {

	constructor(PIXI) {
		super(PIXI);

		this.init();
	}

	init() {

		let button = UI.createButton(this.PIXI, "start game");

		this._scene.addChild(button.container);

		// button.container.on('click', () => {
		//
		//
		// });
	}

}
