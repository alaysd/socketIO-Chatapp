var socket = io();
socket.on('connect',function(){
  console.log('Connected');
  // socket.emit('createEmail',{
  //   to:'FF@gmail.com',
  //   text:"WorldHello"
  // })
  //x();
  socket.emit('createMessage',{from:'Dhagia',text:'NONO'});

});

// var x = function(){
//   socket.emit('createMessage',{
//     from:'Alay', text:'Hiya'
//   });
// }

socket.on('newMessage',function(msg){
  console.log(`${msg.from}: ${msg.text}\ntime:${msg.createdAt}`);
})

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });
