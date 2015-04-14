myAppModule.controller('QuestionController',function ($scope,$http) {
	//alert("-------controller Ready----------")

	$scope.add_question = function(){
		var new_question = $scope.newQuestion;
		$http.post('/new_question',new_question).success(function(server_response){
			console.log(server_response);
			$scope.newQuestion ={};
		})
	}

});

myAppModule.controller('PlayController',function ($scope,questionFactory,$http) {
	//alert("-------controller Ready----------")
  
	  var user_name = prompt("Enter name");
    var current_user =''; 
    var all_questions ={};

     $scope.questions ={} ; 
     $scope.current_question ={};
	 
	  $scope.user_score = 0;

     var index = 0;

     $scope.play_again = function(){
     	 index = 0;
     	 $scope.current_question = $scope.questions[index];
     	 $scope.user_score = 0;
     }
	
	function create_user(){
		user ={user_name:user_name,score:0}
		$http.post('/create_user',user).success(function(server_response){
			//console.log(server_response);
			current_user=server_response;
		});
	}	 


	$scope.submit_answer = function(current_question,answer){
		console.log(current_question);
		console.log(answer);
		if(index === $scope.questions.length){
			 console.log("Game over");
			 $scope.message="------- Game Over -------";
		}
		else{
			var question = current_question; 
			var user_answer = answer;

			//find the question
			$http.get('/get_question/'+question._id).success(function(server_response){
				var question = server_response;
				//console.log(server_response);
				var correct_answer = server_response.correct_answer;
				//console.log(correct_answer);
				 if(correct_answer === user_answer){
			 		$scope.user_score++;
			 		var new_score = $scope.user_score;
			 		var user_details = {id:current_user._id,score:new_score};
			 		console.log(current_user._id);

			 		//-----------------Update score for user---------------
			 		$http.post('/update_user/',user_details).success(function(server_response){
			 			console.log("------------------updated user records------------------------");
			 			//console.log(server_response);
			 		});	
			 		//console.log($scope.user_score);
				 }
				 
			});

			index++;
			console.log("no");
			$scope.current_question = $scope.questions[index];
		}//end of else
	


	}//end of submit_answer()


	 questionFactory.get_all_questions(function(data){
	 	$scope.questions = data;
	 	$scope.current_question = $scope.questions[index];
	  
	 });
	
	  

	
	create_user();

 
 
});

myAppModule.controller('UsersController',function ($scope,$http) {
	//alert("-------controller Ready----------")
 $scope.users   = [];

 function get_all_users(){
		$http.get('/users').success(function(server_response){
			//console.log(server_response);
			$scope.users = server_response;

		})
	}
 get_all_users();

});
 