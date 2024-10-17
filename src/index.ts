import WebSocket, {WebSocketServer} from 'ws'
import http from 'http'
import express from 'express'

// const server = http.createServer(function (req, res) {
//     // res.writeHead(200, {'Content-Type': 'text/plain'})
//     console.log((new Date()) + ' Received request for ' + req.url)
//     res.end('Hello World\n')
// })

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({server: httpServer});

let userConnected = 0;
wss.on('connection', function connection(ws) {

    ws.on('error', console.error)

    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data, {binary: isBinary})
            }
        })        
    })

    console.log("user connected", ++userConnected);
    ws.send('hello from the server');
})

// server.listen(8080, function() {
//     console.log('Server listening on port 8080')
// })