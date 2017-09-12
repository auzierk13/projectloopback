'use strict';
angular
	.module('app')
	.controller('BookListaController',['$scope','$state','Book','Author', function($scope, $state,Book,Author){
		$scope.books =[];
		$scope.authors =[];

		function listaBook(){
			Book.find().$promise.then(function(res,err){
				$scope.books= res;
			    Author.find().$promise.then(function(res,err){
					$scope.authors =res;
					console.log($scope.authors);				
			   		console.log('Unir lista'); 
			    	$scope.authors.forEach( function(author) {
				    	$scope.books.forEach( function(book) {
				    		if(book.authorid == author.id){
				    			book.idAuthor = author.id;
				    			book.firstname = author.firstname;
				    			book.lastname= author.lastname;
				    		}
				    	}); //end forEach books
			    	});//end forEach authors
			    });
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
			// console.log("Remove");
			// console.log($scope.dataBook);
			Book.deleteById({id:$scope.dataBook.id}).$promise.then(function(res,err){
					listaBook();
					console.log(err);
			});
		}
		//######### Editar ###########
		function editaAuthor (mEditAuthor){

			if(!mEditAuthor){
				console.log("Erro ao Editar");
			}else{
				console.log("Editar");
				if(!mEditAuthor.firstname){
					mEditAuthor.firstname = $scope.dataBook.lastname;
					// $scope.dataAuthor.firstname = mEditAuthor.firstname; 
					console.log('Não possui firstname');
				}else if(!mEditAuthor.lastname){
					mEditAuthor.lastname = $scope.dataBook.lastname;
					// $scope.dataAuthor.lastname = mEditAuthor.lastname; 
					console.log('Não possui lastname');
				}
				mEditAuthor.id = $scope.dataBook.idAuthor; //recebe id selecionado
				console.log(mEditAuthor);
				Author.replaceById($scope.dataBook.id,mEditAuthor, function(err, res) {
					delete $scope.mEditAuthor;
					listaBook();
				});
			}
		}
		//Editar livro
		$scope.editaBook = function(mEditbook,mEditAuthor){

			if(!mEditbook){
				console.log("Erro ao Editar");
			}else{
				console.log("Editar");
				if(mEditbook.title){
					console.log('Possui title');
					$scope.dataBook.title = mEditbook.title; 
				}

				if(mEditbook.authorid){
					console.log('Possui authorid');
					$scope.dataBook.authorid = mEditbook.authorid; 
				}
				delete $scope.mEditbook;
				// console.log($scope.dataBook);
				Book.replaceById($scope.dataBook.id,$scope.dataBook, function(err, res) {
					listaBook();
				});

			}
				editaAuthor(mEditAuthor);
		}


		//############ Sort books #####################
		$scope.sortField = "id";
 	 	$scope.reverse= false;
 	 	$scope.isIcones=[	{nome: "id", selectIcone: false, img:"glyphicon glyphicon-chevron-up"},
							{nome: "title", selectIcone: false, img:"glyphicon glyphicon-chevron-up"},
							{nome: "authorid", selectIcone: false, img:"glyphicon glyphicon-chevron-up"},
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

		$scope.isAddBook = false;

		$scope.showAddBook = function(book){
			// console.log("Adicionar Livro");
			$scope.isAddBook= !$scope.isAddBook;
			if($scope.book){ //Modelo não vazio
				delete $scope.book;
			}
			return $scope.isAddBook;
			
		}
		$scope.addBook = function(book){
			console.log(book);
			if(!book){
				console.log("Erro ao Adicionar");
				delete $scope.book;
			}else{
				book.id = 0;
				Book.create(book).$promise.then(function(res,err){
					console.log(res);
					delete $scope.book;
					listaBook();
				});
				
			}
		}
		listaBook();

	}])
	.controller('BookAdicionaCotroller',['$scope','$state','Book','Author', function($scope, $state,Book,Author){
		//#### Create ####
		// $scope.books =[];
		// $scope.authors1 =[]; //Lista id author sem duplicidade
		

		// function listaBook(){
		// 	Book.find().$promise.then(function(res,err){
		// 		$scope.books= res;
		//     });
		//     Author.find().$promise.then(function(res,err){
		// 		$scope.authors1 =res;
		// 		console.log($scope.authors);				
		//     	console.log('Unir lista'); 
		//     });
		// }

		// $scope.adicionarBook = function(book){
		// 	console.log(book);
		// 	if(!book){
		// 		console.log("Erro ao Adicionar");
		// 	}else{
		// 		book.id = 0;
		// 		Book.create(book).$promise.then(function(res,err){
		// 			console.log(res);
		// 		});
				
		// 	}
		// }
		// listaBook();
	}]);