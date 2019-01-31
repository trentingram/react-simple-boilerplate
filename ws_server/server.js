// server.js
const express = require('express');
const WebSocket = require('ws');

const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()

// Make the express server serve static assets 
// (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// used as store for generating colors for username text color
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

// helper function: returns random hex code from colors array
function randomColor() {
    let num = Math.floor(Math.random() * 4);
    return colors[num];
}

// distributes data to all open sockets (ie. clients) 
// on the wss socket 
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data))
        }
    })  
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log("WebSocket connection established...");

  // attach color as a property on the 
  // unique instance of the client (ie. ws)
  ws.color = randomColor();

  let clients = {
    type: 'client',
    clients: wss.clients.size,
  }

  // when a client closes connection
  // sends Set.size to client for updating view
  ws.on('close', () => {
    
  let clients = {
    type: 'client',
    clients: wss.clients.size
  }
  broadcast(clients)
    
  });

  // handles on post messages from active clients
  // adds unique uuid to message object
  // adds unique color to message object
  // sets type: message or notice
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
