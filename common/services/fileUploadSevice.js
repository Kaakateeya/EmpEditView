(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .service('fileUpload', service)

    service.$inject = ['$http'];

    function service($http) {
        this.uploadFileToUrl = function(file, uploadUrl, keyname) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('keyname', keyname);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        };
    }
})();