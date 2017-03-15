 (function(angular) {
     'use strict';

     function controller(editReferenceModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = editReferenceModel;
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editReferenceCtrl', controller)

     controller.$inject = ['editReferenceModel', '$scope'];
 })(angular);