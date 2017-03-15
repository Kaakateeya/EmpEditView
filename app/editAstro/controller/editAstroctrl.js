 (function(angular) {
     'use strict';

     function controller(editAstroModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.scope = scope;
         vm.init = function() {
             vm.model = editAstroModel;
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editAstroCtrl', controller)

     controller.$inject = ['editAstroModel', '$scope'];
 })(angular);