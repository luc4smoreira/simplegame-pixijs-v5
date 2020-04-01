

export default class MarkHud {
	constructor(PIXI, scene) {

		this.mark = new PIXI.Graphics();
		this.mark.beginFill(0x000000);
		this.mark.drawCircle(0, 0, 10);
		this.mark.visible = false;
		scene.addChild(this.mark);
	}

	showMark(point) {
		this.mark.x = point.x;
		this.mark.y = point.y;
		this.mark.visible = true;
		this.mark.alpha = 1;
	}

	execute() {
		if(this.mark.visible) {

			if (this.mark.alpha > 0) {
				this.mark.alpha -= 0.02;
			} else {
				this.mark.alpha = 0;
				this.mark.visible = false;
			}
		}
	}
}