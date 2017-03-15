 (function(angular) {
     'use strict';

     function controller($location) {
         /* jshint validthis:true */
         var vm = this;

         activate();

         function activate() {}
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('parametervalueCtrl', controller)

     controller.$inject = ['$location'];
 })(angular);