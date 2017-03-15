(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getPropertyData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getPropertyDetailsDisplay', { params: { CustID: obj } });
            },
            submitPropertyData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerPropertyUpdatedetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editPropertyService', factory)

    factory.$inject = ['$http'];
})(angular);