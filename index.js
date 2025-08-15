
const { WebSocketServer } = require('ws')

const sockserver = new WebSocketServer({ port: 8080 })
sockserver.on('connection', (ws, req) => {
	const usuario = req?.url?.replace('/', '')
  	console.log('New client connected!')
 	ws.send('connection established')
 	ws.on('close', () => console.log('Client has disconnected!'))
	ws.usuario = usuario; // identificar usuario
 	ws.on('message', data => {
		const body = JSON.parse(data);
		if (body.tipo === 'publico') {
			sockserver.clients.forEach(client => {
				console.log(`distributing message - ${usuario}: ${body.mensaje}`)
				client.send(`${usuario}: ${body.mensaje}`)
			})
		} else {
			for (const client of sockserver.clients) {
				if (client.usuario === body.destinatario) {
					client.send(`${usuario}: ${body.mensaje}`)
					break;
				}
			}
		}
 	})

	ws.onerror = function () {
		console.log('websocket error')
	}
})