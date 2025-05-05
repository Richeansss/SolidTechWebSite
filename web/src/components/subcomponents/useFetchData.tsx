import { useState, useEffect } from "react";
import { IBrand, ISoket, IChipset} from "../../data/models";
import axios from "axios";


interface FetchDataResponse<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
    refetch: () => Promise<void>;
}

function useFetchData<T>(url: string): FetchDataResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get<T>(url);
            setData(response.data);
        } catch (error) {
            setError('Ошибка при загрузке данных. Пожалуйста, повторите попытку позже.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        return () => {
            // Cleanup function
        };
    }, [url]);

    return { data, error, loading, refetch: fetchData };
}

export default useFetchData;
