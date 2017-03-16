 (function(angular) {
     'use strict';

     function controller(editManagePhotoModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {

             vm.model = editManagePhotoModel;

             editManagePhotoModel.init();
             vm.model.scope = scope;
         };


         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editManagePhotoCtrl', controller)

     controller.$inject = ['editManagePhotoModel', '$scope'];
 })(angular);