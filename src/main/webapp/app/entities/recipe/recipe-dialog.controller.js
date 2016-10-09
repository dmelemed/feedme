(function() {
    'use strict';

    angular
        .module('jhipsterApp')
        .controller('RecipeDialogController', RecipeDialogController);

    RecipeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Recipe'];

    function RecipeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Recipe) {
        var vm = this;

        vm.recipe = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.recipe.id !== null) {
                Recipe.update(vm.recipe, onSaveSuccess, onSaveError);
            } else {
                Recipe.save(vm.recipe, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('jhipsterApp:recipeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
