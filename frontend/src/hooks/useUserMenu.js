import { useState } from "react";

const INIT_VALUE = { active: null, pos: 0 };

export default function useUserMenu() {
	const [value, set] = useState(INIT_VALUE);

	const reset = () => {
		set(INIT_VALUE);
	};

	return { value, set, reset };
}
