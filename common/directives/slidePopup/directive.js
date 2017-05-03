(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .directive('slidePopup', directive);

    directive.$inject = ['commonFactory', '$uibModal', 'arrayConstantsEdit', 'SelectBindService', 'popupSvc', 'authSvc', '$stateParams'];

    function directive(commonFactory, uibModal, cons, SelectBindService, popupSvc, authSvc, stateParams) {

        var directive = {
            link: link,
            restrict: 'EA',
            transclude: true,
            scope: {
                model: '=',
                eventtype: '='
            },
            templateUrl: 'common/directives/slidePopup/index.html'
        };
        return directive;

        function link(scope, element, attrs) {
            debugger;
            var CustID = stateParams.CustID;
            var loginEmpid = authSvc.LoginEmpid();
            var AdminID = authSvc.isAdmin();
            scope.ddlChange = function(value, text, apiPath) {
                if (apiPath && value) {
                    SelectBindService[apiPath](value).then(function(res) {
                        _.map(_.where(scope.model.popupdata, { parentName: text }), function(item) {
                            var depData = [];
                            _.each(res.data, function(item) {
                                depData.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            });
                            item.dataSource = depData;
                        });
                    });
                }
            };

            _.each(scope.model.popupdata, function(item) {
                if (item.arrbind) {
                    item.dataSource = cons[item.arrbind];
                }
                if (scope.eventtype === 'add') {
                    if (item.ngmodel)
                        scope.model[item.ngmodel] = undefined;
                    else {
                        scope.model[item.dcountry] = undefined;
                        scope.model[item.dstate] = undefined;
                        scope.model[item.ddistrict] = undefined;
                        scope.model[item.dcity] = undefined;
                        scope.model[item.strothercity] = undefined;
                    }
                }
                scope.ddlChange(scope.model[item.ngmodel], item.childName, item.changeApi);
            });

            scope.model.returnString = function(str) {
                return 'dynamicForm.' + str + '.$invalid';
            };
            scope.submit = function() {
                var parameters = {};
                _.each(scope.model.popupdata, function(item) {
                    if (item.parameterValue) {
                        parameters[item.parameterValue] = scope.model[item.ngmodel];
                    } else {
                        parameters[item.countryParameterValue] = scope.model[item.dcountry];
                        parameters[item.stateParameterValue] = scope.model[item.dstate];
                        parameters[item.districtParameterValue] = scope.model[item.ddistrict];
                        parameters[item.cityParameterValue] = scope.model[item.dcity];
                        parameters[item.cityotherParameterValue] = scope.model[item.strothercity];
                    }
                });

                var inputDataObj = {
                    customerEducation: parameters,
                    customerpersonaldetails: {
                        intCusID: CustID,
                        EmpID: loginEmpid,
                        Admin: AdminID
                    }
                };

                scope.model.updateData(inputDataObj, scope.model.popupHeader);

            };
            scope.cancel = function() {
                commonFactory.closepopup();
            };
        }
    }

})();