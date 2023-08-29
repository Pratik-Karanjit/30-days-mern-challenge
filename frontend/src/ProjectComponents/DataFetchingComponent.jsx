import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetchingComponent() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/users/home');
        setData(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError(error); // Set error state if there's an issue with the API
        setLoading(false); // Set loading to false even if there's an error
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Fetched Data</h2>
      <p>{data}</p>
    </div>
  );
}

export default DataFetchingComponent;
