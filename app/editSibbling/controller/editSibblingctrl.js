 (function(angular) {
     'use strict';

     function controller(editSibblingModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = editSibblingModel;
             vm.model.scope = scope;
         };

         vm.init();

     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editSibblingCtrl', controller)

     controller.$inject = ['editSibblingModel', '$scope'];
 })(angular);