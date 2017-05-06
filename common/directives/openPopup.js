(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .directive('openPopup', directive);

    directive.$inject = ['$window'];

    function directive($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {}
    }

})();