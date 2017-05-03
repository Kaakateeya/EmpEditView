(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .factory('popupSvc', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            editSubmit: function(apiname, obj) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/' + apiname, JSON.stringify(obj));
            }
        }
    }
})();