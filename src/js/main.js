import * as PIXI from "pixi.js"

import MainMenu from "./game/MainMenu"
import {UI} from "./framework/UI";


window.onload = function() {
	const gameWidth = 480, gameHeight = 640;
	let htmlElment = document.body;

	let app = new PIXI.Application({width: gameWidth, height: gameHeight, backgroundColor: 0xAAAAAA });
	let ui = new UI(gameWidth, gameHeight)
	htmlElment.appendChild(app.view);

	let main = new MainMenu();
	main.draw(app, PIXI);

	ui.fitGameScaleToWindow(htmlElment, app);

	window.onresize = () => {
		ui.fitGameScaleToWindow(htmlElment, app);
	};


};