(function(angular) {
    'use strict';


    function factory($http, service) {
        var model = {};

        model.init = function() {
            model.casteselectf();
            return model;
        };


        model.casteselectf = function() {
            service.casteselect().then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.caste = option;
            });
        };

        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('otherArrayModel', factory)

    factory.$inject = ['$http', 'SelectBindService'];

})(angular);