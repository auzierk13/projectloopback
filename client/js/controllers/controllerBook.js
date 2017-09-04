'use strict';
angular
	.module('app')
	.controller('BookListaController',['$scope','$state','Book', function($scope, $state, Book){
		$scope.books ={};
		function listaBook(){
			Book.find().$promise.then(function(res,err){
				$scope.books= res;
		    });
		}

		listaBook();
	}]);