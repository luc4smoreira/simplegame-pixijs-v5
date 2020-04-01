import * as PIXI from "pixi.js"

import MainMenu from "./game/MainMenu"


window.onload = function() {
	let app = new PIXI.Application({width: 480, height: 640, backgroundColor: 0xAAAAAA });

	document.body.appendChild(app.view);


	let main = new MainMenu();
	main.draw(app, PIXI);


};