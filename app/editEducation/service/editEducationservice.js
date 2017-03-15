(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getEducationData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerEducationdetails', { params: { CustID: obj } });
            },
            getProfessionData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerProfessiondetails', { params: { CustID: obj } });
            },
            getAboutData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getEducationProfession_AboutYourself', { params: { CustID: obj, AboutYourself: '', flag: 0 } });
            },
            submitEducationData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerPersonalUpdateEducationdetail', JSON.stringify(obj1));
            },
            submitProfessionData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerPersonalUpdateProfessionDetails', JSON.stringify(obj1));
            },
            submitAboutUrData: function(obj1) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getEducationProfession_AboutYourself', { params: obj1 });
            },

            getCustomerData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getpersonaldetails_Customer', { params: { CustID: obj } });
            },
            submitCustomerData: function(obj1) {
                console.log(JSON.stringify(obj1));
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/UpdatePersonalDetails_Customersetails', JSON.stringify(obj1));
            }

        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editEducationService', factory)

    factory.$inject = ['$http'];
})(angular);