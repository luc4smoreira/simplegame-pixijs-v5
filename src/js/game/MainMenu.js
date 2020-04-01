import {UI, Button} from "../framework/UI";

export default class MainMenu {

	constructor() {

	}

	draw(app, PIXI) {

		let button = UI.createButton(PIXI, "start game");


		app.stage.addChild(button.container);

		button.container.x = app.view.width / 2 - button.container.width / 2;
		button.container.y = app.view.height / 2  - button.container.height / 2;

		button.container.on('click', () => {

			while(app.stage.children.length > 0) {
				app.stage.removeChildAt(0)
			}
		});
	}



}
