(function(angular) {
    'use strict';


    function factory(editOfcePurposeService, authSvc, alertss, commonFactory, uibModal) {
        var model = {};
        model.scope = {};
        var logincustid = authSvc.getCustId();
        var custID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.dataval = '';
        model.aboutObj = {};

        model.init = function() {
            model.pageload();
            return model;
        };

        model.pageload = function() {
            editOfcePurposeService.getofficeData('1', custID, '').then(function(response) {
                console.log(response);
                if (response.data.length > 0) {
                    model.dataval = response.data[0].length > 0 ? (JSON.parse(response.data[0]))[0].AboutProfile : '';
                }
                console.log(model.dataval);
            });
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };
        model.showPopup = function(val) {
            model.aboutObj.txtAboutprofile = '';
            if (val !== undefined) {
                model.aboutObj.txtAboutprofile = val;
            }
            commonFactory.open('AboutModalContent.html', model.scope, uibModal);
        };

        model.AboutProfleSubmit = function(str) {
            editOfcePurposeService.getofficeData('2', custID, str).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                if (response.data === 1) {
                    model.dataval = str;
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                }

            });

        };


        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editOfcePurposeModel', factory)

    factory.$inject = ['editOfcePurposeService', 'authSvc', 'alert', 'commonFactory', '$uibModal'];

})(angular);