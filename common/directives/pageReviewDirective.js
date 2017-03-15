(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .directive('pageReview', directive);

    directive.$inject = ['commonFactory', '$uibModal', 'baseService'];

    function directive(commonFactory, uibModal, baseService) {

        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                sectionid: '=',
                dispalyName: '=',
                custid: '='
            },
            template: "<div class='employee_review_check clearfix' ng-show='showChk'>" +
                "<md-checkbox ng-model='val' page-Review style='padding: 9px 13px 0px 0px;' ng-change='reviewonchange(val);' class='pull-right' name='chkboxedu' ><span style='color: black;'>Review</span>" +
                "</md-checkbox>" +
                "<div class='clearfix'></div>" +
                "</div>",
        };
        return directive;

        function link(scope, element, attrs) {
            scope.showChk = true;
            scope.reviewonchange = function(booltype) {

                if (booltype === true) {
                    scope.reviewdisplay = scope.dispalyName;
                    commonFactory.open('common/templates/reviewConfirmationPopup.html', scope, uibModal, 'sm');

                }
            };

            scope.reviewSubmit = function() {
                baseService.menuReviewstatus(scope.custid, '1', scope.sectionid).then(function(response) {

                    if (response.data != undefined && response.data.length > 0) {
                        if (JSON.parse(response.data[0])[0].Status === 1) {
                            commonFactory.closepopup();
                            scope.showChk = false;
                        }
                    }
                });
            };
            scope.cancel = function() {
                commonFactory.closepopup();
            };

        }
    }

})();