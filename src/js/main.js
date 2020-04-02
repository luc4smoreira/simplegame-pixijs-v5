import * as PIXI from "pixi.js"

import MainMenu from "./game/scenes/MainMenu"
import {UI} from "./game/ui/UI";
import GameScene from "./game/scenes/GameScene";
import GameOverScene from "./game/scenes/GameOverScene";


window.onload = function() {

	const gameWidth = 480, gameHeight = 640;
	let htmlElment = document.body;

	let app = new PIXI.Application({width: gameWidth, height: gameHeight, backgroundColor: 0xAAAAAA });
	htmlElment.appendChild(app.view);

	let main = new MainMenu(PIXI);
	app.stage.addChild(main.scene);
	main.center(app);

	let gameOverScene = new GameOverScene(PIXI);
	gameOverScene.onClickButton(function() {
		UI.clearDisplayObject(app.stage);

		app.stage.addChild(main.scene);
	});
	gameOverScene.center(app);




	let game = new GameScene(PIXI, gameWidth, gameHeight);
	game.onGameOver(function() {
		UI.clearDisplayObject(app.stage);

		app.ticker.remove(gameLoop);

		game.clear();

		app.stage.addChild(gameOverScene.scene);
	});

	//
	main.onStartGame(function() {
		UI.clearDisplayObject(app.stage);

		// app.stage.addChild(winScene.scene);

		app.stage.addChild(game.scene);

		game.init(gameWidth, gameHeight);

		app.ticker.add(gameLoop)


	});


	let ui = new UI(gameWidth, gameHeight);
	ui.fitGameScaleToWindow(htmlElment, app);

	window.onresize = () => {
		ui.fitGameScaleToWindow(htmlElment, app);
	};

	function gameLoop(delta) {
		game.execute(delta);
	}

};