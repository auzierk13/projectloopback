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
		// ######### Delete e edit book
		$scope.dataBook= {};
		$scope.recoverBook = function(book){
		   $scope.dataBook = book;
		   console.log($scope.dataBook);
		}
			//######## Delete ##############
		$scope.removeBook = function(){
			console.log("Remove");
			console.log($scope.dataBook);
			Book.deleteById({id:$scope.dataBook.id}).$promise.then(function(res,err){
					listaBook();
					console.log(err);
			});
		}
			//######### Editar ###########
		$scope.editaBook = function(book){

			if(!book){
				console.log("Erro ao Editar");
			}else{
				console.log("Editar");
				if(book.title){
					$scope.dataBook.title = book.title; 
					console.log('Não possui title');
				}else if(book.authorid){
					$scope.dataBook.authorid = book.authorid; 
					console.log('Não possui authorid');
				}
				// editAuthor.id = $scope.dataAuthor.id; //recebe id selecionado
				delete $scope.book;
				console.log($scope.dataBook);
				Book.replaceById($scope.dataBook.id,$scope.dataBook, function(err, res) {
					listaBook();
				});
			}
		}	
		//############ Sort books #####################
		$scope.sortField = "id";
 	 	$scope.reverse= false;
 	 	$scope.isIcones=[	{nome: "id", selectIcone: false, img:"glyphicon glyphicon-chevron-up"},
							{nome: "title", selectIcone: false, img:"glyphicon glyphicon-chevron-up"},
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