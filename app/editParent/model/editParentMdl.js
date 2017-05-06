(function(angular) {
    'use strict';

    function factory(editParentService, authSvc, alertss, commonFactory, uibModal, stateParams) {
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
        model.eventType = 'add';
        var isSubmit = true;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        //end declarion block

        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //  model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.parentBindData();
            model.AboutPageloadData();
            return model;
        };

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
            model.eventType = 'add';
            switch (type) {
                case "parent":

                    model.popupdata = model.parent;
                    model.popupHeader = 'Parent details';
                    model.FatherCust_family_id = null;
                    model.MotherCust_family_id = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';

                        model.cust_id = item.cust_id;
                        model.FatherCust_family_id = item.FatherCust_family_id;
                        model.MotherCust_family_id = item.MotherCust_family_id;

                        model.fatherName = item.FatherName;
                        model.fEducation = item.FatherEducationDetails;
                        model.fDesignation = item.FatherProfDetails;
                        model.fCompany = item.FathercompanyName;
                        model.fJobLocation = item.FatherJoblocation;

                        model.fMobileCodeId = item.FatherMobileCountryCodeId;
                        model.fMobileNumber = item.FathermobilenumberID;

                        if (commonFactory.checkvals(item.FatherLandAreaCodeId)) {
                            model.flandCountryCodeId = item.FatherLandCountryCodeId;
                            model.fAreaCodeid = item.FatherLandAreaCodeId;
                            model.flandNumber = item.FatherLandNumberID;
                        } else {
                            model.fAltermobileCodeId = item.FatherLandCountryCodeId;
                            model.fAlterMobileNumber = item.FatherLandNumberID;
                        }

                        model.fEmail = item.FatherEmail;
                        model.fatherFatherName = item.FatherFathername;

                        model.gfMobileCodeId = item.FatherfatherMobileCountryID;
                        model.gfMobileNumber = item.FatherFatherMobileNumber;

                        if (commonFactory.checkvals(item.FatherFatherLandAreaCode)) {
                            model.gflandCountryCodeId = item.FatherfatherLandCountryCodeID;
                            model.gfAreaCodeid = item.FatherFatherLandAreaCode;
                            model.gflandNumber = item.FatherFatherLandNumber;
                        } else {
                            model.gfAltermobileCodeId = item.FatherfatherMobileCountrycode1;
                            model.gfAlterMobileNumber = item.FatherFatherLandNumber;
                        }

                        model.fStateid = item.FatherStateID;
                        model.fDistrictid = item.FatherDistrictID;
                        model.fNative = item.FatherNativeplace;
                        model.motherName = item.MotherName;
                        model.mEducation = item.MotherEducationDetails;
                        model.mDesignation = item.MotherProfedetails;
                        model.chkbox = item.MotherProfedetails == 'HouseWife' ? true : false;
                        model.mCompanyName = item.MothercompanyName;
                        model.mJobLocation = item.MotherJoblocation;

                        model.mMobileCodeId = item.MotherMobileCountryCodeId;
                        model.mMobileNumber = item.MotherMobilenumberID;

                        if (commonFactory.checkvals(item.MotherLandAreaCodeId)) {
                            model.mlandCountryCodeId = item.MotherLandCountryCodeId;
                            model.mAreaCodeid = item.MotherLandAreaCodeId;
                            model.mlandNumber = item.MotherLandNumberID;
                        } else {
                            model.mAltermobileCodeId = item.MotherMobileCountryCodeId;
                            model.mAlterMobileNumber = item.MotherLandNumberID;
                        }

                        model.mEmail = item.MotherEmail;
                        model.mffirstName = item.MotherFatherName;
                        model.mfLastName = item.MotherFatherLastName;

                        model.mfMobileCodeId = item.MotherfatherMobileCountryID;
                        model.mfMobileNumber = item.MotherFatherMobileNumber;

                        if (commonFactory.checkvals(item.MotherFatherLandAreaCode)) {
                            model.mflandCodeId = item.motherfatherLandCountryID;
                            model.mfAreaCodeid = item.MotherFatherLandAreaCode;
                            model.mflandNumber = item.MotherFatherLandNumber;
                        } else {
                            model.mfAltermobileCodeId = item.MotherfatherMobileCountryID1;
                            model.mfAlterMobileNumber = item.MotherFatherLandNumber;
                        }
                        model.mStateid = item.motherStateID;
                        model.mDistrictid = item.motherDistricID;
                        model.mNativePlace = item.MotherNativeplace;
                        model.areParentInterCasteId = item.Intercaste === 'Yes' ? 1 : 0;
                        model.fCaste = item.FatherCasteID;
                        model.mCaste = item.MotherCasteID;

                        model.fProfCatgory = item.FatherProfessionCategoryID;
                        model.mProfCtagory = item.MotherProfessionCategoryID;

                    }
                    commonFactory.open('parentModalContent.html', model.scope, uibModal);

                    break;

                case "Address":
                    model.popupdata = model.Address;
                    model.popupHeader = 'Parent details';
                    model.Cust_Family_ID = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.Cust_ID = item.Cust_ID;
                        model.Cust_Family_ID = item.Cust_Family_ID;
                        model.houseFlatNumber = item.FlatNumber;
                        model.apartmentName = item.ApartmentName;
                        model.streetName = item.StreetName;
                        model.areaName = item.AreaName;
                        model.landMark = item.LandMark;
                        model.countryId = item.ParentCountryId;
                        model.stateId = item.ParentStateid;
                        model.districtId = item.ParentDistrictId;
                        model.cityId = item.CityName;
                        model.zipcode = item.Zip;
                    }
                    commonFactory.open('AddressModalContent.html', model.scope, uibModal);


                    break;

                case "physicalAttributes":

                    model.popupdata = model.physicalAttributes;
                    model.popupHeader = 'Parent details';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.Cust_ID = item.Cust_ID;

                        model.dietId = item.DietID;
                        model.drinkId = item.DrinkID;
                        model.smokeId = item.SmokeID;
                        model.bodyTypeId = item.BodyTypeID;
                        model.bodyWeight = item.BodyWeight;
                        model.bloodGroupId = item.BloodGroupID;
                        model.healthConditionId = item.HealthConditionID;
                        model.healthDescritionId = item.HealthConditionDescription;
                    }
                    commonFactory.open('PhysicalAttributeModalContent.html', model.scope, uibModal);


                    break;

                case "AboutFamily":
                    model.popupdata = model.aboutFamily;
                    model.popupHeader = 'Parent details';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.aboutFamilyId = item;
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
                        FatherCustFamilyID: model.FatherCust_family_id,
                        MotherCustFamilyID: model.MotherCust_family_id,
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
                        EmpID: loginEmpid,
                        Admin: AdminID
                    }

                };
                model.submitPromise = editParentService.submitParentData(model.myData).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.parentBindData(custID);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Parents Details submitted Succesfully', 4500);
                        if (model.datagetInStatus === 1) {
                            sessionStorage.removeItem('missingStatus');
                            route.go('mobileverf', {});
                        }
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Parents Details Updation failed', 4500);
                    }
                });

            }

        };


        model.updateData = function(inObj, type) {

            if (isSubmit) {
                isSubmit = false;

                switch (type) {
                    case 'Parent details':

                        inObj.GetDetails.FatherCustFamilyID = model.FatherCust_family_id;
                        inObj.GetDetails.MotherCustFamilyID = model.MotherCust_family_id;
                        inObj.GetDetails.CustID = custID;
                        model.submitPromise = editParentService.submitParentData(inObj).then(function(response) {
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.parentBindData(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Parents Details submitted Succesfully', 4500);
                                if (model.datagetInStatus === 1) {
                                    sessionStorage.removeItem('missingStatus');
                                    route.go('mobileverf', {});
                                }
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Parents Details Updation failed', 4500);
                            }
                        });
                        break;


                }





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
                        Cust_Family_ID: model.Cust_Family_ID
                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: loginEmpid,
                        Admin: AdminID
                    }

                };
                model.submitPromise = editParentService.submitAddressData(model.myAddrData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.parentBindData(custID);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Contact Address submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Contact Address Updation failed', 4500);
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
                        EmpID: loginEmpid,
                        Admin: AdminID
                    }

                };

                model.submitPromise = editParentService.submitPhysicalData(model.myPhysicalData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.parentBindData(custID);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Physical Attribute & Health Details Of Candidate submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Physical Attribute & Health Details Of Candidate Updation failed', 4500);
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
                        model.$broadcast("showAlertPopupccc", 'alert-success', 'About My Family submitted Succesfully', 1500);
                    } else {
                        model.$broadcast("showAlertPopupccc", 'alert-danger', 'About My Family Updation failed', 1500);
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
                    alert("invalid Number");
                    item.txtlbs = '';
                    item.txtBWKgs = '';
                }
            } else {
                item.txtBWKgs = '';
                item.txtlbs = '';
            }
        };

       model.showHousewife=function(val){
               return model.chkhousewife;
        };

        model.parent = [
            { lblname: '', controlType: 'bindHtml', html: ' <h6>Father Details</h6>', classname: 'parentheader' },
            { lblname: 'Father Name', controlType: 'textbox', ngmodel: 'fatherName', required: true, parameterValue: 'FatherName' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'fEducation', parameterValue: 'FatherEducationDetails' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'fProfCatgory', typeofdata: 'ProfCatgory', parameterValue: 'FatherProfessionCategoryID' },
            { lblname: 'Designation', controlType: 'textbox', ngmodel: 'fDesignation', parameterValue: 'Professiondetails' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'fCompany', parameterValue: 'CompanyName' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'fJobLocation', parameterValue: 'JobLocation' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'fMobileCodeId',
                strmobile: 'fMobileNumber',
                dalternative: 'fAltermobileCodeId',
                stralternative: 'fAlterMobileNumber',
                dland: 'flandCountryCodeId',
                strareacode: 'fAreaCodeid',
                strland: 'flandNumber',
                strmail: 'fEmail',

                mobileCodeIdParameterValue: 'MobileCountry',
                mobileNumberParameterValue: 'MobileNumber',
                landCountryCodeIdParameterValue: 'LandlineCountry',
                landAreaCodeIdParameterValue: 'LandAreCode',
                landNumberParameterValue: 'landLineNumber',
                emailParameterValue: 'Email'
            },

            { lblname: 'Fathers father name', controlType: 'textbox', ngmodel: 'fatherFatherName', parameterValue: 'FatherFatherName' },
            {
                controlType: 'contact',
                emailhide: false,
                dmobile: 'gfMobileCodeId',
                strmobile: 'gfMobileNumber',
                dalternative: 'gfAltermobileCodeId',
                stralternative: 'gfAlterMobileNumber',
                dland: 'gflandCountryCodeId',
                strareacode: 'gfAreaCodeid',
                strland: 'gflandNumber',

                mobileCodeIdParameterValue: 'FatherfatherMobileCountryID',
                mobileNumberParameterValue: 'FatherFatherMobileNumber',
                landCountryCodeIdParameterValue: 'FatherFatherLandCountryID',
                landAreaCodeIdParameterValue: 'FatherFatherLandAreaCode',
                landNumberParameterValue: 'FatherFatherLandNumber',

            }, {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                emailhide: false,
                dstate: 'fStateid',
                ddistrict: 'fDistrictid',
                countryParameterValue: 'FatherCountry',
                stateParameterValue: 'FatherState',
                districtParameterValue: 'FatherDistric'
            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'fNative', parameterValue: 'FatherCity' },
            { lblname: '', controlType: 'bindHtml', html: ' <h6>Mother Details</h6>', classname: 'parentheader' },
            { lblname: 'Mother Name', controlType: 'textbox', ngmodel: 'motherName', required: true, parameterValue: 'MotherName' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'mEducation', parameterValue: 'MotherEducationDetails' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'mProfCtagory', typeofdata: 'ProfCatgory', parameterValue: 'MotherProfessionCategoryID' },
            { lblname: 'Designation', controlType: 'housewife', ngmodelText: 'mDesignation', ngmodelChk: 'chkhousewife', parameterValue: 'MotherProfessiondetails' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'mCompanyName', parameterValue: 'MotherCompanyName', parentDependecy: 'showHousewife' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'mJobLocation', parameterValue: 'MotherJobLocation', parentDependecy: 'showHousewife' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'mMobileCodeId',
                strmobile: 'mMobileNumber',
                dalternative: 'mAltermobileCodeId',
                stralternative: 'mAlterMobileNumber',
                dland: 'mlandCountryCodeId',
                strareacode: 'mAreaCodeid',
                strland: 'mlandNumber',
                strmail: 'mEmail',

                mobileCodeIdParameterValue: 'MotherMobileCountryID',
                mobileNumberParameterValue: 'MotherMobileNumber',
                landCountryCodeIdParameterValue: 'MotherLandCountryID',
                landAreaCodeIdParameterValue: 'MotherLandAreaCode',
                landNumberParameterValue: 'MotherLandNumber',
                emailParameterValue: 'MotherEmail'

            },
            { lblname: 'Mothers Father Name', controlType: 'textbox', ngmodel: 'mffirstName', parameterValue: 'MotherFatherFistname' },
            { lblname: 'Mothers Last Name', controlType: 'textbox', ngmodel: 'mfLastName', parameterValue: 'MotherFatherLastname' },
            {
                controlType: 'contact',
                emailhide: false,
                dmobile: 'mfMobileCodeId',
                strmobile: 'mfMobileNumber',
                dalternative: 'mfAltermobileCodeId',
                stralternative: 'mfAlterMobileNumber',
                dland: 'mflandCodeId',
                strareacode: 'mfAreaCodeid',
                strland: 'mflandNumber',

                mobileCodeIdParameterValue: 'MotherfatherMobileCountryID',
                mobileNumberParameterValue: 'MotherFatherMobileNumber',
                landCountryCodeIdParameterValue: 'MotherFatherLandCountryID',
                landAreaCodeIdParameterValue: 'MotherFatherLandAreaCode',
                landNumberParameterValue: 'MotherFatherLandNumber'

            }, {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dstate: 'mStateid',
                ddistrict: 'mDistrictid',
                countryParameterValue: 'MotherCountry',
                stateParameterValue: 'MotherState',
                districtParameterValue: 'MotherDistric'
            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'mNativePlace', parameterValue: 'MotherCity' },
            { lblname: 'Are parents interCaste ? ', controlType: 'radio', ngmodel: 'areParentInterCasteId', arrbind: 'boolType', parameterValue: 'AreParentsInterCaste' },
            { lblname: 'Father Caste', controlType: 'select', ngmodel: 'fCaste', typeofdata: 'caste', parameterValue: 'FatherCaste', parentDependecy: 'areParentInterCasteId' },
            { lblname: 'Mother Caste', controlType: 'select', ngmodel: 'mCaste', typeofdata: 'caste', parameterValue: 'MotherCaste', parentDependecy: 'areParentInterCasteId' }

        ];

        model.Address = [
            { lblname: 'House/Flat number', controlType: 'textbox', ngmodel: 'houseFlatNumber', parameterValue: 'OccupationDetails' },
            { lblname: 'Apartment name', controlType: 'textbox', ngmodel: 'apartmentName', parameterValue: 'OccupationDetails' },
            { lblname: 'Street name', controlType: 'textbox', ngmodel: 'streetName', parameterValue: 'OccupationDetails' },
            { lblname: 'Area Name', controlType: 'textbox', ngmodel: 'areaName', parameterValue: 'OccupationDetails' },
            { lblname: 'Landmark', controlType: 'textbox', ngmodel: 'landMark', parameterValue: 'OccupationDetails' },
            {
                controlType: 'country',
                countryshow: true,
                cityshow: false,
                othercity: false,
                dcountry: 'countryId',
                dstate: 'stateId',
                ddistrict: 'districtId',
                require: true,

                countryParameterValue: 'CountryID',
                stateParameterValue: 'StateID',
                districtParameterValue: 'DistrictID',
                cityParameterValue: 'CityID'
            },
            { lblname: 'City', controlType: 'textbox', ngmodel: 'cityId', parameterValue: 'OccupationDetails' },
            { lblname: 'Zip/Pin', controlType: 'textbox', ngmodel: 'zipcode', parameterValue: 'OccupationDetails' }

        ];
        model.physicalAttributes = [
            { lblname: 'Diet', controlType: 'radio', ngmodel: 'dietId', parameterValue: 'OccupationDetails' },
            { lblname: 'Drink', controlType: 'radio', ngmodel: 'drinkId', parameterValue: 'OccupationDetails' },
            { lblname: 'Smoke', controlType: 'radio', ngmodel: 'smokeId', parameterValue: 'OccupationDetails' },
            { lblname: 'Body Type', controlType: 'select', ngmodel: 'bodyTypeId', parameterValue: 'OccupationDetails' },
            { lblname: 'Body weight', controlType: 'textbox', ngmodel: 'bodyWeight', parameterValue: 'OccupationDetails' },
            { lblname: 'lbs', controlType: 'textbox', ngmodel: 'lbs', parameterValue: 'OccupationDetails' },
            { lblname: 'Blood Group', controlType: 'select', ngmodel: 'bloodGroupId', parameterValue: 'OccupationDetails' },
            { lblname: 'Health Conditions', controlType: 'select', ngmodel: 'healthConditionId', parameterValue: 'OccupationDetails' },
            { lblname: 'Health Condition Description', controlType: 'textarea', ngmodel: 'healthDescritionId', parameterValue: 'OccupationDetails' },
        ];
        model.aboutFamily = [
            { lblname: '', controlType: 'about', required: true, displayTxt: '(Do Not Mention Any Contact Information Phone Numbers, Email Id’s or your Profile May be Rejected.)', ngmodel: 'aboutFamilyId', parameterValue: 'OccupationDetails' },
        ];

        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editParentModel', factory);

    factory.$inject = ['editParentService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);