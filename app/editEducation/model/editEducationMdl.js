(function(angular) {
    'use strict';


    function factory($http, authSvc, editEducationService, commonFactory, uibModal, filter, alertss, stateParams, SelectBindService, arrayConstantsEdit) {
        var model = {};
        // var logincustid = authSvc.getCustId();

        model.scope = {};
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = model.Admin = authSvc.isAdmin();
        model.Education = {};
        //start declaration block
        model.stateArr = [];
        model.districtArr = [];
        model.cityeArr = [];
        model.passOfyearArr = [];
        model.eduGroupArr = [];
        model.eduSpecialisationArr = [];
        model.ProfSpecialisationArr = [];
        model.ProfstateArr = [];
        model.ProfdistrictArr = [];
        model.ProfcityeArr = [];
        model.profObj = {};

        model.aboutObj = {};
        model.custObj = {};
        var isSubmit = true;
        model.educationID = 0;
        model.CustomerDataArr = [];
        model.reviewdisplay = 'Education details';
        model.eventType = 'add';
        //end declaration block

        var CustID = stateParams.CustID;

        // logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.CustID = CustID;
        model.init = function() {

            CustID = stateParams.CustID;
            model.getdata();
            return model;
        };

        model.getdata = function() {
            model.eduPageload();
            model.ProfPageload();
            model.aboutPageload();
            model.custdatapageload();
        };

        model.eduPageload = function() {

            editEducationService.getEducationData(CustID).then(function(response) {
                console.log(response.data);
                if (commonFactory.checkvals(response.data)) {
                    model.educationSelectArray = response.data;

                    model.eduEmpLastModificationDate = model.educationSelectArray.length > 0 ? model.educationSelectArray[0].EmpLastModificationDate : '';

                }

            });
        };
        model.ProfPageload = function() {

            editEducationService.getProfessionData(CustID).then(function(response) {
                if (commonFactory.checkvals(response.data)) {
                    model.ProfessionSelectArray = response.data;
                    model.profEmpLastModificationDate = model.ProfessionSelectArray[0].EmpLastModificationDate;
                }

            });

        };
        model.aboutPageload = function() {
            editEducationService.getAboutData(CustID).then(function(response) {
                if (commonFactory.checkvals(response.data)) {
                    var AboutData = (response.data).split(';');
                    model.lblaboutUrself = (AboutData[0].split(':'))[1];
                    model.AboutReviewStatusID = (AboutData[1].split(':'))[1];
                }
            });

        };
        model.custdatapageload = function() {
            editEducationService.getCustomerData(CustID).then(function(response) {
                model.CustomerDataArr = response.data !== undefined && response.data.length > 0 ? JSON.parse(response.data) : [];
                model.custEmpLastModificationDate = model.CustomerDataArr[0].EmpLastModificationDate;
                console.log('custdata');
                console.log(model.CustomerDataArr);
            });
        };

        model.showpopup = function(type, item) {
            isSubmit = true;
            model.eventType = 'add';
            switch (type) {
                case 'showEduModal':

                    model.popupdata = model.Education;
                    model.popupHeader = 'Education Details';
                    model.EducationID = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.eduGroupArr = commonFactory.checkvals(item.EducationCategoryID) ? commonFactory.educationGroupBind(item.EducationCategoryID) : [];
                        model.eduSpecialisationArr = commonFactory.checkvals(item.EducationGroupID) ? commonFactory.educationSpeciakisationBind(item.EducationGroupID) : [];
                        model.IsHighestDegreeId = item.EduHighestDegree;
                        model.EduCatgoryId = commonFactory.checkvals(item.EducationCategoryID) ? parseInt(item.EducationCategoryID) : null;
                        model.EdugroupId = item.EducationGroupID;
                        model.EduspecializationId = item.EducationSpecializationID;
                        model.universityId = item.EduUniversity;
                        model.collegeId = item.EduCollege;
                        model.passOfyear = commonFactory.checkvals(item.EduPassOfYear) ? parseInt(item.EduPassOfYear) : null;
                        model.countryId = item.CountryID;
                        model.stateId = item.StateID;
                        model.districtId = item.DistrictID;
                        model.cityId = item.CityID;
                        model.txtcity = "";
                        model.Edumerits = item.Educationdesc;
                        model.intCusID = item.intCusID;
                        model.EducationID = item.EducationID;
                    }

                    commonFactory.open('EduModalContent.html', model.scope, uibModal);
                    break;

                case 'showProfModal':
                    model.popupdata = model.profession;
                    model.popupHeader = 'Profession details';

                    model.profObj.Cust_Profession_ID = null;
                    model.profObj = {};
                    if (item !== undefined) {

                        model.ProfSpecialisationArr = commonFactory.professionBind(item.ProfessionGroupID);

                        model.profObj.intCusID = item.intCusID;
                        model.profObj.ddlemployedin = item.ProfessionCategoryID;
                        model.profObj.ddlprofgroup = item.ProfessionGroupID;
                        model.profObj.ddlprofession = item.ProfessionID;
                        model.profObj.txtcmpyname = item.CompanyName;
                        model.profObj.txtsalary = item.Salary;

                        model.profObj.ddlcurreny = item.SalaryCurrency;
                        model.profObj.ddlCountryProf = item.CountryID;
                        model.profObj.ddlStateProf = item.StateID;
                        model.profObj.ddlDistrictProf = item.DistrictID;
                        model.profObj.ddlcityworkingprofession = item.CityID;
                        model.profObj.txtcityprofession = item.CityWorkingIn;
                        model.profObj.txtworkingfrom = commonFactory.convertDateFormat(item.WorkingFromDate, 'DD-MM-YYYY');
                        model.profObj.ddlvisastatus = item.VisaTypeID;
                        model.profObj.txtssincedate = commonFactory.convertDateFormat(item.ResidingSince, 'DD-MM-YYYY');
                        model.profObj.txtarrivaldate = commonFactory.convertDateFormat(item.ArrivingDate, 'DD-MM-YYYY');
                        model.profObj.txtdeparture = commonFactory.convertDateFormat(item.DepartureDate, 'DD-MM-YYYY');
                        model.profObj.txtoccupation = item.OccupationDetails;
                        model.profObj.Cust_Profession_ID = item.Cust_Profession_ID;
                    }

                    commonFactory.open('profModalContent.html', model.scope, uibModal);
                    break;

                case 'showAboutModal':

                    if (item !== undefined) {
                        model.aboutObj.txtAboutUS = item;
                    }
                    commonFactory.open('AboutModalContent.html', model.scope, uibModal);
                    break;

                case 'custData':
                    if (item !== undefined) {
                        model.subcasteArr = commonFactory.subCaste(item.CasteID);
                        model.custObj.rdlGender = item.GenderID;
                        model.custObj.txtSurName = item.LastName;
                        model.custObj.txtName = item.FirstName;
                        model.custObj.dropmaritalstatus = item.MaritalStatusID;
                        model.custObj.txtdobcandidate = commonFactory.convertDateFormat(item.DateofBirthwithoutAge, 'DD-MM-YYYY');
                        model.custObj.ddlHeightpersonal = item.HeightID;
                        model.custObj.ddlcomplexion = item.ComplexionID;
                        model.custObj.ddlreligioncandadate = item.ReligionID;
                        model.custObj.ddlmothertongue = item.MotherTongueID;
                        model.custObj.ddlcaste = item.CasteID;
                        model.custObj.ddlsubcaste = item.SubCasteID;
                        model.custObj.ddlBornCitizenship = item.CitizenshipID;
                        model.custObj.rdlPhysicalStatus = item.PhysicalStatusID;

                    }
                    commonFactory.open('CustomerDataContent.html', model.scope, uibModal);
                    break;
            }

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.ProfchangeBind = function(type, parentval) {
            switch (type) {

                case 'ProfessionGroup':
                    model.ProfSpecialisationArr = commonFactory.professionBind(parentval);
                    model.profObj.ddlprofession = "";
                    break;
            }
        };

        model.changeBind = function(type, parentval) {

            if (commonFactory.checkvals(parentval)) {

                switch (type) {
                    case 'caste':

                        model.subcasteArr = commonFactory.subCaste(parentval);

                        break;
                }
            }
        };

        model.updateData = function(inObj, type) {

            if (isSubmit) {
                isSubmit = false;
                switch (type) {
                    case 'Education Details':
                        inObj.customerEducation.Cust_Education_ID = model.EducationID;
                        inObj.customerEducation.intEduID = model.EducationID;
                        inObj.customerEducation.CustID = model.CustID;

                        model.submitPromise = editEducationService.submitEducationData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.eduPageload();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Education Details submitted Succesfully', 4500);
                                if (model.datagetInStatus === 1) {
                                    sessionStorage.removeItem('missingStatus');
                                    route.go('mobileverf', {});
                                }
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Education Details Updation failed', 4500);
                            }
                        });
                        break;
                }
            }
        };

        model.ProfSubmit = function(objitem) {

            if (isSubmit) {
                isSubmit = false;
                model.myprofData = {
                    customerProfession: {
                        CustID: CustID,
                        EmployedIn: objitem.ddlemployedin,
                        Professionalgroup: objitem.ddlprofgroup,
                        Profession: objitem.ddlprofession,
                        Companyname: objitem.txtcmpyname,
                        Currency: objitem.ddlcurreny,
                        Monthlysalary: objitem.txtsalary,
                        CountryID: objitem.ddlCountryProf,
                        StateID: objitem.ddlStateProf,
                        DistrictID: objitem.ddlDistrictProf,
                        CityID: objitem.ddlcityworkingprofession,
                        OtherCity: objitem.txtcityprofession,
                        Workingfromdate: filter('date')(objitem.txtworkingfrom, 'yyyy-MM-dd'),
                        OccupationDetails: objitem.txtoccupation,
                        visastatus: objitem.ddlvisastatus,
                        Sincedate: objitem.txtssincedate !== '' && objitem.txtssincedate !== 'Invalid date' ? filter('date')(objitem.txtssincedate, 'yyyy-MM-dd') : null,
                        ArrivalDate: objitem.txtarrivaldate !== '' && objitem.txtarrivaldate !== 'Invalid date' ? filter('date')(objitem.txtarrivaldate, 'yyyy-MM-dd') : null,
                        DepartureDate: objitem.txtdeparture !== '' && objitem.txtdeparture !== 'Invalid date' ? filter('date')(objitem.txtdeparture, 'yyyy-MM-dd') : null,
                        profGridID: model.profObj.Cust_Profession_ID,
                        ProfessionID: model.profObj.Cust_Profession_ID,
                    },
                    customerpersonaldetails: {
                        intCusID: CustID,
                        EmpID: loginEmpid,
                        Admin: AdminID
                    }
                };

                model.submitPromise = editEducationService.submitProfessionData(model.myprofData).then(function(response) {

                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.ProfPageload();
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Professional Details  submitted Succesfully', 4500);
                        if (scope.datagetInStatus === 1) {
                            sessionStorage.removeItem('missingStatus');
                            route.go('mobileverf', {});
                        }

                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Professional Details  Updation failed', 4500);
                    }
                });
            }
        };

        model.AboutUrselfSubmit = function(obj) {
            if (isSubmit) {
                isSubmit = false;
                model.submitPromise = editEducationService.submitAboutUrData({ CustID: CustID, AboutYourself: obj.txtAboutUS, flag: 1 }).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === '1') {
                        model.aboutPageload();
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'About Yourself submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'About Yourself Updation failed', 4500);
                    }
                });
            }

        };

        model.DeleteEduPopup = function(id) {
            model.educationID = id;
            commonFactory.open('deleteEduContent.html', model.scope, uibModal, 'sm');
        };

        model.deleteEduSubmit = function() {
            SelectBindService.DeleteSection({ sectioname: 'Education', CustID: CustID, identityid: model.educationID }).then(function(response) {
                console.log(response);
                model.eduPageload();
                commonFactory.closepopup();
            });
        };

        model.custdataSubmit = function(obj) {

            model.custData = {
                GetDetails: {
                    CustID: CustID,
                    MaritalStatusID: obj.dropmaritalstatus,
                    DateofBirth: obj.txtdobcandidate !== '' && obj.txtdobcandidate !== 'Invalid date' ? filter('date')(obj.txtdobcandidate, 'MM/dd/yyyy hh:mm:ss a') : null,
                    HeightID: obj.ddlHeightpersonal,
                    ComplexionID: obj.ddlcomplexion,
                    ReligionID: obj.ddlreligioncandadate,
                    MotherTongueID: obj.ddlmothertongue,
                    CasteID: obj.ddlcaste,
                    CitizenshipID: obj.ddlBornCitizenship,
                    SubcasteID: obj.ddlsubcaste,
                    LastName: obj.txtSurName,
                    FirstName: obj.txtName,
                    Gender: obj.rdlGender,
                    PhysicallyChallenged: obj.rdlPhysicalStatus
                },
                customerpersonaldetails: {
                    intCusID: CustID,
                    EmpID: loginEmpid,
                    Admin: AdminID
                }
            };

            editEducationService.submitCustomerData(model.custData).then(function(response) {
                console.log(response);
                commonFactory.closepopup();

                if (response.data === 1) {
                    model.custdatapageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Customer Personal Details submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Customer Personal Details Updation failed', 4500);
                }
            });


        };

        //performance code
        model.Education = [
            { lblname: 'Is Highest Degree', controlType: 'radio', ngmodel: 'IsHighestDegreeId', required: true, arrbind: 'boolType', parameterValue: 'Highestdegree' },
            { lblname: 'Education category', controlType: 'select', ngmodel: 'EduCatgoryId', required: true, typeofdata: 'educationcategory', parameterValue: 'Educationcategory', childName: 'EducationGroup', changeApi: 'EducationGroup' },
            { lblname: 'Education group', controlType: 'Changeselect', ngmodel: 'EdugroupId', required: true, parentName: 'EducationGroup', parameterValue: 'Educationgroup', changeApi: 'EducationSpecialisation', childName: 'EducationSpecialisation' },
            { lblname: 'Edu specialization', controlType: 'Changeselect', ngmodel: 'EduspecializationId', required: true, parentName: 'EducationSpecialisation', parameterValue: 'EducationSpecialization' },
            { lblname: 'University', controlType: 'textbox', ngmodel: 'universityId', parameterValue: 'University' },
            { lblname: 'College', controlType: 'textbox', ngmodel: 'collegeId', parameterValue: 'College' },
            { lblname: 'Pass of year', controlType: 'select', ngmodel: 'passOfyear', typeofdata: 'passOfYear', parameterValue: 'Passofyear' },
            {
                lblname: 'country',
                controlType: 'country',
                countryshow: true,
                cityshow: true,
                othercity: true,
                dcountry: 'countryId',
                dstate: 'stateId',
                ddistrict: 'districtId',
                dcity: 'cityId',
                strothercity: 'txtcity',
                countryParameterValue: 'Countrystudyin',
                stateParameterValue: 'Statestudyin',
                districtParameterValue: 'Districtstudyin',
                cityParameterValue: 'CitystudyIn',
                cityotherParameterValue: 'OtherCity'
            },
            {
                lblname: 'Educational merits',
                controlType: 'textarea',
                ngmodel: 'Edumerits',
                parameterValue: 'Educationalmerits'
            }

        ];




        model.profession = [
            { lblname: 'Employed In', controlType: 'select', ngmodel: 'IsHighestDegreeId', required: true, arrbind: 'boolType', parameterValue: 'Highestdegree' },
            { lblname: 'Professional group', controlType: 'select', ngmodel: 'EduCatgoryId', required: true, typeofdata: 'educationcategory', parameterValue: 'Educationcategory', childName: 'EducationGroup', changeApi: 'EducationGroup' },
            { lblname: 'Profession', controlType: 'Changeselect', ngmodel: 'EdugroupId', required: true, parentName: 'EducationGroup', parameterValue: 'Educationgroup', changeApi: 'EducationSpecialisation', childName: 'EducationSpecialisation' },
            { lblname: 'Company name', controlType: 'textbox', ngmodel: 'EduspecializationId', required: true, parentName: 'EducationSpecialisation', parameterValue: 'EducationSpecialization' },
            { lblname: 'Monthly salary', controlType: 'textboxSelect', ngmodel: 'universityId', parameterValue: 'University' },
            {
                controlType: 'country',
                countryshow: true,
                cityshow: true,
                othercity: true,
                dcountry: 'profCountryId',
                dstate: 'profStateId',
                ddistrict: 'profDistrictId',
                dcity: 'profCityId',
                strothercity: 'profTxtcity',
                // countryParameterValue: 'Countrystudyin',
                // stateParameterValue: 'Statestudyin',
                // districtParameterValue: 'Districtstudyin',
                // cityParameterValue: 'CitystudyIn',
                // cityotherParameterValue: 'OtherCity'
            },
            {
                lblname: 'Educational merits',
                controlType: 'textarea',
                ngmodel: 'Edumerits',
                parameterValue: 'Educationalmerits'
            }

        ];




        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editEducationModel', factory);

    factory.$inject = ['$http', 'authSvc', 'editEducationService', 'commonFactory', '$uibModal', '$filter', 'alert', '$stateParams', 'SelectBindService', 'arrayConstantsEdit'];

})(angular);