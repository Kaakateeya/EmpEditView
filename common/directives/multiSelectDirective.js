// AngularJS: 1.3.15
// bootstrap-multiselect: 0.9.6
//var statticdata=require('./staticArrayBindings.json');

(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .directive('multiselectdropdown', directive);

    directive.$inject = ['arrayConstantsEdit', '$timeout', 'eduprofArrayModel', 'countryArrayModel', 'otherArrayModel'];

    function directive(cons, timeout, eduprofArrayModel, countryArrayModel, otherArrayModel) {

        var directive = {
            link: link,
            restrict: 'EA',
            require: 'ng-model',
            scope: {
                ngModel: '=',
                typeofdata: "=",
                parentVal: "="
            }
        };
        return directive;

        function link(scope, element, attrs) {
            scope.options = [];
            var profmodel = eduprofArrayModel,
                countrymodel = countryArrayModel,
                othermodel = otherArrayModel;
            scope.databind = function(data) {
                timeout(function() {
                    scope.status = 'multiple' in attrs;
                    if (scope.status === true && data[0] !== undefined && angular.lowercase(data[0].title) === '--select--') {
                        data.splice(0, 1);
                    }
                    element.multiselect('dataprovider', data);
                }, 500);
            };
            timeout(function() {
                element.multiselect('select', scope.ngModel);

            }, 500);
            timeout(function() {
                switch (scope.typeofdata) {
                    case 'MaritalStatus':
                        scope.databind(cons.MaritalStatus);
                        break;
                    case 'height':
                        scope.databind(cons.height);
                        break;
                    case 'Religion':
                        scope.databind(cons.Religion);
                        break;
                    case 'Mothertongue':
                        scope.databind(cons.Mothertongue);
                        break;
                    case 'Mothertongueselect':
                        scope.databind(cons.Mothertongueselect);
                        break;
                    case 'educationcategory':
                        scope.databind(cons.educationcategory);
                        break;
                    case 'visastatus':
                        scope.databind(cons.visastatus);
                        break;
                    case 'stars':
                        scope.databind(cons.stars);
                        break;
                    case 'region':
                        scope.databind(cons.region);
                        break;
                    case 'bodyType':
                        scope.databind(cons.bodyType);
                        break;
                    case 'bloodGroup':
                        scope.databind(cons.bloodGroup);
                        break;
                    case 'healthCondition':
                        scope.databind(cons.healthCondition);
                        break;
                    case 'starLanguage':
                        scope.databind(cons.starLanguage);
                        break;
                    case 'lagnam':
                        scope.databind(cons.lagnam);
                        break;
                    case 'ZodaicSign':
                        scope.databind(cons.ZodaicSign);
                        break;
                    case 'paadam':
                        scope.databind(cons.paadam);
                        break;
                    case 'familyStatus':
                        scope.databind(cons.familyStatus);
                        break;
                    case 'RelationshipType':
                        scope.databind(cons.RelationshipType);
                        break;
                    case "childStayingWith":
                        scope.databind(cons.childStayingWith);
                        break;
                    case 'hereabout':
                        scope.databind(cons.hereabout);
                        break;
                    case 'improveourwebsite':
                        scope.databind(cons.improveourwebsite);
                        break;
                    case 'prices':
                        scope.databind(cons.prices);
                        break;
                    case 'downloadtime':
                        scope.databind(cons.downloadtime);
                        break;
                    case 'yourratethesearch':
                        scope.databind(cons.yourratethesearch);
                        break;
                    case 'comparesites':
                        scope.databind(cons.comparesites);
                        break;
                    case 'recomendedtofriends':
                        scope.databind(cons.recomendedtofriends);
                        break;

                    case 'newProfessionCatgory':
                        scope.databind(cons.newProfessionCatgory);
                        break;
                    case 'gradeSelection':
                        scope.databind(cons.gradeSelection);
                        break;
                    case 'Country':
                        scope.databind(countrymodel.Country);
                        break;
                    case 'ProfCatgory':

                        scope.databind(profmodel.ProfCatgory);
                        break;

                    case 'ProfGroup':
                        scope.databind(profmodel.ProfGroup);
                        break;

                    case 'indiaStates':
                        scope.databind(countrymodel.IndiaStates);
                        break;

                    case 'countryCode':
                        scope.databind(countrymodel.countryCode);
                        break;

                    case 'caste':
                    case 'Caste':
                        scope.databind(othermodel.caste);
                        break;

                    case 'currency':
                        scope.databind(countrymodel.currency);
                        break;

                    case 'catgory':
                        scope.databind(cons.catgory);
                        break;

                    case 'Priority':
                        scope.databind(cons.Priority);
                        break;
                    case 'Age':
                    case 'Ageselect':
                        var test = [];
                        test.push({ label: "--select--", title: "--select--", value: "0" });
                        for (var i = 18; i < 78; i++) {
                            if (scope.typeofdata === "Ageselect") {
                                test.push({ "label": i + ' years', "title": i + ' years', "value": i });
                            } else {
                                test.push({ "label": i, "title": i, "value": i });
                            }
                        }
                        scope.databind(test);
                        break;

                    case "Complexion":
                        scope.databind(cons.Complexion);
                        break;
                }
            }, 1000);
            element.multiselect({
                buttonClass: 'btn',
                buttonWidth: 'auto',
                inheritClass: true,
                includeSelectAllOption: true,
                disableIfEmpty: true,
                nonSelectedText: 'Any',
                allSelectedText: 'All Selected',
                selectAllText: 'Check all!',
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                filterPlaceholder: 'Type To Search',
                buttonContainer: '<div class="btn-group" />',
                maxHeight: false
            });

            scope.$watch(function() {
                return element[0].length;
            }, function() {
                scope.$applyAsync(element.multiselect('rebuild'));
                element.multiselect('select', scope.ngModel);
            });
            // Watch for any changes from outside the directive and refresh
            scope.$watch(attrs.ngModel, function() {
                element.multiselect('refresh');
            });


        }
    }

})();