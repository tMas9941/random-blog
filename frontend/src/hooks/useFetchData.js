import { useEffect, useRef, useState } from "react";
const FETCH_INIT = {
    data: null,
    error: null,
};

const useFetchData = ({ dependencies, fetchService }) => {
    const [data, setData] = useState(FETCH_INIT);
    const loading = useRef(false);

    useEffect(() => {
        if (!loading.current) {
            setLoading(true);
            fetchNewData();
        }
        async function fetchNewData() {
            try {
                const newData = await fetchService();
                setData({ data: newData });
            } catch (error) {
                setData({ error: error.error || error.message });
            }
        }
        return () => setLoading(false);
    }, [...dependencies]);

    return data;

    function setLoading(value) {
        loading.current = value;
    }
};
export default useFetchData;
