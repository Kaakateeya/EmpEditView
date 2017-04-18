 (function(angular) {
     'use strict';

     function controller(baseModel, scope, $state, stateParams) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             scope.model = model = baseModel;
             model.scope = scope;
             scope.model.init();
         };

         scope.redirect = function(type) {

             $state.go('editview.' + type, { CustID: stateParams.CustID });

         };
         scope.backgroundcolor = function(status) {
             var color = "background:#EFEFEF";
             switch (status) {
                 case 54:
                     color = "background:#EFEFEF";
                     break;
                 case 55:
                     color = "background: #185615;";
                     break;
                 case 56:
                 case 394:
                     color = "background:#BCC3BE;";
                     break;
                 case 57:
                 case 393:
                     color = "background:#17F067";
                     break;
             }
             return color;
         };
         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('baseCtrl', controller);

     controller.$inject = ['baseModel', '$scope', '$state', '$stateParams'];
 })(angular);