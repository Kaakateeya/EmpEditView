 (function(angular) {
     'use strict';

     function controller(editEducationModel, scope) {
         var vm = this,
             model;
         vm.scope = scope;
         vm.init = function() {
             vm.model = model = editEducationModel.init();
             model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editEducationCtrl', controller)

     controller.$inject = ['editEducationModel', '$scope'];
 })(angular);