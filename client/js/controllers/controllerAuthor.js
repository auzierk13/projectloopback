'use strict'; 
angular
	.module('app')
	.controller('AuthorListaControler',['$scope','$state','Author', function($scope, $state, Author){
		$scope.authores = [];
		$scope.dataAuthor= {};
		// find, findOne , findByID
		function listaAuthor(){
			Author.find().$promise.then(function(res,err){
				$scope.authores = res;
			});
		}

		$scope.recoverAuthor = function(author){
			    $scope.dataAuthor = author;
				console.log($scope.dataAuthor);
			}
 	  $scope.sortField = "id";
 	  $scope.reverse=false;
      $scope.isIcones=[	{nome: "id", selectIcone: false, img:"glyphicon glyphicon-chevron-up"},
						{nome: "firstname", selectIcone: false, img:"glyphicon glyphicon-chevron-up"},
						{nome: "lastname", selectIcone: false, img:"glyphicon glyphicon-chevron-up"}
					 ];
		function chooseIcone (fieldSort) {
			 $scope.isIcones.forEach( function(icone) {
			 	if(icone.nome === fieldSort){
					icone.selectIcone=!icone.selectIcone; //Inverte o icone
			 	}else{
			 		icone.selectIcone=false;
			 	}
					!icone.selectIcone? icone.img="glyphicon glyphicon-chevron-up":icone.img="glyphicon glyphicon-chevron-down";
			 });
		}

		$scope.isAddAuthor = false;

		$scope.showAddAuthor = function(author){
			// console.log("Adicionar Author");
			$scope.isAddAuthor= !$scope.isAddAuthor;
			if($scope.author){ // modelo não vazio
				delete $scope.author;
			}
			return $scope.isAddAuthor;
			
		}

		$scope.sort = function(fieldSort){
			console.log(fieldSort);
			$scope.sortField=fieldSort;
			$scope.reverse = !$scope.reverse;
			chooseIcone(fieldSort);
		}


		$scope.editaAuthor = function(mEditAuthor){

			if(!mEditAuthor){
				console.log("Erro ao Editar");
			}else{
				console.log("Editar");
				if(mEditAuthor.firstname){
					console.log('Possui firstname');
					$scope.dataAuthor.firstname = mEditAuthor.firstname; 
				}

				if(mEditAuthor.lastname){
					console.log('Possui lastname');
					$scope.dataAuthor.lastname = mEditAuthor.lastname; 
				}
				delete $scope.mEditAuthor;
				console.log($scope.dataAuthor);
				Author.replaceById($scope.dataAuthor.id,$scope.dataAuthor, function(err, res) {
					console.log(err);
					listaAuthor();
				});
			}
		}

		$scope.removeAuthor = function(){
			console.log("Remove");
			console.log($scope.dataAuthor);
			Author.deleteById({id:$scope.dataAuthor.id}).$promise.then(function(res,err){
					listaAuthor();
					console.log(err);
			});
		}

		listaAuthor();

		$scope.addAuthor = function(author){
			if(!author){
				console.log("Erro ao Adicionar");
				delete $scope.author;
			}else{
				author.id = 0;
				console.log(author);
				Author.create(author).$promise.then(function(res,err){
					console.log(res);
				 	delete $scope.author;
				 	listaAuthor(); //Atualiza com novo author
				 // console.log($scope.author);
				});
				
			}
		}

	}])

	.controller('AuthorAdicionaController',['$scope','$state','Author', function($scope, $state, Author){

	}]);