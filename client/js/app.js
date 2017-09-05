angular.module('app',['ui.router','lbServices','angularUtils.directives.dirPagination'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
		$stateProvider

			//Author 
			// Adiciona
			.state('adicionaAuthor',{
				url: '/adiciona-author',
				templateUrl: 'views/author/adiciona.html',
				controller: 'AuthorAdicionaController'	
			})
			//Lista
			.state('listaAuthor',{
				url: '/lista-author',
				templateUrl: 'views/author/listagem.html',
				controller: 'AuthorListaControler'
			})
			
			//Book
			// Adiciona 
			.state('adicionaBook',{
				url:'/adiciona-book',
				templateUrl:'views/book/adiciona.html',
				controller: 'BookAdicionaCotroller'
			})
			// Listagem
			.state('listaBook',{
				url:'/lista-book',
				templateUrl: 'views/book/listagem.html',
				controller: 'BookListaController'
			})
		$urlRouterProvider.otherwise('/lista-author');
	}]);