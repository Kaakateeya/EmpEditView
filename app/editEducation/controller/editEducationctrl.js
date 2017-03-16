 (function(angular) {
     'use strict';

     function controller(editEducationModel, scope, baseModel) {
         var vm = this,
             model;
         vm.scope = scope;
         vm.init = function() {
             vm.model = model = editEducationModel.init();
             model.scope = scope;
         };

         vm.vallll = baseModel.lnkeducationandprofReview



         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editEducationCtrl', controller)

     controller.$inject = ['editEducationModel', '$scope', 'baseModel'];
 })(angular);