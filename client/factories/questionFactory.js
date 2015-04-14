myAppModule.factory('questionFactory',function($http){
	var factory   = {};
    all_questions = [];

	factory.get_all_questions = function(callback){
		$http.get('/questions').success(function(server_response){
			callback(server_response);
		})
	}
 

	return factory;
});