(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .directive('pageReview', directive);

    directive.$inject = ['commonFactory', '$uibModal', 'baseService', 'baseModel', 'authSvc'];

    function directive(commonFactory, uibModal, baseService, baseModel, authSvc) {
        var model = baseModel;
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
            var AdminID = authSvc.isAdmin();
            scope.showChk = false;
            scope.reviewonchange = function(booltype) {
                model.lnkeducationandprofReview = '';
                if (booltype === true) {
                    scope.reviewdisplay = scope.dispalyName;
                    commonFactory.open('common/templates/reviewConfirmationPopup.html', scope, uibModal, 'sm');

                }
            };

            scope.reviewSubmit = function() {
                baseService.menuReviewstatus(scope.custid, '1', scope.sectionid).then(function(response) {

                    if (response.data != undefined && response.data.length > 0) {
                        if (JSON.parse(response.data[0])[0].STATUS === 1) {
                            commonFactory.closepopup();
                            scope.showChk = false;
                            baseService.menuReviewstatus(scope.custid, '0', '').then(function(response) {
                                debugger;
                                model.lnkparentsReview = model.lnksiblingsReview = model.lnkrelativesReview = model.lnkeducationandprofReview = model.lnkpartnerReview = model.lnkastroReview = model.lnkreferenceReview = model.lnkpropertyReview = '';
                                model.menuReviewdata = JSON.parse(response.data);
                                _.each(model.menuReviewdata, function(item) {
                                    var SectionID = item.SectionID;
                                    if (SectionID === 11 || SectionID === 12 || SectionID === 13 || SectionID == 15) {
                                        model.lnkparentsReview = 'red';
                                    }
                                    if (SectionID === 14 || SectionID === 25 || SectionID === 26) {
                                        model.lnksiblingsReview = 'red';
                                    }
                                    if (SectionID === 27 || SectionID === 28 || SectionID === 32 || SectionID === 33) {
                                        model.lnkrelativesReview = 'red';
                                    }
                                    if (SectionID === 6 || SectionID === 7 || SectionID === 8) {
                                        model.lnkeducationandprofReview = 'red';
                                    }
                                    if (SectionID === 16 || SectionID === 22) {
                                        model.lnkpartnerReview = 'red';
                                    }
                                    if (SectionID === 23) {
                                        model.lnkastroReview = 'red';
                                    }
                                    if (SectionID === 29) {
                                        model.lnkreferenceReview = 'red';
                                    }
                                    if (SectionID === 34) {
                                        model.lnkpropertyReview = 'red';
                                    }
                                });
                            });
                        }
                    }
                });
            };
            scope.cancel = function() {
                commonFactory.closepopup();
            };

            if (AdminID === 1 || AdminID === '1') {
                baseService.menuReviewstatus(scope.custid, '2', scope.sectionid).then(function(response) {
                    model.revstatus = JSON.parse(response.data);
                    console.log('sectionID');
                    debugger;
                    console.log(model.revstatus);

                    _.each(model.revstatus, function(item) {
                        var SectionID = item.ReviewStatusID;
                        if (SectionID === 0) {
                            scope.showChk = true;
                        } else {
                            scope.showChk = false;
                        }
                    });
                });
            }






        }
    }

})();