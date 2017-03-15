(function(angular) {
    'use strict';


    function factory(editParentService, authSvc, alertss, commonFactory, uibModal) {
        var model = {};
        model.model = {};
        //start declarion block
        model.parent = {};
        model.AdrrObj = {};
        model.physicalObj = {};
        model.lblaboutMyfamily = null;
        model.aboutFamilyObj = {};
        model.dcountry = '1';
        model.parentArr = [];
        model.AboutFamilyReviewStatus = null;
        var isSubmit = true;

        //end declarion block

        var logincustid = authSvc.getCustId();
        var custID = model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;


        model.init = function() {
            model.parentBindData();
            model.AboutPageloadData();
            return model;
        }

        model.parentBindData = function() {
            editParentService.getParentData(custID).then(function(response) {
                if (commonFactory.checkvals(response.data)) {
                    model.parentArr = commonFactory.checkvals(response.data[0]) ? JSON.parse(response.data[0]) : [];
                    model.addressArr = commonFactory.checkvals(response.data[1]) ? JSON.parse(response.data[1]) : [];
                    model.physicalArr = commonFactory.checkvals(response.data[2]) ? JSON.parse(response.data[2]) : [];
                    model.AboutFamily = commonFactory.checkvals(response.data[3]) ? JSON.parse(response.data[3]) : [];

                    model.parentmodifiedby = model.parentArr[0].EmpLastModificationDate;
                    model.addrmodifiedby = model.addressArr[0].EmpLastModificationDate;
                    model.physicalmodifiedby = model.physicalArr[0].EmpLastModificationDate;

                }

                if (commonFactory.checkvals(model.AboutFamily[0])) {
                    model.AboutFamilyReviewStatus = model.AboutFamily[0].reviewstatus;
                }
            });
        };

        model.AboutPageloadData = function() {
            editParentService.getAboutFamilyData(custID).then(function(response) {
                console.log(response);
                model.lblaboutMyfamily = response.data;
            });
        };


        model.populateModel = function(type, item) {
            isSubmit = true;
            switch (type) {
                case "parent":
                    model.parent.FatherCust_family_id = null;
                    model.parent.MotherCust_family_id = null;
                    model.parent = {};

                    if (item !== undefined) {
                        model.parent = [];

                        model.parent.cust_id = item.cust_id;
                        model.parent.FatherCust_family_id = item.FatherCust_family_id;
                        model.parent.MotherCust_family_id = item.MotherCust_family_id;

                        model.parent.txtFathername = item.FatherName;
                        model.parent.txtFEducation = item.FatherEducationDetails;
                        model.parent.txtFProfession = item.FatherProfDetails;
                        model.parent.txtCompany = item.FathercompanyName;
                        model.parent.txtJobLocation = item.FatherJoblocation;

                        model.parent.ddlMobile = item.FatherMobileCountryCodeId;
                        model.parent.txtMobile = item.FathermobilenumberID;

                        if (commonFactory.checkvals(item.FatherLandAreaCodeId)) {
                            model.parent.ddlLandLineCountry = item.FatherLandCountryCodeId;
                            model.parent.txtAreCode = item.FatherLandAreaCodeId;
                            model.parent.txtLandNumber = item.FatherLandNumberID;
                        } else {
                            model.parent.ddlfathermobile2 = item.FatherLandCountryCodeId;
                            model.parent.txtfathermobile2 = item.FatherLandNumberID;
                        }

                        model.parent.txtEmail = item.FatherEmail;
                        model.parent.txtFatherFname = item.FatherFathername;

                        model.parent.ddlFatherfatherMobileCountryCode = item.FatherfatherMobileCountryID;
                        model.parent.txtMobileFatherfather = item.FatherFatherMobileNumber;

                        if (commonFactory.checkvals(item.FatherFatherLandAreaCode)) {
                            model.parent.ddlFatherFatherLandLineCode = item.FatherfatherLandCountryCodeID;
                            model.parent.txtGrandFatherArea = item.FatherFatherLandAreaCode;
                            model.parent.txtGrandFatherLandLinenum = item.FatherFatherLandNumber;
                        } else {
                            model.parent.ddlfatherfatherAlternative = item.FatherfatherMobileCountrycode1;
                            model.parent.txtfatherfatherAlternative = item.FatherFatherLandNumber;
                        }

                        model.parent.ddlFState = item.FatherStateID;
                        model.parent.ddlFDistric = item.FatherDistrictID;
                        model.parent.txtFNativePlace = item.FatherNativeplace;
                        model.parent.txtMName = item.MotherName;
                        model.parent.txtMEducation = item.MotherEducationDetails;
                        model.parent.txtMProfession = item.MotherProfedetails;
                        model.parent.chkbox = item.MotherProfedetails == 'HouseWife' ? true : false;
                        model.parent.txtMCompanyName = item.MothercompanyName;
                        model.parent.txtMJobLocation = item.MotherJoblocation;

                        model.parent.ddlMMobileCounCodeID = item.MotherMobileCountryCodeId;
                        model.parent.txtMMobileNum = item.MotherMobilenumberID;

                        if (commonFactory.checkvals(item.MotherLandAreaCodeId)) {
                            model.parent.ddlMLandLineCounCode = item.MotherLandCountryCodeId;
                            model.parent.txtmAreaCode = item.MotherLandAreaCodeId;
                            model.parent.txtMLandLineNum = item.MotherLandNumberID;
                        } else {
                            model.parent.ddlMMobileCounCodeID2 = item.MotherMobileCountryCodeId;
                            model.parent.txtMMobileNum2 = item.MotherLandNumberID;

                        }

                        model.parent.txtMEmail = item.MotherEmail;
                        model.parent.txtMFatherFname = item.MotherFatherName;
                        model.parent.txtMFatherLname = item.MotherFatherLastName;

                        model.parent.ddlMotherfatheMobileCountryCode = item.MotherfatherMobileCountryID;
                        model.parent.txtMotherfatheMobilenumber = item.MotherFatherMobileNumber;

                        if (commonFactory.checkvals(item.MotherFatherLandAreaCode)) {
                            model.parent.ddlMotherFatherLandLineCode = item.motherfatherLandCountryID;
                            model.parent.txtMotherFatherLandLineareacode = item.MotherFatherLandAreaCode;
                            model.parent.txtMotherFatherLandLinenum = item.MotherFatherLandNumber;
                        } else {
                            model.parent.ddlmotherfatheralternative = item.MotherfatherMobileCountryID1;
                            model.parent.txtmotherfatheralternative = item.MotherFatherLandNumber;
                        }
                        model.parent.ddlMState = item.motherStateID;
                        model.parent.ddlMDistrict = item.motherDistricID;
                        model.parent.txtMNativePlace = item.MotherNativeplace;
                        model.parent.rbtlParentIntercaste = item.Intercaste === 'Yes' ? 1 : 0;
                        model.parent.ddlFatherCaste = item.FatherCasteID;
                        model.parent.ddlMotherCaste = item.MotherCasteID;

                        model.parent.ddlFprofessionCatgory = item.FatherProfessionCategoryID;
                        model.parent.ddlMprofessionCatgory = item.MotherProfessionCategoryID;

                    }
                    commonFactory.open('parentModalContent.html', model.scope, uibModal);

                    break;

                case "Address":
                    model.AdrrObj.Cust_Family_ID = null;
                    model.AdrrObj = {};
                    if (item !== undefined) {
                        model.AdrrObj.Cust_ID = item.Cust_ID;
                        model.AdrrObj.Cust_Family_ID = item.Cust_Family_ID;

                        model.AdrrObj.txtHouse_flat = item.FlatNumber;
                        model.AdrrObj.txtApartmentName = item.ApartmentName;
                        model.AdrrObj.txtStreetName = item.StreetName;
                        model.AdrrObj.txtAreaName = item.AreaName;
                        model.AdrrObj.txtLandmark = item.LandMark;
                        model.AdrrObj.ddlCountryContact = item.ParentCountryId;
                        model.AdrrObj.ddlStateContact = item.ParentStateid;
                        model.AdrrObj.ddlDistricContact = item.ParentDistrictId;
                        model.AdrrObj.txtCity = item.CityName;
                        model.AdrrObj.txtZip_no = item.Zip;
                    }
                    commonFactory.open('AddressModalContent.html', model.scope, uibModal);


                    break;

                case "physicalAttributes":
                    model.physicalObj = {};

                    if (item !== undefined) {
                        model.physicalObj.Cust_ID = item.Cust_ID;

                        model.physicalObj.rbtlDiet = item.DietID;
                        model.physicalObj.rbtlDrink = item.DrinkID;
                        model.physicalObj.rbtlSmoke = item.SmokeID;
                        model.physicalObj.ddlBodyType = item.BodyTypeID;
                        model.physicalObj.txtBWKgs = item.BodyWeight;
                        model.physicalObj.ddlBloodGroup = item.BloodGroupID;
                        model.physicalObj.ddlHealthConditions = item.HealthConditionID;
                        model.physicalObj.txtHealthCondition = item.HealthConditionDescription;
                    }
                    commonFactory.open('PhysicalAttributeModalContent.html', model.scope, uibModal);


                    break;

                case "AboutFamily":

                    if (item !== undefined) {
                        model.aboutFamilyObj.txtAboutUs = item;
                    }
                    commonFactory.open('AboutFamilyModalContent.html', model.scope, uibModal);

                    break;
            }
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.ParentSubmit = function(objitem) {
            if (isSubmit) {
                isSubmit = false;

                model.myData = {
                    GetDetails: {
                        CustID: custID,
                        FatherName: objitem.txtFathername,
                        Educationcategory: null,
                        Educationgroup: null,
                        Educationspecialization: null,
                        Employedin: null,
                        Professiongroup: null,
                        Profession: null,
                        CompanyName: objitem.txtCompany,
                        JobLocation: objitem.txtJobLocation,
                        Professiondetails: objitem.txtFProfession,
                        MobileCountry: objitem.ddlMobile,
                        MobileNumber: objitem.txtMobile,
                        LandlineCountry: commonFactory.checkvals(objitem.ddlfathermobile2) ? objitem.ddlfathermobile2 : (commonFactory.checkvals(objitem.ddlLandLineCountry) ? objitem.ddlLandLineCountry : null),
                        LandAreCode: commonFactory.checkvals(objitem.txtfathermobile2) ? null : (commonFactory.checkvals(objitem.txtAreCode) ? objitem.txtAreCode : null),
                        landLineNumber: commonFactory.checkvals(objitem.txtfathermobile2) ? objitem.txtfathermobile2 : (commonFactory.checkvals(objitem.txtLandNumber) ? objitem.txtLandNumber : null),
                        Email: objitem.txtEmail,
                        FatherFatherName: objitem.txtFatherFname,

                        MotherName: objitem.txtMName,
                        MotherEducationcategory: null,
                        MotherEducationgroup: null,
                        MotherEducationspecialization: null,
                        MotherEmployedIn: null,
                        MotherProfessiongroup: null,
                        MotherProfession: null,
                        MotherCompanyName: objitem.txtMCompanyName,
                        MotherJobLocation: objitem.txtMJobLocation,
                        MotherProfessiondetails: objitem.txtMProfession,
                        MotherMobileCountryID: objitem.ddlMMobileCounCodeID,
                        MotherMobileNumber: objitem.txtMMobileNum,
                        MotherLandCountryID: commonFactory.checkvals(objitem.ddlMMobileCounCodeID2) ? objitem.ddlMMobileCounCodeID2 : commonFactory.checkvals(objitem.ddlMLandLineCounCode) ? objitem.ddlMLandLineCounCode : null,
                        MotherLandAreaCode: commonFactory.checkvals(objitem.txtMMobileNum2) ? null : (commonFactory.checkvals(objitem.txtmAreaCode) ? objitem.txtmAreaCode : null),
                        MotherLandNumber: commonFactory.checkvals(objitem.txtMMobileNum2) ? objitem.txtMMobileNum2 : commonFactory.checkvals(objitem.txtMLandLineNum) ? objitem.txtMLandLineNum : null,
                        MotherEmail: objitem.txtMEmail,
                        MotherFatherFistname: objitem.txtMFatherFname,
                        MotherFatherLastname: objitem.txtMFatherLname,
                        FatherCustFamilyID: model.parent.FatherCust_family_id,
                        MotherCustFamilyID: model.parent.MotherCust_family_id,
                        FatherEducationDetails: objitem.txtFEducation,
                        MotherEducationDetails: objitem.txtMEducation,
                        FatherCountry: 1,
                        FatherState: objitem.ddlFState,
                        FatherDistric: objitem.ddlFDistric,
                        FatherCity: objitem.txtFNativePlace,
                        MotherCountry: 1,
                        MotherState: objitem.ddlMState,
                        MotherDistric: objitem.ddlMDistrict,
                        MotherCity: objitem.txtMNativePlace,
                        AreParentsInterCaste: objitem.rbtlParentIntercaste,
                        FatherfatherMobileCountryID: objitem.ddlFatherfatherMobileCountryCode,
                        FatherFatherMobileNumber: objitem.txtMobileFatherfather,
                        FatherFatherLandCountryID: commonFactory.checkvals(objitem.ddlfatherfatherAlternative) ? objitem.ddlfatherfatherAlternative : (commonFactory.checkvals(objitem.ddlFatherFatherLandLineCode) ? objitem.ddlFatherFatherLandLineCode : null),
                        FatherFatherLandAreaCode: commonFactory.checkvals(objitem.txtfatherfatherAlternative) ? null : (commonFactory.checkvals(objitem.txtGrandFatherArea) ? objitem.txtGrandFatherArea : null),
                        FatherFatherLandNumber: commonFactory.checkvals(objitem.txtfatherfatherAlternative) ? objitem.txtfatherfatherAlternative : (commonFactory.checkvals(objitem.txtGrandFatherLandLinenum) ? objitem.txtGrandFatherLandLinenum : null),
                        MotherfatherMobileCountryID: objitem.ddlMotherfatheMobileCountryCode,
                        MotherFatherMobileNumber: objitem.txtMotherfatheMobilenumber,
                        MotherFatherLandCountryID: commonFactory.checkvals(objitem.ddlmotherfatheralternative) ? objitem.ddlmotherfatheralternative : (commonFactory.checkvals(objitem.ddlMotherFatherLandLineCode) ? objitem.ddlMotherFatherLandLineCode : null),
                        MotherFatherLandAreaCode: commonFactory.checkvals(objitem.txtmotherfatheralternative) ? null : (commonFactory.checkvals(objitem.txtMotherFatherLandLineareacode) ? objitem.txtMotherFatherLandLineareacode : null),
                        MotherFatherLandNumber: commonFactory.checkvals(objitem.txtmotherfatheralternative) ? objitem.txtmotherfatheralternative : (commonFactory.checkvals(objitem.txtMotherFatherLandLinenum) ? objitem.txtMotherFatherLandLinenum : null),
                        FatherCaste: objitem.ddlMotherCaste,
                        MotherCaste: objitem.ddlFatherCaste,
                        FatherProfessionCategoryID: objitem.ddlFprofessionCatgory,
                        MotherProfessionCategoryID: objitem.ddlMprofessionCatgory
                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: null,
                        Admin: null
                    }

                };

                console.log(JSON.stringify(model.myData));
                model.submitPromise = editParentService.submitParentData(model.myData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.parentBindData(custID);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);

                        if (model.datagetInStatus === 1) {
                            sessionStorage.removeItem('missingStatus');
                            route.go('mobileverf', {});


                        }
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });

            }

        };

        model.contactAddressSubmit = function(objitem) {

            if (isSubmit) {
                isSubmit = false;

                model.myAddrData = {
                    GetDetails: {
                        CustID: custID,
                        HouseFlateNumber: objitem.txtHouse_flat,
                        Apartmentname: objitem.txtApartmentName,
                        Streetname: objitem.txtStreetName,
                        AreaName: objitem.txtAreaName,
                        Landmark: objitem.txtLandmark,
                        Country: objitem.ddlCountryContact,
                        STATE: objitem.ddlStateContact,
                        District: objitem.ddlDistricContact,
                        othercity: null,
                        city: objitem.txtCity,
                        ZipPin: objitem.txtZip_no,
                        Cust_Family_ID: model.AdrrObj.Cust_Family_ID
                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: null,
                        Admin: null
                    }

                };
                model.submitPromise = editParentService.submitAddressData(model.myAddrData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.parentBindData(custID);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });

            }

        };

        model.physicalAtrrSubmit = function(objitem) {

            if (isSubmit) {
                isSubmit = false;
                model.myPhysicalData = {
                    GetDetails: {
                        CustID: custID,
                        BWKgs: objitem.txtBWKgs,
                        BWlbs: objitem.txtlbs,
                        BloodGroup: objitem.ddlBloodGroup,
                        HealthConditions: objitem.ddlHealthConditions,
                        HealthConditiondesc: objitem.txtHealthCondition,
                        DietID: objitem.rbtlDiet,
                        SmokeID: objitem.rbtlSmoke,
                        DrinkID: objitem.rbtlDrink,
                        BodyTypeID: objitem.ddlBodyType,
                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: null,
                        Admin: null
                    }

                };

                model.submitPromise = editParentService.submitPhysicalData(model.myPhysicalData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.parentBindData(custID);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });
            }

        };

        model.AboutMyfamilySubmit = function(obj) {
            if (isSubmit) {
                isSubmit = false;

                model.submitPromise = editParentService.submitAboutFamilyData({ CustID: custID, AboutYourself: obj.txtAboutUs, flag: 1 }).then(function(response) {
                    console.log(response);
                    model.lblaboutMyfamily = obj.txtAboutUs;
                    commonFactory.closepopup();
                    if (response.data === '1') {

                        model.AboutPageloadData(custID);
                        model.$broadcast("showAlertPopupccc", 'alert-success', 'submitted Succesfully', 1500);
                    } else {
                        model.$broadcast("showAlertPopupccc", 'alert-danger', 'Updation failed', 1500);
                    }
                });
            }
        };




        model.housewiseChk = function(item) {
            if (item.chkbox === true) {
                item.txtMProfession = 'HouseWife';
            } else {
                item.txtMProfession = '';
            }
        };

        model.roundVal = function(val) {
            var dec = 2;
            var result = Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        };
        model.converttolbs = function(item) {
            var value = item.txtBWKgs;
            item.txtlbs = '';
            if (value.length > 0) {
                var lbs = value * 2.2;
                lbs = model.roundVal(lbs);
                item.txtlbs = lbs;
                if (lbs.toString() == 'NaN') {
                    //jAlert("", 'Alert Dialog', x);
                    alert("invalid Number");
                    item.txtlbs = '';
                    item.txtBWKgs = '';
                }
            } else {
                item.txtBWKgs = '';
                item.txtlbs = '';
            }
        };














        return model.init();

    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editParentModel', factory)

    factory.$inject = ['editParentService', 'authSvc', 'alert', 'commonFactory', '$uibModal'];

})(angular);