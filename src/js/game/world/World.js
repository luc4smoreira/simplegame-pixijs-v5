


export default class World {

	constructor() {
		this._units = []
	}

	addUnit(unit) {
		let id = this._units.length;
		this._units.push(unit);

		return id;

	}

	executeUnits(delta, scene) {
		let gameOver = false;
		let deadUnits = [];

		this._units.forEach((unit, index)=> {

			if(unit.inPosition) {

			}
			else {
				let destination = unit.destination;

				let canMove = this.validateMovement(index, destination);

				if (canMove) {
					unit.move(delta, destination);
				}
			}

			unit.execute(delta);

			let unitHitted = this.hitUnit(index);
			if(unitHitted) {
				deadUnits.push(unitHitted);
			}
		});

		deadUnits.forEach((unitDead)=>{
			scene.removeChild(unitDead.sprite);

			let index = this._units.indexOf(unitDead);
			console.log("unit dead:"+index);
			this._units.splice(index, 1);
		});



		if(this._units.length < 2) {
			console.log("Game over!!");
			gameOver = true;
		}
		return gameOver;
	}

	clear() {
		while(this._units.length > 0) {
			this._units.splice(0, 1);
		}
	}

	hitUnit(unitId) {
		let unitHitted = null;

		let point = this._units[unitId].aim;

		for(let i = 0; i < this._units.length; i++) {
			if(i===unitId) continue;

			if(this._units[i].hitted(point)) {
				unitHitted = this._units[i];
				break; //accept only 1 hit
			}
		}

		return unitHitted;

	}

	validateMovement(unitId, destiny) {
		let valid = true;

		return valid;
	}




}