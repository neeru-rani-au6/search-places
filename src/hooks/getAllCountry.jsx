import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

const GetAllCountry = (url, limit, offset, searchQuery) => {
  const [cities, setCities] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedQuery = useDebounce(searchQuery);
  const fetchCities = async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    try {
      let apiUrl = `${url}/?limit=${limit}&offset=${offset}`
      if (searchQuery) {
        apiUrl += `&namePrefix=${searchQuery}`
      }
      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCities(data.data);
      setMetaData(data.metadata)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [limit, offset, debouncedQuery]);

  return { cities, loading, error, metaData };
};

export default GetAllCountry;
