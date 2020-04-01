import Scene from "../ui/Scene";
import GameUnit from "../units/GameUnit";
import MarkHud from "../hud/MarkHud";

export default class GameScene extends Scene{

	constructor(PIXI, gameWidth, gameHeight) {
		super(PIXI);
		this._units = [];
		this._hudObjects = [];

		this.init(gameWidth, gameHeight);

	}

	init(gameWidth, gameHeight) {

		let background = new this.PIXI.Graphics();
		background.beginFill(0x339933);
		background.drawRect(0, 0, gameWidth, gameHeight);
		this.scene.addChild(background);

		let unit1 = new GameUnit(5, 5, 100, 100, this.scene, this.PIXI);
		this.addUnit(unit1);

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

			console.log(`point:(${pointFloor.x}, ${pointFloor.y})`);
			unit1.setDestination(pointFloor);
		});
	}

	addUnit(unit) {
		this._units.push(unit);
	}

	addHudObject(object) {
		this._hudObjects.push(object);
	}


	execute(delta) {

		this._units.forEach((value, index)=> {
			value.execute(delta);
		});

		this._hudObjects.forEach((value, index) => {
			value.execute(delta);
		});

	}
}

