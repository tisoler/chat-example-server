
const { WebSocketServer } = require('ws')

const sockserver = new WebSocketServer({ port: 8080 })
sockserver.on('connection', (ws, req) => {
  console.log('New client connected!')
 	ws.send('connection established')
 	ws.on('close', () => console.log('Client has disconnected!'))
 	ws.on('message', data => {
   	sockserver.clients.forEach(client => {
			const usuario = req?.url?.replace('/', '')
			console.log(`distributing message - ${usuario}: ${data}`)
			client.send(`${usuario}: ${data}`)
  	})
 	})
	ws.onerror = function () {
		console.log('websocket error')
	}
})