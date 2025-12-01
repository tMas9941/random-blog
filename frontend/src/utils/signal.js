// connected functions will be called when changeValue is triggered
export default class Signal {
    constructor(value) {
        this.value = value;
        this.connectedFunctions = {};
    }

    // expected Str name and a function -  functions with the same name will be overwrited
    connect(functionName, newFunction) {
        this.connectedFunctions[functionName] = newFunction;
    }
    disconnect(functionName) {
        delete this.connectedFunctions[functionName];
    }

    changeValue(newValue) {
        if (this.value != newValue) {
            this.value = newValue;
            Object.values(this.connectedFunctions).forEach((func) => func(newValue));
        }
    }
    getConnectedFunctions() {
        return this.connectedFunctions;
    }
}
