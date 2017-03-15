(function(angular) {
    'use strict';

    function factory(editPartnerpreferenceService, authSvc, alertss, commonFactory, uibModal) {
        var model = {};
        model.scope = {};

        //start declaration block
        model.partnerPrefArr = [];
        model.partnerObj = {};
        model.ageGapArr = [];
        model.partnerDescObj = {};
        var isSubmit = true;

        var logincustid = authSvc.getCustId();
        var custID = model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.partnerDescription = '';

        //end declaration block

        model.init = function() {
            model.pageload();

            return model;
        };

        model.pageload = function() {
            editPartnerpreferenceService.getPartnerPreferenceData(custID).then(function(response) {
                model.partnerPrefArr = response.data;
                model.partnerDescription = (model.partnerPrefArr.length > 0 && model.partnerPrefArr[0].PartnerDescripition !== undefined && model.partnerPrefArr[0].PartnerDescripition !== null) ? model.partnerPrefArr[0].PartnerDescripition : '';

                model.partnermodifiedby = (model.partnerPrefArr.length > 0 && model.partnerPrefArr[0].EmpLastModificationDate !== undefined && model.partnerPrefArr[0].EmpLastModificationDate !== null) ? model.partnerPrefArr[0].EmpLastModificationDate : '';

            });
        };
        model.removeSelect = function(data) {
            if (data[0] !== undefined && angular.lowercase(data[0].title) === '--select--') {
                data.splice(0, 1);
            }

            return data;
        };
        model.SplitstringintoArray = function(string) {
            var array = [];
            if (string !== null && string !== "") {
                _.each(string.split(','), function(item) {
                    array.push(parseInt(item));
                });
            }
            return array;
        };
        model.partnerprefPopulate = function(item) {
            isSubmit = true;
            model.partnerObj = {};

            if (item !== undefined) {
                model.casteArr = model.removeSelect(commonFactory.casteDepedency(item.religionid, item.MotherTongueID));
                model.stateArr = model.removeSelect(commonFactory.StateBind(item.CountryID));
                model.eduGroupArr = model.removeSelect(commonFactory.educationGroupBind(item.EducationCategoryID));
                model.starArr = model.removeSelect(commonFactory.starBind(item.StarLanguageID));
                model.subCasteArr = model.removeSelect(commonFactory.subCaste(commonFactory.listSelectedVal(item.casteid)));

                model.partnerObj.intCusID = item.intCusID;
                model.ageGapArr = commonFactory.numbersBind('years', 1, 80);

                model.partnerObj.rbtlGender = item.Gender === 'Female' ? 2 : 1;
                model.partnerObj.ddlFromAge = item.Agemin;
                model.partnerObj.ddlToAge = item.AgeMax;
                model.partnerObj.ddlFromheight = item.MinHeight;
                model.partnerObj.ddltoHeight = item.MaxHeight;
                model.partnerObj.lstReligion = model.SplitstringintoArray(item.religionid);
                model.partnerObj.lstMothertongue = model.SplitstringintoArray(item.MotherTongueID);
                model.partnerObj.lstCaste = model.SplitstringintoArray(item.casteid);
                model.partnerObj.lstSubcaste = model.SplitstringintoArray(item.subcasteid);
                model.partnerObj.lstMaritalstatus = item.maritalstatusid;
                model.partnerObj.lstEducationcategory = model.SplitstringintoArray(item.EducationCategoryID);
                model.partnerObj.lstEducationgroup = model.SplitstringintoArray(item.EducationGroupID);
                model.partnerObj.lstEmployedin = model.SplitstringintoArray(item.ProfessionCategoryID);
                model.partnerObj.lstProfessiongroup = model.SplitstringintoArray(item.ProfessionGroupID);
                model.partnerObj.lstPreferredcountry = model.SplitstringintoArray(item.CountryID);
                model.partnerObj.lstPreferredstate = model.SplitstringintoArray(item.StateID);
                model.partnerObj.lstRegion = model.SplitstringintoArray(item.regionId);
                model.partnerObj.lstBranch = model.SplitstringintoArray(item.branchid);
                model.partnerObj.rbtDiet = item.DietID;
                model.partnerObj.rbtManglikKujadosham = item.KujaDoshamID;
                model.partnerObj.rbtPreferredstarLanguage = item.StarLanguageID;
                model.partnerObj.rbtPreferredstars = item.TypeOfStar;
                model.partnerObj.lstpreferedstars = model.SplitstringintoArray(item.PreferredStars);
                model.partnerObj.rbtDomacile = item.Domicel === 'India' ? 0 : (item.Domicel === 'abroad' ? 1 : (item.Domicel === 'All' ? 2 : ''));

            }
            commonFactory.open('partnerPrefContent.html', model.scope, uibModal);


        };

        model.partnerdescPopulate = function(item) {
            isSubmit = true;
            model.partnerDescObj = {};
            if (item !== undefined) {
                model.partnerDescObj.txtpartnerdescription = item.PartnerDescripition;
            }
            commonFactory.open('partnerDescContent.html', model.scope, uibModal);

        };
        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.changeBind = function(type, parentval, parentval2) {

            switch (type) {
                case 'Country':
                    model.stateArr = model.removeSelect(commonFactory.StateBind(commonFactory.listSelectedVal(parentval)));
                    break;

                case 'EducationCatgory':
                    model.eduGroupArr = model.removeSelect(commonFactory.educationGroupBind(commonFactory.listSelectedVal(parentval)));
                    break;

                case 'caste':
                    model.casteArr = model.removeSelect(commonFactory.casteDepedency(commonFactory.listSelectedVal(parentval), commonFactory.listSelectedVal(parentval2)));
                    break;

                case 'subCaste':
                    model.subCasteArr = model.removeSelect(commonFactory.subCaste(commonFactory.listSelectedVal(parentval)));
                    break;

                case 'star':
                    model.starArr = model.removeSelect(commonFactory.starBind(commonFactory.listSelectedVal(parentval)));
                    break;

                case 'region':
                    model.branchArr = model.removeSelect(commonFactory.branch(commonFactory.listSelectedVal(parentval)));
                    break;
            }
        };


        model.partnerPrefSubmit = function(objitem) {

            if (isSubmit) {
                isSubmit = false;
                model.partnerPrefData = {
                    GetDetails: {
                        CustID: custID,
                        AgeGapFrom: objitem.ddlFromAge,
                        AgeGapTo: objitem.ddlToAge,
                        HeightFrom: objitem.ddlFromheight,
                        HeightTo: objitem.ddltoHeight,
                        Religion: commonFactory.listSelectedVal(objitem.lstReligion),
                        Mothertongue: commonFactory.listSelectedVal(objitem.lstMothertongue),
                        Caste: commonFactory.listSelectedVal(objitem.lstCaste),
                        Subcaste: commonFactory.listSelectedVal(objitem.lstSubcaste),
                        Maritalstatus: commonFactory.listSelectedVal(objitem.lstMaritalstatus),
                        ManglikKujadosham: objitem.rbtManglikKujadosham,
                        PreferredstarLanguage: objitem.rbtPreferredstarLanguage,
                        Educationcategory: commonFactory.listSelectedVal(objitem.lstEducationcategory),
                        Educationgroup: commonFactory.listSelectedVal(objitem.lstEducationgroup),
                        Employedin: commonFactory.listSelectedVal(objitem.lstEmployedin),
                        Professiongroup: commonFactory.listSelectedVal(objitem.lstProfessiongroup),
                        Diet: objitem.rbtDiet,
                        Preferredcountry: commonFactory.listSelectedVal(objitem.lstPreferredcountry),
                        Preferredstate: commonFactory.listSelectedVal(objitem.lstPreferredstate),
                        Preferreddistrict: null,
                        Preferredlocation: null,
                        TypeofStar: objitem.rbtPreferredstars,
                        PrefredStars: commonFactory.listSelectedVal(objitem.lstpreferedstars),
                        GenderID: objitem.rbtlGender,
                        Region: commonFactory.listSelectedVal(objitem.lstRegion),
                        Branch: commonFactory.listSelectedVal(objitem.lstBranch),
                        Domacile: commonFactory.checkvals(objitem.rbtDomacile) ? parseInt(objitem.rbtDomacile) : ''
                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: null,
                        Admin: null
                    }
                };

                console.log(JSON.stringify(model.partnerPrefData));
                model.submitPromise = editPartnerpreferenceService.submitPartnerPrefData(model.partnerPrefData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        editPartnerpreferenceService.getPartnerPreferenceData(custID).then(function(response) {
                            model.partnerPrefArr = response.data;
                            console.log(model.partnerPrefArr);
                        });
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });

            }
        };


        model.partnerDescriptionSubmit = function(obj) {

            if (isSubmit) {
                isSubmit = false;
                model.submitPromise = editPartnerpreferenceService.submitPartnerDescData({ CustID: custID, AboutYourself: obj.txtpartnerdescription, flag: 1 }).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === '1') {
                        model.partnerDescription = obj.txtpartnerdescription;
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
        .factory('editPartnerpreferenceModel', factory)

    factory.$inject = ['editPartnerpreferenceService', 'authSvc', 'alert', 'commonFactory', '$uibModal'];

})(angular);