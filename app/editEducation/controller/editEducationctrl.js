 (function(angular) {
     'use strict';

     function controller(editEducationModel, scope, baseModel) {
         var vm = this;

         //  vm.scope = scope;
         vm.init = function() {
             vm.model = editEducationModel;
             //  editEducationModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editEducationCtrl', controller);

     controller.$inject = ['editEducationModel', '$scope', 'baseModel'];
 })(angular);