const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 3030 });

webSocketServer.on('connection', ws => {
    ws.on('message', function incoming(data) {
        webSocketServer.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});
