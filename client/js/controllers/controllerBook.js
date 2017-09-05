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


	}])
	.controller('BookAdicionaCotroller',['$scope','$state','Book', function($scope, $state, Book){
		//#### Create ####
		$scope.books =[];
		$scope.listaAuthorids =[];
		// $scope.data = {
		//     model: null,
		//     availableOptions: [
		//       {id: '1', name: 'Option A'},
		//       {id: '2', name: 'Option B'},
		//       {id: '3', name: 'Option C'}
		//     ]
		//    };
		$scope.hasID=false;
		function listaAuthorID(){
			$scope.books.forEach(function(book){
				
				if($scope.listaAuthorids.length== 0){ //Vazio
					$scope.listaAuthorids.push(book);
					// console.log($scope.listaAuthorids);
				}else{
					$scope.listaAuthorids.forEach( function(id) {
						if(id.authorid == book.authorid){
							$scope.hasID = true;
						}
					});
					if(!$scope.hasID){
						$scope.listaAuthorids.push(book);
						// console.log($scope.listaAuthorids);
						$scope.hasID = false;
					}
					// if($scope.listaAuthorids)
				}
			});
		}

		function listaBook(){
			Book.find().$promise.then(function(res,err){
				$scope.books= res;
		    	listaAuthorID();
		    });
		}

		$scope.adicionarBook = function(book){
			console.log(book);
			if(!book){
				console.log("Erro ao Adicionar");
			}else{
				book.id = 0;
				Book.create(book).$promise.then(function(res,err){
					console.log(res);
				});
				
			}
		}
		listaBook();
	}]);