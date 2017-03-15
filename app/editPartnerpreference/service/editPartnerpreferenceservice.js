(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getPartnerPreferenceData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerpartnerpreferencesDetailsDisplay', { params: { CustID: obj } });
            },
            submitPartnerPrefData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerPartnerPreferencesUpdatedetails', JSON.stringify(obj1));
            },
            submitPartnerDescData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getPartnerpreference_DiscribeYourPartner', { params: obj });
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editPartnerpreferenceService', factory)

    factory.$inject = ['$http'];
})(angular);