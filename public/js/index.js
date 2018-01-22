var socket = io();
socket.on('connect',function(){
  console.log('Connected');
  // socket.emit('createEmail',{
  //   to:'FF@gmail.com',
  //   text:"WorldHello"
  // })
  //socket.emit('createMessage',{from:'Dhagia',text:'NONO'});

});

socket.on('newMessage',function(msg){
  console.log(`${msg.from}: ${msg.text}\ntime:${msg.createdAt}`);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);

  jQuery('#messages').append(li);

})

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text: jQuery('[name=message]').val()
  },function(){

  });
});

// var  locationButton = jQuery('#send-location');
// locationButton.on('click',function(){
//   if(!navigator.geolocation){
//     return alert('geolocation not supported');
//   }
//
//   navigator.geolocation.getCurrentPosition(function(position){
//     console.log(postion);
//   },function(){
//     alert('unable to fetch location');
//   });
// });
// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });
// var socket = io();
//
// socket.on('connect',function(){
//   console.log('Connected');
// })
//
// socket.on('newMessage',function(msg){
//   console.log(`${msg.from}\n${msg.text}\n${msg.time}`);
// })
//
// socket.on('disconnect',function(){
//   console.log('Disconnected from server');
// })
