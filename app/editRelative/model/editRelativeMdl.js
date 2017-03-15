(function(angular) {
    'use strict';


    function factory(editRelativeService, authSvc, alertss, commonFactory, uibModal, SelectBindService) {
        var model = {};
        model.scope = {};

        //declaration part
        model.fbObj = {};
        model.fsObj = {};
        model.mbObj = {};
        model.msObj = {};
        var isSubmit = true;
        model.deleteDisplayTxt = '';
        model.identityID = 0;
        var logincustid = authSvc.getCustId();
        var custid = model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;


        //end declaration block
        model.init = function() {
            model.relativePageLoad();
            return model;
        };

        model.relativePageLoad = function() {
            editRelativeService.getRelativeeData(custid).then(function(response) {
                model.FBArr = JSON.parse(response.data[0]);
                model.FSArr = JSON.parse(response.data[1]);
                model.MBrr = JSON.parse(response.data[2]);
                model.MSArr = JSON.parse(response.data[3]);

                model.FBemodifiedby = (model.FBArr.length > 0 && model.FBArr[0].EmpLastModificationDate !== undefined && model.FBArr[0].EmpLastModificationDate !== null) ? model.FBArr[0].EmpLastModificationDate : '';
                model.FSmodifiedby = (model.FSArr.length > 0 && model.FSArr[0].EmpLastModificationDate !== undefined && model.FSArr[0].EmpLastModificationDate !== null) ? model.FSArr[0].EmpLastModificationDate : '';
                model.MBmodifiedby = (model.MBrr.length > 0 && model.MBrr[0].EmpLastModificationDate !== undefined && model.MBrr[0].EmpLastModificationDate !== null) ? model.MBrr[0].EmpLastModificationDate : '';
                model.MSmodifiedby = (model.MSArr.length > 0 && model.MSArr[0].EmpLastModificationDate !== undefined && model.MSArr[0].EmpLastModificationDate !== null) ? model.MSArr[0].EmpLastModificationDate : '';

            });
        };

        model.relativePopulatePopulate = function(type, item) {
            isSubmit = true;
            switch (type) {
                case 'FB':
                    model.fbObj.FatherbrotherCustfamilyID = null;
                    model.fbObj = {};

                    if (item !== undefined) {
                        model.fbObj.FatherbrotherCustfamilyID = item.FatherbrotherCustfamilyID;
                        model.fbObj.rdlFBElderORyounger = item.FatherBrotherElderyounger == 'Elder' ? 324 : (item.FatherBrotherElderyounger == 'Younger' ? 323 : '-1');
                        model.fbObj.txtFatherbrothername = item.FatherbrotherName;
                        model.fbObj.txtFBEducationdetails = item.FatherBrotherEducationDetails;
                        model.fbObj.txtFBProfessiondetails = item.FatherbrotherProfessionDetails;

                        model.fbObj.ddlFBMobileCountryID = item.FatherbrotherMobileCode;
                        model.fbObj.txtFBMobileNumber = item.FatherbrotherMobileNumber;

                        if (commonFactory.checkvals(item.FatherbrotherLandaraecode)) {
                            model.fbObj.ddlFBLandLineCountry = item.FatherbrotherLandCountryCode;
                            model.fbObj.txtFBAreCode = item.FatherbrotherLandaraecode;
                            model.fbObj.txtFBLandNumber = item.FatherbrotherLandNumber;
                        } else {
                            model.fbObj.ddlFBMobileCountryID2 = item.FatherbrotherLandCountryCode;
                            model.fbObj.txtFBMobileNumber2 = item.FatherbrotherLandNumber;
                        }

                        model.fbObj.txtFBEmails = item.FatherbrotherEmail;
                        model.fbObj.txtCurrentLocation = item.FatherbrotherCurrentLocation;

                    }
                    commonFactory.open('FBModalContent.html', model.scope, uibModal);

                    break;

                case 'FS':
                    model.fsObj.FatherSisterCustfamilyID = null;
                    model.fsObj = {};

                    if (item !== undefined) {
                        model.fsObj.FatherSisterCustfamilyID = item.FatherSisterCustfamilyID;
                        model.fsObj.rdlFSElderYounger = item.FatherSisterElderyounger == 'Elder' ? 326 : (item.FatherSisterElderyounger == 'Younger' ? 325 : '-1');
                        model.fsObj.txtFathersistername = item.FatherSisterName;
                        model.fsObj.txtFSHusbandfirstname = item.SpouceFName;
                        model.fsObj.txtFSHusbandlastname = item.SpoucelName;
                        model.fsObj.txtFSHEDucation = item.FatherSisterSpouseEducationDetails;
                        model.fsObj.txtFSProfessiondetails = item.FathersisterSpouseProfessionDetails;
                        model.fsObj.ddlFSHStateID = item.FatherSisterspousestateId;
                        model.fsObj.ddlFSHDistrictID = item.FatherSisterspouseDistrictId;
                        model.fsObj.txtFSHNativePlace = item.FathersisterSpouseNativePlace;

                        model.fsObj.ddlFSMObileCountryID = item.FatherSisterMobilecodeid;
                        model.fsObj.txtFSMobileNumber = item.FatherSisterspouseMobileNumber;


                        if (commonFactory.checkvals(item.FatherSisterspouseLandaraecode)) {
                            model.fsObj.ddlFSHLandCountryID = item.FatherSisterlandcontrycodeid;
                            model.fsObj.txtFSHAreaNumber = item.FatherSisterspouseLandaraecode;
                            model.fsObj.txtFSHNUmber = item.FatherSisterspouseLandNumber;

                        } else {
                            model.fsObj.ddlFSMObileCountryID2 = item.FatherSisterlandcontrycodeid;
                            model.fsObj.txtFSMobileNumber2 = item.FatherSisterspouseLandNumber;
                        }

                        model.fsObj.txtFSHEmails = item.FatherSisterspouseEmail;
                        model.fsObj.txtFSHCurrentLocation = item.FatherSisterCurrentLocation;
                    }
                    commonFactory.open('FSModalContent.html', model.scope, uibModal);

                    break;

                case 'MB':
                    model.mbObj.MotherBrotherCustfamilyID = null;
                    model.mbObj = {};

                    if (item !== undefined) {
                        model.mbObj.MotherBrotherCustfamilyID = item.MotherBrotherCustfamilyID;
                        model.mbObj.rdlMBElderYounger = item.MotherBrotherElderyounger == 'Elder' ? 328 : (item.MotherBrotherElderyounger == 'Younger' ? 327 : '-1');
                        model.mbObj.txtMBName = item.MotherBrotherName;
                        model.mbObj.txtMBEducation = item.MotherBrotherEducationDetails;
                        model.mbObj.txtMBProfessiondetails = item.MotherBrotherProfessionDetails;

                        model.mbObj.ddlMBCountriCode = item.MotherBrotherMobileCode;
                        model.mbObj.txtMBMobileNum = item.MotherBrotherMobileNumber;


                        if (commonFactory.checkvals(item.MotherBrotherLandaraecode)) {
                            model.mbObj.ddlMBLandLineCountryCode = item.MotherBrotherLandCountryCode;
                            model.mbObj.txtMBAreaCode = item.MotherBrotherLandaraecode;
                            model.mbObj.txtMBLandLineNum = item.MotherBrotherLandNumber;

                        } else {
                            model.mbObj.ddlMBCountriCode2 = item.MotherBrotherLandCountryCode;
                            model.mbObj.txtMBMobileNum2 = item.MotherBrotherLandNumber;
                        }

                        model.mbObj.txtMBEmails = item.MotherBrotherEmail;
                        model.mbObj.txtMBCurrentLocation = item.MotherBrotherCurrentLocation;
                    }
                    commonFactory.open('MBModalContent.html', model.scope, uibModal);

                    break;
                case 'MS':
                    model.msObj.MotherSisterCustfamilyID = null;
                    model.msObj = {};

                    if (item !== undefined) {
                        model.msObj.MotherSisterCustfamilyID = item.MotherSisterCustfamilyID;
                        model.msObj.rdlMSElderYounger = item.MotherSisterElderyounger == 'Elder' ? 330 : (item.MotherSisterElderyounger == 'Younger' ? 329 : '-1');
                        model.msObj.txtMSName = item.MotherSisterName;
                        model.msObj.txtMsHusbandfirstname = item.SpouceFName;
                        model.msObj.txtMsHusbandlastname = item.SpoucelName;
                        model.msObj.ddlMSisState = item.spousestateid;
                        model.msObj.ddlMsDistrict = item.spousedistrictID;
                        model.msObj.txtMSNativePlace = item.MotherSisterSpouseNativePlace;
                        model.msObj.txtMSHEducation = item.MothersisterspouseEducationdetails;
                        model.msObj.txtMSProfessiondetails = item.MotherSisterProfessionDetails;

                        model.msObj.ddlMSCounCodeID = item.MotherSisterMobileCodeId;
                        model.msObj.txtMSMObileNum = item.MotherSisterspouseMobileNumber;

                        if (commonFactory.checkvals(item.MotherSisterspouseLandaraecode)) {
                            model.msObj.ddlMSLLCounCode = item.MotherSisterSpouselandcodeid;
                            model.msObj.txtMSArea = item.MotherSisterspouseLandaraecode;
                            model.msObj.txtLLNum = item.MotherSisterspouseLandNumber;
                        } else {
                            model.msObj.ddlMSCounCodeID2 = item.MotherSisterSpouselandcodeid;
                            model.msObj.txtMSMObileNum2 = item.MotherSisterspouseLandNumber;
                        }

                        model.msObj.txtMSEmail = item.MotherSisterspouseEmail;
                        model.msObj.txtMSCurrentLocation = item.MotherSisterCurrentLocation;
                    }
                    commonFactory.open('MSModalContent.html', model.scope, uibModal);

                    break;
            }

        };


        model.FBSubmit = function(obj) {

            if (isSubmit) {
                isSubmit = false;
                model.FBData = {
                    GetDetails: {
                        CustID: custid,
                        Fatherbrothername: obj.txtFatherbrothername,
                        FBElderYounger: obj.rdlFBElderORyounger,
                        FBEmployedin: null,
                        FBProfessiongroup: null,
                        FBProfession: null,
                        FBProfessiondetails: obj.txtFBProfessiondetails,
                        FBMobileCountryID: obj.ddlFBMobileCountryID,
                        FBMobileNumber: obj.txtFBMobileNumber,
                        FBLandLineCountryID: commonFactory.checkvals(obj.ddlFBMobileCountryID2) ? obj.ddlFBMobileCountryID2 : (commonFactory.checkvals(obj.ddlFBLandLineCountry) ? obj.ddlFBLandLineCountry : null),
                        FBLandAreaCode: commonFactory.checkvals(obj.txtFBMobileNumber2) ? null : (commonFactory.checkvals(obj.txtFBAreCode) ? obj.txtFBAreCode : null),
                        FBLandNumber: commonFactory.checkvals(obj.txtFBMobileNumber2) ? obj.txtFBMobileNumber2 : (commonFactory.checkvals(obj.txtFBLandNumber) ? obj.txtFBLandNumber : null),
                        FBEmails: obj.txtFBEmails,
                        FBCurrentLocation: obj.txtCurrentLocation,
                        FatherbrotherCust_familyID: model.fbObj.FatherbrotherCustfamilyID,
                        FatherBrotherEducationDetails: obj.txtFBEducationdetails,

                    },
                    customerpersonaldetails: {
                        intCusID: custid,
                        EmpID: null,
                        Admin: null
                    }
                };

                model.submitPromise = editRelativeService.submitFBData(model.FBData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });
            }
        };

        model.FSSubmit = function(obj) {

            if (isSubmit) {
                isSubmit = false;
                model.FSData = {
                    GetDetails: {
                        CustID: custid,
                        FSFathersistername: obj.txtFathersistername,
                        FSElderYounger: obj.rdlFSElderYounger,
                        FSHusbandfirstname: obj.txtFSHusbandfirstname,
                        FSHusbandlastname: obj.txtFSHusbandlastname,
                        FSCountryID: 1,
                        FSHStateID: obj.ddlFSHStateID,
                        FSHDistrict: obj.ddlFSHDistrictID,
                        FSNativeplace: obj.txtFSHNativePlace,
                        FSHEmployedin: null,
                        FSHProfessiongroup: null,
                        FSHProfession: null,
                        FSHProfessiondetails: obj.txtFSProfessiondetails,
                        FSHMobileCountryID: obj.ddlFSMObileCountryID,
                        FSHMObileNumber: obj.txtFSMobileNumber,
                        FSHLandCountryID: commonFactory.checkvals(obj.ddlFSMObileCountryID2) ? obj.ddlFSMObileCountryID2 : (commonFactory.checkvals(obj.ddlFSHLandCountryID) ? obj.ddlFSHLandCountryID : null),
                        FSHLandAreaCode: commonFactory.checkvals(obj.txtFSMobileNumber2) ? null : (commonFactory.checkvals(obj.txtFSHAreaNumber) ? obj.txtFSHAreaNumber : null),
                        FSHLandNumber: commonFactory.checkvals(obj.txtFSMobileNumber2) ? obj.txtFSMobileNumber2 : (commonFactory.checkvals(obj.txtFSHNUmber) ? obj.txtFSHNUmber : null),
                        FSHEmails: obj.txtFSHEmails,
                        FSCurrentLocation: obj.txtFSHCurrentLocation,
                        FatherSisterCust_familyID: model.fsObj.FatherSisterCustfamilyID,
                        FSHEducationdetails: obj.txtFSHEDucation
                    },
                    customerpersonaldetails: {
                        intCusID: custid,
                        EmpID: null,
                        Admin: null
                    }
                };

                model.submitPromise = editRelativeService.submitFSData(model.FSData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });
            }
        };

        model.MBSubmit = function(obj) {
            if (isSubmit) {
                isSubmit = false;

                model.MBData = {
                    GetDetails: {
                        CustID: custid,
                        Motherbrothername: obj.txtMBName,
                        MBElderYounger: obj.rdlMBElderYounger,
                        MBEmployedin: null,
                        MBProfessiongroup: null,
                        MBProfession: null,
                        MBProfessiondetails: obj.txtMBProfessiondetails,
                        MBMobileCountryID: obj.ddlMBCountriCode,
                        MBMObileNumber: obj.txtMBMobileNum,
                        MBLandLineCountryID: commonFactory.checkvals(obj.ddlMBCountriCode2) ? obj.ddlMBCountriCode2 : (commonFactory.checkvals(obj.ddlMBLandLineCountryCode) ? obj.ddlMBLandLineCountryCode : null),
                        MBLandAreaCode: commonFactory.checkvals(obj.txtMBMobileNum2) ? null : (commonFactory.checkvals(obj.txtMBAreaCode) ? obj.txtMBAreaCode : null),
                        MBLandNumber: commonFactory.checkvals(obj.txtMBMobileNum2) ? obj.txtMBMobileNum2 : (commonFactory.checkvals(obj.txtMBLandLineNum) ? obj.txtMBLandLineNum : null),
                        MBEmails: obj.txtMBEmails,
                        MBCurrentLocation: obj.txtMBCurrentLocation,
                        MBMotherBrotherCust_familyID: model.mbObj.MotherBrotherCustfamilyID,
                        MBEducationdetails: obj.txtMBEducation
                    },
                    customerpersonaldetails: {
                        intCusID: custid,
                        EmpID: null,
                        Admin: null
                    }
                };

                model.submitPromise = editRelativeService.submitMBData(model.MBData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });
            }

        };

        model.MSSubmit = function(obj) {

            if (isSubmit) {
                isSubmit = false;
                model.MSData = {
                    GetDetails: {
                        CustID: custid,
                        Mothersistername: obj.txtMSName,
                        MSElderYounger: obj.rdlMSElderYounger,
                        MSHusbandfirstname: obj.txtMsHusbandfirstname,
                        MSHusbandlastname: obj.txtMsHusbandlastname,
                        MSCountryID: 1,
                        MSMSHStateID: obj.ddlMSisState,
                        MSMSHDistrictID: obj.ddlMsDistrict,
                        MSNativeplace: obj.txtMSNativePlace,
                        MSEmployedin: null,
                        MSProfession: null,
                        MSProfessiondetails: obj.txtMSProfessiondetails,
                        MSMSHMobileCountryID: obj.ddlMSCounCodeID,
                        MSMObileNumber: obj.txtMSMObileNum,
                        MSHLandlineCountryID: commonFactory.checkvals(obj.ddlMSCounCodeID2) ? obj.ddlMSCounCodeID2 : (commonFactory.checkvals(obj.ddlMSLLCounCode) ? obj.ddlMSLLCounCode : null),
                        MSLandAreaCode: commonFactory.checkvals(obj.txtMSMObileNum2) ? null : (commonFactory.checkvals(obj.txtMSArea) ? obj.txtMSArea : null),
                        MSLandNumber: commonFactory.checkvals(obj.txtMSMObileNum2) ? obj.txtMSMObileNum2 : (commonFactory.checkvals(obj.txtLLNum) ? obj.txtLLNum : null),
                        MSHEmails: obj.txtMSEmail,
                        MSCurrentLocation: obj.txtMSCurrentLocation,
                        MSCust_familyID: model.msObj.MotherSisterCustfamilyID,
                        MSEducationdetails: obj.txtMSHEducation
                    },
                    customerpersonaldetails: {
                        intCusID: custid,
                        EmpID: null,
                        Admin: null
                    }
                };
                model.submitPromise = editRelativeService.submitMSData(model.MSData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.relativePageLoad(custid);
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

        model.DeletePopup = function(type, id) {
            model.deleteDisplayTxt = type;
            model.identityID = id;
            commonFactory.open('common/templates/deletepopup.html', model.scope, uibModal, 'sm');
        };

        model.deleteSubmit = function() {
            SelectBindService.DeleteSection({ sectioname: 'Family', CustID: custid, identityid: model.identityID }).then(function(response) {
                console.log(response);
                model.relativePageLoad();
                commonFactory.closepopup();
            });
        };

        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editRelativeModel', factory)

    factory.$inject = ['editRelativeService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'SelectBindService'];

})(angular);