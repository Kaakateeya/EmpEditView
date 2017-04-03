 (function(angular) {
     'use strict';

     function controller(editContactModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editContactModel;
             editContactModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editContactCtrl', controller);

     controller.$inject = ['editContactModel', '$scope', '$window'];
 })(angular);