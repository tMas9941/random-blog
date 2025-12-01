import { useEffect } from "react";

export default function useSignal(signal, name, func) {
    useEffect(() => {
        signal.connect(name, func);
        return () => signal.disconnect(name);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
