
myAppModule.controller('LoginController',function ($scope,$http,$location,localStorageService) {
		//alert("-------controller Ready----------")
	$scope.users = [
	{	name :"my_username@email.com",password : "1234"} 
		];
	$scope.current_user = "";
	$scope.warning      = "";
	var match_found     = false;

  $scope.login_user=function(){
 	console.log($scope.user);
 	var current_user = $scope.user;
 	var users = $scope.users ;
 	if(current_user=== undefined ||current_user.name === undefined ||current_user.name === undefined ){
 			$scope.warning = "Please enter user name and password!!!!!";
 	 }
 	else{
 		for (var index = 0; index < users.length; index++) {
	 		if(current_user.name === users[index].name && current_user.password === users[index].password ){
	 			 console.log("Inside");
	 			 match_found = true;	 
	 		} 
 		};

 		if(match_found===true){
 			$scope.warning = "";
			localStorageService.set("current_user_name", current_user.name );
 			$location.path('/lets_play/'+current_user.name);
 			$scope.current_user = localStorageService.get("current_user_name");
 			console.log($scope.current_user);
 		}
 		else{
 			$scope.warning = "Sorry !!! Not a valid user, TRY AGAIN!!!!!";
	 		$location.path('/login');
 		}
 	}
 	
 }
  
 //$location.path('/lets_play');

});
myAppModule.controller('LogController',function($scope,localStorageService,$location){
	
	if(! (localStorageService.get("current_user_name")===undefined) ){
		$scope.current_user=localStorageService.get("current_user_name"); 
	}

	$scope.logout = function(){
		localStorageService.remove("current_user_name");
		$scope.message = "-------------Logged Out successfully------------";
	 	$location.path('/login');
	 	$scope.current_user ="";
	}
});

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

myAppModule.controller('PlayController',function ($scope,questionFactory,$http,localStorageService,$location) {
	//alert("-------controller Ready----------")
	
	angular.element(document).ready(function () {
	
		if(! (localStorageService.get("current_user_name")===undefined) ){

		$scope.current_user=localStorageService.get("current_user_name"); //
    //console.log($scope.current_user );
	  var user_name = $scope.current_user;
    var current_user =''; 
    var all_questions ={};

     $scope.questions ={} ; 
     $scope.current_question ={};
     $scope.current_question_answers = [];
     $scope.game_over = false;
     $scope.show_game = true;

	 
	   $scope.user_score = 0;

     var index = 0;
    
		//-----------------Get all Questions--------------
		 questionFactory.get_all_questions(function(data){
		 	$scope.questions = data;
		 	console.log("-----------questions-------",data);
		 	$scope.current_question = $scope.questions[index];
		 		get_answers($scope.current_question._id);
		  
		 });

		 //--------------Game Start Over---------------------
     $scope.play_again = function(){
     	 index = 0;
     	 $scope.current_question = $scope.questions[index];
     	 var question_id         = $scope.current_question._id;
 			 //-----------GET ALL ANSWERS FOR CURRENT QUESTION------------
       get_answers(question_id);
     	 $scope.user_score = 0;
     	 $scope.show_game = true;
     	 $scope.game_over = false;

     }

   function get_answers(question_id){
   		questionFactory.get_all_answers_for_question(question_id,function(data){
     	$scope.current_question_answers = data;	
     });
   }
	
	function create_user(){
		user ={user_name:user_name,score:0}
		$http.post('/create_user',user).success(function(server_response){
			//console.log(server_response);
			current_user=server_response;
		});
	}	 
  //-----------------Calclate Score=--------------------------
	$scope.submit_answer = function(current_question){
		console.log(current_question);
	 
		if(index === $scope.questions.length){
			$scope.game_over = true;
			$scope.show_game = false;
			 console.log("Game over");
			 $scope.message="------- Game Over -------";
		}
		else{
			var question                   = current_question; 
			var is_selected_answer_correct = $scope.answer;
		  console.log(is_selected_answer_correct);

			if(is_selected_answer_correct==='true'){
				$scope.user_score = $scope.user_score + 1;
				console.log($scope.user_score);
			}

			//----------------Increment the question count------------------
			index++;
		  if(index !== $scope.questions.length){

		  	$scope.current_question = $scope.questions[index];
			  get_answers($scope.current_question._id);
		   }
			
		}//end of else
	
	}//end of submit_answer()

	create_user();
}
else{
 	$location.path('/login');
}
    
});//-------------------------end of Doc ready

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
 