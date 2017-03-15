(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getReferenceData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getReferenceViewDetailsDisplay', { params: { CustID: obj } });
            },
            submitReferenceData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerReferencedetailsUpdatedetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editReferenceService', factory)

    factory.$inject = ['$http'];
})(angular);