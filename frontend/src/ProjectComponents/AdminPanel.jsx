import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getLoginInfo } from '../utils/loginInfo';

const AdminPanel = () => {
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
  const response = await axios.get(`http://localhost:3001/admin/panel?token=${getLoginInfo()?.token}`);
     setAdminData(response.data);
     setError(null);
     } catch (error) {
    console.error('Error fetching admin panel data:', error);
if (error.response && error.response.status === 403) {
setError('Permission denied'); 
    } else {
      setError('Error fetching admin panel data'); 
      }
  }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      {adminData && (
        <p>{adminData.message}</p>
      )}

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
    </div>
  );
};

export default AdminPanel;
