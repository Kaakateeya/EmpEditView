(function(angular) {
    'use strict';


    function factory(editReferenceService, authSvc, alertss, commonFactory, uibModal, SelectBindService) {
        var model = {};
        model.scope = {};

        //declaration part

        model.ReferenceArr = [];
        model.refObj = {};

        model.deleteDisplayTxt = 'reference';
        var isSubmit = true;
        model.identityID = 0;
        var logincustid = authSvc.getCustId();
        var custID = model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        //end declaration block
        model.init = function() {
            model.pageload();
            return model;
        };


        model.referencePopulate = function(item) {
            isSubmit = true;
            model.refObj.RefrenceCust_Reference_ID = null;
            model.refObj = {};

            if (item !== undefined) {
                model.refObj.intCusID = custID;
                model.refObj.RefrenceCust_Reference_ID = item.RefrenceCust_Reference_ID;
                model.refObj.ddlRelationshiptype = 318;
                model.refObj.txtFname = item.ReferenceFirstName;
                model.refObj.txtLname = item.ReferenceLastName;
                model.refObj.txtProfessiondetails = item.RefrenceProfessionDetails;
                model.refObj.ddlCountry = commonFactory.checkvals(item.RefrenceCountry) ? parseInt(item.RefrenceCountry) : null;
                model.refObj.ddlState = commonFactory.checkvals(item.RefrenceStateID) ? parseInt(item.RefrenceStateID) : null;
                model.refObj.ddlDistrict = commonFactory.checkvals(item.RefrenceDistrictID) ? parseInt(item.RefrenceDistrictID) : null;
                model.refObj.txtNativePlace = item.RefrenceNativePlaceID;
                model.refObj.txtPresentlocation = item.RefenceCurrentLocation;

                model.refObj.ddlMobileCountryID = commonFactory.checkvals(item.RefrenceMobileCountryID) ? parseInt(item.RefrenceMobileCountryID) : null;

                model.refObj.txtMobileNumber = item.RefrenceMobileNumberID;

                if (commonFactory.checkvals(item.RefrenceAreaCode)) {
                    model.refObj.ddlLandLineCountryID = commonFactory.checkvals(item.RefrenceLandCountryId) ? parseInt(item.RefrenceLandCountryId) : null;
                    model.refObj.txtAreCode = item.RefrenceAreaCode;
                    model.refObj.txtLandNumber = item.RefrenceLandNumber;

                } else {
                    model.refObj.ddlMobileCountryID2 = commonFactory.checkvals(item.RefrenceLandCountryId) ? parseInt(item.RefrenceLandCountryId) : null;
                    model.refObj.txtMobileNumber2 = item.RefrenceLandNumber;
                }

                model.refObj.txtEmails = item.RefrenceEmail;
                model.refObj.txtNarrations = item.RefrenceNarration;
            }
            commonFactory.open('referenceContent.html', model.scope, uibModal);

        };

        model.pageload = function() {
            editReferenceService.getReferenceData(custID).then(function(response) {
                model.ReferenceArr = response.data;
                console.log(model.ReferenceArr);
                model.referencemodifiedby = (model.ReferenceArr.length > 0 && model.ReferenceArr[0].EmpLastModificationDate !== undefined && model.ReferenceArr[0].EmpLastModificationDate !== null) ? model.ReferenceArr[0].EmpLastModificationDate : '';
            });
        };

        model.refenceSubmit = function(obj) {

            if (isSubmit) {
                isSubmit = false;

                model.referenceData = {
                    GetDetails: {
                        CustID: custID,
                        RelationshiptypeID: obj.ddlRelationshiptype,
                        Firstname: obj.txtFname,
                        Lastname: obj.txtLname,
                        Employedin: null,
                        Professiongroup: null,
                        Profession: null,
                        Professiondetails: obj.txtProfessiondetails,
                        CountryID: obj.ddlCountry,
                        StateID: obj.ddlState,
                        DistrictID: obj.ddlDistrict,
                        Nativeplace: obj.txtNativePlace,
                        Presentlocation: obj.txtPresentlocation,
                        MobileCountryID: obj.ddlMobileCountryID,
                        MobileNumber: obj.txtMobileNumber,
                        LandLineCountryID: commonFactory.checkvals(obj.ddlMobileCountryID2) ? obj.ddlMobileCountryID2 : (commonFactory.checkvals(obj.ddlLandLineCountryID) ? obj.ddlLandLineCountryID : null),
                        LandLineAreaCode: commonFactory.checkvals(obj.txtMobileNumber2) ? null : (commonFactory.checkvals(obj.txtAreCode) ? obj.txtAreCode : null),
                        LandLineNumber: commonFactory.checkvals(obj.txtMobileNumber2) ? obj.txtMobileNumber2 : (commonFactory.checkvals(obj.txtLandNumber) ? obj.txtLandNumber : null),
                        Emails: obj.txtEmails,
                        Narration: obj.txtNarrations,
                        Cust_Reference_ID: model.refObj.RefrenceCust_Reference_ID
                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: null,
                        Admin: null
                    }
                };
                model.submitPromise = editReferenceService.submitReferenceData(model.referenceData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.pageload();
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


        model.DeletePopup = function(id) {
            model.identityID = id;
            commonFactory.open('common/templates/deletepopup.html', model.scope, uibModal, 'sm');
        };

        model.deleteSubmit = function(type) {
            SelectBindService.DeleteSection({ sectioname: 'Reference', CustID: custID, identityid: model.identityID }).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                model.pageload();
            });
        };



        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editReferenceModel', factory)

    factory.$inject = ['editReferenceService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'SelectBindService'];

})(angular);