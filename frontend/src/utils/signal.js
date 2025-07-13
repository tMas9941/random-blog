export default class Signal {
	constructor(value) {
		this.value = value;
		this.connectedFunctions = {};
	}

	connect(functionName, newFunction) {
		this.connectedFunctions[functionName] = newFunction;
	}

	changeValue(newValue) {
		if (this.value != newValue) {
			this.value = newValue;
			Object.values(this.connectedFunctions).forEach((func) => func(newValue));
		}
	}
}
