const { WebSocketServer } = require('ws');
const { randomUUID } =  require('node:crypto');

const wss = new WebSocketServer({ port: 8080 });

const clients = new Map();
const rooms = {};

console.log('WebSocket server is running on ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('New client connected');
  const uuid = randomUUID(); 
  
  ws.send('Welcome to the WebSocket server!');

  ws.on('message', (data) => {
    const rawData = JSON.parse(data);
    const {msg, meta, room} = rawData;
    ws.room = room;

    if(!rooms[room]) {
      rooms[room] = {};
    }

    if(meta == 'create' || meta == 'join') {
      rooms[room][uuid] = ws;
      wss.room = room;
      wss.clients.forEach(client => {
        if(client.room == room) {
          client.send(`> ${msg}`);
        }
      });
    } else {
     return;
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
