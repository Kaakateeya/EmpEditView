(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .directive('customDatepickeredit', directive);

    function directive() {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                ngModel: '=',
                dateOptions: "=",
                placeholder: "=",
                id: "=",
                ngClass: "="
            },
            template: '<input id="{{id}}" style="width:96%;" ng-class="ngClass"  placeholder="{{placeholder}}" type="text" ui-date-format="dd/MM/yyyy" class="datepicker3 form-control" ng-model="ngModel" ui-date="dateOptions"/>'
        };
        return directive;

        function link(scope, element, attrs) {

            //  if (scope.strdate !== '' && scope.strdate !== undefined && scope.strdate !== null)
            // scope.strdate = new Date(scope.strdate);
        }
    }

})();