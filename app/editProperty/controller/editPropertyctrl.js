 (function(angular) {
     'use strict';

     function controller(editPropertyModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = editPropertyModel;
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editPropertyCtrl', controller)

     controller.$inject = ['editPropertyModel', '$scope'];
 })(angular);