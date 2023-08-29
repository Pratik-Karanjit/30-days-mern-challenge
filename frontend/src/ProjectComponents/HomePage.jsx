// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { io } from 'socket.io-client';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [realTimeData, setRealTimeData] = useState('');

//   useEffect(() => {
//     const socket = io.connect('http://localhost:3001'); // Update with your backend URL
//     console.log('Socket connected:', socket);
  
//     socket.on('customEvent', (data) => {
//       console.log('Received real-time data:', data);
//       setRealTimeData(data.message); // Display the received message on the frontend
//     });
  
//     return () => {
//       socket.disconnect();
//     };
//   }, []);
  
  

//   return (
//     <div>
//       HomePage<br />
//       <button onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>
//         Contact
//       </button>
//       <button onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>
//         About Us
//       </button>
//       <div>Real-time data: {realTimeData}</div>

//     </div>
//   );
// };

// export default HomePage;


import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const HomePage = () => {
  const [realTimeData, setRealTimeData] = useState('');
  const socket = io.connect('http://localhost:3001'); // Update with your backend URL

  useEffect(() => {
    socket.on('customEvent', (data) => {
      console.log('Received real-time data:', data);
      setRealTimeData(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const emitCustomEvent = () => {
    socket.emit('customEvent', { message: 'Hello from the client!' });
  };

  return (
    <div>
      <div>Real-time data: {realTimeData}</div>
      <button onClick={emitCustomEvent}>Emit Custom Event</button>
    </div>
  );
};

export default HomePage;
