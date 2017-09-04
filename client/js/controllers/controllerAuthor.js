'use strict'; 
angular
	.module('app')
	.controller('AuthorListaControler',['$scope','$state','Author', function($scope, $state,Author){
		$scope.authores = {};
		// find, findOne , findByID
		function listaAuthor(){
			Author.find().$promise.then(function(res,err){
				$scope.authores = res;
			});
		}

		listaAuthor();
	}]);