(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getSibblingeData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getsiblingsDetailsDisplay', { params: { CustID: obj } });
            },
            submitSibBroData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerSibBrotherUpdatedetails', JSON.stringify(obj1));
            },
            submitSibSisData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerSibSisterUpdatedetails', JSON.stringify(obj1));
            },
            submitSibCountsData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/UpdateSibblingCounts', JSON.stringify(obj1));
            },
            allowblockWebusers: function(custid) {

                return http.get(editviewapp.apipath + 'StaticPages/getRegisteredBranchStatus', { params: { StrCustID: custid } });
            }

        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editSibblingService', factory)

    factory.$inject = ['$http'];
})(angular);