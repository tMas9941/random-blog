import { useEffect, useState } from "react";

export default function useSignalState(signal, stateName) {
    const [value, setValue] = useState(signal.value);

    useEffect(() => {
        signal.connect(stateName, (newStatus) => {
            setValue(newStatus);
        });
        return () => signal.disconnect(stateName);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return value;
}
