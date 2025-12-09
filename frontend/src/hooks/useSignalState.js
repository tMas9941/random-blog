import { useEffect, useState } from "react";
// signal - connect to this signal
// name - name of the connection (the same names will be overwritten)

// change state value when signal value changed
export default function useSignalState(signal, name) {
    const [value, setValue] = useState(signal.value);

    useEffect(() => {
        signal.connect(name, (newStatus) => {
            setValue(newStatus);
        });
        return () => signal.disconnect(name);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return value;
}
