const http = require('http');
const app = require('./app');
const socketio = require('socket.io')
const fs = require('fs')
const path = require('path')
const https = require('https')
const port = process.env.PORT || 3000;

// const server = http.createServer(app);
const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'localhost.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'localhost.crt'))
}, app)

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: [ "GET", "POST"]
    }
});

io.on('connection', socket =>{
    // we connected
    console.log('new connection')
    socket.emit('message' , 'This is an emit message')
})

let mylist = new Map();
io.on('connection', (socket) => {
    let user_name = socket.handshake.query.user_name;
    addUser(user_name, socket.id);

    socket.broadcast.emit('user-list', [...mylist.keys()]);
    socket.emit('user-list', [...mylist.keys()]);

    socket.on('message', (msg) => {
        socket.broadcast.emit('message-broadcast', {message: msg, user_name: user_name});
        console.log({message: msg, user_name: user_name})
    })

    socket.on('disconnect', (reason) => {
        removeUser(user_name, socket.id);
    })
});

function addUser(user_name, id) {
    if (!mylist.has(user_name)) {
        mylist.set(user_name, new Set(id));
    } else {
        mylist.get(user_name).add(id);
    }
}

function removeUser(user_name, id) {
    if (mylist.has(user_name)) {
        let userIds = mylist.get(user_name);
        if (userIds.size == 0) {
            mylist.delete(user_name);
        }
    }
}

server.listen(port);