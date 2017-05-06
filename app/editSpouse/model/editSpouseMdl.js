(function(angular) {
    'use strict';


    function factory(editSpouseService, authSvc, alertss, commonFactory, uibModal, filter, stateParams) {
        var model = {};
        model.scope = {};
        // var logincustid = authSvc.getCustId();
        var custID = stateParams.CustID;
        //  logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.spouseArray = [];
        model.ChildArray = [];
        model.spouObj = {};
        model.childObj = {};
        model.noofChldrenAray = commonFactory.numbersBind('', 0, 10);
        model.childCount = 0;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        model.init = function() {
            custID = stateParams.CustID;
            model.pageload();
            return model;
        };

        model.pageload = function() {
            editSpouseService.getSpouseData(custID).then(function(response) {
                if (response.data.length > 0) {
                    model.spouseArray = response.data[0].length > 0 ? JSON.parse(response.data[0]) : [];
                    model.ChildArray = response.data[1].length > 0 ? JSON.parse(response.data[1]) : [];

                    model.childCount = response.data !== undefined && response.data[0].length > 0 && (JSON.parse(response.data[0])).length > 0 ? (JSON.parse(response.data[0]))[0].NoOfChildrens : [];

                    console.log(model.spouseArray);
                    console.log(model.ChildArray);
                }
            });
        };

        model.populatepopup = function(type, item) {
            model.eventType = 'add';
            switch (type) {

                case 'Spouse':
                    model.popupdata = model.spouse;
                    model.popupHeader = 'Spouse Details';
                    model.Cust_Spouse_ID = null;
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.Cust_Spouse_ID = item.Cust_Spouse_ID;
                        model.txtSpousename = item.NAME;
                        model.txtSpoueEducation = item.EducationDetails;
                        model.txtspouseProfession = item.ProfessionDetails;
                        model.txtHouseFlatnumber = item.HouseFlatNumberID;
                        model.txtApartmentname = item.AppartmentName;
                        model.txtStreetname = item.StreetName;
                        model.txtAreaname = item.AreaName;
                        model.txtLandmark = item.LandMark;
                        model.ddlspouseCountry = item.Country;
                        model.ddlspouseState = item.STATE;
                        model.ddlspouseDistrict = item.District;
                        model.ddlspouseCity = item.City;
                        model.txtspouseZip = item.Zip;
                        model.txtMarriedon = item.MarriageDate;
                        model.txtSeparateddate = item.SeperatedDate;
                        model.rbtspousediverse = item.LeagallyDivorceID;
                        model.txtLegalDivorsedate = item.DateofLegallDivorce;
                        model.txtspousefather = item.FatherFirstName;
                        model.txtspouselastname = item.FatherLastName;
                        model.txtpreviousmarriage = item.ReasonforDivorce;
                        model.rbtnspousefamily = item.MyFamilyPlanningID;
                        model.ddlspousechidrens = item.NoOfChildrens;
                    }

                    commonFactory.open('modelContent.html', model.scope, uibModal);
                    break;

                case 'Child':
                    model.Cust_Children_ID = null;
                    model.popupdata = model.child;
                    model.popupHeader = 'Children Details';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.Cust_Children_ID = item.Cust_Children_ID;
                        model.txtchildname = item.ChildName;
                        model.rdlgenderchild = item.ChildGender;
                        model.txtdobchild = commonFactory.convertDateFormat(item.ChildDOB, 'DD-MM-YYYY');
                        model.rbtChildstayingWith = item.ChildStayingWithID;
                        model.ddlrelation = item.ChildStayingWithRelation;
                        commonFactory.open('modelContent.html', model.scope, uibModal);

                    } else if (model.childCount !== undefined && model.childCount !== null &&
                        model.childCount !== 0 && model.ChildArray.length < model.childCount) {

                        commonFactory.open('modelContent.html', model.scope, uibModal);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'cannot add more children', 4500);
                    }
                    break;
            }

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.updateData = function(inObj, type) {
            switch (type) {
                case "Spouse Details":
                    model.spouseSubmit(inObj);
                    break;
                case "Children Details":
                    model.childSubmit(inObj);
                    break;
            }
        };
        model.spouseSubmit = function(inObj) {

            inObj.GetDetails.CustID = custID;
            inObj.GetDetails.Cust_Spouse_ID = model.Cust_Spouse_ID;
            model.childCount = inObj.GetDetails.ddlspousechidrens;

            editSpouseService.submitSpouseData(inObj).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                if (response.data === 1) {
                    model.pageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Spouse Details Submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Spouse Details Updation failed', 4500);
                }

            });
        };

        model.childSubmit = function(inObj) {
            inObj.GetDetails.CustID = custID;
            inObj.GetDetails.Cust_Children_ID = model.Cust_Children_ID;
            editSpouseService.submitChildeData(inObj).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                if (response.data === 1) {
                    model.pageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Spouse Childern Details Submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Spouse Childern Details Updation failed', 4500);
                }
            });


        };
        model.spouse = [
            { lblname: 'Name', controlType: 'textbox', ngmodel: 'txtSpousename', required: true, parameterValue: 'NAME' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'txtSpoueEducation', required: true, parameterValue: 'Education' },
            { lblname: 'Profession', controlType: 'textbox', ngmodel: 'txtspouseProfession', required: true, parameterValue: 'Profession' },
            { lblname: 'House/Flat number', controlType: 'textbox', ngmodel: 'txtHouseFlatnumber', required: true, parameterValue: 'HouseFlatnumber' },
            { lblname: 'Apartment name', controlType: 'textbox', ngmodel: 'txtApartmentname', required: true, parameterValue: 'Apartmentname' },
            { lblname: 'Street name', controlType: 'textbox', ngmodel: 'txtStreetname', required: true, parameterValue: 'Streetname' },
            { lblname: 'Area name', controlType: 'textbox', ngmodel: 'txtAreaname', required: true, parameterValue: 'Areaname' },
            { lblname: 'Landmark', controlType: 'textbox', ngmodel: 'txtLandmark', required: true, parameterValue: 'Landmark' },
            {
                lblname: 'country',
                controlType: 'country',
                countryshow: true,
                cityshow: true,
                othercity: false,
                dcountry: 'ddlspouseCountry',
                dstate: 'ddlspouseState',
                ddistrict: 'ddlspouseDistrict',
                dcity: 'ddlspouseCity',
                countryParameterValue: 'Country',
                stateParameterValue: 'STATE',
                districtParameterValue: 'District',
                cityParameterValue: 'City',
            },
            { lblname: 'Zip', controlType: 'textboxNumber', ngmodel: 'txtLandmark', required: true, maxLength: 8, parameterValue: 'Zip' },
            { lblname: 'Married on', controlType: 'date', ngmodel: 'txtMarriedon', required: true, parameterValue: 'Marriedon' },
            { lblname: 'Separated date', controlType: 'date', ngmodel: 'txtSeparateddate', required: true, parameterValue: 'Separateddate' },
            { lblname: 'Legally divorced', controlType: 'radio', ngmodel: 'rbtspousediverse', arrbind: 'boolType', parameterValue: 'Legallydivorced' },
            { lblname: 'Legally Divorced date', controlType: 'date', ngmodel: 'txtLegalDivorsedate', required: true, parameterValue: 'Dateoflegaldivorce' },
            { lblname: 'Father first name', controlType: 'textbox', ngmodel: 'txtspousefather', required: true, parameterValue: 'Fatherfirstname' },
            { lblname: 'Father last name', controlType: 'textbox', ngmodel: 'txtspouselastname', required: true, parameterValue: 'Fatherlastname' },
            { lblname: 'Notes about previous marriage', controlType: 'textarea', ngmodel: 'txtpreviousmarriage', required: true, parameterValue: 'Notesaboutpreviousmarriage' },
            { lblname: 'Family planning', controlType: 'radio', ngmodel: 'rbtspousediverse', arrbind: 'boolType', parameterValue: 'Familyplanning' },
            { lblname: 'No of children', controlType: 'select', ngmodel: 'ddlspousechidrens', required: true, dataSource: model.noofChldrenAray, parameterValue: 'Noofchildren' },


        ];
        model.child = [
            { lblname: 'Name of the child', controlType: 'textbox', ngmodel: 'txtchildname', required: true, parameterValue: 'Nameofthechild' },
            { lblname: 'Gender of the child', controlType: 'radio', ngmodel: 'rdlgenderchild', ownArray: 'gender', required: true, parameterValue: 'Genderofthechild' },
            { lblname: 'DOB of the child', controlType: 'date', ngmodel: 'txtdobchild', required: true, parameterValue: 'DOB' },
            { lblname: 'Child staying with', controlType: 'radio', ngmodel: 'rbtChildstayingWith', ownArray: 'relation', required: true, parameterValue: 'Childstayingwith' },
            { lblname: 'Child staying with Relation', controlType: 'select', ngmodel: 'ddlrelation', typeofdata: 'childStayingWith', required: true, parameterValue: 'Childstayingwithrelation' },
        ];
        model.gender = [
            { "label": "Male", "title": "Male", "value": 1 },
            { "label": "Female", "title": "Female", "value": 2 }
        ];
        model.relation = [
            { "label": "Father Side", "title": "Father Side", "value": 1 },
            { "label": "Mother Side", "title": "Mother Side", "value": 2 }
        ];
        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editSpouseModel', factory);

    factory.$inject = ['editSpouseService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$filter', '$stateParams'];

})(angular);