 (function(angular) {
     'use strict';

     function controller(editProfileSettingModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = editProfileSettingModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editProfileSettingCtrl', controller)

     controller.$inject = ['editProfileSettingModel', '$scope'];
 })(angular);