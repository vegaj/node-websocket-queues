require('./config/config');


import  express from 'express';
import  socketIO from 'socket.io';
import  path from 'path';
import  http from 'http';


const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

const server = http.createServer(app);
module.exports.io = socketIO(server);
require('./sockets/main');

const port = process.env.PORT;
server.listen(port, (err :Function) => {
    if (err) throw err;
    console.log(`Listening at port ${port}`);
})