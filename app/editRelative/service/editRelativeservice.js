(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getRelativeeData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getRelativeDetailsDisplay', { params: { CustID: obj } });
            },
            submitFBData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerFathersBrotherUpdatedetails', JSON.stringify(obj1));
            },
            submitFSData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerFathersSisterUpdatedetails', JSON.stringify(obj1));
            },
            submitMBData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerMotherBrotherUpdatedetails', JSON.stringify(obj1));
            },
            submitMSData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerMotherSisterUpdatedetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editRelativeService', factory)

    factory.$inject = ['$http'];
})(angular);