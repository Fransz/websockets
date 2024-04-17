import ws from 'ws';

const client = new ws('ws://localhost:3000/foo')
client.on('open', () => {
  client.send('hello')
})
