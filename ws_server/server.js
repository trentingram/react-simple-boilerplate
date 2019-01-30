// server.js

const express = require('express');
const WebSocket = require('ws');

const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

const colors = ['#007bff',
    '#6610f2',
    '#6f42c1',
    '#e83e8c',
    '#dc3545',
    '#fd7e14',
    '#ffc107',
    '#28a745',
    '#20c997',
    '#17a2b8',
    '#6c757d',
    '#007bff',
    '#6c757d',
    '#28a745',
    '#17a2b8',
    '#dc3545',
    '#343a40'
]

function randomColor() {
    let num = Math.floor(Math.random() * 4);
    return colors[num];
}

function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data))
        }
    })  
}

wss.on('connection', (ws) => {
  console.log("WebSocket connection established...");
  ws.color = randomColor();

    let clients = {
        type: 'client',
        clients: wss.clients.size,
    }



  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
    
    let clients = {
        type: 'client',
        clients: wss.clients.size
    }
    broadcast(clients)
    
  });

  ws.on('message', function incoming(data) {
    let parsedData = JSON.parse(data);
    const newUUID = uuid();
    parsedData.uuid = newUUID;
    parsedData.color = ws.color;

    if(parsedData.type === 'postMessage') {
        parsedData.type = "incomingMessage";
    } else 
    if(parsedData.type === 'postNotice') {
        parsedData.type = 'incomingNotice';
    }
    broadcast(parsedData)
  });

  broadcast(clients)
});
