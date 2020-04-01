

export default class Scene {

	constructor(PIXI) {
		this._scene = new PIXI.Container();
		this.PIXI = PIXI;
	}

	execute() {

	}

	get scene() {
		return this._scene;
	}

	center(app) {
		this._scene.x = app.view.width / 2 - this._scene.width / 2;
		this._scene.y = app.view.height / 2  - this._scene.height / 2;

	}
}