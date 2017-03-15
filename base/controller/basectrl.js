 (function(angular) {
     'use strict';

     function controller(baseModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             scope.model = model = baseModel;
             model.scope = scope;
         };
         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('baseCtrl', controller)

     controller.$inject = ['baseModel', '$scope'];
 })(angular);