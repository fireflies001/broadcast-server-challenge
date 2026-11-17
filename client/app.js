const WebSocket = require('ws');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to the WebSocket server');
  console.log('[1] Create room [2] Join room');
  promptForMessage();
});

ws.on('message', (message) => {
  console.log(`${message}`);
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

ws.on('close', () => {
  console.log('Disconnected from the server');
  process.exit(0);
});

function promptForMessage() {
  rl.question('Enter a message (or "exit" to quit): ', (message) => {
    if (message.toLowerCase() === 'exit') {
      ws.close();
      rl.close();
      return;
    }
    createRoom(); 
  });
}

function createRoom() {
  rl.question('Enter room name: ', (room) => {
    const payload = {
      msg: 'A wild pokemon join the chat',
      meta: 'create',
      room: room
    };
    ws.send(JSON.stringify(payload));
    joinedChatroom(room);
  })
}

function joinedChatroom(room) {
  rl.question('> ', (message) => {
    const payload = {
      msg: message,
      meta: 'join',
      room: room
    }
    ws.send(JSON.stringify(payload));
    joinedChatroom(room);
  })
}
