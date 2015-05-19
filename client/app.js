var myAppModule = angular.module('myAppModule',['ngRoute','LocalStorageModule']);

//For testing angular module
//alert("-------------------App.js ready----------");


//use the config method to set up routing
myAppModule.config(function($routeProvider){
	$routeProvider
		.when('/question', {
			templateUrl: 'partials/question.html'
		})
		.when('/', {
			templateUrl: 'partials/login.html'
		})
		.when('/home', {
			templateUrl: 'partials/home.html'
		})
		.when('/lets_play/:name', {
			templateUrl: 'partials/lets_play.html'
		})
		.when('/lets_play', {
			templateUrl: 'partials/lets_play.html'
		})
		.when('/users', {
			templateUrl: 'partials/users.html'
		})
		.when('/logout', {
			templateUrl: 'partials/login.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});
