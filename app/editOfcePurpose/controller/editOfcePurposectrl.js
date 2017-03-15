 (function(angular) {
     'use strict';

     function controller(editOfcePurposeModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = editOfcePurposeModel;
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editOfcePurposeCtrl', controller)

     controller.$inject = ['editOfcePurposeModel', '$scope'];
 })(angular);