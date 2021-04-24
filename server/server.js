const WebSocketServer = require('websocket').server;
const http = require('http');


// create web server
const port = 8000;
const myWebServer = http.createServer((req, res) => {
    console.log('Received request for ' + req.url);
    res.writeHead(404);
    res.end();
});
myWebServer.listen(port, () => console.log('WebSocket Server is listening on port %s', port));


// create websocket server
const myWebSocketServer = new WebSocketServer({
    httpServer: myWebServer,
    autoAcceptConnections: false
});


// utilities
const clients = {};

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

// handhsake request event
myWebSocketServer.on('request', request => {
    // only accept requests from an allowed origin
    if (request.origin !== 'http://localhost:3000') {
      request.reject();
      console.log('Connection from %s rejected', request.origin);
      return;
    }

    var userID = getUniqueID();
    console.log('Recieved a new connection from %s', request.origin);
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log(`connected: ${userID} in ${Object.getOwnPropertyNames(clients)}`);

    connection.send('Hello to the peeps out there!');
    
    //message event
    connection.on('message', message => {
        if (message.type === 'utf8') {
            console.log('Received Message: %s', message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of %s', message.binaryData.length);
            connection.sendBytes(message.binaryData);
        }
    });
 
    connection.on('close', function(reasonCode, description) {
        console.log(`Peer ${connection.remoteAddress} disconnected. Code: ${reasonCode} Description: ${description}`);
    });
    
});
