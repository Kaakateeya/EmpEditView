(function(angular) {
    'use strict';


    function factory(baseService, authSvc, uibModal, commonFactory, stateParams, filter) {
        var model = {};
        // var logincustid = authSvc.getCustId();
        var CustID = stateParams.CustID;
        model.lnkeducationandprofReview = false;
        model.scope = {};
        model.init = function() {
            model.unreviewedLinks();
            model.menuItem();
            baseService.personalDetails(CustID).then(function(response) {
                debugger;
                model.PersonalObj = response.data;
                // model.imgsrc = authSvc.getprofilepic();

                console.log(response.data);

                if (model.PersonalObj != null && model.PersonalObj != undefined) {
                    baseService.nodatastatus(model.PersonalObj.ProfileID).then(function(res) {
                        model.rev = res.data;
                        console.log(model.rev);
                    });
                }
            });


            return model;
        };

        model.unreviewedLinks = function() {
            baseService.menuReviewstatus(CustID, '0', '').then(function(response) {

                model.menuReviewdata = JSON.parse(response.data);
                _.each(model.menuReviewdata, function(item) {
                    var SectionID = item.SectionID;

                    if (SectionID === 11 || SectionID === 12 || SectionID === 13 || SectionID == 15) {
                        model.lnkparentsReview = true;
                    }
                    if (SectionID === 14 || SectionID === 25 || SectionID === 26) {
                        model.lnksiblingsReview = true;
                    }
                    if (SectionID === 27 || SectionID === 28 || SectionID === 32 || SectionID === 33) {
                        model.lnkrelativesReview = true;
                    }
                    if (SectionID === 6 || SectionID === 7 || SectionID === 8) {
                        model.lnkeducationandprofReview = true;
                    }
                    if (SectionID === 16 || SectionID === 22) {
                        model.lnkpartnerReview = true;
                    }
                    if (SectionID === 23) {
                        model.lnkastroReview = true;
                    }
                    if (SectionID === 29) {
                        model.lnkreferenceReview = true;
                    }
                    if (SectionID === 34) {
                        model.lnkpropertyReview = true;
                    }
                });
            });
        };

        model.menuItem = function() {
            baseService.menudata(CustID).then(function(response) {

                model.branchdata = JSON.parse(response.data)[0];
                model.registrationdate = filter('date')(model.branchdata.RegistrationDate, 'dd-MM-yyyy hh:mm:ss');
                console.log(model.branchdata);
                model.strCon = model.branchdata.HighConfendential == 1 && model.branchdata.IsConfidential == true ? ",SC" : (model.branchdata.HighConfendential == 1 ? ",SC" : (model.branchdata.IsConfidential == true ? ",C" : null));

            });
        };



        model.photorequestAndshow = function() {

            if (model.PersonalObj.ProfilePic.indexOf('Fnoimage.jpg') !== -1 || model.PersonalObj.ProfilePic.indexOf('Mnoimage.jpg') !== -1) {
                //photo request

                baseService.PhotoRequest(model.PersonalObj.ProfileID, '2').then(function(response) {

                    if (response.data != undefined && response.data.length > 0) {

                    }
                });

            } else {

                baseService.getPhotoInfn(CustID).then(function(response) {

                    if (response.data != undefined && response.data.length > 0) {
                        model.SlideArr = [];
                        model.FPobj = JSON.parse(response.data[0]);
                        console.log(model.FPobj);
                        _.each(model.FPobj, function(item) {
                            debugger;
                            model.SlideArr.push({ FullPhotoPath: editviewapp.GlobalImgPath + "Images/ProfilePics/KMPL_" + CustID + "_Images/" + (item.PhotoName.slice(0, 4)).replace("i", "I") + "_Images/" + model.PersonalObj.ProfileID + "_FullPhoto.jpg" });
                        });

                        commonFactory.open('common/templates/Photopopup.html', model.scope, uibModal);
                    }

                });

                //photo show popup
            }


        };

        model.cancel = function() {
            commonFactory.closepopup();
        };









        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('baseModel', factory)
    factory.$inject = ['baseService', 'authSvc', '$uibModal', 'commonFactory', '$stateParams', '$filter'];

})(angular);