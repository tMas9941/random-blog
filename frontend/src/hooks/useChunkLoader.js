import { useEffect, useRef, useState } from "react";
import delay from "../utils/delay";

const useChunkLoader = ({ dependencies, fetchFunction, noPreload = false }) => {
    const firstRender = useRef(true);
    const [data, setdata] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const extraItemCount = useRef(0);

    useEffect(() => {
        if (noPreload && firstRender.current) {
            return;
        }
        if (!loading) {
            setLoading(true);
            fetchNewdata();
        }
        firstRender.current = false;
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

        function addNewdata(newData) {
            const newDataAsObj = {}; // store data as Obj to avoid duplications
            for (const item of newData) {
                newDataAsObj[item.id] = item;
            }

            setdata({ ...data, ...newDataAsObj });
        }

        return () => {
            setLoading(false);
            firstRender.current = true;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies]);

    const dataArray = Object.values(data); // return data as Array to easier iteration

    return {
        data: dataArray,
        error,
        loading,
        removeFromList,
        addToList,
        clearList,
        extraItemCount: extraItemCount.current,
    };

    function removeFromList(itemId) {
        const newData = { ...data };
        delete newData[itemId];
        extraItemCount.current = extraItemCount.current - 1;
        setdata(newData);
    }

    function addToList(newData) {
        extraItemCount.current++;
        setdata((oldData) => {
            return { [newData.id]: newData, ...oldData };
        });
    }

    function clearList() {
        setdata({});
    }
};
export default useChunkLoader;
