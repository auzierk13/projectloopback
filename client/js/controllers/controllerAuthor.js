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
				console.log($scope.dataAuthor);
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