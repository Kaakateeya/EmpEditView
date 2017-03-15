(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getAstroData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getAstroDetailsDisplay', { params: { CustID: obj } });
            },
            submitAstroData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerAstrodetailsUpdatedetails', JSON.stringify(obj1));
            },
            uploadDeleteAstroData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/AstroDetailsUpdateDelete', JSON.stringify(obj1));
            },
            generateHoroscope: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonalUpdate/getGenerateHoroscorpe', { params: { customerid: obj.customerid, EmpIDQueryString: obj.EmpIDQueryString, intDay: obj.intDay, intMonth: obj.intMonth, intYear: obj.intYear, CityID: obj.CityID } });
            },

            GenerateHoroS3: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonalUpdate/getAstroGenerationS3Update', { params: { Path: JSON.stringify(obj.Path), KeyName: JSON.stringify(obj.KeyName) } });
            }

        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editAstroService', factory)

    factory.$inject = ['$http'];
})(angular);