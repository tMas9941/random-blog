import { useEffect, useRef, useState } from "react";
import delay from "../utils/delay";

const useChunkLoader = ({ dependencies, fetchService }) => {
    const [data, setdata] = useState([]);
    const [error, setError] = useState(null);
    const loading = useRef(true);

    useEffect(() => {
        console.log("fetch");
        if (!loading.current) {
            setLoading(true);

            fetchNewdata();
        }
        async function fetchNewdata() {
            await delay(2000);
            try {
                const newdata = await fetchService();
                addNewdata(newdata);
            } catch (error) {
                setError(error.error || error.message);
            }
        }
        return () => setLoading(false);

        function addNewdata(newdata) {
            const mergeddata = [...data, ...newdata];
            console.log("mergeddata ", mergeddata);
            setdata([...data, ...newdata]);
            console.log(data);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies]);

    return { data, error, loading: loading.current };

    function setLoading(value) {
        loading.current = value;
    }
};
export default useChunkLoader;
