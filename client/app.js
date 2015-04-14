var myAppModule = angular.module('myAppModule',['ngRoute']);

//For testing angular module
//alert("-------------------App.js ready----------");


//use the config method to set up routing
myAppModule.config(function($routeProvider){
	$routeProvider
		.when('/question', {
			templateUrl: 'partials/question.html'
		})
		.when('/lets_play', {
			templateUrl: 'partials/lets_play.html'
		})
		.when('/users', {
			templateUrl: 'partials/users.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});
