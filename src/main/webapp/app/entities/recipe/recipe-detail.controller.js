(function() {
    'use strict';

    angular
        .module('jhipsterApp')
        .controller('RecipeDetailController', RecipeDetailController);

    RecipeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Recipe'];

    function RecipeDetailController($scope, $rootScope, $stateParams, previousState, entity, Recipe) {
        var vm = this;

        vm.recipe = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('jhipsterApp:recipeUpdate', function(event, result) {
            vm.recipe = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
