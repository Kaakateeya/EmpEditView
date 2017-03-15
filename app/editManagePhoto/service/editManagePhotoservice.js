(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getPhotoData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/GetphotosofCustomer', { params: { Custid: obj, EmpID: 2 } });
            },
            submituploadData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/Savephotosofcustomer', JSON.stringify(obj1));
            },
            linqSubmits: function(Custid, iflag) {
                return http.get(editviewapp.apipath + 'CustomerPersonalUpdate/getPhotoPassword', { params: { CustID: Custid, ipassword: iflag } });
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editManagePhotoService', factory)

    factory.$inject = ['$http'];
})(angular);