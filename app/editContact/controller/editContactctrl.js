 (function(angular) {
     'use strict';

     function controller(editContactModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = editContactModel;
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editContactCtrl', controller)

     controller.$inject = ['editContactModel', '$scope'];
 })(angular);