// import express from 'express'
// import cors from 'cors'
// import { userRouter } from './src/Routes/userRouter.js'
// import connectDb from './src/connectDb/connectdb.js'
// import bodyParser from 'body-parser'
// import fileRouter from './src/Routes/fileRouter.js'
// import http from 'http';
// import { Server } from 'socket.io'

// const app2 = express()
// const server = http.createServer(app2); // Create http server
// const io = new Server(server); // Create socket.io server


// const PORT =  3001
// app2.use(cors())
// app2.use(bodyParser.json());
// app2.use(express.static('public'));

// app2.use("/users", userRouter)
// app2.use("/files", fileRouter)

// connectDb();

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle events here
//   socket.on('customEvent', (data) => {
//     console.log('Custom event received:', data);
//     // You can emit events back to the client as needed
//     // socket.emit('eventName', eventData);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// server.listen(PORT, error => {
//   if (!error) console.log('Server running on port', PORT);
//   else console.log(error);
// });
// // app2.listen(PORT, error => {
// //   if(!error)console.log('Server running on port',PORT)
// //   else console.log(error)
// // })


import express from 'express';
import cors from 'cors';
import { userRouter } from './src/Routes/userRouter.js';
import connectDb from './src/connectDb/connectdb.js';
import bodyParser from 'body-parser';
import fileRouter from './src/Routes/fileRouter.js';
import http from 'http';
import { Server } from 'socket.io';
import adminRouter from './src/Routes/adminRouter.js';

const app2 = express();
const server = http.createServer(app2);


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  },
});

const PORT = 3001;
app2.use(cors());
app2.use(bodyParser.json());
app2.use(express.static('public'));

app2.use("/users", userRouter);
app2.use("/files", fileRouter);
app2.use('/admin', adminRouter);

connectDb();

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle customEvent here
  socket.on('customEvent', (data) => {
    console.log('Custom event received:', data);
    
    // Sending a message back to the frontend
    const messageToSend = { message: 'Hello from the server!' };
    socket.emit('customEvent', messageToSend);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log('Server running on port', PORT);
});

