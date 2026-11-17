# WebSocket Broadcast Server Challenge

A lightweight real-time broadcast server and interactive CLI client built with **Node.js** and **WebSockets** (`ws`).

This project demonstrates how to build a WebSocket broadcast server capable of handling multiple concurrent clients, routing messages into dedicated chat rooms, and broadcasting real-time updates to all connected peers within the same room.

---

## 🚀 Features

- **Real-Time Communication**: Bi-directional communication using the `ws` WebSocket library.
- **Room-Based Broadcasting**: Messages sent to a specific room are broadcast only to clients connected to that room.
- **Interactive CLI Client**: Built using Node.js `readline` to interactively join rooms and send broadcast messages from the terminal.
- **Client Identification**: Unique client session identification via Node.js native `crypto.randomUUID()`.

---

## 📁 Project Structure

```text
.
├── client/
│   └── app.js          # Interactive command-line WebSocket client
├── server/
│   └── app.js          # WebSocket broadcast server (port 8080)
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

---

## 🛠️ Prerequisites & Installation

- **Node.js**: v18.0.0 or higher recommended.
- **npm**: Comes bundled with Node.js.

Clone or navigate to the project directory, then install the dependencies:

```bash
npm install
```

---

## 🚦 How to Run

### 1. Start the WebSocket Server

In your first terminal window, start the server:

```bash
npm start
# or: node server/app.js
```

You should see:
```
WebSocket server is running on ws://localhost:8080
```

### 2. Connect One or More Clients

Open a second terminal window (and optionally a third to test multi-client broadcast) and launch the client:

```bash
npm run client
# or: node client/app.js
```

Follow the prompts in the terminal:
1. Press Enter to proceed to room setup (or type `exit` to quit).
2. Enter a room name (e.g. `general` or `gaming`).
3. Type messages at the `> ` prompt. Any message sent will be broadcast to all connected clients in that room!

---

## 📡 Message Protocol

The server and client exchange JSON-formatted messages with the following structure:

```json
{
  "msg": "Hello, world!",
  "meta": "join",
  "room": "general"
}
```

| Field  | Type     | Description                                           |
|--------|----------|-------------------------------------------------------|
| `msg`  | `string` | The message body or notification text                 |
| `meta` | `string` | Action type (e.g., `create`, `join`)                  |
| `room` | `string` | Target room identifier for selective broadcasting     |

---

## 💡 Potential Enhancements

- [ ] Support custom usernames / handles instead of default placeholders
- [ ] Add room discovery (list all active rooms and occupant counts)
- [ ] Handle room leave/switch events gracefully
- [ ] Add heartbeat / ping-pong mechanism to detect stale connections
- [ ] Implement unit & integration tests

---

## 📄 License

ISC
