(function(angular) {
    'use strict';


    function factory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {}
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('parametervalueModel', factory)

    factory.$inject = ['$http'];

})(angular);