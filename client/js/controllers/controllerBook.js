'use strict';
angular
	.module('app')
	.controller('BookListaController',['$scope','$state','Book', function($scope, $state, Book){
		$scope.books =[];
		function listaBook(){
			Book.find().$promise.then(function(res,err){
				$scope.books= res;
		    });
		}

		listaBook();
		//###Sort books 
		$scope.sortField = "id";
 	 	$scope.reverse=false;
 	 	$scope.isIcones=[	{nome: "id", selectIcone: false, img:"glyphicon glyphicon-chevron-up"},
							{nome: "firstname", selectIcone: false, img:"glyphicon glyphicon-chevron-up"},
							{nome: "lastname", selectIcone: false, img:"glyphicon glyphicon-chevron-up"}
					 	];
	function chooseIcone (sortBook) {
		 $scope.isIcones.forEach( function(icone) {
		 	if(icone.nome === sortBook){
				icone.selectIcone=!icone.selectIcone; //Inverte o icone
		 	}else{
		 		icone.selectIcone=false;
		 	}
				!icone.selectIcone? icone.img="glyphicon glyphicon-chevron-up":icone.img="glyphicon glyphicon-chevron-down";
		 });
	}

		$scope.sort = function(sortBook){
			console.log(sortBook);
			$scope.sortField=sortBook;
			$scope.reverse = !$scope.reverse;
			chooseIcone(sortBook);
		}
	}]);