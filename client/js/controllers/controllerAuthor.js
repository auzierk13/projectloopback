'use strict'; 
angular
	.module('app')
	.controller('AuthorListaControler',['$scope','$state','Author', function($scope, $state, Author){
		$scope.authores = {};
		// find, findOne , findByID
		function listaAuthor(){
			Author.find().$promise.then(function(res,err){
				$scope.authores = res;
			});
		}

		listaAuthor();
	}])
	.controller('AuthorAdicionaController',['$scope','$state','Author', function($scope, $state, Author){
		// $scope.form = {};

		$scope.adicionarAuthor = function(author){
			author.id = 0;
			console.log(author);
			// Author.create(author,function(res,err){

			// 	console.log(res);
			// });

			Author.create(author).$promise.then(function(res,err){

				console.log(res);
			});
		}
	}]);