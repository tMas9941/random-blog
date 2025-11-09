import { useEffect, useState } from "react";
import delay from "../utils/delay";

const useChunkLoader = ({ dependencies, fetchFunction }) => {
    const [data, setdata] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!loading) {
            setLoading(true);
            fetchNewdata();
        }
        async function fetchNewdata() {
            await delay(500);
            try {
                const newdata = await fetchFunction();
                if (newdata.length) addNewdata(newdata);
            } catch (error) {
                setError(error.error || error.message);
            } finally {
                setLoading(false);
            }
        }

        function addNewdata(newdata) {
            setdata([...data, ...newdata]);
        }

        return () => setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies]);

    return { data, error, loading, removeFromList };

    function removeFromList(itemId) {
        const filteredData = data.filter((item) => item.id !== itemId);
        setdata(filteredData);
    }
};
export default useChunkLoader;
