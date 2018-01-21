const path = require('path');
const publicPath = path.join(__dirname,'../public');//Directly enters into public
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');

// console.log(__dirname+'/../public'); //this type of path goes inside server, comes out then goes into public
// console.log(publicPath);

var app = express();//WE dont need createServer() in express as express() does it implicitly without us worring about it
var server = http.createServer(app);

app.use(express.static(publicPath));
var port = process.env.PORT || 3000;

//Configure server for socket io

var io = socketIO(server);//Returns web app socket server.
//Doing this we got access to a route that accepts incoming connections and we got access to JS library

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
  socket.emit('newMessage',generateMessage('Admin','WELCOME TO THE CHAT APP'))

  socket.broadcast.emit('newMessage',generateMessage('Admin','NEW USER JOINED'))

  socket.on('createMessage',(msg)=>{

    io.emit('newMessage',generateMessage(message.from,message.text));
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
    console.log('User disconnected');
  })
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
