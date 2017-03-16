 (function(angular) {
     'use strict';

     function controller(baseModel, scope, $state, stateParams) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             scope.model = model = baseModel;
             model.scope = scope;
         };

         scope.redirect = function(type) {

             $state.go('editview.' + type, { CustID: stateParams.CustID });

         };
         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('baseCtrl', controller)

     controller.$inject = ['baseModel', '$scope', '$state', '$stateParams'];
 })(angular);