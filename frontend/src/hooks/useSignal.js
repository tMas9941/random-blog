import { useEffect, useState } from "react";

export default function useSignal(signal, stateName) {
    const [value, setValue] = useState(signal.value);

    useEffect(() => {
        signal.connect(stateName, (newStatus) => {
            setValue(newStatus);
        });
        return () => signal.disconnect(stateName);
    }, []);

    return value;
}
