import * as PIXI from "pixi.js"

import MainMenu from "./game/scenes/MainMenu"
import {UI} from "./game/ui/UI";
import GameScene from "./game/scenes/GameScene";


window.onload = function() {

	const gameWidth = 480, gameHeight = 640;
	let htmlElment = document.body;

	let app = new PIXI.Application({width: gameWidth, height: gameHeight, backgroundColor: 0xAAAAAA });
	htmlElment.appendChild(app.view);

	//
	//
	let main = new MainMenu(PIXI);
	app.stage.addChild(main.scene);
	main.center(app);


	let game = new GameScene(PIXI, gameWidth, gameHeight);

	//
	main.onStartGame(function() {
		UI.clearDisplayObject(app.stage);
		app.stage.addChild(game.scene);

		app.ticker.add(function(delta) {
			game.execute(delta);
		})
	});



	let ui = new UI(gameWidth, gameHeight);
	ui.fitGameScaleToWindow(htmlElment, app);

	window.onresize = () => {
		ui.fitGameScaleToWindow(htmlElment, app);
	};



};