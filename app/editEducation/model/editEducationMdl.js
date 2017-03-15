(function(angular) {
    'use strict';


    function factory($http, authSvc, editEducationService, commonFactory, uibModal, filter, alertss, baseService) {
        var model = {};
        var logincustid = authSvc.getCustId();

        model.scope = {};

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
        model.edoObj = {};
        model.aboutObj = {};
        model.custObj = {};
        model.edoObj.IsHighestDegree = '';
        var isSubmit = true;
        model.educationID = 0;
        model.CustomerDataArr = [];
        model.reviewdisplay = 'Education details';
        //end declaration block


        var CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.CustID = CustID;
        model.init = function() {
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
                if (commonFactory.checkvals(response.data)) {
                    model.educationSelectArray = response.data;
                    model.eduEmpLastModificationDate = model.educationSelectArray[0].EmpLastModificationDate;
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
            });
        };

        model.passOfYear = function(maxyr, no_year) {
            var yr = 1;
            model.passOfyearArr.push({ "label": "--select--", "title": "--select--", "value": 0 });
            for (var i = maxyr; i >= no_year; i--) {
                model.passOfyearArr.push({ "label": i, "title": i, "value": i });
                yr += 1;
            }
        };

        model.showpopup = function(type, item) {
            isSubmit = true;
            switch (type) {
                case 'showEduModal':
                    model.passOfYear(2020, 1975);
                    model.edoObj.EducationID = null;
                    model.edoObj = {};
                    if (item !== undefined) {

                        model.eduGroupArr = commonFactory.checkvals(item.EducationCategoryID) ? commonFactory.educationGroupBind(item.EducationCategoryID) : [];
                        model.eduSpecialisationArr = commonFactory.checkvals(item.EducationGroupID) ? commonFactory.educationSpeciakisationBind(item.EducationGroupID) : [];

                        model.edoObj.IsHighestDegree = item.EduHighestDegree;
                        console.log(item.EduPassOfYear);

                        model.edoObj.ddlEduCatgory = commonFactory.checkvals(item.EducationCategoryID) ? parseInt(item.EducationCategoryID) : null;
                        model.edoObj.ddlEdugroup = item.EducationGroupID;
                        model.edoObj.ddlEduspecialization = item.EducationSpecializationID;
                        model.edoObj.txtuniversity = item.EduUniversity;
                        model.edoObj.txtcollege = item.EduCollege;
                        model.edoObj.ddlpassOfyear = commonFactory.checkvals(item.EduPassOfYear) ? parseInt(item.EduPassOfYear) : null;
                        model.edoObj.ddlCountry = item.CountryID;
                        model.edoObj.ddlState = item.StateID;
                        model.edoObj.ddlDistrict = item.DistrictID;
                        model.edoObj.ddlcity = item.CityID;
                        model.edoObj.txtcity = "";
                        model.edoObj.txtEdumerits = item.Educationdesc;
                        model.edoObj.intCusID = item.intCusID;
                        model.edoObj.EducationID = item.EducationID;
                    }


                    commonFactory.open('EduModalContent.html', model.scope, uibModal);
                    break;

                case 'showProfModal':
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

            debugger;
            if (commonFactory.checkvals(parentval)) {

                switch (type) {

                    case 'EducationCatgory':

                        model.eduGroupArr = commonFactory.educationGroupBind(parentval);
                        model.edoObj.ddlEdugroup = "";

                        break;

                    case 'EducationGroup':

                        model.eduSpecialisationArr = commonFactory.educationSpeciakisationBind(parentval);
                        model.edoObj.ddlEduspecialization = "";

                        break;

                    case 'caste':

                        model.subcasteArr = commonFactory.subCaste(parentval);

                        break;
                }
            }
        };

        model.eduSubmit = function(objitem) {

            if (isSubmit) {
                isSubmit = false;
                model.myData = {
                    customerEducation: {
                        CustID: CustID,
                        Educationcategory: objitem.ddlEduCatgory,
                        Educationgroup: objitem.ddlEdugroup,
                        EducationSpecialization: objitem.ddlEduspecialization,
                        University: objitem.txtuniversity,
                        College: objitem.txtcollege,
                        Passofyear: objitem.ddlpassOfyear,
                        Countrystudyin: objitem.ddlCountry,
                        Statestudyin: objitem.ddlState,
                        Districtstudyin: objitem.ddlDistrict,
                        CitystudyIn: objitem.ddlcity,
                        OtherCity: objitem.txtcity,
                        Highestdegree: objitem.IsHighestDegree,
                        Educationalmerits: objitem.txtEdumerits,
                        Cust_Education_ID: model.edoObj.EducationID,
                        intEduID: model.edoObj.EducationID,
                    },
                    customerpersonaldetails: {
                        intCusID: CustID,
                        EmpID: null,
                        Admin: null
                    }
                };

                model.submitPromise = editEducationService.submitEducationData(model.myData).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.eduPageload();
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
                        EmpID: null,
                        Admin: null
                    }
                };

                model.submitPromise = editEducationService.submitProfessionData(model.myprofData).then(function(response) {

                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.ProfPageload();

                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                        if (scope.datagetInStatus === 1) {
                            sessionStorage.removeItem('missingStatus');
                            route.go('mobileverf', {});
                        }

                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
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
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });
            }

        };

        model.DeleteEduPopup = function(id) {
            model.educationID = id;
            commonFactory.open('deleteEduContent.html', model.scope, uibModal, 'sm');
        };

        model.deleteEduSubmit = function() {
            editEducationService.DeleteSection({ sectioname: 'Education', CustID: CustID, identityid: model.educationID }).then(function(response) {
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
                    Gender: obj.rdlGender
                },
                customerpersonaldetails: {
                    intCusID: CustID,
                    EmpID: null,
                    Admin: null
                }
            };

            editEducationService.submitCustomerData(model.custData).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                model.custdatapageload();
            });


        };


        // model.reviewonchange = function(booltype) {
        //     if (booltype === true)
        //         commonFactory.open('common/templates/reviewConfirmationPopup.html', model.scope, uibModal, 'sm');
        // };


        // model.reviewSubmit = function() {
        //     baseService.menuReviewstatus(CustID, '1', '6,7,8').then(function(response) {
        //         console.log(response.data);
        //     });
        // };


        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editEducationModel', factory)

    factory.$inject = ['$http', 'authSvc', 'editEducationService', 'commonFactory', '$uibModal', '$filter', 'alert', 'baseService'];

})(angular);