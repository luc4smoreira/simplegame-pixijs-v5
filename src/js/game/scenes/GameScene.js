import Scene from "../ui/Scene";
import GameUnit from "../units/GameUnit";
import MarkHud from "../hud/MarkHud";
import World from "../world/World";

export default class GameScene extends Scene{

	constructor(PIXI, gameWidth, gameHeight) {
		super(PIXI);
		this._world = new World();
		this._hudObjects = [];

	}

	init(gameWidth, gameHeight) {

		let background = new this.PIXI.Graphics();
		background.beginFill(0xaaccaa);
		background.drawRect(0, 0, gameWidth, gameHeight);
		this.scene.addChild(background);

		let unit1 = new GameUnit(5, 5, 250, 300, this.scene, this.PIXI);
		this.addUnit(unit1);

		let unit2 = new GameUnit(5, 5, 200, 200, this.scene, this.PIXI, 0xff0000);
		this.addUnit(unit2);



		this.scene.interactive = true;
		this.scene.buttonMode = true;
		// this.scene.interaction = true;

		let mark = new MarkHud(this.PIXI, this.scene);
		this.addHudObject(mark);




		this.scene.on("click", (event) => {
			let point = event.data.getLocalPosition(this.scene);

			let pointFloor = point.copyFrom(point);
			pointFloor.set(Math.floor(point.x), Math.floor(point.y));

			mark.showMark(pointFloor);

			// console.log(`point:(${pointFloor.x}, ${pointFloor.y})`);
			 unit1.setDestination(pointFloor);
		});
	}

	addUnit(unit) {
		let id = this._world.addUnit(unit);
		unit.id = id;
	}

	addHudObject(object) {
		this._hudObjects.push(object);
	}


	onGameOver(callback) {
		this._onGameOver = callback;
	}


	execute(delta) {

		let gameOver = this._world.executeUnits(delta, this.scene);


		if(gameOver) {
			this._onGameOver();
		}

		this._hudObjects.forEach((value, index) => {
			value.execute(delta);
		});
	}

	clear() {
		this._world.clear();
		while(this._hudObjects.length > 0) {
			this._hudObjects.splice(0, 1);
		}
	}
}

