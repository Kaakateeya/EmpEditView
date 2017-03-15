(function(angular) {
    'use strict';

    function factory(http) {
        return {
            personalDetails: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getpersonalMenuDetails', { params: { CustID: obj } });
            },
            menuReviewstatus: function(Custid, type, sectionid) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerPersonalMenuReviewStatus', { params: { CustID: Custid, iReview: type, SectionID: sectionid } });
            },
            nodatastatus: function(id) {
                return http.get(editviewapp.apipath + 'CustomerPersonalUpdate/getNoDataInformationLinkDisplay', { params: { ProfileID: id } });
            },
            getPhotoInfn: function(custid) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerPersonaloffice_purpose', {
                    params: { flag: '8', ID: custid, AboutProfile: '', IsConfidential: '', HighConfendential: '' }
                });
            },
            PhotoRequest: function(ProfileID, empid) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerphotoRequestDisplay', {
                    params: { profileid: ProfileID, EMPID: empid, ticketIDs: '' }
                });
            }

        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('baseService', factory)

    factory.$inject = ['$http'];
})(angular);