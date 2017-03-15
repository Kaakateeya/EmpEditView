(function(angular) {
    'use strict';


    function factory(editSibblingService, authSvc, alertss, commonFactory, uibModal, SelectBindService) {
        var model = {};
        model.scope = {};
        //start declaration block

        model.sibblingCountArr = [];
        model.BrotherArr = [];
        model.sisterArr = [];
        model.broObj = [];
        model.sisObj = [];
        model.sibCountsBindArr = commonFactory.numbersBind('', 0, 10);
        model.SibCountObj = {};
        model.BroCount = null;
        model.SisCount = null;
        model.CountryVal = '1';
        model.identityID = 0;

        var isSubmit = true;

        var logincustid = authSvc.getCustId();
        var custID = model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        //end declaration block

        model.init = function() {
            model.sibPageload();
            return model;
        };

        model.sibPageload = function() {

            editSibblingService.getSibblingeData(custID).then(function(response) {
                model.sibblingCountArr = JSON.parse(response.data[0]);
                model.BrotherArr = JSON.parse(response.data[1]);
                model.sisterArr = JSON.parse(response.data[2]);
                model.BroCount = model.sibblingCountArr[0].NoOfBrothers;
                model.SisCount = model.sibblingCountArr[0].NoOfSisters;

                model.broModifiedby = (model.BrotherArr.length > 0 && model.BrotherArr[0].EmpLastModificationDate !== undefined && model.BrotherArr[0].EmpLastModificationDate !== null) ? model.BrotherArr[0].EmpLastModificationDate : '';
                model.sisModifiedby = (model.sisterArr.length > 0 && model.sisterArr[0].EmpLastModificationDate !== undefined && model.sisterArr[0].EmpLastModificationDate !== null) ? model.sisterArr[0].EmpLastModificationDate : '';
            });

        };

        model.sibblingPopulatePopulate = function(type, item) {
            isSubmit = true;
            switch (type) {
                case 'sibCounrt':

                    if (item !== undefined) {
                        model.SibCountObj.ddlnoofsiblings = item.NoOfBrothers;
                        model.SibCountObj.ddlnoofelderrother = item.NoOfElderBrothers;
                        model.SibCountObj.ddlnoofyoungerbrother = item.NoOfYoungerBrothers;
                        model.SibCountObj.ddlnoofsisters = item.NoOfSisters;
                        model.SibCountObj.ddlnoofeldersisters = item.NoOfElderSisters;
                        model.SibCountObj.ddlnoofyoungersisters = item.NoOfYoungerSisters;
                    }

                    commonFactory.open('SibblingCountPopup.html', model.scope, uibModal);

                    break;

                case 'brother':
                    debugger;
                    if (item !== undefined && model.BrotherArr.length <= parseInt(model.BroCount)) {
                        model.broObj.SibilingCustfamilyID = null;
                        model.broObj = {};
                        if (item !== undefined) {
                            model.broObj.SibilingCustfamilyID = item.SibilingCustfamilyID;
                            model.broObj.rdlBElderYounger = item.brotherYoungerORelder == 'Elder' ? 42 : (item.brotherYoungerORelder == 'Younger' ? 41 : '-1');
                            model.broObj.txtBName = item.SibilingName;
                            model.broObj.txtbrotherreducation = item.SibilingEducationDetails;
                            model.broObj.txtbrotherprofession = item.SibilingProfessionDetails;
                            model.broObj.txtBCompanyname = item.SibilingCompany;
                            model.broObj.txtBJoblocation = item.SibilingJobPLace;

                            model.broObj.ddlBMObileCountryID = item.SibilingMobileCode;
                            model.broObj.txtBmobilenumber = item.SibilingMobileNumber;

                            if (item.SibilingLandaraecode !== '' && item.SibilingLandaraecode !== null) {
                                model.broObj.ddlBLandLineCountryID = item.SibilngLandCountryCode;
                                model.broObj.txtBAreCode = item.SibilingLandaraecode;
                                model.broObj.txtBLandNumber = item.SibilingLandNumber;
                            } else {
                                model.broObj.ddlBMObileCountryID2 = item.SibilngLandCountryCode;
                                model.broObj.txtBmobilenumber2 = item.SibilingLandNumber;

                            }

                            model.broObj.txtBEmails = item.SibilingEmail;
                            model.broObj.rdlBIsMarried = item.SibilingMarried;

                            model.broObj.txtBWifeName = item.SibilingSpouseName;
                            model.broObj.txtbrotherwifeeducation = item.SibilingSpouseEducationDetails;
                            model.broObj.txtbrotherwifeprofession = item.SibilingSpouseProfessionDetails;
                            model.broObj.chkboxbrotherwifeprofession = item.SibilingSpouseProfessionDetails === 'HouseWife' ? true : false;
                            model.broObj.txtBWifeCompanyName = item.spoucecompanyName;
                            model.broObj.txtBwifeJoblocation = item.spoucejobloc;
                            model.broObj.ddlBWMobileCode = item.SibilingSpouseMobileCode;
                            model.broObj.txtBWifeMobileNumber = item.SibilingSpouceMobileNumber;
                            if (item.SibilingSpouseLandareCode !== '' && item.SibilingSpouseLandareCode !== null) {
                                model.broObj.ddlBWifeLandLineCountryCode = item.SibilingSpouseLandCode;
                                model.broObj.txtBWifeLandLineAreaCode = item.SibilingSpouseLandareCode;
                                model.broObj.txtBWifeLandLineNumber = item.SibilngSpouseLandnumber;
                            } else {
                                model.broObj.ddlBWMobileCode2 = item.SibilingSpouseLandCode;
                                model.broObj.txtBWifeMobileNumber2 = item.SibilngSpouseLandnumber;
                            }

                            model.broObj.txtwifeEmail = item.SpouseEmail;
                            model.broObj.txtBWifeFatherSurName = item.SFsurname;
                            model.broObj.txtBWWifeFatherName = item.SFname;
                            model.broObj.ddlborherspousefathercaste = item.SibilingSpouseFatherCasteID;
                            model.broObj.ddlBroSpousefatherState = item.BroSpouseFatherStateID;
                            model.broObj.ddlBroSpousefatherDistrict = item.BroSpouseFatherDistrictID;
                            model.broObj.txtBroSpousefatherCity = item.BroSpouseFatherCity;
                            model.broObj.ddlbroprofessionCatgory = item.ProfessionCategoryID;
                            model.broObj.ddlbroSpouseprofessionCatgory = item.SpouceProfessionCategoryID;
                            //  
                            commonFactory.open('brotherModalContent.html', model.scope, uibModal);
                        }
                    } else if (item === undefined && model.BrotherArr.length < parseInt(model.BroCount)) {
                        model.broObj.SibilingCustfamilyID = null;
                        model.broObj = {};
                        commonFactory.open('brotherModalContent.html', model.scope, uibModal);
                    } else {
                        alertss.timeoutoldalerts(model.model, 'alert-danger', 'Cannot add more brothers', 4500);
                    }

                    break;

                case 'sister':

                    if (item !== undefined && model.sisterArr.length <= parseInt(model.SisCount)) {

                        model.sisObj.SibilingCustfamilyID = null;
                        model.sisObj = {};

                        if (item !== undefined) {

                            model.sisObj.SibilingCustfamilyID = item.SibilingCustfamilyID;
                            model.sisObj.rbtSElderyounger = item.SisterElderORyounger == 'Elder' ? '322' : (item.SisterElderORyounger == 'Younger' ? '321' : '-1');
                            model.sisObj.txtSisterName = item.SibilingName;
                            model.sisObj.txtsisEducation = item.SibilingEducationDetails;
                            model.sisObj.txtsisProfession = item.SibilingProfessionDetails;
                            model.sisObj.chksisProfession = item.SibilingProfessionDetails === 'HouseWife' ? true : false;
                            model.sisObj.txtSCompanyName = item.SibilingCompany;
                            model.sisObj.txtSjobloc = item.SibilingJobPLace;

                            model.sisObj.ddlSMobileCountyCodeID = item.SibilingMobileCode;
                            model.sisObj.txtSMobileNumber = item.SibilingMobileNumber;

                            if (item.SibilingLandaraecode !== '' && item.SibilingLandaraecode !== null) {
                                model.sisObj.ddlSLandLineCountryCodeID = item.SibilngLandCountryCode;
                                model.sisObj.txtSAreacoude = item.SibilingLandaraecode;
                                model.sisObj.txtSNumber = item.SibilingLandNumber;
                            } else {
                                model.sisObj.ddlSMobileCountyCodeID2 = item.SibilngLandCountryCode;
                                model.sisObj.txtSMobileNumber2 = item.SibilingLandNumber;
                            }

                            model.sisObj.txtSEmails = item.SibilingEmail;
                            model.sisObj.rdlSIsMarried = item.SibilingMarried;

                            model.sisObj.txtShusName = item.SibilingName;
                            model.sisObj.txtHusbandEducation = item.SibilingSpouseEducationDetails;
                            model.sisObj.txtHusbandProfession = item.SibilingSpouseProfessionDetails;
                            model.sisObj.txtShusCompanyName = item.spoucecompanyName;
                            model.sisObj.txtShusjobloc = item.spoucejobloc;

                            model.sisObj.ddlSHusMobileCountryID = item.sisterspousemobilecode;
                            model.sisObj.txtSHusMobileNumber = item.SibilingSpouceMobileNumber;

                            if (item.SibilingSpouseLandareCode !== '' && item.SibilingSpouseLandareCode !== null) {
                                model.sisObj.ddlSHusLandCountryID = item.SpousesisterLandCode;
                                model.sisObj.txtSHusLandNumber = item.SibilngSpouseLandnumber;
                                model.sisObj.txtSHusLandArea = item.SibilingSpouseLandareCode;
                            } else {
                                model.sisObj.ddlSHusMobileCountryID2 = item.SpousesisterLandCode;
                                model.sisObj.txtSHusMobileNumber2 = item.SibilngSpouseLandnumber;

                            }

                            model.sisObj.txtHusbandEmail = item.SpouseEmail;
                            model.sisObj.txtHusbandFatherSurName = item.SpouceFatherLName;
                            model.sisObj.txtHusbandFatherName = item.SpouceFatherFName;
                            model.sisObj.ddlsisterspusefathercaste = item.SibilingSpouseFatherCasteId;
                            model.sisObj.ddlSisSpouceFatherState = item.SisSpouseFatherStateID;
                            model.sisObj.ddlSisSpouceFatherDistrict = item.SisSpouseFatherDitrictID;
                            model.sisObj.txtSisSpouceFatherCity = item.SisSpousefatherCity;
                            model.sisObj.ddlsisprofessionCatgory = item.ProfessionCategoryID;
                            model.sisObj.ddlsisSpouseprofessionCatgory = item.SpouceProfessionCategoryID;
                            commonFactory.open('sisterModalContent.html', model.scope, uibModal);
                        }
                    } else if (item === undefined && model.sisterArr.length < parseInt(model.SisCount)) {

                        model.sisObj.SibilingCustfamilyID = null;
                        model.sisObj = {};
                        commonFactory.open('sisterModalContent.html', model.scope, uibModal);
                    } else {
                        alertss.timeoutoldalerts(model.model, 'alert-danger', 'Cannot add more sisters', 4500);
                        break;
                    }
            }

        };


        model.cancel = function() {
            commonFactory.closepopup();
        };


        model.ShousewiseChk = function(item) {
            if (item.chksisProfession === true) {
                item.txtsisProfession = 'HouseWife';
            } else {
                item.txtsisProfession = '';
            }
        };

        model.BhousewiseChk = function(item) {
            if (item.chkboxbrotherwifeprofession === true) {
                item.txtbrotherwifeprofession = 'HouseWife';
            } else {
                item.txtbrotherwifeprofession = '';
            }
        };

        model.checkVal = function(val) {
            return (val !== '' && val !== undefined) ? val : 0;

        };
        model.sibblingCountsSubmit = function(obj) {


            if (isSubmit) {
                isSubmit = false;


                var totalnofBrothers = parseInt(model.checkVal(obj.ddlnoofsiblings));
                var elderBrotherCount = parseInt(model.checkVal(obj.ddlnoofelderrother));
                var youngerBrotherCount = parseInt(model.checkVal(obj.ddlnoofyoungerbrother));

                var totalnoFSister = parseInt(model.checkVal(obj.ddlnoofsisters));
                var elderSisterCount = parseInt(model.checkVal(obj.ddlnoofeldersisters));
                var youngerSisterCount = parseInt(model.checkVal(obj.ddlnoofyoungersisters));

                if ((totalnofBrothers === 0 || totalnofBrothers === (elderBrotherCount + youngerBrotherCount)) && (totalnoFSister === 0 || totalnoFSister === (elderSisterCount + youngerSisterCount))) {

                    var objinput = {
                        CustID: custID,
                        NoOfBrothers: obj.ddlnoofsiblings,
                        NoOfSisters: obj.ddlnoofsisters,
                        NoOfYoungerBrothers: totalnofBrothers === 0 ? '0' : obj.ddlnoofyoungerbrother,
                        NoOfElderBrothers: totalnofBrothers === 0 ? '0' : obj.ddlnoofelderrother,
                        NoOfElderSisters: totalnoFSister === 0 ? '0' : obj.ddlnoofeldersisters,
                        NoOfYoungerSisters: totalnoFSister === 0 ? '0' : obj.ddlnoofyoungersisters
                    };

                    model.BroCount = obj.ddlnoofsiblings;
                    model.SisCount = obj.ddlnoofsisters;

                    model.submitPromise = editSibblingService.submitSibCountsData(objinput).then(function(response) {
                        console.log(response);
                        commonFactory.closepopup();
                        if (response.data === 1) {
                            model.sibPageload(custID);
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                        }
                    });
                } else {

                    alert('Please enter Correct Sibling count');
                }

            }


        };

        model.BIsMarried = function(val) {
            if (val == '0') {
                model.broObj.txtBWifeName = '';
                model.broObj.txtbrotherwifeeducation = '';
                model.broObj.txtbrotherwifeprofession = '';
                model.broObj.chkboxbrotherwifeprofession = '';
                model.broObj.txtBWifeCompanyName = '';
                model.broObj.txtBwifeJoblocation = '';
                model.broObj.ddlBWMobileCode = '';
                model.broObj.txtBWifeMobileNumber = '';
                model.broObj.ddlBWifeLandLineCountryCode = '';
                model.broObj.txtBWifeLandLineAreaCode = '';
                model.broObj.txtBWifeLandLineNumber = '';
                model.broObj.ddlBWMobileCode2 = '';
                model.broObj.txtBWifeMobileNumber2 = '';
                model.broObj.txtwifeEmail = '';
                model.broObj.txtBWifeFatherSurName = '';
                model.broObj.txtBWWifeFatherName = '';
                model.broObj.ddlborherspousefathercaste = '';
                model.broObj.ddlBroSpousefatherState = '';
                model.broObj.ddlBroSpousefatherDistrict = '';
                model.broObj.txtBroSpousefatherCity = '';
            }
        };

        model.SIsMarried = function(val) {
            if (val == '0') {
                model.sisObj.txtShusName = '';
                model.sisObj.txtHusbandEducation = '';
                model.sisObj.txtHusbandProfession = '';
                model.sisObj.txtShusCompanyName = '';
                model.sisObj.txtShusjobloc = '';
                model.sisObj.ddlSHusMobileCountryID = '';
                model.sisObj.txtSHusMobileNumber = '';
                model.sisObj.ddlSHusLandCountryID = '';
                model.sisObj.txtSHusLandNumber = '';
                model.sisObj.txtSHusLandArea = '';
                model.sisObj.ddlSHusMobileCountryID2 = '';
                model.sisObj.txtSHusMobileNumber2 = '';
                model.sisObj.txtHusbandEmail = '';
                model.sisObj.txtHusbandFatherSurName = '';
                model.sisObj.txtHusbandFatherName = '';
                model.sisObj.ddlsisterspusefathercaste = '';
                model.sisObj.ddlSisSpouceFatherState = '';
                model.sisObj.ddlSisSpouceFatherDistrict = '';
                model.sisObj.txtSisSpouceFatherCity = '';
            }
        };

        model.enableSubmit = function() {
            isSubmit = true;


        };

        model.deleteDisplayTxt = '';
        model.DeletePopup = function(type, id) {
            model.deleteDisplayTxt = type;
            model.identityID = id;
            commonFactory.open('common/templates/deletepopup.html', model.scope, uibModal, 'sm');
        };

        model.deleteSubmit = function(type) {

            SelectBindService.DeleteSection({ sectioname: 'Family', CustID: custID, identityid: model.identityID }).then(function() {
                model.sibPageload(custID);
                commonFactory.closepopup();
            });



        };

        model.sibBroSubmit = function(obj) {

            if (isSubmit) {
                isSubmit = false;
                model.sibBroData = {
                    GetDetails: {
                        CustID: custID,
                        BroName: obj.txtBName,
                        BroElderYounger: obj.rdlBElderYounger,
                        BroEducationcategory: null,
                        BroEducationgroup: null,
                        BroEducationspecialization: null,
                        BroEmployedin: null,
                        BroProfessiongroup: null,
                        BroProfession: null,
                        BroCompanyName: obj.txtBCompanyname,
                        BroJobLocation: obj.txtBJoblocation,
                        BroMobileCountryCodeID: obj.ddlBMObileCountryID,
                        BroMobileNumber: obj.txtBmobilenumber,
                        BroLandCountryCodeID: commonFactory.checkvals(obj.ddlBMObileCountryID2) ? obj.ddlBMObileCountryID2 : (commonFactory.checkvals(obj.ddlBLandLineCountryID) ? obj.ddlBLandLineCountryID : null),
                        BroLandAreaCode: commonFactory.checkvals(obj.txtBmobilenumber2) ? null : (obj.txtBAreCode !== '' && obj.txtBAreCode !== null ? obj.txtBAreCode : null),
                        BroLandNumber: commonFactory.checkvals(obj.txtBmobilenumber2) ? obj.txtBmobilenumber2 : (commonFactory.checkvals(obj.txtBLandNumber) ? obj.txtBLandNumber : null),
                        BroEmail: obj.txtBEmails,
                        BIsMarried: obj.rdlBIsMarried,
                        BroWifeName: obj.txtBWifeName,
                        BroWifeEducationcategory: null,
                        BroWifeEducationgroup: null,
                        BroWifeEducationspecialization: null,
                        BroWifeEmployedin: null,
                        BroWifeProfessiongroup: null,
                        BroWifeProfession: null,
                        BroWifeCompanyName: obj.txtBWifeCompanyName,
                        BroWifeJobLocation: obj.txtBwifeJoblocation,
                        BroWifeMobileCountryCodeID: obj.ddlBWMobileCode,
                        BroWifeMobileNumber: obj.txtBWifeMobileNumber,
                        BroWifeLandCountryCodeID: commonFactory.checkvals(obj.ddlBWMobileCode2) ? obj.ddlBWMobileCode2 : commonFactory.checkvals(obj.ddlBWifeLandLineCountryCode) ? obj.ddlBWifeLandLineCountryCode : null,
                        BroWifeLandAreacode: commonFactory.checkvals(obj.txtBWifeMobileNumber2) ? null : commonFactory.checkvals(obj.txtBWifeLandLineAreaCode) ? obj.txtBWifeLandLineAreaCode : null,
                        BroWifeLandNumber: commonFactory.checkvals(obj.txtBWifeMobileNumber2) ? obj.txtBWifeMobileNumber2 : commonFactory.checkvals(obj.txtBWifeLandLineNumber) ? obj.txtBWifeLandLineNumber : null,
                        BroWifeFatherSurName: obj.txtBWifeFatherSurName,
                        BroWifeFatherName: obj.txtBWWifeFatherName,
                        BroSibilingCustfamilyID: model.broObj.SibilingCustfamilyID,
                        BroEducationDetails: obj.txtbrotherreducation,
                        BrowifeEducationDetails: obj.txtbrotherwifeeducation,
                        BroProfessionDetails: obj.txtbrotherprofession,
                        BroWifeProfessionDetails: obj.txtbrotherwifeprofession,
                        BroSpouseFatherCountryID: '1',
                        BroSpouseFatherStateID: obj.ddlBroSpousefatherState,
                        BroSpouseFatherDitrictID: obj.ddlBroSpousefatherDistrict,
                        BroSpouseFatherNativePlace: obj.txtBroSpousefatherCity,
                        BrotherSpouseEmail: obj.txtwifeEmail,
                        SibilingSpouseFatherCasteID: obj.ddlborherspousefathercaste,
                        BroProfessionCategoryID: obj.ddlbroprofessionCatgory,
                        BroSpouseProfessionCategoryID: obj.ddlbroSpouseprofessionCatgory

                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: null,
                        Admin: null
                    }
                };

                model.submitPromise = editSibblingService.submitSibBroData(model.sibBroData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.sibPageload(custID);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });
            }

        };

        model.sibSisSubmit = function(obj) {

            if (isSubmit) {
                isSubmit = false;
                model.sibSisData = {
                    GetDetails: {
                        CustID: custID,
                        SisName: obj.txtSisterName,
                        SisElderYounger: obj.rbtSElderyounger,
                        SisEducationcategory: null,
                        SisEducationgroup: null,
                        SisEducationspecialization: null,
                        SisEmployedin: null,
                        SisProfessiongroup: null,
                        SisProfession: null,
                        SisCompanyName: obj.txtSCompanyName,
                        SisJobLocation: obj.txtSjobloc,
                        SisMobileCountryCodeID: obj.ddlSMobileCountyCodeID,
                        SisMobileNumber: obj.txtSMobileNumber,
                        SisLandCountryCodeID: commonFactory.checkvals(obj.ddlSMobileCountyCodeID2) ? obj.ddlSMobileCountyCodeID2 : commonFactory.checkvals(obj.ddlSLandLineCountryCodeID) ? obj.ddlSLandLineCountryCodeID : null,
                        SisLandAreaCode: commonFactory.checkvals(obj.txtSMobileNumber2) ? null : commonFactory.checkvals(obj.txtSAreacoude) ? obj.txtSAreacoude : null,
                        SisLandNumber: commonFactory.checkvals(obj.txtSMobileNumber2) ? obj.txtSMobileNumber2 : commonFactory.checkvals(obj.txtSNumber) ? obj.txtSNumber : null,
                        SisEmail: obj.txtSEmails,
                        SIsMarried: obj.rdlSIsMarried,
                        SisHusbandName: obj.txtShusName,
                        SisHusbandEducationcategory: null,
                        SisHusbandEducationgroup: null,
                        SisHusbandEducationspecialization: null,
                        SisHusbandEmployedin: null,
                        SisHusbandProfessiongroup: null,
                        SisHusbandProfession: null,
                        SisHusCompanyName: obj.txtShusCompanyName,
                        SisHusJobLocation: obj.txtShusjobloc,
                        SisHusbandMobileCountryCodeID: obj.ddlSHusMobileCountryID,
                        SisHusbandMobileNumber: obj.txtSHusMobileNumber,
                        SisHusbandLandCountryCodeID: commonFactory.checkvals(obj.ddlSHusMobileCountryID2) ? obj.ddlSHusMobileCountryID2 : commonFactory.checkvals(obj.ddlSHusLandCountryID) ? obj.ddlSHusLandCountryID : null,
                        SisHusbandLandAreacode: commonFactory.checkvals(obj.txtSHusMobileNumber2) ? null : commonFactory.checkvals(obj.txtSHusLandArea) ? obj.txtSHusLandArea : null,
                        SisHusbandLandNumber: commonFactory.checkvals(obj.txtSHusMobileNumber2) ? obj.txtSHusMobileNumber2 : commonFactory.checkvals(obj.txtSHusLandNumber) ? obj.txtSHusLandNumber : null,
                        SisHusbandFatherSurName: obj.txtHusbandFatherSurName,
                        SisHusbandFatherName: obj.txtHusbandFatherName,
                        SisSibilingCustfamilyID: model.sisObj.SibilingCustfamilyID,
                        siseducationdetails: obj.txtsisEducation,
                        sisprofessiondetails: obj.txtsisProfession,
                        sisspouseeducationdetails: obj.txtHusbandEducation,
                        sisspouseprofessiondetails: obj.txtHusbandProfession,
                        SisSpouseFatherCountryID: '1',
                        SisSpouseFatherStateID: obj.ddlSisSpouceFatherState,
                        SisSpouseFatherDitrictID: obj.ddlSisSpouceFatherDistrict,
                        SisSpouseFatherNativePlace: obj.txtSisSpouceFatherCity,
                        SisSpouseEmail: obj.txtHusbandEmail,
                        SibilingSpouseFatherCasteID: obj.ddlsisterspusefathercaste,
                        SisProfessionCategoryID: obj.ddlsisprofessionCatgory,
                        SisSpouseProfessionCategoryID: obj.ddlsisSpouseprofessionCatgory
                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: null,
                        Admin: null
                    }
                };
                model.submitPromise = editSibblingService.submitSibSisData(model.sibSisData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.sibPageload(custID);

                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });
            }

        };

        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editSibblingModel', factory)

    factory.$inject = ['editSibblingService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'SelectBindService'];

})(angular);