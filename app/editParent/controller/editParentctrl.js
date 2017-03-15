 (function(angular) {
     'use strict';

     function controller(editParentModel, scope) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = editParentModel;
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editParentCtrl', controller)

     controller.$inject = ['editParentModel', '$scope'];
 })(angular);