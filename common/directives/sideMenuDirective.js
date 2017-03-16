(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .directive('sideMenu', directive);

    directive.$inject = [];

    function directive() {

        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                sectionid: '=',
                dispalyName: '=',
                custid: '='
            },
            templateUrl: "templates/sideMenu.html",
        };
        return directive;

        function link(scope, element, attrs) {


        }
    }

})();