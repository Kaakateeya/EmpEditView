 (function(angular) {
     'use strict';

     function controller(editSpouseModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = editSpouseModel;
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editSpouseCtrl', controller)

     controller.$inject = ['editSpouseModel', '$scope'];
 })(angular);