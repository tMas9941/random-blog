import { useEffect } from "react";
// signal - connect to this signal
// name - name of the connection (the same names will be overwritten)
// func - this function will be called when signal value changed
export default function useSignal(signal, name, func) {
    useEffect(() => {
        signal.connect(name, func);
        return () => signal.disconnect(name);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
