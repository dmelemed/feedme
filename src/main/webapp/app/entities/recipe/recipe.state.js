(function() {
    'use strict';

    angular
        .module('jhipsterApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('recipe', {
            parent: 'entity',
            url: '/recipe',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Recipes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/recipe/recipes.html',
                    controller: 'RecipeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('recipe-detail', {
            parent: 'entity',
            url: '/recipe/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Recipe'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/recipe/recipe-detail.html',
                    controller: 'RecipeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Recipe', function($stateParams, Recipe) {
                    return Recipe.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'recipe',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('recipe-detail.edit', {
            parent: 'recipe-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recipe/recipe-dialog.html',
                    controller: 'RecipeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Recipe', function(Recipe) {
                            return Recipe.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('recipe.new', {
            parent: 'recipe',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recipe/recipe-dialog.html',
                    controller: 'RecipeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                ingredients: null,
                                categories: null,
                                source: null,
                                url: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('recipe', null, { reload: 'recipe' });
                }, function() {
                    $state.go('recipe');
                });
            }]
        })
        .state('recipe.edit', {
            parent: 'recipe',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recipe/recipe-dialog.html',
                    controller: 'RecipeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Recipe', function(Recipe) {
                            return Recipe.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('recipe', null, { reload: 'recipe' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('recipe.delete', {
            parent: 'recipe',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recipe/recipe-delete-dialog.html',
                    controller: 'RecipeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Recipe', function(Recipe) {
                            return Recipe.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('recipe', null, { reload: 'recipe' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
