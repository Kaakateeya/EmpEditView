(function(angular) {
    'use strict';


    function factory(editPropertyService, authSvc, alertss, commonFactory, uibModal) {
        var model = {};
        model.scope = {};

        //declaration part

        model.propertyArr = [];
        model.proObj = {};

        var isSubmit = true;
        var logincustid = authSvc.getCustId();
        var custID = model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        //end declaration block

        model.init = function() {
            model.pageload();

            return model;
        };

        model.pageload = function() {
            editPropertyService.getPropertyData(custID).then(function(response) {
                model.propertyArr = response.data;
                model.propertymodifiedby = (model.propertyArr.length > 0 && model.propertyArr[0].EmpLastModificationDate !== undefined && model.propertyArr[0].EmpLastModificationDate !== null) ? model.propertyArr[0].EmpLastModificationDate : '';
            });
        };

        model.populateProperty = function(item) {
            isSubmit = true;
            model.proObj = {};
            model.proObj.Custpropertyid = null;
            if (item !== undefined) {
                model.proObj.Custpropertyid = item.Custpropertyid;
                model.proObj.ddlFamilyStatus = item.FamilyValuesID;
                model.proObj.rdlSharedProperty = item.SharedPropertyID === true ? 1 : 0;
                model.proObj.txtValueofproperty = item.PropertyValue;
                model.proObj.txtPropertydesc = item.PropertyDetails;
            }
            commonFactory.open('propertyContent.html', model.scope, uibModal);

        };


        model.propertySubmit = function(obj) {

            if (isSubmit) {
                isSubmit = false;
                model.propertyData = {
                    GetDetails: {
                        FamilyStatus: obj.ddlFamilyStatus,
                        Issharedproperty: obj.rdlSharedProperty,
                        Valueofproperty: obj.txtValueofproperty,
                        PropertyType: '281',
                        Propertydescription: obj.txtPropertydesc,
                        Showingviewprofile: obj.rbtShowViewProfile,
                        Custpropertyid: model.proObj.Custpropertyid,
                        PropertyID: model.proObj.Custpropertyid,
                        CustId: custID
                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: null,
                        Admin: null
                    }
                };

                model.submitPromise = editPropertyService.submitPropertyData(model.propertyData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        editPropertyService.getPropertyData(custID).then(function(response) {
                            model.propertyArr = response.data;
                        });
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });
            }

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };
        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editPropertyModel', factory)

    factory.$inject = ['editPropertyService', 'authSvc', 'alert', 'commonFactory', '$uibModal'];

})(angular);