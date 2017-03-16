(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getSibblingeData: function(obj) {
                return http.get(editviewapp.apipathold + 'CustomerPersonal/getsiblingsDetailsDisplay', { params: { CustID: obj } });
            },
            submitSibBroData: function(obj1) {
                return http.post(editviewapp.apipathold + 'CustomerPersonalUpdate/CustomerSibBrotherUpdatedetails', JSON.stringify(obj1));
            },
            submitSibSisData: function(obj1) {
                return http.post(editviewapp.apipathold + 'CustomerPersonalUpdate/CustomerSibSisterUpdatedetails', JSON.stringify(obj1));
            },
            submitSibCountsData: function(obj1) {
                return http.post(editviewapp.apipathold + 'CustomerPersonalUpdate/UpdateSibblingCounts', JSON.stringify(obj1));
            },
            allowblockWebusers: function(custid) {
                return http.get(editviewapp.apipathold + 'StaticPages/getRegisteredBranchStatus', { params: { StrCustID: custid } });
            }

        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editSibblingService', factory)

    factory.$inject = ['$http'];
})(angular);