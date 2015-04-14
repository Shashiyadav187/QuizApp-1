  var express = require('express');
      app     = express();
  
  var path    = require("path");
  var mongoose = require("mongoose");
  var http    = require('http');
  var bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());

  // app.get('/',function(request,response){
  //   response.send("ok");
  // })

  //  This file will include the index.html
  app.use(express.static(path.join(__dirname, "./client")));
  //require('./config/mongoose');

 //var routes = require('./config/routes')(app);

  var server = app.listen(8000,function() {
    console.log("---------My Server Starting--------");
  });

 //require mongoose
var mongoose = require("mongoose");
//Connect to DB
mongoose.connect('mongodb://localhost/BlackBeltNew');

 






