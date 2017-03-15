(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getContactData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerPersonalContact_Details', { params: { CustID: obj } });
            },
            submitContactData: function(obj1) {
                console.log(JSON.stringify(obj1));
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerContactDetails_Update', JSON.stringify(obj1));
            },
            submitContactReferenceData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/UpdateContactdetails_Reference', JSON.stringify(obj1));
            },
            submitPrimaryRelationData: function(obj) {
                console.log(JSON.stringify(obj));

                return http.get(editviewapp.apipath + 'CustomerPersonal/getCandidateContactdetailsRelationName', {
                    params: { CustID: obj.CustID, PrimaryMobileRel: obj.PrimaryMobileRel, PrimaryEmailRel: obj.PrimaryEmailRel, iflage: obj.iflage }
                });
            },

            sendMobileCode: function(obj) {
                return http.get(editviewapp.apipath + 'StaticPages/getCustomerdmobileVerfCodesend', {
                    params: { iCountryID: obj.iCountryID, iCCode: obj.iCCode, MobileNumber: obj.MobileNumber, CustFamilyID: obj.CustFamilyID }
                });
            },
            verifyEmail: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCandidateContactsendmailtoemailverify', { params: { CustID: obj } });
            },
            verifyMobile: function(VCode, CustFamilyid) {
                return http.get(editviewapp.apipath + 'StaticPages/getCustomerEmilVerificationCodeUpdate', { params: { VerificationCode: VCode, CustFamilyID: CustFamilyid } });
            },
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editContactService', factory)

    factory.$inject = ['$http'];
})(angular);