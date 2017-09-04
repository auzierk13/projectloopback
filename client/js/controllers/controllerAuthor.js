'use strict'; 
angular
	.module('app')
	.controller('AuthorListaControler',['$scope','$state','Author', function($scope, $state, Author){
		$scope.authores = {};
		$scope.dataAuthor= {};
		// find, findOne , findByID
		function listaAuthor(){
			Author.find().$promise.then(function(res,err){
				$scope.authores = res;
			});
		}

		$scope.recoverAuthor = function(author){
			    $scope.dataAuthor = author;
			}

		$scope.editaAuthor = function(author){
			console.log("Editar");
			console.log(author);
		}

		$scope.removeAuthor = function(author){
			console.log("Remove");
			console.log(author);
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