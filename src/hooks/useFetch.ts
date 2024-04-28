import { useEffect } from "react";
import { useState } from "react";
const url = "https://restcountries.com/v3.1/all";

function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          setData(data);
        }
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, error, loading };
}

export default useFetch;
