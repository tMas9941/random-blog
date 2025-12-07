import Signal from "./signal";

// connected functions will be called when changeValue is triggered
export default class SignalGroup {
    constructor() {
        this.signals = {};
    }

    // expected Str name and a function -  functions with the same name at the same signal will be overwritten
    connect(signalName, functionName, newFunction) {
        if (!this.signals[signalName]) this.signals[signalName] = new Signal(null);
        this.signals[signalName].connect(functionName, newFunction);
    }
    disconnect(signalName, functionName) {
        this.signals[signalName].disconnect(functionName);
    }
    getValue(signalName) {
        return this.signals[signalName].value;
    }
    changeValue(signalName, newValue) {
        if (this.signals[signalName].value !== newValue) {
            this.signals[signalName].value = newValue;
            Object.values(this.signals[signalName].connectedFunctions).forEach((func) => func(newValue));
        }
    }

    getConnectedFunctions(signalName) {
        if (signalName) return this.signals[signalName];
        return this.signals;
    }
}
