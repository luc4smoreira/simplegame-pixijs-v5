import Scene from "../ui/Scene";
import GameUnit from "../units/GameUnit";

export default class GameScene extends Scene{

	constructor(PIXI, gameWidth, gameHeight) {
		super(PIXI);
		this._units = [];
		this.init(gameWidth, gameHeight);

	}

	init(gameWidth, gameHeight) {

		let background = new this.PIXI.Graphics();
		background.beginFill(0x339933);
		background.drawRect(0, 0, gameWidth, gameHeight);
		this.scene.addChild(background);

		let unit1 = new GameUnit(1, 100, 100, this.scene, this.PIXI);
		this.addUnit(unit1);

		this.scene.interactive = true;
		// this.scene.interaction = true;

		this.mark = new this.PIXI.Graphics();
		this.mark.beginFill(0xFF0000);
		this.mark.drawCircle(0, 0, 10);
		this.mark.visible = false;
		this.scene.addChild(this.mark);

		this.scene.on("click", (event) => {
			let point = event.data.getLocalPosition(this.scene);

			let pointFloor = point.copyFrom(point);
			pointFloor.set(Math.floor(point.x), Math.floor(point.y));

			this.mark.visible = true;

			this.mark.x = point.x;
			this.mark.y = point.y;


			console.log(`point:(${pointFloor.x}, ${pointFloor.y})`);
			unit1.setDestination(pointFloor);
		});
	}

	addUnit(unit) {
		this._units.push(unit);
	}


	execute(delta) {

		this._units.forEach((value, index)=> {
			value.execute(delta);
		});

	}
}

