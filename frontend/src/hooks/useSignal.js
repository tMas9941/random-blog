import { useState } from "react";

export default function useSignal(signal, stateName) {
	const [value, setValue] = useState(() => connectToSignal(signal));

	function connectToSignal(signal) {
		signal.connect(stateName, (newStatus) => setValue(newStatus));
		return signal.value;
	}
	return value;
}
