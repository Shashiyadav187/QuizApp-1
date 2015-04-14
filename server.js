  var express = require('express');
      app     = express();
  
  var path    = require("path");
  var mongoose = require("mongoose");
  var http    = require('http');
  var bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());

  //  This file will include the index.html
  app.use(express.static(path.join(__dirname, "./client")));
  //require('./config/mongoose');

 //var routes = require('./config/routes')(app);

  var server = app.listen(8000,function() {
    console.log("---------My Server Starting--------");
  });
//----------------------- All DB Config---------------//
 //require mongoose
var mongoose = require("mongoose");
//Connect to DB
mongoose.connect('mongodb://localhost/BlackBelt');

var QuestionSchema = mongoose.Schema({
  question          : String,
  correct_answer    : String,
  fake_answer1      : String,
  fake_answer2      : String,
  created_at        :{type:Date,default:Date.now}
});
var Question = mongoose.model('Question',QuestionSchema);

var UserSchema = mongoose.Schema({
  user_name          : String,
  score              : {type:Number,default:0},
  created_at        :{type:Date,default:Date.now}
});
var User = mongoose.model('User',UserSchema);

//-------------------------------------------------------//
app.post('/new_question',function(request,response){
  console.log(request.body);
  var new_question = new Question({question:request.body.topic,
                                   correct_answer :request.body.correctAnswer,
                                   fake_answer1:request.body.fakeAnswer1,
                                    fake_answer2  :request.body.fakeAnswer2 });
  new_question.save(function(error,db_result){
    if(error){
      response.json(error);
      console.log(error);
    }
    else{
      response.json(db_result);
        console.log("------------question created------------------");
    }
  })
})

app.get('/questions',function(request,response){
  Question.find({},function(error,db_result){
     if(error){
      response.json(error);
      console.log(error);
    }
    else{
      response.json(db_result);
        console.log("------------question fetched------------------");
    }
  });
})

 //Get a particular question
  app.get('/get_question/:id',function(request,response){
    console.log(request.params.id);
    Question.findOne({_id:request.params.id},function(error,db_response){
      if(error){
        console.log(error);
      }
      else{
        response.json(db_response);
      }
    })
  }); 

//-------------------------------------------------------//
app.post('/create_user',function(request,response){
  console.log(request.body);
  var new_user = new User({ user_name:request.body.user_name,
                                score :request.body.score});
  new_user.save(function(error,db_result){
    if(error){
      response.json(error);
      console.log("error--user canot be created-----"+error);
    }
    else{
      response.json(db_result);
        console.log("------------user created------------------");
    }
  })
})
  
app.post('/update_user',function(request,response){
  console.log(request.body);
  var user_id   = request.body.id;
  var new_score = request.body.score;

 User.update({_id: user_id}, {score: new_score}, function (error, db_result){
      if(error){
      response.json(error);
      console.log(error);
      }
      else{
        response.json(db_result);
          console.log("------------Score updated------------------");
    }
  })

});


app.get('/users',function(request,response){
  User.find({},function(error,db_result){
     if(error){
      response.json(error);
      console.log(error);
    }
    else{
      response.json(db_result);
        console.log("------------All Users fetched------------------");
    }
  });
})
  

 
 
 