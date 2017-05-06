(function(angular) {
    'use strict';

    function factory(editPartnerpreferenceService, authSvc, alertss, commonFactory, uibModal, stateParams) {
        var model = {};
        model.scope = {};

        //start declaration block
        model.partnerPrefArr = [];
        model.partnerObj = {};
        model.ageGapArr = [];
        model.partnerDescObj = {};
        var isSubmit = true;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //  model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.partnerDescription = '';

        //end declaration block

        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.pageload();

            return model;
        };

        model.pageload = function() {
            editPartnerpreferenceService.getPartnerPreferenceData(custID).then(function(response) {
                model.partnerPrefArr = response.data;
                model.partnerDescription = (model.partnerPrefArr.length > 0 && model.partnerPrefArr[0].PartnerDescripition !== undefined && model.partnerPrefArr[0].PartnerDescripition !== null) ? model.partnerPrefArr[0].PartnerDescripition : '';

                model.partnermodifiedby = (model.partnerPrefArr.length > 0 && model.partnerPrefArr[0].EmpLastModificationDate !== undefined && model.partnerPrefArr[0].EmpLastModificationDate !== null) ? model.partnerPrefArr[0].EmpLastModificationDate : '';
                console.log(model.partnerPrefArr);
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

            model.popupdata = model.partnerPreference;
            model.popupHeader = 'Partnerprefernece details';
            if (item !== undefined) {
                model.eventType = 'edit';
                // model.casteArr = model.removeSelect(commonFactory.casteDepedency(item.religionid, item.MotherTongueID));
                // model.stateArr = model.removeSelect(commonFactory.StateBind(item.CountryID));
                // model.eduGroupArr = model.removeSelect(commonFactory.educationGroupBind(item.EducationCategoryID));
                // model.starArr = model.removeSelect(commonFactory.starBind(item.StarLanguageID));
                // model.subCasteArr = model.removeSelect(commonFactory.subCaste(commonFactory.listSelectedVal(item.casteid)));

                model.intCusID = item.intCusID;
                model.genderId = item.Gender === 'Female' ? 2 : 1;
                model.fromAgeId = item.Agemin;
                model.toAgeId = item.AgeMax;
                model.fromheightId = item.MinHeight;
                model.toheightId = item.MaxHeight;
                model.religionId = model.SplitstringintoArray(item.religionid);
                model.mothertongueId = model.SplitstringintoArray(item.MotherTongueID);
                model.casteId = model.SplitstringintoArray(item.casteid);
                model.subCasteId = model.SplitstringintoArray(item.subcasteid);
                model.maritalstatusId = item.maritalstatusid;
                model.eduCatgoryId = model.SplitstringintoArray(item.EducationCategoryID);
                model.eduGroupId = model.SplitstringintoArray(item.EducationGroupID);
                model.employedinId = model.SplitstringintoArray(item.ProfessionCategoryID);
                model.profGroupId = model.SplitstringintoArray(item.ProfessionGroupID);
                model.countryId = model.SplitstringintoArray(item.CountryID);
                model.stateId = model.SplitstringintoArray(item.StateID);
                model.regionId = model.SplitstringintoArray(item.regionId);
                model.branchId = model.SplitstringintoArray(item.branchid);
                model.dietId = item.DietID;
                model.kujadoshamId = item.KujaDoshamID;
                model.starLanguageId = item.StarLanguageID;
                model.rbtPreferredstars = item.TypeOfStar;
                model.lstPreferredStars = model.SplitstringintoArray(item.PreferredStars);
                model.Domicile = item.Domicel === 'India' ? 0 : (item.Domicel === 'abroad' ? 1 : (item.Domicel === 'All' ? 2 : ''));

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
                        EmpID: loginEmpid,
                        Admin: AdminID
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
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'PartnerPreference Details Submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'PartnerPreference Details Updation failed', 4500);
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
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Partner Description Submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Partner Description Updation failed', 4500);
                    }
                });
            }
        };



        model.partnerPreference = [
            { lblname: 'Gender', controlType: 'radio', ngmodel: 'genderId', arrbind: 'gender', parameterValue: 'OccupationDetails' },
            { lblname: 'Age Gap', controlType: 'doublemultiselect', ngmodelSelect1: 'fromAgeId', ngmodelSelect2: 'toAgeId', typeofdata: 'ageBind', parameterValue1: 'OccupationDetails', parameterValue2: 'OccupationDetails' },
            { lblname: 'Height', controlType: 'doublemultiselect', ngmodelSelect1: 'fromheightId', ngmodelSelect2: 'toheightId', typeofdata: 'heightregistration', parameterValue1: 'OccupationDetails', parameterValue2: 'OccupationDetails' },
            { lblname: 'Religion', controlType: 'multiselect', ngmodel: 'religionId', typeofdata: 'Religion', secondParent: 'mothertongueId', childName: 'caste', changeApi: 'castedependency', parameterValue: 'OccupationDetails' },
            { lblname: 'Mother tongue', controlType: 'multiselect', ngmodel: 'mothertongueId', typeofdata: 'Mothertongue', secondParent: 'religionId', childName: 'caste', changeApi: 'castedependency', parameterValue: 'OccupationDetails' },
            { lblname: 'Caste', controlType: 'Changemultiselect', ngmodel: 'casteId', parentName: 'caste', childName: 'subCaste', changeApi: 'subCasteBind', parameterValue: 'OccupationDetails' },
            { lblname: 'Subcaste', controlType: 'Changemultiselect', ngmodel: 'subCasteId', typeofdata: 'Religion', parentName: 'subCaste', parameterValue: 'OccupationDetails' },
            { lblname: 'Marital status', controlType: 'multiselect', ngmodel: 'maritalstatusId', typeofdata: 'MaritalStatus', parameterValue: 'OccupationDetails' },
            { lblname: 'Education category', controlType: 'multiselect', ngmodel: 'eduCatgoryId', typeofdata: 'educationcategory', childName: 'educationgroup', changeApi: 'EducationGroup', parameterValue: 'OccupationDetails' },
            { lblname: 'Education group', controlType: 'Changemultiselect', ngmodel: 'eduGroupId', typeofdata: 'Religion', parentName: 'educationgroup', parameterValue: 'OccupationDetails' },
            { lblname: 'Employed in', controlType: 'multiselect', ngmodel: 'employedinId', typeofdata: 'ProfCatgory', parameterValue: 'OccupationDetails' },
            { lblname: 'Profession group', controlType: 'multiselect', ngmodel: 'profGroupId', typeofdata: 'ProfGroup', parameterValue: 'OccupationDetails' },
            { lblname: 'Domicile', controlType: 'radio', ngmodel: 'domicileId', arrbind: 'Domicile', parameterValue: 'OccupationDetails' },
            { lblname: 'Preferred country', controlType: 'multiselect', ngmodel: 'countryId', typeofdata: 'Country', childName: 'state', changeApi: 'stateSelect', parameterValue: 'OccupationDetails' },
            { lblname: 'Preferred state', controlType: 'Changemultiselect', ngmodel: 'stateId', typeofdata: 'Religion', parentName: 'state', parameterValue: 'OccupationDetails' },
            { lblname: 'Region', controlType: 'multiselect', ngmodel: 'regionId', typeofdata: 'region', childName: 'branch', changeApi: 'branch', parameterValue: 'OccupationDetails' },
            { lblname: 'Branch', controlType: 'Changemultiselect', ngmodel: 'branchId', parentName: 'branch', parameterValue: 'OccupationDetails' },
            { lblname: 'Diet', controlType: 'radio', ngmodel: 'dietId', arrbind: 'Diet', parameterValue: 'OccupationDetails' },
            { lblname: 'Manglik/Kuja dosham', controlType: 'radio', ngmodel: 'kujadoshamId', arrbind: 'Kujadosham', parameterValue: 'OccupationDetails' },
            { lblname: 'Preferred star Language', controlType: 'radio', ngmodel: 'starLanguageId', arrbind: 'preferredStarlanguage', childName: 'star', changeApi: 'stars', parameterValue: 'OccupationDetails' },
            { lblname: 'Star Preference', controlType: 'radio', ngmodel: 'starPreferenceId', arrbind: 'StarPreference', parameterValue: 'OccupationDetails' },
            { lblname: '', controlType: 'Changemultiselect', ngmodel: 'lstPreferredStars', parentName: 'star', parameterValue: 'OccupationDetails' }
        ];

        model.aboutPartnerDescription = [
            { lblname: '', controlType: 'about', required: true, ngmodel: 'partnerDescriptionId', parameterValue: 'OccupationDetails' },
        ];

        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editPartnerpreferenceModel', factory);

    factory.$inject = ['editPartnerpreferenceService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);