


export default class World {

	constructor() {
		this._units = []
	}

	addUnit(unit) {
		let id = this._units.length;
		this._units.push(unit);

		return id;

	}

	executeUnits(delta) {
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
		});
	}

	validateMovement(unitId, destiny) {
		let valid = true;

		return valid;
	}




}