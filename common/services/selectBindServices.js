(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .factory('SelectBindService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            countrySelect: function() {
                return http.get(editviewapp.apipath + 'Dependency/getCountryDependency', { params: { dependencyName: "", dependencyValue: "" } });
            },
            stateSelect: function(dependencyVal) {

                return http.get(editviewapp.apipath + 'Dependency/getCountryDependency', { params: { dependencyName: "state", dependencyValue: dependencyVal } });
            },
            districtSelect: function(dependencyVal1) {
                return http.get(editviewapp.apipath + 'Dependency/getCountryDependency', { params: { dependencyName: "distric", dependencyValue: dependencyVal1 } });
            },
            citySelect: function(dependencyVal2) {

                return http.get(editviewapp.apipath + 'Dependency/getCountryDependency', { params: { dependencyName: "city", dependencyValue: dependencyVal2 } });
            },
            EducationCatgory: function() {
                return http.get(editviewapp.apipath + 'Dependency/getEducationDependency', { params: { dependencyName: "", dependencyValue: "" } });
            },
            EducationGroup: function(dependencyVal2) {

                return http.get(editviewapp.apipath + 'Dependency/getEducationDependency', { params: { dependencyName: "educationGroup", dependencyValue: dependencyVal2 } });
            },
            EducationSpecialisation: function(dependencyVal2) {

                return http.get(editviewapp.apipath + 'Dependency/getEducationDependency', { params: { dependencyName: "educationSpeacialisation", dependencyValue: dependencyVal2 } });
            },
            ProfessionCatgory: function() {
                return http.get(editviewapp.apipath + 'Dependency/getProfessionDependency', { params: { dependencyName: "ProfessionCategory", dependencyValue: "" } });
            },
            ProfessionGroup: function() {
                return http.get(editviewapp.apipath + 'Dependency/getProfessionDependency', { params: { dependencyName: "", dependencyValue: "" } });
            },
            ProfessionSpecialisation: function(dependencyVal2) {

                return http.get(editviewapp.apipath + 'Dependency/getProfessionDependency', { params: { dependencyName: "ProfessionSpecialisation", dependencyValue: dependencyVal2 } });
            },
            casteselect: function() {

                return http.get(editviewapp.apipath + 'Dependency/getDropdown_filling_values', { params: { strDropdownname: "CasteName" } });
            },
            countryCodeselect: function() {

                return http.get(editviewapp.apipath + 'Dependency/getDropdown_filling_values', { params: { strDropdownname: "CountryCode" } });
            },
            currency: function() {

                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Currency', dependencyValue: '', dependencyflagID: '' } });
            },
            stars: function(obj) {
                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'StarType', dependencyValue: obj, dependencyflagID: '' } });
            },
            castedependency: function(obj1, obj2) {

                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Caste', dependencyValue: obj1, dependencyflagID: obj2 } });
            },
            subCasteBind: function(obj1) {

                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'SubCaste', dependencyValue: obj1, dependencyflagID: '' } });
            },
            branch: function(obj1) {

                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Region', dependencyValue: obj1, dependencyflagID: '' } });
            },
            AstroCities: function(countryName, statename) {
                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Horo', dependencyValue: countryName, dependencyflagID: statename } });
            },
            DeleteSection: function(obj) {
                console.log(JSON.stringify(obj));
                return http.get(editviewapp.apipath + 'CustomerPersonalUpdate/getCustomerSectionsDeletions', { params: { sectioname: obj.sectioname, CustID: obj.CustID, identityid: obj.identityid } });
            }

        };
    }
})();