 (function(angular) {
     'use strict';

     function controller(editPartnerpreferenceModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = editPartnerpreferenceModel;
             vm.model.scope = scope;
         };

         vm.init();

     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editPartnerpreferenceCtrl', controller)

     controller.$inject = ['editPartnerpreferenceModel', '$scope'];
 })(angular);