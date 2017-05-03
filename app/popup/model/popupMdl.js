(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .factory('popupmdl', factory)

    factory.$inject = ['$http'];

    function factory($http) {
        var model = {};

        scope.model = {};
        scope.openModel = function() {
            commonFactory.open('popup.html', scope, uibModal);
        };
        // scope.model.education.updateData = function(response) {
        //     //call back functuon after submitting api in edit view popup
        // };
        // scope.model.profession.updateData = function(response) {
        //     //call back functuon after submitting api in edit view popup
        // };
        scope.model.mainArray = { popupHeader: 'Education Details', formName: 'eduform', apiPath: '' };
        //parameterValue =name for sending in submit object
        scope.model.popupdata = [
            { lblname: 'Is Highest Degree', controlType: 'radio', ngmodel: 'IsHighestDegreeId', required: true, arrbind: 'boolType', parameterValue: 'IsHighestDegree' },
            { lblname: 'Education category', typeofdata: 'educationcategory', controlType: 'select', ngmodel: 'EduCatgoryId', required: true, parameterValue: 'EduCatgory', method: 'dllChange', childName: 'EducationGroup', changeApi: 'EducationGroup' },
            { lblname: 'Education group', parentName: 'EducationGroup', controlType: 'Changeselect', ngmodel: 'EdugroupId', required: true, parameterValue: 'EdugroupId', changeApi: 'EducationSpecialisation' },
            { lblname: 'Edu specialization', controlType: 'select', ngmodel: 'EduspecializationId', required: true, childArrar: 'height', parameterValue: 'Eduspecialization' },
            { lblname: 'University', controlType: 'textbox', ngmodel: 'universityId', parameterValue: 'university' },
            { lblname: 'College', controlType: 'textbox', ngmodel: 'collegeId', parameterValue: 'college' },
            { lblname: 'Pass of year', controlType: 'select', ngmodel: 'passOfyear', childArrar: 'height', parameterValue: 'passOfyear' },
            {
                lblname: 'country',
                controlType: 'country',
                countryshow: 'countryshow',
                cityshow: 'cityshow',
                othercity: 'othercity',
                dcountry: 'ddlCountry',
                dstate: 'ddlState',
                ddistrict: 'ddlDistrict',
                dcity: 'ddlcity',
                strothercity: 'txtcity',
                countryParameterValue: 'country',
                stateParameterValue: 'state',
                districtParameterValue: 'district',
                cityParameterValue: 'city',
                cityotherParameterValue: 'cityother'
            },
            {
                lblname: 'Educational merits',
                controlType: 'textarea',
                ngmodel: 'Edumerits',
                parameterValue: 'Edumerits'
            }

        ];
        scope.model.profession = [];
    }
})();