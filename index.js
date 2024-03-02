const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static(__dirname + '/public'));


io.on('connection', (socket) => {
  console.log('A user connected');

  
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

    io.emit('chat message', msg);
  });

  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
