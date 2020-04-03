import Scene from "../ui/Scene";
import GameUnit from "../units/GameUnit";
import MarkHud from "../hud/MarkHud";
import World from "../world/World";

export default class GameScene extends Scene{

	constructor(PIXI, gameWidth, gameHeight, loader) {
		super(PIXI);
		this._world = new World();
		this._hudObjects = [];



		//extracted from PIXI examples
		loader.add('explosion', 'assets/spritesheet/explosion-mc.json');

	}



	onLoaded() {
		// create an array to store the textures (
		const explosionTextures = [];
		let i;

		for (i = 0; i < 26; i++) {
			const texture = this.PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
			explosionTextures.push(texture);
		}
		this.explosionTextures = explosionTextures;
	}


	init(gameWidth, gameHeight) {

		let background = new this.PIXI.Graphics();
		background.beginFill(0xaaccaa);
		background.drawRect(0, 0, gameWidth, gameHeight);
		this.scene.addChild(background);

		let unit1 = new GameUnit(5, 1, 50, 50, this.scene, this.PIXI, 0xffffff,this.explosionTextures, "player");
		this.addUnit(unit1);

		let unit2 = new GameUnit(1, 1, 200, 200, this.scene, this.PIXI, 0xff0000, this.explosionTextures, "IA");
		this.addUnit(unit2);



		this.scene.interactive = true;
		this.scene.buttonMode = true;
		// this.scene.interaction = true;

		let mark = new MarkHud(this.PIXI, this.scene);
		this.addHudObject(mark);




		this.scene.on("pointerdown", (event) => {
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

