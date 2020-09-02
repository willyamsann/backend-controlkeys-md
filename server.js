const http = require('http'); // Declrando protocolo http
const app = require('./app');
const port = process.env.PORT|| 3000; // Declarnado porta

const server = http.createServer(app);

server.listen(port);
