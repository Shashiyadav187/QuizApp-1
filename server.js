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
  created_at        :{type:Date,default:Date.now}
});
var Question = mongoose.model('Question',QuestionSchema);


var AnswerSchema = mongoose.Schema({
  answer            : String,
  is_correct        : {type:Boolean,default:false},
  question_id       : String,
  created_at        : {type:Date,default:Date.now}
});
var Answer = mongoose.model('Answer',AnswerSchema);


var UserSchema = mongoose.Schema({
  user_name          : String,
  score              : {type:Number,default:0},
  created_at         : {type:Date,default:Date.now}
});
var User = mongoose.model('User',UserSchema);

//-------------------------------------------------------//
app.post('/new_question',function(request,response){
  //console.log(request.body);
  var  question = request.body.topic;
  var  new_question = new Question({question:question});

  // ----------Save the new Question--------------
  new_question.save(function(error,db_result){
    if(error){
      response.json("--------Question"+ question+"cannot be created--------",error);
      console.log("----------Question"+ question+"cannot be created--------",error);
    }
    else{
      response.json(db_result);
      console.log("--------Question"+ question+"created--------",db_result._id);
      console.log("----------answer is ",request.body.correctAnswer);
      //CREATE THE ANSWERS
      var correct_answer = new Answer({answer:request.body.correctAnswer,is_correct:true,question_id:db_result._id});
      correct_answer.save(function(error,db_result){
        if(error){
          console.log(request.body.correctAnswer+"cannot be created",error);
        }
        else{
          console.log(request.body.correctAnswer+"created",db_result);
        }
      });

      var fake_answer1   = new Answer({answer:request.body.fakeAnswer1, question_id:db_result._id});
      fake_answer1.save(function(error,db_result){
        if(error){
          console.log(request.body.fakeAnswer1+"cannot be created",error);
        }
        else{
          console.log(request.body.fakeAnswer1+"created",db_result);
        }
      });
      var fake_answer2   = new Answer({answer:request.body.fakeAnswer2, question_id:db_result._id});
      fake_answer2.save(function(error,db_result){
        if(error){
          console.log(request.body.fakeAnswer2+"cannot be created",error);
        }
        else{
          console.log(request.body.fakeAnswer2+"created",db_result);
        }
      });
      
    }
  });
});

app.post('/answers_for_question',function(request,response){
  var question_id = request.body.question_id;
  //-------------Find all answers for this qestion----------
  Answer.find({question_id:question_id},function(error,db_result){
    if(error){
      console.log("--------------ANSWERS FOR THIS QUESTION CANNOT BE FETCHED",error);
    }else{
       response.json(db_result);
    }
  });

});

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
  

 
 
 