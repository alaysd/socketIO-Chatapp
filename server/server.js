const path = require('path');
const publicPath = path.join(__dirname,'../public');//Directly enters into public
const express = require('express');
// console.log(__dirname+'/../public'); //this type of path goes inside server, comes out then goes into public
// console.log(publicPath);

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port,()=>{
  console.log(`server is up and running on ${port}`);
})
