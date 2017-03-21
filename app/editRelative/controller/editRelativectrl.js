 (function(angular) {
     'use strict';

     function controller(editRelativeModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = editRelativeModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editRelativeCtrl', controller);

     controller.$inject = ['editRelativeModel', '$scope'];
 })(angular);