import { useEffect, useRef, useState } from "react";
import postService from "../services/post.service";

export default function useListPost() {
	const [list, setList] = useState();
	const loading = useRef(false);

	useEffect(() => {
		if (!loading.value) {
			loading.value = true;
			(async () => {
				setList(await postService.list(1));
				loading.value = false;
			})();
		}
	}, []);

	return list;
}
