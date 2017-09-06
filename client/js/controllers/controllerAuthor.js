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

		$scope.sort = function(fieldSort){
			console.log(fieldSort);
			$scope.sortField=fieldSort;
			$scope.reverse = !$scope.reverse;
			chooseIcone(fieldSort);
		}


		$scope.editaAuthor = function(editAuthor){

			if(!editAuthor){
				console.log("Erro ao Editar");
			}else{
				console.log("Editar");
				if(editAuthor.firstname){
					$scope.dataAuthor.firstname = editAuthor.firstname; 
					console.log('Não possui firstname');
				}else if(editAuthor.lastname){
					$scope.dataAuthor.lastname = editAuthor.lastname; 
					// editAuthor.lastname = $scope.dataAuthor.lastname;
					console.log('Não possui lastname');
				}
				// editAuthor.id = $scope.dataAuthor.id; //recebe id selecionado
				delete $scope.editAuthor;
				console.log($scope.dataAuthor);
				Author.replaceById($scope.dataAuthor.id,$scope.dataAuthor, function(err, res) {
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

	}])

	.controller('AuthorAdicionaController',['$scope','$state','Author', function($scope, $state, Author){
		// $scope.form = {};

		$scope.adicionarAuthor = function(author){
			if(!author){
				console.log("Erro ao Adicionar");
			}else{
				author.id = 0;
				console.log(author);
				Author.create(author).$promise.then(function(res,err){
				console.log(res);
				});
				
			}
		}
	}]);