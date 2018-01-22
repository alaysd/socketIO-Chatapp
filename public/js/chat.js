var socket = io();
//NOT WORKING
// function scrollToBottom(){
//   // Selectors
//   var messages = jQuery('#messages');
//   var newMessage = messages.children('li:last-child');
//   // Heights
//   var clientHeight = messages.prop('clientHeight');
//   var scrollTop = messages.prop('scollTop');
//   var scrollHeight = messages.prop('scrollHeight');
//   var newMessageHeight = newMessage.innerHeight();
//   var lastMessageHeight = newMessage.prev().innerHeight();
//
//   if(clientHeight + scrollTop +lastMessageHeight >= scrollHeight){
//     console.log('Should scroll');
//   }
// }

socket.on('connect',function(){
  console.log('Connected');
  // socket.emit('createEmail',{
  //   to:'FF@gmail.com',
  //   text:"WorldHello"
  // })
  //socket.emit('createMessage',{from:'Dhagia',text:'NONO'});

});

socket.on('newMessage',function(msg){
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: msg.text,
    from: msg.from,
    createdAt: msg.createdAt
  });

  jQuery('#messages').append(html);
  // console.log(`${msg.from}: ${msg.text}\ntime:${msg.createdAt}`);
  //
  // var li = jQuery('<li></li>');
  // li.text(`${msg.from} ${msg.createdAt} : ${msg.text}`);
  //
  // jQuery('#messages').append(li);
  //scrollToBottom();
})

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage',{
    from:'User',
    text: messageTextbox.val()
  },function(){
    messageTextbox.val('')
  });
});

// <!-- For scrolling, there are 3 types of classifications in scroll heights.
// 1) scrollHeight: entire height of our messages container regardless of how many messages are visible to client.
// 2) cleintHeight: visible height container.
// 3) scrollTop: number of pixels we have scrolled down. -->
//
// <!-- if scrollTop + clientHeight + new message Height = scrollHeight , then we need to scroll and adjust screen for the view -->


// var  locationButton = jQuery('#send-location');
// locationButton.on('click',function(){
//   if(!navigator.geolocation){
//     return alert('geolocation not supported');
//   }
//  locationButoon.attr('disabled','disabled').text('Sending location ...')
//   navigator.geolocation.getCurrentPosition(function(position){
//  locationButton.removeAttr('disabled').text('Send location');
//  console.log(postion);
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
