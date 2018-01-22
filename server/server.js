const path = require('path');
const publicPath = path.join(__dirname,'../public');//Directly enters into public
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users');
// console.log(__dirname+'/../public'); //this type of path goes inside server, comes out then goes into public
// console.log(publicPath);

var app = express();//WE dont need createServer() in express as express() does it implicitly without us worring about it
var server = http.createServer(app);

app.use(express.static(publicPath));
var port = process.env.PORT || 3000;

//Configure server for socket io

var io = socketIO(server);//Returns web app socket server.
//Doing this we got access to a route that accepts incoming connections and we got access to JS library
var users = new Users();
//Resiger an event
// console.log('1');
io.on('connection',(socket)=>{
  console.log('New User connected');
  //
  // socket.emit('newEmail',{
  //   from:'alay@gmail.com',
  //   text:'HelloWorld',
  //   createdAt:123
  // });
  // //'on' is for listening an event
  // socket.on('createEmail',(newEmail)=>{
  //   console.log('createEmail',newEmail);
  // });
  // setTimeout(()=>{
  //   y();
  // },5000);
  //
  // var y = function(){
  var D = new Date();

  // socket.emit('newMessage',generateMessage('Admin','Welcome'))
  // socket.broadcast.emit('newMessage',generateMessage('Admin','NEW USER JOINED'))

  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room are required')
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name, params.room);
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));
    // socket.leave('The Office fans');
    // Send the message  to all users on the current room || io.emit() -> io.to('The office fans').emit
    // socket.broadcast.emit -> socket.broadcast.to('The Office fans').emit
    // socket.emit

    //io.emit() everyone Connected
    //socket.broadcast.emit sends the message to everyone except the current users
    //socket.emit() specifically to 1 user

    socket.emit('newMessage',generateMessage('Admin','Welcome'))
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`))

    callback();
  });

  socket.on('createMessage',(msg,callback)=>{
    var user = users.getUser(socket.id);
    if(user && isRealString(msg.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,msg.text));
    }
    callback('This is from the server');
      //socket.emit() emits an event to a single connections while io.emit() emits the event to all the connections
      //var D = new Date();
      // socket.emit('newMessage',{
      //   from:msg.from,text:msg.text,createdAt: `${D.getHours()}-${D.getMinutes()}`
      // })

    //   /*sends this to everybody but this socket*/socket.broadcast.emit('newMessage',{
    //   from:msg.from,
    //   text:msg.text,
    //   createdAt: `${D.getHours()}:${D.getMinutes()}`
    // });

    });
  //}

  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      console.log('Room is',user.room);
      console.log('Name is',user.name);
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
    }
    console.log('User disconnected');
  });
})

server.listen(port,()=>{
  console.log(`server is up and running on ${port}`);
});
// const path = require('path');
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// var publicPath = path.join(__dirname,'../public');
//
// var app = express();
// app.use(express.static(publicPath));
// var server = http.createServer(app);
// var io = socketIO(server);
// var port = process.env.PORT || 3000;
//
// io.on('connection',(socket)=>{
//   socket.emit('newMessage',{
//     from:'Admint',
//     text:'Welcome to chatroom'
//   })
//   socket.broadcast.emit('newMessage',{
//     from:'Admin',
//     text:'New user just connected'
//   })
//   socket.on('createMessage',(msg)=>{
//     io.emit('newMessage',{
//       from:msg.from,
//       text:msg.text,
//       time:`${new Date().getHours()}: ${new Date().getMinutes()}`
//     });
//   });
//
// });
//
// server.listen(port,()=>{
//   console.log('PORT is',port);
// })
