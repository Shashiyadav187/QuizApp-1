myAppModule.factory('questionFactory',function($http){
	var factory   = {};
    all_questions = [];

	factory.get_all_questions = function(callback){
		$http.get('/questions').success(function(server_response){
			callback(server_response);
		})
	}

	factory.get_all_answers_for_question = function(question_id,callback){
		var question_id = {question_id:question_id};
		$http.post('/answers_for_question',question_id).success(function(server_response){
			callback(server_response);
		})
	}
 

	return factory;
});

 