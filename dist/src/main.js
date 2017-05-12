'use strict';
/**
 * Main App Creation
 */

var editviewapp = angular.module('KaakateeyaEmpEdit', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngIdle', 'ngMaterial',
    'ngMessages', 'ngAria', 'ngPassword', 'jcs-autoValidate', 'angularPromiseButtons', 'oc.lazyLoad', 'ngMdIcons', 'ui.date'
]);
editviewapp.apipath = 'http://183.82.0.58:8025/Api/';
editviewapp.apipathold = 'http://183.82.0.58:8010/Api/';
editviewapp.env = 'dev';

editviewapp.GlobalImgPath = 'http://d16o2fcjgzj2wp.cloudfront.net/';
///editviewapp.GlobalImgPathforimage = 'https://s3.ap-south-1.amazonaws.com/kaakateeyaprod/';
editviewapp.GlobalImgPathforimage = 'https://s3.ap-south-1.amazonaws.com/angularkaknew/';
editviewapp.prefixPath = 'Images/ProfilePics/';
editviewapp.S3PhotoPath = '';
editviewapp.Mnoimage = editviewapp.GlobalImgPath + "Images/customernoimages/Mnoimage.jpg";
editviewapp.Fnoimage = editviewapp.GlobalImgPath + "Images/customernoimages/Fnoimage.jpg";
editviewapp.accesspathdots = editviewapp.GlobalImgPathforimage + editviewapp.prefixPath;

editviewapp.BucketName = 'kaakateeyaprod';
editviewapp.editName = 'edit/:custId/';

editviewapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
    var states = [
        { name: 'editview', url: '', subname: [], abstract: true },
        { name: 'editview.editEducation', url: '/Education/:CustID', subname: ['common/directives/datePickerDirective.js'] },
        { name: 'editview.editManagePhoto', url: '/ManagePhoto/:CustID', subname: ['common/services/selectBindServices.js', 'common/services/fileUploadSevice.js'] },
        { name: 'editview.editParent', url: '/Parent/:CustID', subname: [] },
        { name: 'editview.editPartnerpreference', url: '/Partnerpreference/:CustID', subname: [] },
        { name: 'editview.editSibbling', url: '/Sibbling/:CustID', subname: [] },
        { name: 'editview.editAstro', url: '/Astro/:CustID', subname: ['common/services/fileUploadSevice.js', 'common/directives/fileUploadDirective.js'] },
        { name: 'editview.editProperty', url: '/Property/:CustID', subname: [] },
        { name: 'editview.editRelative', url: '/Relative/:CustID', subname: [] },
        { name: 'editview.editReference', url: '/Reference/:CustID', subname: [] },
        { name: 'editview.editSpouse', url: '/Spouse/:CustID', subname: ['common/directives/datePickerDirective.js'] },
        { name: 'editview.editContact', url: '/Contact/:CustID', subname: [] },
        { name: 'editview.editOfcePurpose', url: '/OfcePurpose/:CustID', subname: [] },
        { name: 'editview.editProfileSetting', url: '/ProfileSetting/:CustID', subname: [] },
        { name: 'editview.popup', url: '/popup', subname: [] }
    ];
    $ocLazyLoadProvider.config({
        debug: true
    });
    $urlRouterProvider.otherwise('/Education');

    _.each(states, function(item) {

        var innerView = {};
        var edititem = item.name.slice(9);
        innerView = {
            "topbar@": {
                templateUrl: "templates/topheader.html"
            },
            "lazyLoadView@": {
                templateUrl: 'app/' + edititem + '/index.html',
                controller: edititem + 'Ctrl as page'
            },

            "bottompanel@": {
                templateUrl: "templates/footer.html"
            }
        };

        $stateProvider.state(item.name, {
            url: item.url,
            views: innerView
                // resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                //     loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                //         // you can lazy load files for an existing module
                //         var edit = item.name.slice(9);
                //         if (editviewapp.env === 'dev') {
                //             return $ocLazyLoad.load(['app/' + edit + '/controller/' + edit + 'ctrl.js', 'app/' + edit + '/model/' + edit + 'Mdl.js', 'app/' + edit + '/service/' + edit + 'service.js', item.subname]);
                //         } else {
                //             return $ocLazyLoad.load(['app/' + edit + '/src/script.min.js', item.subname]);
                //         }
                //         // return $ocLazyLoad.load(['app/' + edit + '/controller/' + edit + 'ctrl.js', 'app/' + edit + '/model/' + edit + 'Mdl.js', 'app/' + edit + '/service/' + edit + 'service.js', item.subname]);
                //     }]
                // }
        });
        $locationProvider.html5Mode(true);
    });

}]);
 (function(angular) {
     'use strict';

     function controller(editAstroModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.scope = scope;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editAstroModel;
             editAstroModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editAstroCtrl', controller);

     controller.$inject = ['editAstroModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(editAstroService, authSvc, alertss, commonFactory, uibModal, fileUpload, http, stateParams) {

        var model = {};
        model.scope = {};

        // declaration part

        model.atroObj = [];
        model.generateData = [];
        model.ImageUrl = '';
        model.iframeShow = false;
        var s3obj = {};

        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        var custID = model.CustID = stateParams.CustID;


        var isSubmit = true;

        model.loginpaidstatus = authSvc.getpaidstatus();

        // end declaration part

        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.astropageload();

            return model;
        };

        model.astropageload = function() {

            editAstroService.getAstroData(stateParams.CustID).then(function(response) {

                if (commonFactory.checkvals(response.data[0])) {
                    model.AstroArr = JSON.parse(response.data[0]);
                    model.generateData = JSON.parse(response.data[1]);

                    if (commonFactory.checkvals(model.AstroArr[0] && commonFactory.checkvals(model.AstroArr[0].Horoscopeimage))) {

                        if (commonFactory.checkvals(model.AstroArr[0].Horoscopeimage) && (model.AstroArr[0].Horoscopeimage).indexOf('Horo_no') === -1) {
                            var extension = "jpg";
                            if ((model.AstroArr[0].Horoscopeimage).indexOf('.html') !== -1) {
                                extension = "html";
                            } else {
                                model.iframeShow = false;
                                extension = "jpg";
                            }

                            model.ImageUrl = editviewapp.GlobalImgPathforimage + "Images/Horoscopeimages/" + custID + "_HaroscopeImage/" + custID + "_HaroscopeImage." + extension;
                            if (extension === "html") {
                                model.iframeShow = true;
                                $('#iframe').attr('src', model.ImageUrl);
                            }
                        }
                    } else if (commonFactory.checkvals(model.generateData[0].Horoscopeimage) && (model.generateData[0].Horoscopeimage).indexOf('Horo_no') === -1) {
                        if (commonFactory.checkvals(model.generateData[0].Horoscopeimage) && (model.generateData[0].Horoscopeimage).indexOf('Horo_no') === -1) {
                            var extensn = "jpg";
                            if ((model.generateData[0].Horoscopeimage).indexOf('.html') !== -1) {
                                extensn = "html";
                            } else {
                                model.iframeShow = false;
                                extensn = "jpg";
                            }
                            model.ImageUrl = editviewapp.GlobalImgPathforimage + "Images/Horoscopeimages/" + custID + "_HaroscopeImage/" + custID + "_HaroscopeImage." + extensn;
                            if (extensn === "html") {
                                model.iframeShow = true;
                                $('#iframe').attr('src', model.ImageUrl);
                            }
                        }
                    }



                }

            });

        };

        model.populateAstro = function(item) {

            model.hrsbindArr = commonFactory.numberBindWithZeros('Hours', 0, 23);
            model.minbindArr = commonFactory.numberBindWithZeros('Minutes', 0, 59);
            model.secbindArr = commonFactory.numberBindWithZeros('Seconds', 0, 59);
            isSubmit = true;
            model.popupdata = model.astro;
            model.popupHeader = "Astro details";
            if (item !== undefined) {
                model.eventType = 'edit';
                if (item.TimeOfBirth !== undefined) {
                    model.strdot = ((item.TimeOfBirth).split(' '))[0].split(':');
                    model.ddlFromHours = parseInt(model.strdot[0]);
                    model.ddlFromMinutes = parseInt(model.strdot[1]);
                    model.ddlFromSeconds = parseInt(model.strdot[2]);
                }
                model.ddlCountryOfBirthID = item.CountryOfBirthID;
                model.ddlStateOfBirthID = item.StateOfBirthID;
                model.ddlDistrictOfBirthID = item.DistrictOfBirthID;
                model.ddlcity = item.CityOfBirthID;
                model.ddlstarlanguage = item.StarLanguageID;
                model.ddlstar = item.StarID;
                model.ddlpaadam = item.PaadamID;
                model.ddlLagnam = item.LagnamID;
                model.ddlRaasiMoonsign = item.RaasiID;
                model.txtGothramGotra = item.Gothram;
                model.txtMaternalgothram = item.MeternalGothramID;
                model.rdlkujaDosham = item.manglikID;
            }
            commonFactory.open('astroContent.html', model.scope, uibModal);


        };

        model.changeBind = function(type, parentval) {

            switch (type) {

                case 'star':

                    model.starArr = commonFactory.starBind(parentval);
                    break;
            }
        };

        model.updateData = function(inObj, type) {
            if (isSubmit) {
                isSubmit = false;
                $('#ssss').prop('disabled', true);
                inObj.GetDetails.CustID = custID;
                model.submitPromise = editAstroService.submitAstroData(inObj).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        if (model.datagetInStatus === 1) {
                            sessionStorage.removeItem('missingStatus');
                            route.go('mobileverf', {});
                        }
                        model.astropageload(custID);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Astro Details submitted Succesfully', 4500);

                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Astro Details Updation failed', 4500);
                    }
                });
            }
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.uploadGenerateHoro = function(val) {

            if (val === '0') {
                commonFactory.open('AddHoroPopup.html', model.scope, uibModal, 'sm');
            } else {
                if (model.AstroArr.length > 0) {
                    model.generateHoro();
                } else {
                    model.populateAstro();
                }

            }
        };

        model.upload = function(obj) {


            var extension = (obj.myFile.name !== '' && obj.myFile.name !== undefined && obj.myFile.name !== null) ? (obj.myFile.name.split('.'))[1] : null;
            var gifFormat = "gif, jpeg, png,jpg";

            if (typeof(obj.myFile.name) != "undefined") {

                var size = parseFloat(obj.myFile.size / 1024).toFixed(2);
                if (extension !== null && gifFormat.indexOf(angular.lowercase(extension)) === -1) {
                    alert('Your uploaded image contains an unapproved file formats.');
                } else if (size > 4 * 1024) {
                    alert('Sorry,Upload Photo Size Must Be Less than 1 mb');
                } else {
                    // var extension = ((obj.myFile.name).split('.'))[1];
                    var keyname = "Images/Horoscopeimages/" + custID + "_HaroscopeImage/" + custID + "_HaroscopeImage." + extension;

                    fileUpload.uploadFileToUrl(obj.myFile, '/photoUplad', keyname).then(function(res) {

                        if (res.status == 200) {
                            commonFactory.closepopup();
                            model.uploadData = {
                                Cust_ID: custID,
                                Horopath: '../../' + keyname,
                                ModifiedByEmpID: '',
                                VisibleToID: keyname.indexOf('html') !== -1 ? 1 : '',
                                Empid: '',
                                IsActive: keyname.indexOf('html') !== -1 ? 1 : 0,
                                i_flag: 1
                            };

                            editAstroService.uploadDeleteAstroData(model.uploadData).then(function(response) {

                                commonFactory.closepopup();

                                model.astropageload(custID);

                                model.ImageUrl = editviewapp.GlobalImgPathforimage + "Images/Horoscopeimages/" + custID + "_HaroscopeImage/" + custID + "_HaroscopeImage." + extension;
                            });
                        }
                    });

                }
            } else {
                alert("This browser does not support HTML5.");
            }
        };

        model.generateHoro = function(astrocity) {
            var check = moment((model.generateData)[0].DateOfBirth, 'YYYY/MM/DD');
            var month = check.format('M');
            var day = check.format('D');
            var year = check.format('YYYY');

            var inputobj = { customerid: custID, EmpIDQueryString: "2", intDay: day, intMonth: month, intYear: year, CityID: commonFactory.checkvals(astrocity) ? astrocity : "" };

            editAstroService.generateHoroscope(inputobj).then(function(response) {
                console.log(response);
                if (commonFactory.checkvals(response.data.AstroGeneration)) {
                    // s3obj = { Path: response.data.Path, KeyName: response.data.KeyName };
                    s3obj = { Path: 'C:\\inetpub\\wwwroot\\access\\Images\\HoroscopeImages\\91022_HaroscopeImage\\91022_HaroscopeImage.html', KeyName: response.data.KeyName };

                    window.open('' + response.data.AstroGeneration + '', '_blank');
                    commonFactory.closepopup();
                    commonFactory.open('RefreshPopup.html', model.scope, uibModal);
                } else {
                    model.AstrocityArr = commonFactory.AstroCity(model.AstroArr[0].CountryOfBirth, model.AstroArr[0].StateOfBirth);
                    commonFactory.open('AstroCityPopup.html', model.scope, uibModal);
                }
            });
        };

        model.deleteHoroImage = function() {

            var extension = "jpg";

            // if ((model.AstroArr[0].Horoscopeimage).indexOf('.html')) {
            //     extension = "html";
            // } else {
            //     extension = "jpg";
            // }
            var keynameq = "Images/Horoscopeimages/" + custID + "_HaroscopeImage/" + custID + "_HaroscopeImage." + extension;
            http.post('/photoDelete', JSON.stringify({ keyname: keynameq })).then(function(data) {

            });

            model.uploadData = {
                Cust_ID: custID,
                i_flag: 0
            };

            editAstroService.uploadDeleteAstroData(model.uploadData).then(function(response) {

                if (response.data === 1 || response.data === '1') {
                    model.astropageload(custID);
                    commonFactory.closepopup();
                    model.ImageUrl = '';
                    model.atroObj.rdlUploadGenerate = '';
                }
            });
        };
        model.shoedeletePopup = function() {
            commonFactory.open('deletehoroPopup.html', model.scope, uibModal, 'sm');
        };


        model.AstroCityChange = function(val) {
            model.generateHoro(val);
        };

        model.vewHoro = function() {

            if (model.ImageUrl !== null && model.ImageUrl !== '' && model.ImageUrl !== undefined) {
                if (model.ImageUrl.indexOf('.html') !== -1) {
                    window.open('' + model.ImageUrl + '', '_blank');
                } else {
                    commonFactory.open('AstroimagePopup.html', model.scope, uibModal);
                }
            }
        };

        model.generatedhoroS3Upload = function() {
            console.log('s3obj');
            console.log(s3obj);
            //

            // s3obj.Path = s3obj.Path.replace('C:\\inetpub\\wwwroot\\access\\', 'http:\\e.kaakateeya.com\\access\\');
            editAstroService.GenerateHoroS3(s3obj).then(function(response) {
                console.log(response);
            });
            model.astropageload(custID);
            commonFactory.closepopup();
        };

        model.astro = [{
                lblname: 'Time of Birth',
                controlType: 'astroTimeOfBirth',
                required: true,
            },
            {
                controlType: 'country',
                countryshow: true,
                cityshow: true,
                othercity: false,
                dcountry: 'ddlCountryOfBirthID',
                dstate: 'ddlStateOfBirthID',
                ddistrict: 'ddlDistrictOfBirthID',
                dcity: 'ddlcity',
                countryParameterValue: 'CountryOfBirthID',
                stateParameterValue: 'StateOfBirthID',
                districtParameterValue: 'DistrictOfBirthID',
                cityParameterValue: 'CityOfBirthID',
                require: true
            },
            { lblname: 'Star language', controlType: 'select', ngmodel: 'ddlstarlanguage', typeofdata: 'starLanguage', childName: 'star', changeApi: 'stars', parameterValue: 'Starlanguage' },
            { lblname: 'Star', controlType: 'Changeselect', ngmodel: 'ddlstar', parentName: 'star', parameterValue: 'Star' },
            { lblname: 'Paadam', controlType: 'select', ngmodel: 'ddlpaadam', typeofdata: 'paadam', parameterValue: 'Paadam' },
            { lblname: 'Lagnam', controlType: 'select', ngmodel: 'ddlLagnam', typeofdata: 'lagnam', parameterValue: 'Lagnam' },
            { lblname: 'Raasi/Moon sign', controlType: 'select', ngmodel: 'ddlRaasiMoonsign', typeofdata: 'ZodaicSign', parameterValue: 'RasiMoonsign' },
            { lblname: 'Gothram/Gotra', controlType: 'textbox', ngmodel: 'txtGothramGotra', parameterValue: 'GothramGotra' },
            { lblname: 'Maternal gothram', controlType: 'textbox', ngmodel: 'txtMaternalgothram', parameterValue: 'Maternalgothram' },
            { lblname: 'Manglik/Kuja dosham', controlType: 'radio', ngmodel: 'rdlkujaDosham', ownArray: 'Manglik', parameterValue: 'ManglikKujadosham' },

        ];
        model.Manglik = [
            { "label": "Yes", "title": "Yes", "value": 0 },
            { "label": "No", "title": "No", "value": 1 },
            { "label": "Dont't Know", "title": "Dont't Know", "value": 2 }
        ];







        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editAstroModel', factory);

    factory.$inject = ['editAstroService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'fileUpload', '$http', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getAstroData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getAstroDetailsDisplay', { params: { CustID: obj } });
            },
            submitAstroData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerAstrodetailsUpdatedetails', JSON.stringify(obj1));
            },
            uploadDeleteAstroData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/AstroDetailsUpdateDelete', JSON.stringify(obj1));
            },
            generateHoroscope: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonalUpdate/getGenerateHoroscorpe', { params: { customerid: obj.customerid, EmpIDQueryString: obj.EmpIDQueryString, intDay: obj.intDay, intMonth: obj.intMonth, intYear: obj.intYear, CityID: obj.CityID } });
            },

            GenerateHoroS3: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonalUpdate/getAstroGenerationS3Update', { params: { Path: (obj.Path), KeyName: (obj.KeyName) } });
            }

        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editAstroService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editContactModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editContactModel;
             editContactModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editContactCtrl', controller);

     controller.$inject = ['editContactModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(editContactService, authSvc, alertss, commonFactory, uibModal, stateParams) {
        var model = {};
        model.scope = {};

        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.candidateContactArr = [];
        model.candidateAddrArr = [];
        model.parentContactArr = [];
        model.SiiblingContactArr = [];
        model.relativeContactArr = [];
        model.referenceContactArr = [];

        model.candidateobj = {};
        model.sibobj = {};
        model.parentobj = {};
        model.relativeobj = {};
        model.referenceobj = {};
        model.canAddrobj = {};
        model.sibFlag = '';
        model.setrelObj = {};
        model.popupMobilenumber = '';
        model.mobileVerificationCode = "";
        model.ID = 0;
        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.pageload();
            return model;
        };

        model.pageload = function() {
            editContactService.getContactData(custID).then(function(response) {
                console.log(response);
                if (response.data.length > 0) {
                    model.candidateContactArr = response.data[0].length > 0 ? JSON.parse(response.data[0]) : [];
                    model.candidateAddrArr = response.data[1].length > 0 ? JSON.parse(response.data[1]) : [];
                    model.parentContactArr = response.data[2].length > 0 ? JSON.parse(response.data[2]) : [];
                    model.SiiblingContactArr = response.data[3].length > 0 ? JSON.parse(response.data[3]) : [];
                    model.relativeContactArr = response.data[4].length > 0 ? JSON.parse(response.data[4]) : [];
                    model.referenceContactArr = response.data[5].length > 0 ? JSON.parse(response.data[5]) : [];

                    console.log(model.candidateContactArr);
                }

            });
            model.primaryRelationSubmit(0, 0, '0');
        };

        model.commonContactSubmit = function(Icustfamiliyid, IName, IMoblieCountryCode, IMobileNumber, IMoblieCountryCode2, IMobileNumber2, ILandCountryCode,
            ILandAreaCode, ILandNumber, IEmail, ISibblingFlag) {
            model.Mobj = {
                familyID: Icustfamiliyid,
                Name: IName,
                MoblieCountryCode: IMoblieCountryCode,
                MobileNumber: IMobileNumber,
                LandCountryCode: commonFactory.checkvals(IMoblieCountryCode2) ? IMoblieCountryCode2 : commonFactory.checkvals(ILandCountryCode) ? ILandCountryCode : null,
                LandAreaCode: commonFactory.checkvals(IMobileNumber2) ? null : (commonFactory.checkvals(ILandAreaCode) ? ILandAreaCode : null),
                LandNumber: commonFactory.checkvals(IMobileNumber2) ? IMobileNumber2 : commonFactory.checkvals(ILandNumber) ? ILandNumber : null,
                Email: IEmail,
                intCusID: custID,
                EmpID: '2',
                Admin: 1,
                SibblingFlag: ISibblingFlag
            };
            editContactService.submitContactData(model.Mobj).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                if (response.data === 1) {
                    model.pageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Contact Details  submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Contact Details  Updation failed', 4500);
                }
            });
        };

        model.CandidateAddressSubmit = function(obj) {
            model.Mobj = {

                CandidateAddressID: model.canAddrobj.Custfamilyid,
                HouseFlatNum: obj.txtCandidateHouse_flat,
                Apartmentname: obj.txtCandidateApartmentName,
                Streetname: obj.txtCandidateStreetName,
                AreaName: obj.txtCandidateAreaName,
                Landmark: obj.txtCandidateLandmark,
                Country: obj.ddlCandidateCountryContact,
                State: obj.ddlCandidateStateContact,
                District: obj.ddlCandidateDistricContact,
                City: obj.txtCandidateCity,
                ZipPin: obj.txtCandidateZip_no,
                addresstype: model.canAddrobj.Addresstype,
                intCusID: custID,
                EmpID: '2',
                Admin: null

            };

            editContactService.submitContactData(model.Mobj).then(function(response) {
                console.log(response);
                commonFactory.closepopup();

                if (response.data === 1) {
                    model.pageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Contact Details submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Contact Details Updation failed', 4500);
                }

            });


        };

        model.showContactPopup = function(type, item, sibFlag) {

            switch (type) {

                case 'Candidate':
                    model.candidateobj = {};
                    if (item !== undefined) {
                        model.candidateobj.emaILcust_family_id = item.emaILcust_family_id;



                        model.candidateobj.ddlcandidateMobileCountryID = commonFactory.checkvals(item.Candidatemobilecountrycode) ? parseInt(item.Candidatemobilecountrycode) : 0;
                        model.candidateobj.txtcandidatemobilenumber = item.CandidateMobileNumber;
                        if (commonFactory.checkvals(item.Candidatelandareacode)) {

                            model.candidateobj.ddlcandidateLandLineCountry = commonFactory.checkvals(item.CandidateLandlinecountrycode) ? parseInt(item.CandidateLandlinecountrycode) : 0;
                            model.candidateobj.txtcandidateAreCode = item.Candidatelandareacode;
                            model.candidateobj.txttxtcandidateAreCodeLandNumber = item.CandidateLandlinenumber;
                        } else {
                            model.candidateobj.ddlcandidateMobileCountryID2 = commonFactory.checkvals(item.CandidateLandlinecountrycode) ? parseInt(item.CandidateLandlinecountrycode) : 0;
                            model.candidateobj.txtFBMobileNumber2 = item.CandidateLandlinenumber;
                        }
                        model.candidateobj.txtcandidateEmails = item.CandidateEmail;

                    }
                    commonFactory.open('candidateContactContent.html', model.scope, uibModal);

                    break;

                case 'sibbling':
                    model.sibFlag = sibFlag;
                    model.sibobj = {};

                    model.sibobj.SiblingemaILcust_family_id = item.SiblingemaILcust_family_id;

                    if (sibFlag === 'SelfFlag') {

                        model.sibobj.ddlSiblingmob = commonFactory.checkvals(item.Siblingmobilecountrycode) ? parseInt(item.Siblingmobilecountrycode) : 0;
                        model.sibobj.txtSiblingmob = item.Siblingmobilenumber;

                        if (commonFactory.checkvals(item.Siblinglandareacode)) {

                            model.sibobj.ddlsiblinglandcode = commonFactory.checkvals(item.SiblingLandlinecountrycode) ? parseInt(item.SiblingLandlinecountrycode) : 0;
                            model.sibobj.txtsiblinglandarea = item.Siblinglandareacode;
                            model.sibobj.txtsiblinglandnumber = item.SiblingLandlinenumber;
                        } else {
                            model.sibobj.ddlsiblingmob2 = commonFactory.checkvals(item.SiblingLandlinecountrycode) ? parseInt(item.SiblingLandlinecountrycode) : 0;
                            model.sibobj.txtsiblingmob2 = item.SiblingLandlinenumber;
                        }

                        model.sibobj.txtsiblinglemail = item.SiblingEmail;
                        model.sibobj.txtsiblingname = item.SiblingName;


                    } else {

                        model.sibobj.ddlSiblingmob = commonFactory.checkvals(item.SiblingSPousemobilecode) ? parseInt(item.SiblingSPousemobilecode) : 0;
                        model.sibobj.txtSiblingmob = item.SiblingSpousemobilenumber;

                        if (commonFactory.checkvals(item.SiblingSPouseLAndareaCode)) {

                            model.sibobj.ddlsiblinglandcode = commonFactory.checkvals(item.SiblingSPouseLandcountryCode) ? parseInt(item.SiblingSPouseLandcountryCode) : 0;
                            model.sibobj.txtsiblinglandarea = item.SiblingSPouseLAndareaCode;
                            model.sibobj.txtsiblinglandnumber = item.SiblingSPouseLandnumber;
                        } else {
                            model.sibobj.ddlsiblingmob2 = commonFactory.checkvals(item.SiblingSPouseLandcountryCode) ? parseInt(item.SiblingSPouseLandcountryCode) : 0;
                            model.sibobj.txtsiblingmob2 = item.SiblingSPouseLandnumber;
                        }

                        model.sibobj.txtsiblinglemail = item.SiblingSpouseEmail;
                        model.sibobj.txtsiblingname = item.SiblingSpouseNAme;

                    }


                    commonFactory.open('SibContactContent.html', model.scope, uibModal);

                    break;

                case 'parent':
                    model.parentobj = {};
                    model.parentobj.MotheremaILcust_family_id = item.MotheremaILcust_family_id;

                    model.parentobj.ddlcandidatefathermobcode = commonFactory.checkvals(item.mobilecountrycode) ? parseInt(item.mobilecountrycode) : 0;
                    model.parentobj.txtcandidatefathermob = item.mobilenumber;

                    if (commonFactory.checkvals(item.landareacode)) {
                        model.parentobj.ddlcandidatefathelandcode = commonFactory.checkvals(item.Landlinecountrycode) ? parseInt(item.Landlinecountrycode) : 0;
                        model.parentobj.txtcandidatefathelandareacode = item.landareacode;
                        model.parentobj.txtcandidatefathelandnumber = item.Landlinenumber;
                    } else {
                        model.parentobj.ddlcandidatefathermob2code = commonFactory.checkvals(item.Landlinecountrycode) ? parseInt(item.Landlinecountrycode) : 0;
                        model.parentobj.txtcandidatefathermob2 = item.Landlinenumber;
                    }

                    model.parentobj.txtcandidatefatheremail = item.Email;
                    model.parentobj.txtFathername = item.NAME;

                    commonFactory.open('parentContactContent.html', model.scope, uibModal);

                    break;

                case 'relative':
                    model.relativeobj = {};

                    model.relativeobj.emaILcust_family_id = item.emaILcust_family_id;


                    model.relativeobj.ddlRelativemob = commonFactory.checkvals(item.mobilecountrycode) ? parseInt(item.mobilecountrycode) : 0;
                    model.relativeobj.txtRelativemob = item.mobilenumber;

                    if (commonFactory.checkvals(item.landareacode)) {
                        model.relativeobj.ddllandRelativecode = commonFactory.checkvals(item.Landlinecountrycode) ? parseInt(item.Landlinecountrycode) : 0;
                        model.relativeobj.txtRelativeareacode = item.landareacode;
                        model.relativeobj.txtlandnumberRelative = item.Landlinenumber;
                    } else {
                        model.relativeobj.ddlRelativemob2 = commonFactory.checkvals(item.Landlinecountrycode) ? parseInt(item.Landlinecountrycode) : 0;
                        model.relativeobj.txtRelativemob2 = item.Landlinenumber;
                    }

                    model.relativeobj.txtRelativeemail = item.Email;
                    model.relativeobj.txtrelativename = item.NAME;

                    commonFactory.open('relativeContactContent.html', model.scope, uibModal);

                    break;

                case 'reference':
                    model.referenceobj = {};
                    model.referenceobj.emaILcust_family_id = item.emaILcust_family_id;

                    model.referenceobj.ddlreferencemobile = commonFactory.checkvals(item.Candidatemobilecountrycode) ? parseInt(item.Candidatemobilecountrycode) : 0;
                    model.referenceobj.txtreferencemobile = item.CandidateMobileNumber;

                    if (commonFactory.checkvals(item.Candidatelandareacode)) {
                        model.referenceobj.ddlreferencelandnumber = commonFactory.checkvals(item.CandidateLandlinecountrycode) ? parseInt(item.CandidateLandlinecountrycode) : 0;
                        model.referenceobj.txtreferenceAreCode = item.Candidatelandareacode;
                        model.referenceobj.txtreferencelandnumber = item.CandidateLandlinenumber;
                    } else {
                        model.referenceobj.ddlreferencemobile2 = commonFactory.checkvals(item.CandidateLandlinecountrycode) ? parseInt(item.CandidateLandlinecountrycode) : 0;
                        model.referenceobj.txtreferencemobile2 = item.CandidateLandlinenumber;
                    }

                    model.referenceobj.txtreferenceemail = item.CandidateEmail;
                    model.referenceobj.txtreferencename = item.CandidateName;

                    commonFactory.open('referenceContactContent.html', model.scope, uibModal);

                    break;

                case 'candidateAddr':
                    model.canAddrobj = {};
                    model.canAddrobj.Custfamilyid = item.Custfamilyid;
                    model.canAddrobj.Addresstype = item.Addresstype;
                    model.canAddrobj.txtCandidateHouse_flat = item.Flatno;
                    model.canAddrobj.txtCandidateApartmentName = item.Apartmentno;
                    model.canAddrobj.txtCandidateStreetName = item.Streetname;
                    model.canAddrobj.txtCandidateAreaName = item.Areaname;
                    model.canAddrobj.txtCandidateLandmark = item.Landmark;
                    model.canAddrobj.ddlCandidateCountryContact = item.Country;
                    model.canAddrobj.ddlCandidateStateContact = item.STATE;
                    model.canAddrobj.ddlCandidateDistricContact = item.District;
                    model.canAddrobj.txtCandidateCity = item.CityName;
                    model.canAddrobj.txtCandidateZip_no = item.ZipCode;

                    commonFactory.open('candidateAddrContent.html', model.scope, uibModal);

                    break;

            }

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.submitContactReference = function(obj) {
            model.Mobj = {

                Cust_Reference_ID: model.referenceobj.emaILcust_family_id,
                Cust_ID: custID,
                FirstName: obj.txtreferencename,
                MobileCode: obj.ddlreferencemobile,
                Number: obj.txtreferencemobile,
                CountryCode: commonFactory.checkvals(obj.ddlreferencemobile2) ? obj.ddlreferencemobile2 : commonFactory.checkvals(obj.ddlreferencelandnumber) ? obj.ddlreferencelandnumber : null,
                AreaCode: commonFactory.checkvals(obj.txtreferencemobile2) ? null : (commonFactory.checkvals(obj.txtreferenceAreCode) ? obj.txtreferenceAreCode : null),
                Landlinenumber: commonFactory.checkvals(obj.txtreferencemobile2) ? obj.txtreferencemobile2 : commonFactory.checkvals(obj.txtreferencelandnumber) ? obj.txtreferencelandnumber : null,
                Email: obj.txtreferenceemail
            };

            editContactService.submitContactReferenceData(model.Mobj).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                if (response.data === 1) {
                    model.pageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Contact Details submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Contact Details  Updation failed', 4500);
                }
            });

        };

        model.setprimaryrelationPopup = function() {
            commonFactory.open('primaryRelationContent.html', model.scope, uibModal);
        };


        model.primaryRelationSubmit = function(mob, email, flag) {
            var inObj = {
                CustID: custID,
                PrimaryMobileRel: mob,
                PrimaryEmailRel: email,
                iflage: flag
            };

            editContactService.submitPrimaryRelationData(inObj).then(function(response) {
                console.log(response);

                if (flag === '1') {
                    commonFactory.closepopup();
                    model.pageload();
                } else {
                    model.primaryRel = JSON.parse(response.data[0])[0];
                    console.log(model.primaryRel);

                    model.setrelObj.ddlPrimaryMobileRel = model.primaryRel.PrimaryMobileRel;
                    model.setrelObj.ddlPrimaryEmailRel = model.primaryRel.PrimaryEmailRel;

                }

            });

        };


        model.sendMobileCode = function(CountryID, CCode, MobileNumber, familyID) {
            model.popupMobilenumber = MobileNumber;
            model.ID = familyID;
            var inputOBj = {
                iCountryID: CountryID,
                iCCode: CCode,
                MobileNumber: MobileNumber,
                CustFamilyID: familyID
            };

            editContactService.sendMobileCode(inputOBj).then(function(response) {
                console.log(response);
                model.mobileVerificationCode = response.data;
                commonFactory.open('verifyMobileContent.html', model.scope, uibModal);
            });




        };


        model.verifymail = function() {
            editContactService.verifyEmail(custID).then(function(response) {
                console.log(response);

                if (response.data !== undefined) {
                    if (response.data === 1) {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Email verify mail send Successfully', 4500);
                    }
                }
            });
        };

        model.verifyMobCode = function(val) {
            if (val === "") {
                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Mobile verify Code', 4500);
            } else if (model.mobileVerificationCode === val) {
                editContactService.verifyMobile(model.mobileVerificationCode, model.ID).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                });
            } else {
                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please Enter Valid Verification code', 4500);
            }

        };




        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editContactModel', factory);

    factory.$inject = ['editContactService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getContactData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerPersonalContact_Details', { params: { CustID: obj } });
            },
            submitContactData: function(obj1) {
                console.log(JSON.stringify(obj1));
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerContactDetails_Update', JSON.stringify(obj1));
            },
            submitContactReferenceData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/UpdateContactdetails_Reference', JSON.stringify(obj1));
            },
            submitPrimaryRelationData: function(obj) {
                console.log(JSON.stringify(obj));

                return http.get(editviewapp.apipath + 'CustomerPersonal/getCandidateContactdetailsRelationName', {
                    params: { CustID: obj.CustID, PrimaryMobileRel: obj.PrimaryMobileRel, PrimaryEmailRel: obj.PrimaryEmailRel, iflage: obj.iflage }
                });
            },

            sendMobileCode: function(obj) {
                return http.get(editviewapp.apipath + 'StaticPages/getCustomerdmobileVerfCodesend', {
                    params: { iCountryID: obj.iCountryID, iCCode: obj.iCCode, MobileNumber: obj.MobileNumber, CustFamilyID: obj.CustFamilyID }
                });
            },
            verifyEmail: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCandidateContactsendmailtoemailverify', { params: { CustID: obj } });
            },
            verifyMobile: function(VCode, CustFamilyid) {
                return http.get(editviewapp.apipath + 'StaticPages/getCustomerEmilVerificationCodeUpdate', { params: { VerificationCode: VCode, CustFamilyID: CustFamilyid } });
            },
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editContactService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editEducationModel, scope, baseModel, window) {
         var vm = this;
         var model;
         scope.model = {};
         vm.scope = scope;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editEducationModel;
             editEducationModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editEducationCtrl', controller);

     controller.$inject = ['editEducationModel', '$scope', 'baseModel', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory($http, authSvc, editEducationService, commonFactory, uibModal, filter, alertss, stateParams, SelectBindService, arrayConstantsEdit) {
        var model = {};

        model.scope = {};
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = model.Admin = authSvc.isAdmin();
        model.Education = {};
        //start declaration block
        model.stateArr = [];
        model.districtArr = [];
        model.cityeArr = [];
        model.passOfyearArr = [];
        model.eduGroupArr = [];
        model.eduSpecialisationArr = [];
        model.ProfSpecialisationArr = [];
        model.ProfstateArr = [];
        model.ProfdistrictArr = [];
        model.ProfcityeArr = [];
        model.profObj = {};

        model.aboutObj = {};
        model.custObj = {};
        var isSubmit = true;
        model.educationID = 0;
        model.CustomerDataArr = [];
        model.reviewdisplay = 'Education details';
        model.eventType = 'add';
        //end declaration block

        var CustID = stateParams.CustID;

        model.init = function() {
            CustID = stateParams.CustID;
            model.CustID = CustID;
            model.getdata();
            return model;
        };

        model.getdata = function() {
            model.eduPageload();
            model.ProfPageload();
            model.aboutPageload();
            model.custdatapageload();
        };

        model.eduPageload = function() {

            editEducationService.getEducationData(CustID).then(function(response) {
                console.log(response.data);
                if (commonFactory.checkvals(response.data)) {
                    model.educationSelectArray = response.data;
                    model.eduEmpLastModificationDate = model.educationSelectArray.length > 0 ? model.educationSelectArray[0].EmpLastModificationDate : '';
                }

            });
        };
        model.ProfPageload = function() {

            editEducationService.getProfessionData(CustID).then(function(response) {
                if (commonFactory.checkvals(response.data)) {
                    model.ProfessionSelectArray = response.data;
                    model.profEmpLastModificationDate = model.ProfessionSelectArray ? model.ProfessionSelectArray[0].EmpLastModificationDate : '';
                }

            });

        };
        model.aboutPageload = function() {
            editEducationService.getAboutData(CustID).then(function(response) {
                if (commonFactory.checkvals(response.data)) {
                    var AboutData = (response.data).split(';');
                    model.lblaboutUrself = (AboutData[0].split(':'))[1];
                    model.AboutReviewStatusID = (AboutData[1].split(':'))[1];
                }
            });

        };
        model.custdatapageload = function() {
            editEducationService.getCustomerData(CustID).then(function(response) {
                model.CustomerDataArr = response.data !== undefined && response.data.length > 0 ? JSON.parse(response.data) : [];
                model.custEmpLastModificationDate = model.CustomerDataArr[0].EmpLastModificationDate;

            });
        };

        model.showpopup = function(type, item) {
            isSubmit = true;
            model.eventType = 'add';
            switch (type) {
                case 'showEduModal':

                    model.popupdata = model.Education;
                    model.popupHeader = 'Education Details';
                    model.EducationID = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.eduGroupArr = commonFactory.checkvals(item.EducationCategoryID) ? commonFactory.educationGroupBind(item.EducationCategoryID) : [];
                        model.eduSpecialisationArr = commonFactory.checkvals(item.EducationGroupID) ? commonFactory.educationSpeciakisationBind(item.EducationGroupID) : [];
                        model.IsHighestDegreeId = item.EduHighestDegree;
                        model.EduCatgoryId = commonFactory.checkvals(item.EducationCategoryID) ? parseInt(item.EducationCategoryID) : null;
                        model.EdugroupId = item.EducationGroupID;
                        model.EduspecializationId = item.EducationSpecializationID;
                        model.universityId = item.EduUniversity;
                        model.collegeId = item.EduCollege;
                        model.passOfyear = commonFactory.checkvals(item.EduPassOfYear) ? parseInt(item.EduPassOfYear) : null;
                        debugger;
                        model.countryId = item.CountryID;

                        model.stateId = item.StateID;
                        model.districtId = item.DistrictID;
                        model.cityId = item.CityID;
                        model.txtcity = "";
                        model.Edumerits = item.Educationdesc;
                        model.intCusID = item.intCusID;
                        model.EducationID = item.EducationID;
                    }

                    break;

                case 'showProfModal':
                    model.popupdata = model.profession;
                    model.popupHeader = 'Profession details';
                    model.Cust_Profession_ID = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.intCusID = item.intCusID;
                        model.EmployedInId = parseInt(item.ProfessionCategoryID);
                        model.ProfessionGroupId = item.ProfessionGroupID;
                        model.ProfessionId = item.ProfessionID;
                        model.CompanyName = item.CompanyName;
                        model.salary = item.Salary;
                        model.currency = item.SalaryCurrency;
                        model.profCountryId = item.CountryID;
                        model.profStateId = item.StateID;
                        model.profDistrictId = item.DistrictID;
                        model.profCityId = item.CityID;
                        // model.profTxtcity = item.CityWorkingIn;
                        debugger;
                        model.WorkingForm = item.WorkingFromDate;
                        model.visaStatus = item.VisaTypeID;
                        model.sinceDate = item.ResidingSince;
                        model.arrivalDate = item.ArrivingDate;
                        model.departureDate = item.DepartureDate;
                        model.occupationDetails = item.OccupationDetails;
                        model.Cust_Profession_ID = item.Cust_Profession_ID;
                    }

                    break;

                case 'showAboutModal':
                    model.popupdata = model.aboutUrSelf;
                    model.popupHeader = 'About your self';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.txtAboutUS = item;
                    }
                    break;

                case 'custData':

                    model.popupdata = model.Custdata;
                    model.popupHeader = 'Customer details';

                    if (item !== undefined) {

                        model.eventType = 'edit';
                        model.genderId = item.GenderID;
                        model.surName = item.LastName;
                        model.name = item.FirstName;
                        model.maritalStatusId = item.MaritalStatusID;

                        model.dob = item.DateofBirthwithoutAge;
                        model.heightId = item.HeightID;
                        model.complexionId = item.ComplexionID;
                        model.religionId = item.ReligionID;
                        model.motherTongueId = item.MotherTongueID;
                        model.casteId = item.CasteID;
                        model.subcasteId = item.SubCasteID;
                        model.bornCitizenShipId = item.CitizenshipID;
                        model.physicalStausId = item.PhysicalStatusID;

                    }
                    break;
            }

            commonFactory.open('commonEduCatiobpopup.html', model.scope, uibModal);

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.updateData = function(inObj, type) {

            if (isSubmit) {
                isSubmit = false;
                switch (type) {
                    case 'Education Details':
                        inObj.customerEducation = {};
                        inObj.customerEducation = inObj.GetDetails;
                        inObj.customerEducation.Cust_Education_ID = model.EducationID;
                        inObj.customerEducation.intEduID = model.EducationID;
                        inObj.customerEducation.CustID = model.CustID;

                        model.submitPromise = editEducationService.submitEducationData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.eduPageload();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Education Details submitted Succesfully', 4500);
                                if (model.datagetInStatus === 1) {
                                    sessionStorage.removeItem('missingStatus');
                                    route.go('mobileverf', {});
                                }
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Education Details Updation failed', 4500);
                            }
                        });
                        break;
                    case 'Profession details':

                        inObj.customerProfession = {};
                        inObj.customerProfession = inObj.GetDetails;
                        inObj.customerProfession.profGridID = model.Cust_Profession_ID;
                        inObj.customerProfession.ProfessionID = model.Cust_Profession_ID;
                        inObj.customerProfession.CustID = CustID;
                        model.submitPromise = editEducationService.submitProfessionData(inObj).then(function(response) {
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.ProfPageload();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Professional Details  submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Professional Details  Updation failed', 4500);
                            }
                        });

                        break;
                    case 'Customer details':

                        inObj.GetDetails.CustID = CustID;
                        inObj.GetDetails.DateofBirth = inObj.GetDetails.DateofBirth !== '' && inObj.GetDetails.DateofBirth !== 'Invalid date' ? filter('date')(inObj.GetDetails.DateofBirth, 'MM/dd/yyyy hh:mm:ss a') : null,
                            editEducationService.submitCustomerData(inObj).then(function(response) {
                                console.log(response);
                                commonFactory.closepopup();
                                if (response.data === 1) {
                                    model.custdatapageload();
                                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Customer Personal Details submitted Succesfully', 4500);
                                } else {
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Customer Personal Details Updation failed', 4500);
                                }
                            });
                        break;

                    case 'About your self':

                        model.submitPromise = editEducationService.submitAboutUrData({ CustID: CustID, AboutYourself: inObj.GetDetails.txtAboutUS, flag: 1 }).then(function(response) {
                            commonFactory.closepopup();
                            if (response.data === '1') {
                                model.aboutPageload();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'About Yourself submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'About Yourself Updation failed', 4500);
                            }
                        });
                        break;
                }
            }
        };


        model.DeleteEduPopup = function(id) {
            model.educationID = id;
            commonFactory.open('deleteEduContent.html', model.scope, uibModal, 'sm');
        };

        model.deleteEduSubmit = function() {
            SelectBindService.DeleteSection({ sectioname: 'Education', CustID: CustID, identityid: model.educationID }).then(function(response) {
                console.log(response);
                model.eduPageload();
                commonFactory.closepopup();
            });
        };
        model.showHideVisastatus = function(item) {
            if (parseInt(model.profCountryId) === 1) {
                model.visaStatus = '';
                model.sinceDate = '';
                model.arrivalDate = '';
                model.departureDate = '';
                return false;
            }
            return true;
        };


        //performance code
        model.Education = [
            { lblname: 'Is Highest Degree', controlType: 'radio', ngmodel: 'IsHighestDegreeId', required: true, arrbind: 'boolType', parameterValue: 'Highestdegree' },
            { lblname: 'Education category', controlType: 'select', ngmodel: 'EduCatgoryId', required: true, typeofdata: 'educationcategory', parameterValue: 'Educationcategory', childName: 'EducationGroup', changeApi: 'EducationGroup' },
            { lblname: 'Education group', controlType: 'Changeselect', ngmodel: 'EdugroupId', required: true, parentName: 'EducationGroup', parameterValue: 'Educationgroup', changeApi: 'EducationSpecialisation', childName: 'EducationSpecialisation' },
            { lblname: 'Edu specialization', controlType: 'Changeselect', ngmodel: 'EduspecializationId', required: true, parentName: 'EducationSpecialisation', parameterValue: 'EducationSpecialization' },
            { lblname: 'University', controlType: 'textbox', ngmodel: 'universityId', parameterValue: 'University' },
            { lblname: 'College', controlType: 'textbox', ngmodel: 'collegeId', parameterValue: 'College' },
            { lblname: 'Pass of year', controlType: 'select', ngmodel: 'passOfyear', typeofdata: 'passOfYear', parameterValue: 'Passofyear' },
            {
                lblname: 'country',
                controlType: 'country',
                countryshow: true,
                cityshow: true,
                othercity: true,
                dcountry: 'countryId',
                dstate: 'stateId',
                ddistrict: 'districtId',
                dcity: 'cityId',
                strothercity: 'txtcity',
                countryParameterValue: 'Countrystudyin',
                stateParameterValue: 'Statestudyin',
                districtParameterValue: 'Districtstudyin',
                cityParameterValue: 'CitystudyIn',
                cityotherParameterValue: 'OtherCity'
            },
            {
                lblname: 'Educational merits',
                controlType: 'textarea',
                ngmodel: 'Edumerits',
                parameterValue: 'Educationalmerits'
            }

        ];

        model.profession = [
            { lblname: 'Employed In', controlType: 'select', ngmodel: 'EmployedInId', required: true, typeofdata: 'ProfCatgory', parameterValue: 'EmployedIn' },
            { lblname: 'Professional group', controlType: 'select', ngmodel: 'ProfessionGroupId', required: true, typeofdata: 'ProfGroup', parameterValue: 'Professionalgroup', childName: 'Profession', changeApi: 'ProfessionSpecialisation' },
            { lblname: 'Profession', controlType: 'Changeselect', ngmodel: 'ProfessionId', required: true, parentName: 'Profession', parameterValue: 'Profession' },
            { lblname: 'Company name', controlType: 'textbox', ngmodel: 'CompanyName', parameterValue: 'Companyname' },
            { lblname: 'Monthly salary', controlType: 'textboxSelect', ngmodelSelect: 'currency', ngmodelText: 'salary', typeofdata: 'currency', parameterValueSelect: 'Currency', parameterValueText: 'Monthlysalary' },
            {
                controlType: 'country',
                countryshow: true,
                cityshow: true,
                othercity: true,
                dcountry: 'profCountryId',
                dstate: 'profStateId',
                ddistrict: 'profDistrictId',
                dcity: 'profCityId',
                strothercity: 'profTxtcity',

                countryParameterValue: 'CountryID',
                stateParameterValue: 'StateID',
                districtParameterValue: 'DistrictID',
                cityParameterValue: 'CityID',
                cityotherParameterValue: 'OtherCity'
            },
            { lblname: 'Working from date', controlType: 'date', ngmodel: 'WorkingForm', parameterValueDate: 'Workingfromdate' },
            { lblname: 'visa status', controlType: 'select', ngmodel: 'visaStatus', typeofdata: 'visastatus', parameterValue: 'visastatus', parentDependecy: 'showHideVisastatus' },
            { lblname: 'Since date', controlType: 'date', ngmodel: 'sinceDate', parameterValueDate: 'Sincedate', parentDependecy: 'showHideVisastatus' },
            { lblname: 'Arrival Date', controlType: 'date', ngmodel: 'arrivalDate', parameterValueDate: 'ArrivalDate', parentDependecy: 'showHideVisastatus' },
            { lblname: 'Departure Date', controlType: 'date', ngmodel: 'departureDate', parameterValueDate: 'DepartureDate', parentDependecy: 'showHideVisastatus' },
            { lblname: 'Occupation Details', controlType: 'textarea', ngmodel: 'occupationDetails', parameterValue: 'OccupationDetails' }

        ];

        model.Custdata = [
            { lblname: 'Gender', controlType: 'radio', ngmodel: 'genderId', arrbind: 'gender', parameterValue: 'Gender' },
            { lblname: 'SurName', controlType: 'textbox', ngmodel: 'surName', required: true, parameterValue: 'LastName' },
            { lblname: 'Name', controlType: 'textbox', ngmodel: 'name', required: true, parameterValue: 'FirstName' },
            { lblname: 'Marital Status', controlType: 'select', ngmodel: 'maritalStatusId', required: true, typeofdata: 'MaritalStatus', parameterValue: 'MaritalStatusID' },
            { lblname: 'Date Of Birth', controlType: 'date', ngmodel: 'dob', required: true, parameterValueDate: 'DateofBirth' },
            { lblname: 'Height', controlType: 'select', ngmodel: 'heightId', required: true, typeofdata: 'heightregistration', parameterValue: 'HeightID' },
            { lblname: 'Complexion', controlType: 'select', ngmodel: 'complexionId', required: true, typeofdata: 'Complexion', parameterValue: 'ComplexionID' },
            { lblname: 'Religion', controlType: 'select', ngmodel: 'religionId', secondParent: 'motherTongueId', required: true, typeofdata: 'Religion', childName: 'caste', changeApi: 'castedependency', parameterValue: 'ReligionID' },
            { lblname: 'Mother Tongue', controlType: 'select', ngmodel: 'motherTongueId', secondParent: 'religionId', required: true, typeofdata: 'Mothertongue', childName: 'caste', changeApi: 'castedependency', parameterValue: 'MotherTongueID' },
            { lblname: 'Caste', controlType: 'Changeselect', ngmodel: 'casteId', required: true, parentName: 'caste', childName: 'subCaste', changeApi: 'subCasteBind', parameterValue: 'CasteID' },
            { lblname: 'SubCaste', controlType: 'Changeselect', ngmodel: 'subcasteId', parentName: 'subCaste', parameterValue: 'SubcasteID' },
            { lblname: 'Born Citizenship', controlType: 'select', ngmodel: 'bornCitizenShipId', required: true, typeofdata: 'Country', parameterValue: 'CitizenshipID' },
            { lblname: 'Physical Status', controlType: 'radio', ngmodel: 'physicalStausId', required: true, arrbind: 'PhysicalStatus', parameterValue: 'PhysicallyChallenged' }
        ];

        model.aboutUrSelf = [
            { lblname: '', controlType: 'about', maxlength: '1000', ngmodel: 'txtAboutUS', displayTxt: "(Please don't write phone numbers/emails/any junk characters)*", ngmodel: "aboutFamilyId", parameterValue: 'txtAboutUS' }
        ];


        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editEducationModel', factory);

    factory.$inject = ['$http', 'authSvc', 'editEducationService', 'commonFactory', '$uibModal', '$filter', 'alert', '$stateParams', 'SelectBindService', 'arrayConstantsEdit'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getEducationData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerEducationdetails', { params: { CustID: obj } });
            },
            getProfessionData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerProfessiondetails', { params: { CustID: obj } });
            },
            getAboutData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getEducationProfession_AboutYourself', { params: { CustID: obj, AboutYourself: '', flag: 0 } });
            },
            submitEducationData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerPersonalUpdateEducationdetail', JSON.stringify(obj1));
            },
            submitProfessionData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerPersonalUpdateProfessionDetails', JSON.stringify(obj1));
            },
            submitAboutUrData: function(obj1) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getEducationProfession_AboutYourself', { params: obj1 });
            },

            getCustomerData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getpersonaldetails_Customer', { params: { CustID: obj } });
            },
            submitCustomerData: function(obj1) {
                console.log(JSON.stringify(obj1));
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/UpdatePersonalDetails_Customersetails', JSON.stringify(obj1));
            }

        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editEducationService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editManagePhotoModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editManagePhotoModel;
             editManagePhotoModel.init();
             vm.model.scope = scope;
         };
         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editManagePhotoCtrl', controller);

     controller.$inject = ['editManagePhotoModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(editManagePhotoService, authSvc, alertss, commonFactory, uibModal, http, fileUpload, stateParams) {
        var model = {};
        model.scope = {};
        //start declaration block
        // var logincustid = authSvc.getCustId();
        var CustID = stateParams.CustID;
        // logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.loginpaidstatus = authSvc.getpaidstatus();
        var genderID = 1;
        //authSvc.getGenderID();
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        model.photorowID = 0;
        model.manageArr = [];
        //end declaration block
        model.up = {};
        model.init = function() {
            CustID = stateParams.CustID;
            model.getData();
            return model;
        };

        model.getData = function() {
            editManagePhotoService.getPhotoData(CustID).then(function(response) {
                var StrCustID = CustID;
                console.log(response.data);
                model.manageArr = response.data;
                model.refreshPageLoad(model.manageArr);
            });
        };
        model.refreshPageLoad = function(Arr) {

            _.each(Arr, function(item) {

                model.rbtProtectPassword = item.PhotoPassword === 'Admin@123' ? '1' : '0';
                var imagepath = editviewapp.accesspathdots;

                if (item.IsActive === 0 && item.PhotoName !== null) {
                    var strCustDirName1 = "KMPL_" + CustID + "_Images";
                    var path1 = imagepath + strCustDirName1 + "/" + item.PhotoName;
                    item.ImageUrl = path1 + '?decache=' + Math.random();
                    //item.ImageUrl = path1;
                    item.addButtonvisible = false;
                    item.keyname = strCustDirName1 + "/" + item.PhotoName;

                } else if (item.IsActive === 1 && item.IsThumbNailCreated === 1) {

                    var strCustDirName = "KMPL_" + CustID + "_Images";
                    item.addButtonvisible = false;

                    switch (item.DisplayOrder) {
                        case 1:
                            var photoshoppath = "Img1_Images/" + item.ProfileID + "_ApplicationPhoto.jpg";
                            var path11 = imagepath + strCustDirName + "/" + photoshoppath;
                            item.ImageUrl = path11;
                            item.keyname = strCustDirName + "/" + photoshoppath;
                            break;
                        case 2:
                            var photoshoppathnew = "Img2_Images/" + item.ProfileID + "_ApplicationPhoto.jpg";
                            var pathnew = imagepath + strCustDirName + "/" + photoshoppathnew;
                            item.ImageUrl = pathnew;
                            item.keyname = strCustDirName + "/" + photoshoppathnew;
                            break;
                        case 3:
                            var photoshoppathneew3 = "Img3_Images/" + item.ProfileID + "_ApplicationPhoto.jpg";
                            var pathneww = imagepath + strCustDirName + "/" + photoshoppathneew3;
                            item.ImageUrl = pathneww;
                            item.keyname = strCustDirName + "/" + photoshoppathneew3;
                            break;
                    }
                } else if (item.IsActive === 0 && item.PhotoName === null) {
                    item.addButtonvisible = true;


                    item.ImageUrl = genderID === '1' || genderID === 1 ? editviewapp.Mnoimage : editviewapp.Fnoimage;
                }
            });
            return Arr;
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.AddImage = function(index, Cust_Photos_ID, DisplayOrder, IsActive) {
            model.photorowID = index;
            model.Cust_Photos_ID = Cust_Photos_ID;
            model.DisplayOrder = DisplayOrder;
            model.IsActive = IsActive;
            commonFactory.open('AddimagePopup.html', model.scope, uibModal, 'sm');
        };
        model.upload = function(obj) {
            var extension = (obj.myFile.name !== '' && obj.myFile.name !== undefined && obj.myFile.name !== null) ? (obj.myFile.name.split('.'))[1] : null;
            extension = angular.lowercase(extension);
            var gifFormat = "gif, jpeg, png,jpg";
            if (typeof(obj.myFile.name) != "undefined") {
                var size = parseFloat(obj.myFile.size / 1024).toFixed(2);
                if (extension !== null && gifFormat.indexOf(angular.lowercase(extension)) === -1) {
                    alert('Your uploaded image contains an unapproved file formats.');
                } else if (size > 4 * 1024) {
                    alert('Sorry,Upload Photo Size Must Be Less than  4 mb');
                } else {
                    // var extension = ((obj.myFile.name).split('.'))[1];
                    var keyname = editviewapp.prefixPath + 'KMPL_' + CustID + '_Images/Img' + model.photorowID + '.' + extension;
                    fileUpload.uploadFileToUrl(obj.myFile, '/photoUplad', keyname).then(function(res) {
                        console.log(res.status);
                        if (res.status == 200) {
                            commonFactory.closepopup();
                            model.uploadData = {
                                GetDetails: {
                                    ID: model.Cust_Photos_ID,
                                    url: 'Img' + model.photorowID + '.' + extension,
                                    order: model.DisplayOrder,
                                    IsProfilePic: 0,
                                    DisplayStatus: model.DisplayOrder,
                                    Password: 0,
                                    IsReviewed: 0,
                                    TempImageUrl: editviewapp.GlobalImgPath + keyname,
                                    IsTempActive: commonFactory.checkvals(model.IsActive) ? model.IsActive : '0',
                                    DeletedImageurl: null,
                                    IsImageDeleted: 0,
                                    PhotoStatus: null,
                                    PhotoID: model.DisplayOrder,
                                    PhotoPassword: null
                                },
                                customerpersonaldetails: {
                                    intCusID: CustID,
                                    EmpID: loginEmpid,
                                    Admin: AdminID
                                }
                            };

                            editManagePhotoService.submituploadData(model.uploadData).then(function(response) {
                                console.log(response);
                                if (response.status === 200) {
                                    model.manageArr = response.data;
                                    model.refreshPageLoad(model.manageArr);
                                    alert('Uploaded Succesfully');
                                    //alertss.timeoutoldalerts(model.scope, 'alert-success', 'Uploaded Succesfully', 4500);
                                } else {
                                    alert('Uploaded failed');
                                    // alertss.timeoutoldalerts(model.scope, 'alert-success', 'Uploaded failed', 4500);
                                }
                            });
                        }
                    });
                }
            } else {
                alert("This browser does not support HTML5.");
            }

        };

        model.DeleteImage = function(key, Cust_Photoid) {
            model.deleteKey = key;
            model.DCust_Photos_ID = Cust_Photoid;
            commonFactory.open('deleteimagePopup.html', model.scope, uibModal, 'sm');
        };

        model.Delete = function() {
            var keynameq = editviewapp.prefixPath + model.deleteKey;
            http.post('/photoDelete', JSON.stringify({ keyname: keynameq })).then(function(data) {

            });

            editManagePhotoService.linqSubmits(model.DCust_Photos_ID, 3).then(function(response) {
                if (response.data === 1) {
                    commonFactory.closepopup();
                    model.getData();
                }
            });
        };

        model.setAsProfilePic = function(cust_photoID) {
            editManagePhotoService.linqSubmits(cust_photoID, 2).then(function(response) {
                console.log(response.data);

                if (response.data === 1) {
                    model.getData();
                }
            });
        };

        model.setPhotoPassword = function(obj) {

            editManagePhotoService.linqSubmits(CustID, obj).then(function(response) {
                console.log(response);
                if (response.data === 1) {

                    if (obj === '1') {
                        alert('Protect with Password  Uploaded Successfully');
                    } else {
                        alert('Protect with Password Removed Successfully');
                    }
                }
            });

        };

        model.redirectPage = function(type) {

            switch (type) {
                case 'PhotoGuideLines':
                    window.open('registration/photoGuideLines', '_blank');
                    break;
                case 'Faqs':
                    window.open('registration/faqs', '_blank');
                    break;
                case 'uploadTips':
                    window.open('registration/uploadTips', '_blank');
                    break;
            }
        };


        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editManagePhotoModel', factory);

    factory.$inject = ['editManagePhotoService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$http', 'fileUpload', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getPhotoData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/GetphotosofCustomer', { params: { Custid: obj, EmpID: 2 } });
            },
            submituploadData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/Savephotosofcustomer', JSON.stringify(obj1));
            },
            linqSubmits: function(Custid, iflag) {
                return http.get(editviewapp.apipath + 'CustomerPersonalUpdate/getPhotoPassword', { params: { CustID: Custid, ipassword: iflag } });
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editManagePhotoService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editOfcePurposeModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editOfcePurposeModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editOfcePurposeCtrl', controller);

     controller.$inject = ['editOfcePurposeModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(editOfcePurposeService, authSvc, alertss, commonFactory, uibModal, stateParams) {
        var model = {};
        model.scope = {};
        // var logincustid = authSvc.getCustId();
        var custID = stateParams.CustID;
        //  logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.dataval = '';


        model.init = function() {
            custID = stateParams.CustID;
            model.pageload();
            return model;
        };

        model.pageload = function() {
            editOfcePurposeService.getofficeData('1', custID, '').then(function(response) {
                console.log(response);
                if (response.data.length > 0) {
                    model.dataval = response.data[0].length > 0 ? (JSON.parse(response.data[0]))[0].AboutProfile : '';
                }
                console.log(model.dataval);
            });
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };
        model.showPopup = function(val) {

            model.popupHeader = 'About Your Profile';
            model.txtAboutprofile = '';
            if (val !== undefined) {
                model.eventType = 'edit';
                model.txtAboutprofile = val;
            }
            commonFactory.open('AboutModalContent.html', model.scope, uibModal);
        };

        model.updateData = function(inObj, type) {

            editOfcePurposeService.getofficeData('2', custID, inObj.GetDetails.txtAboutprofile).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                model.dataval = inObj.GetDetails.txtAboutprofile;
                alertss.timeoutoldalerts(model.scope, 'alert-success', 'About Profile Details submitted Succesfully', 4500);
                // if (response.data === 1) {

                // } else {
                //     alertss.timeoutoldalerts(model.scope, 'alert-danger', 'About Profile Details Updation failed', 4500);
                // }
            });

        };


        model.popupdata = [
            { lblname: '', controlType: 'about', required: true, maxlength: '1000', displayTxt: '(You can write anything about this profile)*', ngmodel: 'txtAboutprofile', parameterValue: 'txtAboutprofile' }
        ];





        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editOfcePurposeModel', factory);

    factory.$inject = ['editOfcePurposeService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getofficeData: function(iflag, obj, text) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerPersonaloffice_purpose', { params: { flag: iflag, ID: obj, AboutProfile: text, IsConfidential: '', HighConfendential: '' } });
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editOfcePurposeService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editParentModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editParentModel.init();
             vm.model.scope = scope;
         };
         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editParentCtrl', controller);

     controller.$inject = ['editParentModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';

    function factory(editParentService, authSvc, alertss, commonFactory, uibModal, stateParams) {
        var model = {};
        model.model = {};
        //start declarion block
        model.parent = {};
        model.AdrrObj = {};
        model.physicalObj = {};
        model.lblaboutMyfamily = null;
        model.aboutFamilyObj = {};
        model.dcountry = '1';
        model.parentArr = [];
        model.AboutFamilyReviewStatus = null;
        model.eventType = 'add';
        var isSubmit = true;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        //end declarion block

        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //  model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.parentBindData();
            model.AboutPageloadData();
            return model;
        };

        model.parentBindData = function() {
            editParentService.getParentData(custID).then(function(response) {
                if (commonFactory.checkvals(response.data)) {
                    model.parentArr = commonFactory.checkvals(response.data[0]) ? JSON.parse(response.data[0]) : [];
                    model.addressArr = commonFactory.checkvals(response.data[1]) ? JSON.parse(response.data[1]) : [];
                    model.physicalArr = commonFactory.checkvals(response.data[2]) ? JSON.parse(response.data[2]) : [];
                    model.AboutFamily = commonFactory.checkvals(response.data[3]) ? JSON.parse(response.data[3]) : [];

                    model.parentmodifiedby = model.parentArr[0].EmpLastModificationDate;
                    model.addrmodifiedby = model.addressArr[0].EmpLastModificationDate;
                    model.physicalmodifiedby = model.physicalArr[0].EmpLastModificationDate;

                }

                if (commonFactory.checkvals(model.AboutFamily[0])) {
                    model.AboutFamilyReviewStatus = model.AboutFamily[0].reviewstatus;
                }
            });
        };

        model.AboutPageloadData = function() {
            editParentService.getAboutFamilyData(custID).then(function(response) {
                console.log(response);
                model.lblaboutMyfamily = response.data;
            });
        };

        model.populateModel = function(type, item) {
            isSubmit = true;
            model.eventType = 'add';
            switch (type) {
                case "parent":

                    model.popupdata = model.parent;
                    model.popupHeader = 'Parent details';
                    model.FatherCust_family_id = null;
                    model.MotherCust_family_id = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';

                        model.cust_id = item.cust_id;
                        model.FatherCust_family_id = item.FatherCust_family_id;
                        model.MotherCust_family_id = item.MotherCust_family_id;

                        model.fatherName = item.FatherName;
                        model.fEducation = item.FatherEducationDetails;
                        model.fDesignation = item.FatherProfDetails;
                        model.fCompany = item.FathercompanyName;
                        model.fJobLocation = item.FatherJoblocation;

                        model.fMobileCodeId = item.FatherMobileCountryCodeId;
                        model.fMobileNumber = item.FathermobilenumberID;

                        if (commonFactory.checkvals(item.FatherLandAreaCodeId)) {
                            model.flandCountryCodeId = item.FatherLandCountryCodeId;
                            model.fAreaCodeid = item.FatherLandAreaCodeId;
                            model.flandNumber = item.FatherLandNumberID;
                        } else {
                            model.fAltermobileCodeId = item.FatherLandCountryCodeId;
                            model.fAlterMobileNumber = item.FatherLandNumberID;
                        }

                        model.fEmail = item.FatherEmail;
                        model.fatherFatherName = item.FatherFathername;

                        model.gfMobileCodeId = item.FatherfatherMobileCountryID;
                        model.gfMobileNumber = item.FatherFatherMobileNumber;

                        if (commonFactory.checkvals(item.FatherFatherLandAreaCode)) {
                            model.gflandCountryCodeId = item.FatherfatherLandCountryCodeID;
                            model.gfAreaCodeid = item.FatherFatherLandAreaCode;
                            model.gflandNumber = item.FatherFatherLandNumber;
                        } else {
                            model.gfAltermobileCodeId = item.FatherfatherMobileCountrycode1;
                            model.gfAlterMobileNumber = item.FatherFatherLandNumber;
                        }

                        model.fStateid = item.FatherStateID;
                        model.fDistrictid = item.FatherDistrictID;
                        model.fNative = item.FatherNativeplace;
                        model.motherName = item.MotherName;
                        model.mEducation = item.MotherEducationDetails;
                        model.mDesignation = item.MotherProfedetails;
                        model.chkhousewife = item.MotherProfedetails == 'HouseWife' ? true : false;
                        model.mCompanyName = item.MothercompanyName;
                        model.mJobLocation = item.MotherJoblocation;

                        model.mMobileCodeId = item.MotherMobileCountryCodeId;
                        model.mMobileNumber = item.MotherMobilenumberID;

                        if (commonFactory.checkvals(item.MotherLandAreaCodeId)) {
                            model.mlandCountryCodeId = item.MotherLandCountryCodeId;
                            model.mAreaCodeid = item.MotherLandAreaCodeId;
                            model.mlandNumber = item.MotherLandNumberID;
                        } else {
                            model.mAltermobileCodeId = item.MotherMobileCountryCodeId;
                            model.mAlterMobileNumber = item.MotherLandNumberID;
                        }

                        model.mEmail = item.MotherEmail;
                        model.mffirstName = item.MotherFatherName;
                        model.mfLastName = item.MotherFatherLastName;

                        model.mfMobileCodeId = item.MotherfatherMobileCountryID;
                        model.mfMobileNumber = item.MotherFatherMobileNumber;

                        if (commonFactory.checkvals(item.MotherFatherLandAreaCode)) {
                            model.mflandCodeId = item.motherfatherLandCountryID;
                            model.mfAreaCodeid = item.MotherFatherLandAreaCode;
                            model.mflandNumber = item.MotherFatherLandNumber;
                        } else {
                            model.mfAltermobileCodeId = item.MotherfatherMobileCountryID1;
                            model.mfAlterMobileNumber = item.MotherFatherLandNumber;
                        }
                        model.mStateid = item.motherStateID;
                        model.mDistrictid = item.motherDistricID;
                        model.mNativePlace = item.MotherNativeplace;
                        model.areParentInterCasteId = item.Intercaste === 'Yes' ? 1 : 0;
                        model.fCaste = item.FatherCasteID;
                        model.mCaste = item.MotherCasteID;

                        model.fProfCatgory = item.FatherProfessionCategoryID;
                        model.mProfCtagory = item.MotherProfessionCategoryID;

                    }

                    break;

                case "Address":
                    model.popupdata = model.Address;
                    model.popupHeader = 'Contact Details';
                    model.Cust_Family_ID = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.Cust_ID = item.Cust_ID;
                        model.Cust_Family_ID = item.Cust_Family_ID;
                        model.houseFlatNumber = item.FlatNumber;
                        model.apartmentName = item.ApartmentName;
                        model.streetName = item.StreetName;
                        model.areaName = item.AreaName;
                        model.landMark = item.LandMark;
                        model.countryId = item.ParentCountryId;
                        model.stateId = item.ParentStateid;
                        model.districtId = item.ParentDistrictId;
                        model.cityId = item.CityName;
                        model.zipcode = item.Zip;
                    }

                    break;

                case "physicalAttributes":

                    model.popupdata = model.physicalAttributes;
                    model.popupHeader = 'Physical Attributes & Health Details of Candidate';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.Cust_ID = item.Cust_ID;
                        model.dietId = item.DietID;
                        model.drinkId = item.DrinkID;
                        model.smokeId = item.SmokeID;
                        model.bodyTypeId = item.BodyTypeID;
                        model.bodyWeight = item.BodyWeight;
                        model.bloodGroupId = item.BloodGroupID;
                        model.healthConditionId = item.HealthConditionID;
                        model.healthDescritionId = item.HealthConditionDescription;
                    }

                    break;

                case "AboutFamily":

                    model.popupdata = model.aboutFamily;
                    model.popupHeader = 'About My Family';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.aboutFamilyId = item;
                    }

                    break;
            }
            commonFactory.open('commonParentpopup.html', model.scope, uibModal);
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.updateData = function(inObj, type) {

            if (isSubmit) {
                isSubmit = false;

                switch (type) {
                    case 'Parent details':

                        inObj.GetDetails.FatherCustFamilyID = model.FatherCust_family_id;
                        inObj.GetDetails.MotherCustFamilyID = model.MotherCust_family_id;
                        inObj.GetDetails.CustID = custID;
                        model.submitPromise = editParentService.submitParentData(inObj).then(function(response) {
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.parentBindData(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Parents Details submitted Succesfully', 4500);
                                if (model.datagetInStatus === 1) {
                                    sessionStorage.removeItem('missingStatus');
                                    route.go('mobileverf', {});
                                }
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Parents Details Updation failed', 4500);
                            }
                        });
                        break;
                    case 'Contact Details':
                        inObj.GetDetails.CustID = custID;
                        inObj.GetDetails.Cust_Family_ID = model.Cust_Family_ID;
                        model.submitPromise = editParentService.submitAddressData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.parentBindData(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Contact Address submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Contact Address Updation failed', 4500);
                            }
                        });
                        break;

                    case 'Physical Attributes & Health Details of Candidate':

                        inObj.GetDetails.CustID = custID;

                        model.submitPromise = editParentService.submitPhysicalData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {

                                model.parentBindData(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Physical Attribute & Health Details Of Candidate submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Physical Attribute & Health Details Of Candidate Updation failed', 4500);
                            }
                        });

                        break;

                    case 'About My Family':

                        model.submitPromise = editParentService.submitAboutFamilyData({ CustID: custID, AboutYourself: inObj.GetDetails.AboutYourself, flag: 1 }).then(function(response) {
                            console.log(response);
                            model.lblaboutMyfamily = inObj.GetDetails.AboutYourself;
                            commonFactory.closepopup();
                            if (parseInt(response.data) === 1) {
                                model.AboutPageloadData(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'About My Family submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'About My Family Updation failed', 4500);
                            }
                        });

                        break;
                }
            }
        };

        model.AboutMyfamilySubmit = function(obj) {
            if (isSubmit) {
                isSubmit = false;


            }
        };

        model.housewiseChk = function(item) {
            if (item.chkbox === true) {
                item.txtMProfession = 'HouseWife';
            } else {
                item.txtMProfession = '';
            }
        };

        model.roundVal = function(val) {
            var dec = 2;
            var result = Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        };
        model.converttolbs = function(item) {
            var value = model.bodyWeight;
            model.lbs = '';
            if (value.length > 0) {
                var lbs = value * 2.2;
                lbs = model.roundVal(lbs);
                model.lbs = lbs;
                if (lbs.toString() == 'NaN') {
                    alert("invalid Number");
                    model.lbs = '';
                    model.bodyWeight = '';
                }
            } else {
                model.bodyWeight = '';
                model.lbs = '';
            }
        };

        model.showHousewife = function(val) {
            return model.chkhousewife === true ? false : true;
        };

        model.ParentInterCasteId = function(val) {

            return model.areParentInterCasteId === 1 ? true : false;
        };

        model.parent = [
            { lblname: '', controlType: 'bindHtml', html: ' <h6>Father Details</h6>', classname: 'parentheader' },
            { lblname: 'Father Name', controlType: 'textbox', ngmodel: 'fatherName', required: true, parameterValue: 'FatherName' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'fEducation', parameterValue: 'FatherEducationDetails' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'fProfCatgory', typeofdata: 'ProfCatgory', parameterValue: 'FatherProfessionCategoryID' },
            { lblname: 'Designation', controlType: 'textbox', ngmodel: 'fDesignation', parameterValue: 'Professiondetails' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'fCompany', parameterValue: 'CompanyName' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'fJobLocation', parameterValue: 'JobLocation' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'fMobileCodeId',
                strmobile: 'fMobileNumber',
                dalternative: 'fAltermobileCodeId',
                stralternative: 'fAlterMobileNumber',
                dland: 'flandCountryCodeId',
                strareacode: 'fAreaCodeid',
                strland: 'flandNumber',
                strmail: 'fEmail',

                mobileCodeIdParameterValue: 'MobileCountry',
                mobileNumberParameterValue: 'MobileNumber',
                landCountryCodeIdParameterValue: 'LandlineCountry',
                landAreaCodeIdParameterValue: 'LandAreCode',
                landNumberParameterValue: 'landLineNumber',
                emailParameterValue: 'Email'
            },

            { lblname: 'Fathers father name', controlType: 'textbox', ngmodel: 'fatherFatherName', parameterValue: 'FatherFatherName' },
            {
                controlType: 'contact',
                emailhide: false,
                dmobile: 'gfMobileCodeId',
                strmobile: 'gfMobileNumber',
                dalternative: 'gfAltermobileCodeId',
                stralternative: 'gfAlterMobileNumber',
                dland: 'gflandCountryCodeId',
                strareacode: 'gfAreaCodeid',
                strland: 'gflandNumber',

                mobileCodeIdParameterValue: 'FatherfatherMobileCountryID',
                mobileNumberParameterValue: 'FatherFatherMobileNumber',
                landCountryCodeIdParameterValue: 'FatherFatherLandCountryID',
                landAreaCodeIdParameterValue: 'FatherFatherLandAreaCode',
                landNumberParameterValue: 'FatherFatherLandNumber',

            }, {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dstate: 'fStateid',
                ddistrict: 'fDistrictid',
                countryParameterValue: 'FatherCountry',
                stateParameterValue: 'FatherState',
                districtParameterValue: 'FatherDistric'
            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'fNative', parameterValue: 'FatherCity' },
            { lblname: '', controlType: 'bindHtml', html: ' <h6>Mother Details</h6>', classname: 'parentheader' },
            { lblname: 'Mother Name', controlType: 'textbox', ngmodel: 'motherName', required: true, parameterValue: 'MotherName' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'mEducation', parameterValue: 'MotherEducationDetails' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'mProfCtagory', typeofdata: 'ProfCatgory', parameterValue: 'MotherProfessionCategoryID' },
            { lblname: 'Designation', controlType: 'housewife', ngmodelText: 'mDesignation', ngmodelChk: 'chkhousewife', parameterValueText: 'MotherProfessiondetails' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'mCompanyName', parameterValue: 'MotherCompanyName', parentDependecy: 'showHousewife' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'mJobLocation', parameterValue: 'MotherJobLocation', parentDependecy: 'showHousewife' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'mMobileCodeId',
                strmobile: 'mMobileNumber',
                dalternative: 'mAltermobileCodeId',
                stralternative: 'mAlterMobileNumber',
                dland: 'mlandCountryCodeId',
                strareacode: 'mAreaCodeid',
                strland: 'mlandNumber',
                strmail: 'mEmail',

                mobileCodeIdParameterValue: 'MotherMobileCountryID',
                mobileNumberParameterValue: 'MotherMobileNumber',
                landCountryCodeIdParameterValue: 'MotherLandCountryID',
                landAreaCodeIdParameterValue: 'MotherLandAreaCode',
                landNumberParameterValue: 'MotherLandNumber',
                emailParameterValue: 'MotherEmail'

            },
            { lblname: 'Mothers Father Name', controlType: 'textbox', ngmodel: 'mffirstName', parameterValue: 'MotherFatherFistname' },
            { lblname: 'Mothers Last Name', controlType: 'textbox', ngmodel: 'mfLastName', parameterValue: 'MotherFatherLastname' },
            {
                controlType: 'contact',
                emailhide: false,
                dmobile: 'mfMobileCodeId',
                strmobile: 'mfMobileNumber',
                dalternative: 'mfAltermobileCodeId',
                stralternative: 'mfAlterMobileNumber',
                dland: 'mflandCodeId',
                strareacode: 'mfAreaCodeid',
                strland: 'mflandNumber',

                mobileCodeIdParameterValue: 'MotherfatherMobileCountryID',
                mobileNumberParameterValue: 'MotherFatherMobileNumber',
                landCountryCodeIdParameterValue: 'MotherFatherLandCountryID',
                landAreaCodeIdParameterValue: 'MotherFatherLandAreaCode',
                landNumberParameterValue: 'MotherFatherLandNumber'
            },
            {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dstate: 'mStateid',
                ddistrict: 'mDistrictid',
                countryParameterValue: 'MotherCountry',
                stateParameterValue: 'MotherState',
                districtParameterValue: 'MotherDistric'
            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'mNativePlace', parameterValue: 'MotherCity' },
            { lblname: 'Are parents interCaste ? ', controlType: 'radio', ngmodel: 'areParentInterCasteId', arrbind: 'boolType', parameterValue: 'AreParentsInterCaste' },
            { lblname: 'Father Caste', controlType: 'select', ngmodel: 'fCaste', typeofdata: 'caste', parameterValue: 'FatherCaste', parentDependecy: 'ParentInterCasteId' },
            { lblname: 'Mother Caste', controlType: 'select', ngmodel: 'mCaste', typeofdata: 'caste', parameterValue: 'MotherCaste', parentDependecy: 'ParentInterCasteId' },
            { lblname: '', controlType: 'break' }

        ];

        model.Address = [
            { lblname: 'House/Flat number', controlType: 'textbox', ngmodel: 'houseFlatNumber', required: true, parameterValue: 'HouseFlateNumber' },
            { lblname: 'Apartment name', controlType: 'textbox', ngmodel: 'apartmentName', parameterValue: 'Apartmentname' },
            { lblname: 'Street name', controlType: 'textbox', ngmodel: 'streetName', parameterValue: 'Streetname' },
            { lblname: 'Area Name', controlType: 'textbox', ngmodel: 'areaName', parameterValue: 'AreaName' },
            { lblname: 'Landmark', controlType: 'textbox', ngmodel: 'landMark', parameterValue: 'Landmark' },
            {
                controlType: 'country',
                countryshow: true,
                cityshow: false,
                othercity: false,
                dcountry: 'countryId',
                dstate: 'stateId',
                ddistrict: 'districtId',
                require: true,
                countryParameterValue: 'Country',
                stateParameterValue: 'STATE',
                districtParameterValue: 'District',

            },
            { lblname: 'City', controlType: 'textbox', ngmodel: 'cityId', required: true, parameterValue: 'city' },
            { lblname: 'Zip/Pin', controlType: 'textbox', ngmodel: 'zipcode', parameterValue: 'ZipPin' }

        ];
        model.physicalAttributes = [
            { lblname: 'Diet', controlType: 'radio', ngmodel: 'dietId', arrbind: 'Diet', parameterValue: 'DietID' },
            { lblname: 'Drink', controlType: 'radio', ngmodel: 'drinkId', arrbind: 'Drink', parameterValue: 'DrinkID' },
            { lblname: 'Smoke', controlType: 'radio', ngmodel: 'smokeId', arrbind: 'Drink', parameterValue: 'SmokeID' },
            { lblname: 'Body Type', controlType: 'select', ngmodel: 'bodyTypeId', typeofdata: 'bodyType', parameterValue: 'BodyTypeID' },
            { lblname: 'Body weight', controlType: 'textboxNumber', ngmodel: 'bodyWeight', method: 'converttolbs', parameterValue: 'BWKgs', span: true, spanText: 'kgs' },
            { lblname: 'lbs', controlType: 'textbox', ngmodel: 'lbs', parameterValue: 'BWlbs' },
            { lblname: 'Blood Group', controlType: 'select', ngmodel: 'bloodGroupId', typeofdata: 'bloodGroup', parameterValue: 'BloodGroup' },
            { lblname: 'Health Conditions', controlType: 'select', ngmodel: 'healthConditionId', typeofdata: 'healthCondition', parameterValue: 'HealthConditions' },
            { lblname: 'Health Condition Description', controlType: 'textarea', ngmodel: 'healthDescritionId', parameterValue: 'HealthConditiondesc' },
        ];
        model.aboutFamily = [
            { lblname: '', controlType: 'about', required: true, displayTxt: '(Do Not Mention Any Contact Information Phone Numbers, Email Id’s or your Profile May be Rejected.)', ngmodel: 'aboutFamilyId', parameterValue: 'AboutYourself' },
        ];

        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editParentModel', factory);

    factory.$inject = ['editParentService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getParentData: function(obj) {
                return http.get(editviewapp.apipathold + 'CustomerPersonal/getParentDetailsDisplay', { params: { CustID: obj } });
            },
            getAboutFamilyData: function(obj) {
                return http.get(editviewapp.apipathold + 'CustomerPersonal/getParents_AboutMyFamily', { params: { CustID: obj, AboutYourself: '', flag: 0 } });
            },
            submitParentData: function(obj1) {
                return http.post(editviewapp.apipathold + 'CustomerPersonalUpdate/CustomerParentUpdatedetails', JSON.stringify(obj1));
            },
            submitAddressData: function(obj1) {
                console.log(JSON.stringify(obj1));
                return http.post(editviewapp.apipathold + 'CustomerPersonalUpdate/CustomerContactAddressUpdatedetails', JSON.stringify(obj1));
            },
            submitPhysicalData: function(obj1) {
                return http.post(editviewapp.apipathold + 'CustomerPersonalUpdate/CustomerPhysicalAttributesUpdatedetails', JSON.stringify(obj1));
            },
            submitAboutFamilyData: function(obj) {
                return http.get(editviewapp.apipathold + 'CustomerPersonal/getParents_AboutMyFamily', { params: obj });
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editParentService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editPartnerpreferenceModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editPartnerpreferenceModel.init();
             vm.model.scope = scope;
         };

         vm.init();

     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editPartnerpreferenceCtrl', controller);

     controller.$inject = ['editPartnerpreferenceModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';

    function factory(editPartnerpreferenceService, authSvc, alertss, commonFactory, uibModal, stateParams) {
        var model = {};
        model.scope = {};

        //start declaration block
        model.partnerPrefArr = [];
        model.partnerObj = {};
        model.ageGapArr = [];
        model.partnerDescObj = {};
        var isSubmit = true;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //  model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.partnerDescription = '';

        //end declaration block

        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.pageload();

            return model;
        };

        model.pageload = function() {
            editPartnerpreferenceService.getPartnerPreferenceData(custID).then(function(response) {
                model.partnerPrefArr = response.data;
                model.partnerDescription = (model.partnerPrefArr.length > 0 && model.partnerPrefArr[0].PartnerDescripition !== undefined && model.partnerPrefArr[0].PartnerDescripition !== null) ? model.partnerPrefArr[0].PartnerDescripition : '';

                model.partnermodifiedby = (model.partnerPrefArr.length > 0 && model.partnerPrefArr[0].EmpLastModificationDate !== undefined && model.partnerPrefArr[0].EmpLastModificationDate !== null) ? model.partnerPrefArr[0].EmpLastModificationDate : '';
                console.log(model.partnerPrefArr);
            });
        };
        model.removeSelect = function(data) {
            if (data[0] !== undefined && angular.lowercase(data[0].title) === '--select--') {
                data.splice(0, 1);
            }

            return data;
        };
        model.SplitstringintoArray = function(string) {
            var array = [];
            if (string !== null && string !== "") {
                _.each(string.split(','), function(item) {
                    array.push(parseInt(item));
                });
            }
            return array;
        };
        model.partnerprefPopulate = function(item) {
            isSubmit = true;
            model.partnerObj = {};

            model.popupdata = model.partnerPreference;
            model.popupHeader = 'Partnerprefernece details';
            if (item !== undefined) {
                model.eventType = 'edit';

                model.intCusID = item.intCusID;
                model.genderId = item.Gender === 'Female' ? 2 : 1;
                model.fromAgeId = item.Agemin;
                model.toAgeId = item.AgeMax;
                model.fromheightId = item.MinHeight;
                model.toheightId = item.MaxHeight;
                model.religionId = model.SplitstringintoArray(item.religionid);
                model.mothertongueId = model.SplitstringintoArray(item.MotherTongueID);
                model.casteId = model.SplitstringintoArray(item.casteid);
                model.subCasteId = model.SplitstringintoArray(item.subcasteid);
                model.maritalstatusId = item.maritalstatusid;
                model.eduCatgoryId = model.SplitstringintoArray(item.EducationCategoryID);
                model.eduGroupId = model.SplitstringintoArray(item.EducationGroupID);
                model.employedinId = model.SplitstringintoArray(item.ProfessionCategoryID);
                model.profGroupId = model.SplitstringintoArray(item.ProfessionGroupID);
                model.countryId = model.SplitstringintoArray(item.CountryID);
                model.stateId = model.SplitstringintoArray(item.StateID);
                model.regionId = model.SplitstringintoArray(item.regionId);
                model.branchId = model.SplitstringintoArray(item.branchid);
                model.dietId = item.DietID;
                model.kujadoshamId = item.KujaDoshamID;
                model.starLanguageId = item.StarLanguageID;
                model.starPreferenceId = item.TypeOfStar;
                model.lstPreferredStars = model.SplitstringintoArray(item.PreferredStars);
                model.Domicile = item.Domicel === 'India' ? 0 : (item.Domicel === 'abroad' ? 1 : (item.Domicel === 'All' ? 2 : ''));

            }
            commonFactory.open('partnerPrefContent.html', model.scope, uibModal);
        };

        model.partnerdescPopulate = function(item) {
            isSubmit = true;

            model.popupdata = model.aboutPartnerDescription;
            model.popupHeader = 'Partner Description';
            if (item !== undefined) {
                model.eventType = 'edit';
                model.partnerDescriptionId = item.PartnerDescripition;
            }
            commonFactory.open('partnerDescContent.html', model.scope, uibModal);

        };
        model.cancel = function() {
            commonFactory.closepopup();
        };


        model.partnerDescriptionSubmit = function(obj) {

            if (isSubmit) {
                isSubmit = false;

            }
        };
        model.updateData = function(inObj, type) {
            if (isSubmit) {
                isSubmit = false;
                switch (type) {
                    case 'Partnerprefernece details':

                        inObj.GetDetails.CustID = custID;

                        model.submitPromise = editPartnerpreferenceService.submitPartnerPrefData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                editPartnerpreferenceService.getPartnerPreferenceData(custID).then(function(response) {
                                    model.partnerPrefArr = response.data;
                                    console.log(model.partnerPrefArr);
                                });
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'PartnerPreference Details Submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'PartnerPreference Details Updation failed', 4500);
                            }
                        });
                        break;
                    case 'Partner Description':
                        model.submitPromise = editPartnerpreferenceService.submitPartnerDescData({ CustID: custID, AboutYourself: inObj.GetDetails.AboutYourself, flag: 1 }).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === '1') {
                                model.partnerDescription = inObj.GetDetails.AboutYourself;
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Partner Description Submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Partner Description Updation failed', 4500);
                            }
                        });

                        break;
                };
            }

        };

        model.partnerPreference = [
            { lblname: 'Gender', controlType: 'radio', ngmodel: 'genderId', arrbind: 'gender', parameterValue: 'GenderID' },
            { lblname: 'Age Gap', controlType: 'doublemultiselect', ngmodelSelect1: 'fromAgeId', ngmodelSelect2: 'toAgeId', typeofdata: 'ageBind', required: true, parameterValue1: 'AgeGapFrom', parameterValue2: 'AgeGapTo' },
            { lblname: 'Height', controlType: 'doublemultiselect', ngmodelSelect1: 'fromheightId', ngmodelSelect2: 'toheightId', required: true, typeofdata: 'heightregistration', parameterValue1: 'HeightFrom', parameterValue2: 'HeightTo' },
            { lblname: 'Religion', controlType: 'multiselect', ngmodel: 'religionId', typeofdata: 'Religion', required: true, secondParent: 'mothertongueId', childName: 'caste', changeApi: 'castedependency', parameterValue: 'Religion' },
            { lblname: 'Mother tongue', controlType: 'multiselect', ngmodel: 'mothertongueId', typeofdata: 'Mothertongue', required: true, secondParent: 'religionId', childName: 'caste', changeApi: 'castedependency', parameterValue: 'Mothertongue' },
            { lblname: 'Caste', controlType: 'Changemultiselect', ngmodel: 'casteId', parentName: 'caste', required: true, childName: 'subCaste', changeApi: 'subCasteBind', parameterValue: 'Caste' },
            { lblname: 'Subcaste', controlType: 'Changemultiselect', ngmodel: 'subCasteId', typeofdata: 'Religion', parentName: 'subCaste', parameterValue: 'Subcaste' },
            { lblname: 'Marital status', controlType: 'multiselect', ngmodel: 'maritalstatusId', typeofdata: 'MaritalStatus', required: true, parameterValue: 'Maritalstatus' },
            { lblname: 'Education category', controlType: 'multiselect', ngmodel: 'eduCatgoryId', typeofdata: 'educationcategory', childName: 'educationgroup', changeApi: 'EducationGroup', parameterValue: 'Educationcategory' },
            { lblname: 'Education group', controlType: 'Changemultiselect', ngmodel: 'eduGroupId', typeofdata: 'Religion', parentName: 'educationgroup', parameterValue: 'Educationgroup' },
            { lblname: 'Employed in', controlType: 'multiselect', ngmodel: 'employedinId', typeofdata: 'ProfCatgory', parameterValue: 'Employedin' },
            { lblname: 'Profession group', controlType: 'multiselect', ngmodel: 'profGroupId', typeofdata: 'ProfGroup', parameterValue: 'Professiongroup' },
            { lblname: 'Domicile', controlType: 'radio', ngmodel: 'domicileId', arrbind: 'Domicile', parameterValue: 'Domacile' },
            { lblname: 'Preferred country', controlType: 'multiselect', ngmodel: 'countryId', typeofdata: 'Country', childName: 'state', changeApi: 'stateSelect', parameterValue: 'Preferredcountry' },
            { lblname: 'Preferred state', controlType: 'Changemultiselect', ngmodel: 'stateId', typeofdata: 'Religion', parentName: 'state', parameterValue: 'Preferredstate' },
            { lblname: 'Region', controlType: 'multiselect', ngmodel: 'regionId', typeofdata: 'region', childName: 'branch', changeApi: 'branch', parameterValue: 'Region' },
            { lblname: 'Branch', controlType: 'Changemultiselect', ngmodel: 'branchId', parentName: 'branch', parameterValue: 'Branch' },
            { lblname: 'Diet', controlType: 'radio', ngmodel: 'dietId', arrbind: 'Diet', parameterValue: 'Diet' },
            { lblname: 'Manglik/Kuja dosham', controlType: 'radio', ngmodel: 'kujadoshamId', arrbind: 'Kujadosham', parameterValue: 'ManglikKujadosham' },
            { lblname: 'Preferred star Language', controlType: 'radio', ngmodel: 'starLanguageId', arrbind: 'preferredStarlanguage', childName: 'star', changeApi: 'stars', parameterValue: 'PreferredstarLanguage' },
            { lblname: 'Star Preference', controlType: 'radio', ngmodel: 'starPreferenceId', arrbind: 'StarPreference', parameterValue: 'TypeofStar' },
            { lblname: '', controlType: 'Changemultiselect', ngmodel: 'lstPreferredStars', parentName: 'star', parameterValue: 'PrefredStars' },
            { lblname: '', controlType: 'break' }

        ];

        model.aboutPartnerDescription = [
            { lblname: '', controlType: 'about', required: true, ngmodel: 'partnerDescriptionId', parameterValue: 'AboutYourself' },
        ];

        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editPartnerpreferenceModel', factory);

    factory.$inject = ['editPartnerpreferenceService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getPartnerPreferenceData: function(obj) {
                return http.get(editviewapp.apipathold + 'CustomerPersonal/getCustomerpartnerpreferencesDetailsDisplay', { params: { CustID: obj } });
            },
            submitPartnerPrefData: function(obj1) {
                return http.post(editviewapp.apipathold + 'CustomerPersonalUpdate/CustomerPartnerPreferencesUpdatedetails', JSON.stringify(obj1));
            },
            submitPartnerDescData: function(obj) {
                return http.get(editviewapp.apipathold + 'CustomerPersonal/getPartnerpreference_DiscribeYourPartner', { params: obj });
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editPartnerpreferenceService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editProfileSettingModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editProfileSettingModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editProfileSettingCtrl', controller);

     controller.$inject = ['editProfileSettingModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(editProfileSettingService, authSvc, alertss, commonFactory, uibModal, stateParams) {

        var model = {};
        model.scope = {};

        // var logincustid = authSvc.getCustId();
        var custID = stateParams.CustID;
        //  logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        model.profileSettingArr = [];
        model.ConfidentialArr = [];
        model.profileDisplayArr = [];
        model.gradeSelectionArr = [];

        model.psObj = {};
        model.csObj = {};
        model.psdObj = {};
        model.gradeObj = {};


        model.init = function() {
            custID = stateParams.CustID;
            model.pageload();
            return model;
        };


        model.pageload = function() {

            editProfileSettingService.getProfileSettingData(custID).then(function(response) {

                if (response.data.length > 0) {
                    model.profileSettingArr = response.data[0].length > 0 ? JSON.parse(response.data[0]) : [];
                    model.ConfidentialArr = response.data[1].length > 0 ? JSON.parse(response.data[1]) : [];
                    model.profileDisplayArr = response.data[2].length > 0 ? JSON.parse(response.data[2]) : [];
                    model.gradeSelectionArr = response.data[3] !== undefined && response.data[3].length > 0 ? JSON.parse(response.data[3]) : [];
                    console.log(model.ConfidentialArr);
                }
            });
        };


        model.populategrade = function(item) {
            return item === 'A' ? '216' : (item === 'B' ? '217' : (item === 'C' ? '218' : (item === 'D' ? '219' : 0)));
        };

        model.showprofilepopup = function(type, item) {

            switch (type) {

                case 'profileSetting':
                    model.popupdata = model.profileSetting;
                    model.popupHeader = 'Profile Settings';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.rdlapplicationstatus = item.ProfileStatusID;
                        model.txtnoofdaysinactive = item.NoofDaysinactivated;
                        model.txtreasonforinactive = item.Reason4InActive;
                        model.ddlrequestedby = item.RequestedByGenericID;
                        model.rdlprofilegrade = item.ProfileGradeID;
                    }

                    break;

                case 'profileDisplay':
                    model.popupdata = model.profileSettingDisplay;
                    model.popupHeader = 'Profile Display Settings';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.rdldisplayin = item.ProfileDisplayNameID;
                        model.rdlpwdblock = item.LoginStatusNameID;
                        model.txtblockedreason = item.ProfileBlockReason;
                    }

                    break;

                case 'confidential':
                    model.eventType = 'edit';
                    model.popupdata = model.confidentialSetting;
                    model.popupHeader = 'Confidential Settings';
                    model.chkisconfidential = item.ConfindentialStatusID === true ? true : false;
                    model.chkvryhighconfidential = item.HighConfidentialStatusID === 1 ? true : false;
                    break;

                case 'grading':
                    model.popupdata = model.gradeSelection;
                    model.popupHeader = 'Grade Selections';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.ddlfamilyGrade = model.populategrade(item.FamilyGrade);
                        model.ddlphotoGrade = model.populategrade(item.PhotoGrade);
                        model.ddlEducationgrade = model.populategrade(item.EducationGrade);
                        model.ddlProfessionGrade = model.populategrade(item.ProfileGrade);
                        model.ddlpropertyGrade = model.populategrade(item.PropertyGrade);
                    }

                    break;
            }

            commonFactory.open('commonProfileSettingpopup.html', model.scope, uibModal);
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };


        model.profileSettingAndDispalySubmit = function(IProfileDisplayName, ILoginStatusName, IBlockedreason, ITypeofReport, Icurrentprofilestatusid, Iprofilegrade, INoofDaysinactivated, IReason4InActive,
            IRequestedBy) {

            model.Mobj = {
                intCusID: custID,
                EmpID: '2',
                currentprofilestatusid: Icurrentprofilestatusid,
                profilegrade: Iprofilegrade,
                NoofDaysinactivated: INoofDaysinactivated,
                Reason4InActive: IReason4InActive,
                RequestedBy: Icurrentprofilestatusid === 55 || Icurrentprofilestatusid === '55' ? IRequestedBy : null,
                TypeofReport: ITypeofReport,

                ProfileDisplayName: IProfileDisplayName,
                LoginStatusName: ILoginStatusName,
                Admin: null,
                Blockedreason: IBlockedreason
            };

            editProfileSettingService.submitProfileSettingAndDispalyData(model.Mobj).then(function(response) {
                console.log(response);

                commonFactory.closepopup();

                if (response.data === 1) {
                    model.pageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Profile Settings Submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Profile Settings Updation failed', 4500);
                }
            });

        };


        model.getChkVals = function(val) {
            return val === true ? 1 : 0;
        };



        model.updateData = function(inObj, type) {

            switch (type) {
                case 'Profile Settings':

                    model.profileSettingAndDispalySubmit('', '', '', "ProfileSettings", inObj.GetDetails.rdlapplicationstatus, inObj.GetDetails.rdlprofilegrade, inObj.GetDetails.txtnoofdaysinactive, inObj.GetDetails.txtreasonforinactive,
                        inObj.GetDetails.ddlrequestedby);

                    break;

                case 'Profile Display Settings':
                    model.profileSettingAndDispalySubmit(inObj.GetDetails.rdldisplayin, inObj.GetDetails.rdlpwdblock, inObj.GetDetails.txtblockedreason, 'DisplaySettings');
                    break;

                case 'Confidential Settings':
                    editProfileSettingService.confidentialSubmit(custID, model.getChkVals(inObj.GetDetails.chkisconfidential), model.getChkVals(inObj.GetDetails.chkvryhighconfidential), '2').then(function(response) {
                        console.log(response);
                        commonFactory.closepopup();
                        if (response.data !== undefined && response.data.length > 0) {
                            if (JSON.parse(response.data[0])[0].STATUS === 1) {
                                model.pageload();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Confidential Status Submitted Succesfully', 4500);
                            }
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Confidential Status Updation failed', 4500);
                        }
                    });
                    break;

                case 'Grade Selections':
                    model.Mobj = inObj.GetDetails;
                    model.Mobj.CustID = custID;
                    model.Mobj.EmpID = inObj.customerpersonaldetails.EmpID;

                    editProfileSettingService.submitGradeData(model.Mobj).then(function(response) {
                        console.log(response);

                        commonFactory.closepopup();
                        if (response.data === 1) {
                            model.pageload();
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Grade Selections Submitted Succesfully', 4500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Grade Selections Updation failed', 4500);
                        }
                    });

                    break;
            }

        };
        model.hideifActive = function() {
            if (parseInt(model.rdlapplicationstatus) === 54) {
                model.txtnoofdaysinactive = '';
                model.txtreasonforinactive = '';
                model.ddlrequestedby = '';
                return false;
            }
            return true;
        };

        model.profileSetting = [
            { lblname: 'Application Status', controlType: 'radio', ngmodel: 'rdlapplicationstatus', ownArray: 'AplicationStatusArr', parameterValue: 'rdlapplicationstatus' },
            { lblname: 'No of Days to be inactivated ', controlType: 'textbox', ngmodel: 'txtnoofdaysinactive', parameterValue: 'txtnoofdaysinactive', parentDependecy: 'hideifActive' },
            { lblname: 'Reason for InActive', controlType: 'textareaSide', ngmodel: 'txtreasonforinactive', parameterValue: 'txtreasonforinactive', parentDependecy: 'hideifActive' },
            { lblname: 'Requested By', controlType: 'select', ngmodel: 'ddlrequestedby', typeofdata: 'childStayingWith', parameterValue: 'ddlrequestedby', parentDependecy: 'hideifActive' },
            { lblname: 'Profile Grade', controlType: 'radio', ngmodel: 'rdlprofilegrade', ownArray: 'profileGrade', parameterValue: 'rdlprofilegrade' },
        ];

        model.profileSettingDisplay = [
            { lblname: 'Display In', controlType: 'radio', ngmodel: 'rdldisplayin', ownArray: 'profileDisplayIn', parameterValue: 'rdldisplayin' },
            { lblname: 'Password Block/Release ', controlType: 'radio', ngmodel: 'rdlpwdblock', ownArray: 'blockReleseArr', parameterValue: 'rdlpwdblock' },
            { lblname: 'Reason', controlType: 'textarea', ngmodel: 'txtblockedreason', parameterValue: 'txtblockedreason' }
        ];

        model.confidentialSetting = [
            { lblname: 'isConfidential', controlType: 'checkbox', ngmodel: 'chkisconfidential', ownArray: 'AplicationStatusArr', parameterValue: 'chkisconfidential' },
            { lblname: 'Very High Confidential', controlType: 'checkbox', ngmodel: 'chkvryhighconfidential', parameterValue: 'chkvryhighconfidential' }
        ];

        model.gradeSelection = [
            { lblname: 'Education', controlType: 'select', ngmodel: 'ddlEducationgrade', typeofdata: 'gradeSelection', parameterValue: 'GEducation' },
            { lblname: 'Profession', controlType: 'select', ngmodel: 'ddlProfessionGrade', typeofdata: 'gradeSelection', parameterValue: 'GProfession' },
            { lblname: 'Property', controlType: 'select', ngmodel: 'ddlpropertyGrade', typeofdata: 'gradeSelection', parameterValue: 'GProperty' },
            { lblname: 'Family', controlType: 'select', ngmodel: 'ddlfamilyGrade', typeofdata: 'gradeSelection', parameterValue: 'GFamily' },
            { lblname: 'Photo', controlType: 'select', ngmodel: 'ddlphotoGrade', typeofdata: 'gradeSelection', parameterValue: 'GPhotos' },
            { lblname: '', controlType: 'break' }
        ];

        model.profileDisplayIn = [
            { "label": "Only Online", "title": "Only Online", "value": 279 },
            { "label": "Onlly Offline", "title": "Onlly Offline", "value": 280 },
            { "label": "Both", "title": "Both", "value": 434 }
        ];

        model.blockReleseArr = [
            { "label": "Allow", "title": "Allow", "value": 439 },
            { "label": "Block", "title": "Block", "value": 440 },
        ];


        model.AplicationStatusArr = [
            { "label": "Active", "title": "Active", "value": 54 },
            { "label": "Inactive", "title": "Inactive", "value": 55 }
        ];

        model.profileGrade = [
            { "label": "A", "title": "A", "value": 1 },
            { "label": "B", "title": "B", "value": 2 },
            { "label": "C", "title": "C", "value": 3 }
        ];




        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editProfileSettingModel', factory);

    factory.$inject = ['editProfileSettingService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getProfileSettingData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerprofilesettingDetails', { params: { CustID: obj } });
            },
            submitGradeData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerProfileSetting_Gradeselection', JSON.stringify(obj1));
            },
            submitProfileSettingAndDispalyData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerProfileSetting_ProfileSetting', JSON.stringify(obj1));
            },
            confidentialSubmit: function(custid, confidential, Hconfidential, empid) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerPersonaloffice_purpose', {
                    params: { flag: '7', ID: custid, AboutProfile: empid, IsConfidential: confidential, HighConfendential: Hconfidential }
                });
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editProfileSettingService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editPropertyModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editPropertyModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editPropertyCtrl', controller);

     controller.$inject = ['editPropertyModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(editPropertyService, authSvc, alertss, commonFactory, uibModal, stateParams) {
        var model = {};
        model.scope = {};

        //declaration part
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        model.propertyArr = [];
        model.proObj = {};

        var isSubmit = true;
        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //  model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        //end declaration block

        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.pageload();

            return model;
        };

        model.pageload = function() {
            editPropertyService.getPropertyData(custID).then(function(response) {
                model.propertyArr = response.data;
                model.propertymodifiedby = (model.propertyArr.length > 0 && model.propertyArr[0].EmpLastModificationDate !== undefined && model.propertyArr[0].EmpLastModificationDate !== null) ? model.propertyArr[0].EmpLastModificationDate : '';
            });
        };

        model.populateProperty = function(item) {
            isSubmit = true;
            model.Custpropertyid = null;
            model.eventType = 'add';
            model.RefrenceCust_Reference_ID = null;
            model.popupdata = model.Refrence;
            model.popupHeader = 'Property Details';
            if (item !== undefined) {
                model.eventType = 'edit';
                model.Custpropertyid = item.Custpropertyid;
                model.ddlFamilyStatus = item.FamilyValuesID;
                model.rdlSharedProperty = item.SharedPropertyID === true ? 1 : 0;
                model.txtValueofproperty = item.PropertyValue;
                model.txtPropertydesc = item.PropertyDetails;
            }
            commonFactory.open('propertyContent.html', model.scope, uibModal);

        };


        model.updateData = function(inObj, type) {

            if (isSubmit) {
                isSubmit = false;
                inObj.GetDetails.PropertyType = '281';
                inObj.GetDetails.Custpropertyid = model.Custpropertyid;
                inObj.GetDetails.PropertyID = model.Custpropertyid;
                inObj.GetDetails.CustId = custID;
                model.submitPromise = editPropertyService.submitPropertyData(inObj).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        editPropertyService.getPropertyData(custID).then(function(response) {
                            model.propertyArr = response.data;
                        });
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Property Details Submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Property Details Updation failed', 4500);
                    }
                });
            }

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };
        //performance code
        model.Refrence = [
            { lblname: 'Family Status', controlType: 'select', ngmodel: 'ddlFamilyStatus', typeofdata: 'familyStatus', parameterValue: 'FamilyStatus' },
            { lblname: 'Is shared property', controlType: 'radio', ngmodel: 'rdlSharedProperty', arrbind: 'boolType', parameterValue: 'Issharedproperty' },
            { lblname: 'Value of property', controlType: 'textboxNumber', maxLength: 5, span: true, spanText: 'Lakhs', ngmodel: 'txtFname', parameterValue: 'Valueofproperty' },
            {
                lblname: 'Property description',
                controlType: 'textarea',
                ngmodel: 'txtPropertydesc',
                parameterValue: 'Propertydescription'
            }

        ];
        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editPropertyModel', factory);

    factory.$inject = ['editPropertyService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getPropertyData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getPropertyDetailsDisplay', { params: { CustID: obj } });
            },
            submitPropertyData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerPropertyUpdatedetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editPropertyService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editReferenceModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editReferenceModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editReferenceCtrl', controller);

     controller.$inject = ['editReferenceModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(editReferenceService, authSvc, alertss, commonFactory, uibModal, SelectBindService, stateParams) {
        var model = {};
        model.scope = {};

        //declaration part

        model.ReferenceArr = [];
        model.refObj = {};
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        model.deleteDisplayTxt = 'reference';
        var isSubmit = true;
        model.identityID = 0;
        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //  model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        //end declaration block
        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.pageload();
            return model;
        };


        model.referencePopulate = function(item) {
            isSubmit = true;
            model.eventType = 'add';
            model.RefrenceCust_Reference_ID = null;
            model.popupdata = model.Refrence;
            model.popupHeader = 'Refrence';
            if (item !== undefined) {
                model.eventType = 'edit';
                model.intCusID = custID;
                model.RefrenceCust_Reference_ID = item.RefrenceCust_Reference_ID;
                model.ddlRelationshiptype = 318;
                model.txtFname = item.ReferenceFirstName;
                model.txtLname = item.ReferenceLastName;
                model.txtProfessiondetails = item.RefrenceProfessionDetails;
                model.ddlCountry = commonFactory.checkvals(item.RefrenceCountry) ? parseInt(item.RefrenceCountry) : null;
                model.ddlState = commonFactory.checkvals(item.RefrenceStateID) ? parseInt(item.RefrenceStateID) : null;
                model.ddlDistrict = commonFactory.checkvals(item.RefrenceDistrictID) ? parseInt(item.RefrenceDistrictID) : null;
                model.txtNativePlace = item.RefrenceNativePlaceID;
                model.txtPresentlocation = item.RefenceCurrentLocation;

                model.ddlMobileCountryID = commonFactory.checkvals(item.RefrenceMobileCountryID) ? parseInt(item.RefrenceMobileCountryID) : null;

                model.txtMobileNumber = item.RefrenceMobileNumberID;

                if (commonFactory.checkvals(item.RefrenceAreaCode)) {
                    model.ddlLandLineCountryID = commonFactory.checkvals(item.RefrenceLandCountryId) ? parseInt(item.RefrenceLandCountryId) : null;
                    model.txtAreCode = item.RefrenceAreaCode;
                    model.txtLandNumber = item.RefrenceLandNumber;

                } else {
                    model.ddlMobileCountryID2 = commonFactory.checkvals(item.RefrenceLandCountryId) ? parseInt(item.RefrenceLandCountryId) : null;
                    model.txtMobileNumber2 = item.RefrenceLandNumber;
                }

                model.txtEmails = item.RefrenceEmail;
                model.txtNarrations = item.RefrenceNarration;
            }
            commonFactory.open('referenceContent.html', model.scope, uibModal);

        };

        model.pageload = function() {
            editReferenceService.getReferenceData(custID).then(function(response) {
                model.ReferenceArr = response.data;
                console.log(model.ReferenceArr);
                model.referencemodifiedby = (model.ReferenceArr !== undefined && model.ReferenceArr.length > 0 && model.ReferenceArr[0].EmpLastModificationDate !== undefined && model.ReferenceArr[0].EmpLastModificationDate !== null) ? model.ReferenceArr[0].EmpLastModificationDate : '';
            });
        };

        model.updateData = function(inObj, type) {
            if (isSubmit) {
                isSubmit = false;
                inObj.GetDetails.CustID = custID;
                inObj.GetDetails.Cust_Reference_ID = model.RefrenceCust_Reference_ID;
                model.submitPromise = editReferenceService.submitReferenceData(inObj).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.pageload();
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Reference Details Submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Reference Details Updation failed', 4500);
                    }
                });

            }
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };


        model.DeletePopup = function(id) {
            model.identityID = id;
            commonFactory.open('common/templates/deletepopup.html', model.scope, uibModal, 'sm');
        };

        model.deleteSubmit = function(type) {
            SelectBindService.DeleteSection({ sectioname: 'Reference', CustID: custID, identityid: model.identityID }).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                model.pageload();
            });
        };

        //performance code
        model.Refrence = [
            { lblname: 'Relationship type', controlType: 'select', ngmodel: 'ddlRelationshiptype', required: true, typeofdata: 'RelationshipType', parameterValue: 'RelationshiptypeID' },
            { lblname: 'First name', controlType: 'textbox', ngmodel: 'txtFname', required: true, parameterValue: 'Firstname' },
            { lblname: 'Last name', controlType: 'textbox', ngmodel: 'txtLname', required: true, parameterValue: 'Lastname' },
            { lblname: 'Profession', controlType: 'textbox', ngmodel: 'txtProfessiondetails', parameterValue: 'Professiondetails' },
            {
                lblname: 'country',
                controlType: 'country',
                countryshow: true,
                cityshow: false,
                othercity: false,
                dcountry: 'ddlCountry',
                dstate: 'ddlState',
                ddistrict: 'ddlDistrict',
                countryParameterValue: 'CountryID',
                stateParameterValue: 'StateID',
                districtParameterValue: 'DistrictID',

            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'txtNativePlace', parameterValue: 'Nativeplace' },
            { lblname: 'Present location', controlType: 'textbox', ngmodel: 'txtPresentlocation', parameterValue: 'Presentlocation' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'ddlMobileCountryID',
                strmobile: 'txtMobileNumber',
                dalternative: 'ddlMobileCountryID2',
                stralternative: 'txtMobileNumber2',
                dland: 'ddlLandLineCountryID',
                strareacode: 'txtAreCode',
                strland: 'txtLandNumber',
                strmail: 'txtEmails',

                mobileCodeIdParameterValue: 'MobileCountryID',
                mobileNumberParameterValue: 'MobileNumber',
                landCountryCodeIdParameterValue: 'LandLineCountryID',
                landAreaCodeIdParameterValue: 'LandLineAreaCode',
                landNumberParameterValue: 'LandLineNumber',
                emailParameterValue: 'Emails'

            },
            {
                lblname: 'Narration',
                controlType: 'textarea',
                ngmodel: 'txtNarrations',
                parameterValue: 'Narration'
            }

        ];

        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editReferenceModel', factory);

    factory.$inject = ['editReferenceService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'SelectBindService', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getReferenceData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getReferenceViewDetailsDisplay', { params: { CustID: obj } });
            },
            submitReferenceData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerReferencedetailsUpdatedetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editReferenceService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editRelativeModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editRelativeModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editRelativeCtrl', controller);

     controller.$inject = ['editRelativeModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(editRelativeService, authSvc, alertss, commonFactory, uibModal, SelectBindService, stateParams) {
        var model = {};
        model.scope = {};

        //declaration part
        model.fbObj = {};
        model.fsObj = {};
        model.mbObj = {};
        model.msObj = {};
        var isSubmit = true;
        model.deleteDisplayTxt = '';
        model.identityID = 0;
        model.ddlFSHCountryID = 1;
        // var logincustid = authSvc.getCustId();
        var custid = model.CustID = stateParams.CustID;
        //  model. = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        //end declaration block
        model.init = function() {
            custid = model.CustID = stateParams.CustID;
            model.relativePageLoad();
            return model;
        };

        model.relativePageLoad = function() {
            editRelativeService.getRelativeeData(custid).then(function(response) {
                model.FBArr = JSON.parse(response.data[0]);
                model.FSArr = JSON.parse(response.data[1]);
                model.MBrr = JSON.parse(response.data[2]);
                model.MSArr = JSON.parse(response.data[3]);

                model.FBemodifiedby = (model.FBArr.length > 0 && model.FBArr[0].EmpLastModificationDate !== undefined && model.FBArr[0].EmpLastModificationDate !== null) ? model.FBArr[0].EmpLastModificationDate : '';
                model.FSmodifiedby = (model.FSArr.length > 0 && model.FSArr[0].EmpLastModificationDate !== undefined && model.FSArr[0].EmpLastModificationDate !== null) ? model.FSArr[0].EmpLastModificationDate : '';
                model.MBmodifiedby = (model.MBrr.length > 0 && model.MBrr[0].EmpLastModificationDate !== undefined && model.MBrr[0].EmpLastModificationDate !== null) ? model.MBrr[0].EmpLastModificationDate : '';
                model.MSmodifiedby = (model.MSArr.length > 0 && model.MSArr[0].EmpLastModificationDate !== undefined && model.MSArr[0].EmpLastModificationDate !== null) ? model.MSArr[0].EmpLastModificationDate : '';

            });
        };

        model.relativePopulatePopulate = function(type, item) {
            isSubmit = true;
            model.eventType = 'add';
            switch (type) {
                case 'FB':
                    model.FatherbrotherCustfamilyID = null;
                    model.popupdata = model.fatherBrother;
                    model.popupHeader = "Father's Brother Details";
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.FatherbrotherCustfamilyID = item.FatherbrotherCustfamilyID;
                        model.rdlFBElderORyounger = item.FatherBrotherElderyounger == 'Elder' ? 324 : (item.FatherBrotherElderyounger == 'Younger' ? 323 : '-1');
                        model.txtFatherbrothername = item.FatherbrotherName;
                        model.txtFBEducationdetails = item.FatherBrotherEducationDetails;
                        model.txtFBProfessiondetails = item.FatherbrotherProfessionDetails;

                        model.ddlFBMobileCountryID = item.FatherbrotherMobileCode;
                        model.txtFBMobileNumber = item.FatherbrotherMobileNumber;

                        if (commonFactory.checkvals(item.FatherbrotherLandaraecode)) {
                            model.ddlFBLandLineCountry = item.FatherbrotherLandCountryCode;
                            model.txtFBAreCode = item.FatherbrotherLandaraecode;
                            model.txtFBLandNumber = item.FatherbrotherLandNumber;
                        } else {
                            model.ddlFBMobileCountryID2 = item.FatherbrotherLandCountryCode;
                            model.txtFBMobileNumber2 = item.FatherbrotherLandNumber;
                        }

                        model.txtFBEmails = item.FatherbrotherEmail;
                        model.txtCurrentLocation = item.FatherbrotherCurrentLocation;

                    }
                    commonFactory.open('ModalContent.html', model.scope, uibModal);

                    break;

                case 'FS':
                    model.FatherSisterCustfamilyID = null;
                    model.popupdata = model.fatherSister;
                    model.popupHeader = "Father's Sister Details";
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.FatherSisterCustfamilyID = item.FatherSisterCustfamilyID;
                        model.rdlFSElderYounger = item.FatherSisterElderyounger == 'Elder' ? 326 : (item.FatherSisterElderyounger == 'Younger' ? 325 : '-1');
                        model.txtFathersistername = item.FatherSisterName;
                        model.txtFSHusbandfirstname = item.SpouceFName;
                        model.txtFSHusbandlastname = item.SpoucelName;
                        model.txtFSHEDucation = item.FatherSisterSpouseEducationDetails;
                        model.txtFSProfessiondetails = item.FathersisterSpouseProfessionDetails;
                        model.ddlFSHStateID = item.FatherSisterspousestateId;
                        model.ddlFSHDistrictID = item.FatherSisterspouseDistrictId;
                        model.txtFSHNativePlace = item.FathersisterSpouseNativePlace;

                        model.ddlFSMObileCountryID = item.FatherSisterMobilecodeid;
                        model.txtFSMobileNumber = item.FatherSisterspouseMobileNumber;


                        if (commonFactory.checkvals(item.FatherSisterspouseLandaraecode)) {
                            model.ddlFSHLandCountryID = item.FatherSisterlandcontrycodeid;
                            model.txtFSHAreaNumber = item.FatherSisterspouseLandaraecode;
                            model.txtFSHNUmber = item.FatherSisterspouseLandNumber;

                        } else {
                            model.ddlFSMObileCountryID2 = item.FatherSisterlandcontrycodeid;
                            model.txtFSMobileNumber2 = item.FatherSisterspouseLandNumber;
                        }

                        model.txtFSHEmails = item.FatherSisterspouseEmail;
                        model.txtFSHCurrentLocation = item.FatherSisterCurrentLocation;
                    }
                    commonFactory.open('ModalContent.html', model.scope, uibModal);

                    break;

                case 'MB':
                    model.MotherBrotherCustfamilyID = null;
                    model.popupdata = model.motherBrother;
                    model.popupHeader = "Mother's Brother Details";
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.MotherBrotherCustfamilyID = item.MotherBrotherCustfamilyID;
                        model.rdlMBElderYounger = item.MotherBrotherElderyounger == 'Elder' ? 328 : (item.MotherBrotherElderyounger == 'Younger' ? 327 : '-1');
                        model.txtMBName = item.MotherBrotherName;
                        model.txtMBEducation = item.MotherBrotherEducationDetails;
                        model.txtMBProfessiondetails = item.MotherBrotherProfessionDetails;

                        model.ddlMBCountriCode = item.MotherBrotherMobileCode;
                        model.txtMBMobileNum = item.MotherBrotherMobileNumber;


                        if (commonFactory.checkvals(item.MotherBrotherLandaraecode)) {
                            model.ddlMBLandLineCountryCode = item.MotherBrotherLandCountryCode;
                            model.txtMBAreaCode = item.MotherBrotherLandaraecode;
                            model.txtMBLandLineNum = item.MotherBrotherLandNumber;

                        } else {
                            model.ddlMBCountriCode2 = item.MotherBrotherLandCountryCode;
                            model.txtMBMobileNum2 = item.MotherBrotherLandNumber;
                        }

                        model.txtMBEmails = item.MotherBrotherEmail;
                        model.txtMBCurrentLocation = item.MotherBrotherCurrentLocation;
                    }
                    commonFactory.open('ModalContent.html', model.scope, uibModal);

                    break;
                case 'MS':
                    model.MotherSisterCustfamilyID = null;
                    model.popupdata = model.motherSister;
                    model.popupHeader = "Mother's Sister Details";
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.MotherSisterCustfamilyID = item.MotherSisterCustfamilyID;
                        model.rdlMSElderYounger = item.MotherSisterElderyounger == 'Elder' ? 330 : (item.MotherSisterElderyounger == 'Younger' ? 329 : '-1');
                        model.txtMSName = item.MotherSisterName;
                        model.txtMsHusbandfirstname = item.SpouceFName;
                        model.txtMsHusbandlastname = item.SpoucelName;
                        model.ddlMSisState = item.spousestateid;
                        model.ddlMsDistrict = item.spousedistrictID;
                        model.txtMSNativePlace = item.MotherSisterSpouseNativePlace;
                        model.txtMSHEducation = item.MothersisterspouseEducationdetails;
                        model.txtMSProfessiondetails = item.MotherSisterProfessionDetails;

                        model.ddlMSCounCodeID = item.MotherSisterMobileCodeId;
                        model.txtMSMObileNum = item.MotherSisterspouseMobileNumber;

                        if (commonFactory.checkvals(item.MotherSisterspouseLandaraecode)) {
                            model.ddlMSLLCounCode = item.MotherSisterSpouselandcodeid;
                            model.txtMSArea = item.MotherSisterspouseLandaraecode;
                            model.txtLLNum = item.MotherSisterspouseLandNumber;
                        } else {
                            model.ddlMSCounCodeID2 = item.MotherSisterSpouselandcodeid;
                            model.txtMSMObileNum2 = item.MotherSisterspouseLandNumber;
                        }

                        model.txtMSEmail = item.MotherSisterspouseEmail;
                        model.txtMSCurrentLocation = item.MotherSisterCurrentLocation;
                    }
                    commonFactory.open('ModalContent.html', model.scope, uibModal);

                    break;
            }

        };
        model.updateData = function(inObj, type) {

            switch (type) {
                case "Father's Brother Details":
                    model.FBSubmit(inObj);
                    break;
                case "Father's Sister Details":
                    model.FSSubmit(inObj);
                    break;
                case "Mother's Brother Details":
                    model.MBSubmit(inObj);
                    break;
                case "Mother's Sister Details":
                    model.MSSubmit(inObj);
                    break;
            }
        };

        model.FBSubmit = function(inObj) {
            if (isSubmit) {
                isSubmit = false;
                inObj.GetDetails.CustID = custid;
                inObj.GetDetails.FatherbrotherCust_familyID = model.FatherbrotherCustfamilyID;

                model.submitPromise = editRelativeService.submitFBData(inObj).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', "Father's Brother Details Submitted Succesfully", 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', "Father's Brother Details Updation failed", 4500);
                    }
                });
            }
        };

        model.FSSubmit = function(inObj) {

            if (isSubmit) {
                isSubmit = false;
                inObj.GetDetails.CustID = custid;
                inObj.GetDetails.FatherSisterCust_familyID = model.FatherSisterCustfamilyID;
                model.submitPromise = editRelativeService.submitFSData(inObj).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', "Father's Sister Details Submitted Succesfully", 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', "Father's Sister Details Updation failed", 4500);
                    }
                });
            }
        };

        model.MBSubmit = function(inObj) {
            if (isSubmit) {
                isSubmit = false;


                inObj.GetDetails.CustID = custid;
                inObj.GetDetails.MBMotherBrotherCust_familyID = model.MotherBrotherCustfamilyID;
                model.submitPromise = editRelativeService.submitMBData(inObj).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', "Mother's Brother Details Submitted Succesfully", 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', "Mother's Brother Details Updation failed", 4500);
                    }
                });
            }

        };

        model.MSSubmit = function(inObj) {

            if (isSubmit) {
                isSubmit = false;

                inObj.GetDetails.CustID = custid;
                inObj.GetDetails.MSCust_familyID = model.MotherSisterCustfamilyID;
                model.submitPromise = editRelativeService.submitMSData(inObj).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', "Mother's Sister Details Submitted Succesfully", 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', "Mother's Sister Details Updation failed", 4500);
                    }
                });
            }

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.DeletePopup = function(type, id) {
            model.deleteDisplayTxt = type;
            model.identityID = id;
            commonFactory.open('common/templates/deletepopup.html', model.scope, uibModal, 'sm');
        };

        model.deleteSubmit = function() {
            SelectBindService.DeleteSection({ sectioname: 'Family', CustID: custid, identityid: model.identityID }).then(function(response) {
                console.log(response);
                model.relativePageLoad();
                commonFactory.closepopup();
            });
        };
        //Father Details
        model.fatherBrother = [
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'rdlFBElderORyounger', required: true, ownArray: 'FBElderYounger', parameterValue: 'FBElderYounger' },
            { lblname: "Father's brother name", controlType: 'textbox', ngmodel: 'txtFatherbrothername', required: true, parameterValue: 'Fatherbrothername' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'txtFBEducationdetails', parameterValue: 'FatherBrotherEducationDetails' },
            { lblname: 'Profession', controlType: 'textbox', ngmodel: 'txtFBProfessiondetails', parameterValue: 'FBProfessiondetails' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'ddlFBMobileCountryID',
                strmobile: 'txtFBMobileNumber',
                dalternative: 'ddlFBMobileCountryID2',
                stralternative: 'txtFBMobileNumber2',
                dland: 'ddlFBLandLineCountry',
                strareacode: 'txtFBAreCode',
                strland: 'txtFBLandNumber',
                strmail: 'txtFBEmails',

                mobileCodeIdParameterValue: 'FBMobileCountryID',
                mobileNumberParameterValue: 'FBMobileNumber',
                landCountryCodeIdParameterValue: 'FBLandLineCountryID',
                landAreaCodeIdParameterValue: 'FBLandAreaCode',
                landNumberParameterValue: 'FBLandNumber',
                emailParameterValue: 'FBEmails'

            },
            { lblname: 'Current Location', controlType: 'textbox', ngmodel: 'txtCurrentLocation', parameterValue: 'FBCurrentLocation' },
        ];

        model.fatherSister = [
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'rdlFSElderYounger', required: true, ownArray: 'FSElderYounger', parameterValue: 'FSElderYounger' },
            { lblname: "Father's sister name", controlType: 'textbox', ngmodel: 'txtFathersistername', required: true, parameterValue: 'FSFathersistername' },
            { lblname: "Husband first name", controlType: 'textbox', ngmodel: 'txtFSHusbandfirstname', parameterValue: 'FSHusbandfirstname' },
            { lblname: "Husband last name", controlType: 'textbox', ngmodel: 'txtFSHusbandlastname', parameterValue: 'FSHusbandlastname' },
            { lblname: 'FSH Education', controlType: 'textbox', ngmodel: 'txtFSHEDucation', parameterValue: 'FSHEducationdetails' },
            { lblname: 'FSH Profession', controlType: 'textbox', ngmodel: 'txtFSProfessiondetails', parameterValue: 'FSHProfessiondetails' },

            {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dcountry: 'ddlFSHCountryID',
                dstate: 'ddlFSHStateID',
                ddistrict: 'ddlFSHDistrictID',
                countryParameterValue: 'FSCountryID',
                stateParameterValue: 'FSHStateID',
                districtParameterValue: 'FSHDistrict',

            },
            { lblname: 'Native place', controlType: 'textbox', ngmodel: 'txtFSHNativePlace', parameterValue: 'FSNativeplace' },

            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'ddlFSMObileCountryID',
                strmobile: 'txtFSMobileNumber',
                dalternative: 'ddlFSMObileCountryID2',
                stralternative: 'txtFSMobileNumber2',
                dland: 'ddlFSHLandCountryID',
                strareacode: 'txtFSHAreaNumber',
                strland: 'txtFSHNUmber',
                strmail: 'txtFSHEmails',

                mobileCodeIdParameterValue: 'FSHMobileCountryID',
                mobileNumberParameterValue: 'FSHMObileNumber',
                landCountryCodeIdParameterValue: 'FSHLandCountryID',
                landAreaCodeIdParameterValue: 'FSHLandAreaCode',
                landNumberParameterValue: 'FSHLandNumber',
                emailParameterValue: 'FSHEmails'

            },
            { lblname: 'Current Location', controlType: 'textbox', ngmodel: 'txtFSHCurrentLocation', parameterValue: 'FSCurrentLocation' },
        ];

        //mother Details
        model.motherBrother = [
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'rdlFBElderORyounger', required: true, ownArray: 'MBElderYounger', parameterValue: 'MBElderYounger' },
            { lblname: "Mother's brother name", controlType: 'textbox', ngmodel: 'txtMBName', required: true, parameterValue: 'Motherbrothername' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'txtMBEducation', parameterValue: 'MBEducationdetails' },
            { lblname: 'Profession', controlType: 'textbox', ngmodel: 'txtMBProfessiondetails', parameterValue: 'MBProfessiondetails' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'ddlMBCountriCode',
                strmobile: 'txtMBMobileNum',
                dalternative: 'ddlMBCountriCode2',
                stralternative: 'txtMBMobileNum2',
                dland: 'ddlMBLandLineCountryCode',
                strareacode: 'txtMBAreaCode',
                strland: 'txtMBLandLineNum',
                strmail: 'txtMBEmails',

                mobileCodeIdParameterValue: 'MBMobileCountryID',
                mobileNumberParameterValue: 'MBMObileNumber',
                landCountryCodeIdParameterValue: 'MBLandLineCountryID',
                landAreaCodeIdParameterValue: 'MBLandAreaCode',
                landNumberParameterValue: 'MBLandNumber',
                emailParameterValue: 'MBEmails'

            },
            { lblname: 'Current Location', controlType: 'textbox', ngmodel: 'txtMBCurrentLocation', parameterValue: 'MBCurrentLocation' },
        ];

        model.motherSister = [
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'rdlMSElderYounger', required: true, ownArray: 'MSElderYounger', parameterValue: 'MSElderYounger' },
            { lblname: "Mother's sister name", controlType: 'textbox', ngmodel: 'txtMSName', required: true, parameterValue: 'Mothersistername' },
            { lblname: "Husband first name", controlType: 'textbox', ngmodel: 'txtMsHusbandfirstname', parameterValue: 'MSHusbandfirstname' },
            { lblname: "Husband last name", controlType: 'textbox', ngmodel: 'txtMsHusbandlastname', parameterValue: 'MSHusbandlastname' },
            { lblname: 'FSH Education', controlType: 'textbox', ngmodel: 'txtMSHEducation', parameterValue: 'MSEducationdetails' },
            { lblname: 'FSH Profession', controlType: 'textbox', ngmodel: 'txtMSProfessiondetails', parameterValue: 'MSProfessiondetails' },

            {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dcountry: 'ddlFSHCountryID',
                dstate: 'ddlMSisState',
                ddistrict: 'ddlMsDistrict',
                countryParameterValue: 'MSCountryID',
                stateParameterValue: 'MSMSHStateID',
                districtParameterValue: 'MSMSHDistrictID',

            },
            { lblname: 'Native place', controlType: 'textbox', ngmodel: 'txtMSNativePlace', parameterValue: 'MSNativeplace' },

            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'ddlMSCounCodeID',
                strmobile: 'txtMSMObileNum',
                dalternative: 'ddlMSCounCodeID2',
                stralternative: 'txtMSMObileNum2',
                dland: 'ddlMSLLCounCode',
                strareacode: 'txtMSArea',
                strland: 'txtLLNum',
                strmail: 'txtMSEmail',

                mobileCodeIdParameterValue: 'MSMSHMobileCountryID',
                mobileNumberParameterValue: 'MSMObileNumber',
                landCountryCodeIdParameterValue: 'MSHLandlineCountryID',
                landAreaCodeIdParameterValue: 'MSLandAreaCode',
                landNumberParameterValue: 'MSLandNumber',
                emailParameterValue: 'MSHEmails'

            },
            { lblname: 'Current Location', controlType: 'textbox', ngmodel: 'txtMSCurrentLocation', parameterValue: 'MSCurrentLocation' },
        ];
        model.MSElderYounger = [
            { "label": "Elder", "title": "Elder", "value": 330 },
            { "label": "Younger", "title": "Younger", "value": 329 }
        ];
        model.MBElderYounger = [
            { "label": "Elder", "title": "Elder", "value": 328 },
            { "label": "Younger", "title": "Younger", "value": 327 }
        ];
        model.FSElderYounger = [
            { "label": "Elder", "title": "Elder", "value": 326 },
            { "label": "Younger", "title": "Younger", "value": 325 }
        ];
        model.FBElderYounger = [
            { "label": "Elder", "title": "Elder", "value": 324 },
            { "label": "Younger", "title": "Younger", "value": 323 }
        ];
        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editRelativeModel', factory);

    factory.$inject = ['editRelativeService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'SelectBindService', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getRelativeeData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getRelativeDetailsDisplay', { params: { CustID: obj } });
            },
            submitFBData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerFathersBrotherUpdatedetails', JSON.stringify(obj1));
            },
            submitFSData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerFathersSisterUpdatedetails', JSON.stringify(obj1));
            },
            submitMBData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerMotherBrotherUpdatedetails', JSON.stringify(obj1));
            },
            submitMSData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/CustomerMotherSisterUpdatedetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editRelativeService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editSibblingModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editSibblingModel.init();
             vm.model.scope = scope;
         };

         vm.init();

     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editSibblingCtrl', controller);

     controller.$inject = ['editSibblingModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(editSibblingService, authSvc, alertss, commonFactory, uibModal, SelectBindService, stateParams) {
        var model = {};
        model.scope = {};
        //start declaration block

        model.sibblingCountArr = [];
        model.BrotherArr = [];
        model.sisterArr = [];
        model.broObj = [];
        model.sisObj = [];
        model.sibCountsBindArr = commonFactory.numbersBind('', 0, 10);
        model.SibCountObj = {};
        model.BroCount = null;
        model.SisCount = null;
        model.CountryVal = '1';
        model.identityID = 0;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        var isSubmit = true;

        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //  model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        //end declaration block

        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.sibPageload();
            return model;
        };

        model.sibPageload = function() {

            editSibblingService.getSibblingeData(custID).then(function(response) {
                model.sibblingCountArr = JSON.parse(response.data[0]);
                model.BrotherArr = JSON.parse(response.data[1]);
                model.sisterArr = JSON.parse(response.data[2]);
                model.BroCount = model.sibblingCountArr[0].NoOfBrothers;
                model.SisCount = model.sibblingCountArr[0].NoOfSisters;

                model.broModifiedby = (model.BrotherArr.length > 0 && model.BrotherArr[0].EmpLastModificationDate !== undefined && model.BrotherArr[0].EmpLastModificationDate !== null) ? model.BrotherArr[0].EmpLastModificationDate : '';
                model.sisModifiedby = (model.sisterArr.length > 0 && model.sisterArr[0].EmpLastModificationDate !== undefined && model.sisterArr[0].EmpLastModificationDate !== null) ? model.sisterArr[0].EmpLastModificationDate : '';
            });
        };

        model.sibblingPopulatePopulate = function(type, item) {
            isSubmit = true;
            switch (type) {
                case 'sibCounrt':
                    model.popupdata = model.noOfSibblings;
                    model.popupHeader = 'Sibling Details';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.noOfBorthersId = item.NoOfBrothers;
                        model.noOfelderBroId = item.NoOfElderBrothers;
                        model.noOfyoungerBroId = item.NoOfYoungerBrothers;
                        model.noOfSisterId = item.NoOfSisters;
                        model.noOfelderSisId = item.NoOfElderSisters;
                        model.noOfyoungerSisId = item.NoOfYoungerSisters;
                    }
                    commonFactory.open('commonSibblingpopup.html', model.scope, uibModal);
                    break;

                case 'brother':
                    model.popupdata = model.brother;
                    model.popupHeader = 'Brother details';
                    debugger;
                    if (item !== undefined && model.BrotherArr.length <= parseInt(model.BroCount)) {
                        model.SibilingCustfamilyID = null;
                        model.broObj = {};
                        if (item !== undefined) {
                            model.eventType = 'edit';
                            model.SibilingCustfamilyID = item.SibilingCustfamilyID;
                            model.youngerElderBro = item.brotherYoungerORelder == 'Elder' ? 42 : (item.brotherYoungerORelder == 'Younger' ? 41 : '-1');
                            model.broName = item.SibilingName;
                            model.broEducation = item.SibilingEducationDetails;
                            model.broDesignation = item.SibilingProfessionDetails;
                            model.broComapnyName = item.SibilingCompany;
                            model.broJobLocation = item.SibilingJobPLace;

                            model.broCountryCodeId = item.SibilingMobileCode;
                            model.broMobileNumber = item.SibilingMobileNumber;

                            if (item.SibilingLandaraecode !== '' && item.SibilingLandaraecode !== null) {
                                model.broLandountryCodeId = item.SibilngLandCountryCode;
                                model.broLandAreaCodeId = item.SibilingLandaraecode;
                                model.broLandNumberId = item.SibilingLandNumber;
                            } else {
                                model.broAlternativeCountryCodeId = item.SibilngLandCountryCode;
                                model.broAlternativeNumber = item.SibilingLandNumber;
                            }

                            model.broEmail = item.SibilingEmail;
                            model.broIsMarried = item.SibilingMarried;

                            model.spouseName = item.SibilingSpouseName;
                            model.spouseEducation = item.SibilingSpouseEducationDetails;
                            model.spouseDesignation = item.SibilingSpouseProfessionDetails;
                            model.chkspousehousewife = item.SibilingSpouseProfessionDetails === 'HouseWife' ? true : false;
                            model.spouseCompany = item.spoucecompanyName;
                            model.spouseJobLocation = item.spoucejobloc;
                            model.spouseCountryCodeId = item.SibilingSpouseMobileCode;
                            model.spouseMobNumber = item.SibilingSpouceMobileNumber;
                            if (item.SibilingSpouseLandareCode !== '' && item.SibilingSpouseLandareCode !== null) {
                                model.spouseLandCountryCodeId = item.SibilingSpouseLandCode;
                                model.spouseLandAreaCodeId = item.SibilingSpouseLandareCode;
                                model.spouseLandNumberId = item.SibilngSpouseLandnumber;
                            } else {
                                model.spouseAlternativeCountryCodeId = item.SibilingSpouseLandCode;
                                model.spouseAlternativeNumber = item.SibilngSpouseLandnumber;
                            }

                            model.spouseEmail = item.SpouseEmail;
                            model.spouseFatherLastName = item.SFsurname;
                            model.spouseFatherFirstName = item.SFname;
                            model.spouseFatherCaste = item.SibilingSpouseFatherCasteID;
                            model.broSpouseFatherStateId = item.BroSpouseFatherStateID;
                            model.broSpouseFatherDistrictId = item.BroSpouseFatherDistrictID;
                            model.broSpouseCityId = item.BroSpouseFatherCity;
                            model.broProfessionCatgory = item.ProfessionCategoryID;
                            model.spouseProfCatgory = item.SpouceProfessionCategoryID;
                            //  
                            commonFactory.open('commonSibblingpopup.html', model.scope, uibModal);
                        }
                    } else if (item === undefined && model.BrotherArr.length < parseInt(model.BroCount)) {
                        model.SibilingCustfamilyID = null;
                        model.broObj = {};
                        commonFactory.open('commonSibblingpopup.html', model.scope, uibModal);
                    } else {
                        alertss.timeoutoldalerts(model.model, 'alert-danger', 'Cannot add more brothers', 4500);
                    }

                    break;

                case 'sister':
                    model.popupdata = model.sister;
                    model.popupHeader = 'Sister details';
                    if (item !== undefined && model.sisterArr.length <= parseInt(model.SisCount)) {

                        model.SibilingCustfamilyID = null;
                        model.sisObj = {};

                        if (item !== undefined) {
                            model.eventType = 'edit';
                            model.SibilingCustfamilyID = item.SibilingCustfamilyID;
                            model.youngerElderSis = item.SisterElderORyounger == 'Elder' ? '322' : (item.SisterElderORyounger == 'Younger' ? '321' : '-1');
                            model.sisName = item.SibilingName;
                            model.sisEducation = item.SibilingEducationDetails;
                            model.sisDesignation = item.SibilingProfessionDetails;
                            model.chksishousewife = item.SibilingProfessionDetails === 'HouseWife' ? true : false;
                            model.sisComapnyName = item.SibilingCompany;
                            model.sisJobLocation = item.SibilingJobPLace;

                            model.sisCountryCodeId = item.SibilingMobileCode;
                            model.sisMobileNumber = item.SibilingMobileNumber;

                            if (item.SibilingLandaraecode !== '' && item.SibilingLandaraecode !== null) {
                                model.sisLandountryCodeId = item.SibilngLandCountryCode;
                                model.sisLandAreaCodeId = item.SibilingLandaraecode;
                                model.sisLandNumberId = item.SibilingLandNumber;
                            } else {
                                model.sisAlternativeCountryCodeId = item.SibilngLandCountryCode;
                                model.sisAlternativeNumber = item.SibilingLandNumber;
                            }

                            model.sisEmail = item.SibilingEmail;
                            model.sisIsMarried = item.SibilingMarried;

                            model.husbandName = item.SibilingName;
                            model.husbandEducation = item.SibilingSpouseEducationDetails;
                            model.husbandDesignation = item.SibilingSpouseProfessionDetails;
                            model.husbandCompany = item.spoucecompanyName;
                            model.husbandJobLocation = item.spoucejobloc;

                            model.husbandCountryCodeId = item.sisterspousemobilecode;
                            model.husbandMobNumber = item.SibilingSpouceMobileNumber;

                            if (item.SibilingSpouseLandareCode !== '' && item.SibilingSpouseLandareCode !== null) {
                                model.husbandLandCountryCodeId = item.SpousesisterLandCode;
                                model.husbandLandNumberId = item.SibilngSpouseLandnumber;
                                model.husbandLandAreaCodeId = item.SibilingSpouseLandareCode;
                            } else {
                                model.husbandAlternativeCountryCodeId = item.SpousesisterLandCode;
                                model.husbandAlternativeNumber = item.SibilngSpouseLandnumber;

                            }

                            model.husbandEmail = item.SpouseEmail;
                            model.husbandFatherLastName = item.SpouceFatherLName;
                            model.spouseFatherFirstName = item.SpouceFatherFName;
                            model.spouseFatherCaste = item.SibilingSpouseFatherCasteId;
                            model.broSpouseFatherStateId = item.SisSpouseFatherStateID;
                            model.broSpouseFatherDistrictId = item.SisSpouseFatherDitrictID;
                            model.broSpouseCityId = item.SisSpousefatherCity;
                            model.sisProfessionCatgory = item.ProfessionCategoryID;
                            model.husbandProfCatgory = item.SpouceProfessionCategoryID;
                            commonFactory.open('commonSibblingpopup.html', model.scope, uibModal);
                        }
                    } else if (item === undefined && model.sisterArr.length < parseInt(model.SisCount)) {

                        model.SibilingCustfamilyID = null;
                        model.sisObj = {};
                        commonFactory.open('commonSibblingpopup.html', model.scope, uibModal);
                    } else {
                        alertss.timeoutoldalerts(model.model, 'alert-danger', 'Cannot add more sisters', 4500);
                        break;
                    }
            }

        };


        model.cancel = function() {
            commonFactory.closepopup();
        };


        model.ShousewiseChk = function(item) {
            if (item.chksisProfession === true) {
                item.txtsisProfession = 'HouseWife';
            } else {
                item.txtsisProfession = '';
            }
        };

        model.BhousewiseChk = function(item) {
            if (item.chkboxbrotherwifeprofession === true) {
                item.txtbrotherwifeprofession = 'HouseWife';
            } else {
                item.txtbrotherwifeprofession = '';
            }
        };

        model.checkVal = function(val) {
            return (val !== '' && val !== undefined) ? val : 0;
        };


        model.enableSubmit = function() {
            isSubmit = true;
        };

        model.deleteDisplayTxt = '';
        model.DeletePopup = function(type, id) {
            model.deleteDisplayTxt = type;
            model.identityID = id;
            commonFactory.open('common/templates/deletepopup.html', model.scope, uibModal, 'sm');
        };

        model.deleteSubmit = function(type) {

            SelectBindService.DeleteSection({ sectioname: 'Family', CustID: custID, identityid: model.identityID }).then(function() {
                model.sibPageload(custID);
                commonFactory.closepopup();
            });
        };

        model.updateData = function(inObj, type) {

            if (isSubmit) {
                isSubmit = false;
                switch (type) {
                    case 'Sibling Details':
                        var totalnofBrothers = parseInt(model.checkVal(model.noOfBorthersId));
                        var elderBrotherCount = parseInt(model.checkVal(model.noOfelderBroId));
                        var youngerBrotherCount = parseInt(model.checkVal(model.noOfyoungerBroId));

                        var totalnoFSister = parseInt(model.checkVal(model.noOfSisterId));
                        var elderSisterCount = parseInt(model.checkVal(model.noOfelderSisId));
                        var youngerSisterCount = parseInt(model.checkVal(model.noOfyoungerSisId));

                        if ((totalnofBrothers === 0 || totalnofBrothers === (elderBrotherCount + youngerBrotherCount)) && (totalnoFSister === 0 || totalnoFSister === (elderSisterCount + youngerSisterCount))) {

                            var objinput = {};
                            objinput = inObj.GetDetails;
                            objinput.CustID = custID;

                            model.BroCount = model.noOfBorthersId;
                            model.SisCount = model.noOfSisterId;

                            model.submitPromise = editSibblingService.submitSibCountsData(objinput).then(function(response) {
                                console.log(response);
                                commonFactory.closepopup();
                                if (response.data === 1) {
                                    model.sibPageload(custID);
                                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Sibling Details Submitted Succesfully', 4500);
                                } else {
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Sibling Details Updation failed', 4500);
                                }
                            });
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Correct Sibling count', 4500);
                        }

                        break;
                    case 'Brother details':

                        inObj.GetDetails.CustID = custID;
                        inObj.GetDetails.BroSibilingCustfamilyID = model.SibilingCustfamilyID;
                        model.submitPromise = editSibblingService.submitSibBroData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.sibPageload(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Brother Details Submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Brother Details Updation failed', 4500);
                            }
                        });

                        break;
                    case 'Sister details':
                        inObj.GetDetails.CustID = custID;
                        inObj.GetDetails.SisSibilingCustfamilyID = model.SibilingCustfamilyID;
                        model.submitPromise = editSibblingService.submitSibSisData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.sibPageload(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Sister Details Submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Sister Details Updation failed', 4500);
                            }
                        });


                        break;
                }
            }
        };

        model.hideSibbroIfZero = function() {
            if (parseInt(model.noOfBorthersId) === 0) {
                model.noOfelderBroId = 0;
                model.noOfyoungerBroId = 0;
                return false;
            }
            return true;
        };
        model.hideSibsisIfZero = function() {
            if (parseInt(model.noOfSisterId) === 0) {
                model.noOfelderSisId = 0;
                model.noOfyoungerSisId = 0;
                return false;
            }
            return true;
        };
        model.ismarried = function() {

            if (parseInt(model.broIsMarried) === 0) {
                model.spouseName = '';
                model.spouseEducation = '';
                model.spouseDesignation = '';
                model.chkspousehousewife = '';
                model.spouseCompany = '';
                model.spouseJobLocation = '';
                model.spouseCountryCodeId = '';
                model.spouseMobNumber = '';
                model.spouseLandCountryCodeId = '';
                model.spouseLandAreaCodeId = '';
                model.spouseLandNumberId = '';
                model.spouseAlternativeCountryCodeId = '';
                model.spouseAlternativeNumber = '';
                model.spouseEmail = '';
                model.spouseFatherLastName = '';
                model.spouseFatherFirstName = '';
                model.spouseFatherCaste = '';
                model.broSpouseFatherStateId = '';
                model.broSpouseFatherDistrictId = '';
                model.broSpouseCityId = '';
                model.spouseProfCatgory = '';
                return false;
            }
            return true;
        };
        model.isSismarried = function() {

            if (parseInt(model.sisIsMarried) === 0) {
                model.husbandName = '';
                model.husbandEducation = '';
                model.husbandProfCatgory = '';
                model.husbandDesignation = '';
                model.husbandCompany = '';
                model.husbandJobLocation = '';
                model.husbandCountryCodeId = '';
                model.husbandMobNumber = '';
                model.husbandAlternativeCountryCodeId = '';
                model.husbandAlternativeNumber = '';
                model.husbandLandCountryCodeId = '';
                model.husbandLandAreaCodeId = '';
                model.husbandLandNumberId = '';
                model.husbandEmail = '';
                model.husbandFatherLastName = '';
                model.spouseFatherFirstName = '';
                model.spouseFatherCaste = '';
                model.broSpouseFatherStateId = '';
                model.broSpouseFatherDistrictId = '';
                model.broSpouseCityId = '';

                return false;
            }
            return true;
        };






        model.noOfSibblings = [
            { lblname: 'No of Brothers', controlType: 'select', ngmodel: 'noOfBorthersId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfBrothers' },
            { lblname: 'Elder Brother', controlType: 'select', ngmodel: 'noOfelderBroId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfElderBrothers', parentDependecy: 'hideSibbroIfZero' },
            { lblname: 'Younger Brother', controlType: 'select', ngmodel: 'noOfyoungerBroId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfYoungerBrothers', parentDependecy: 'hideSibbroIfZero' },
            { lblname: 'No of sisters', controlType: 'select', ngmodel: 'noOfSisterId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfSisters' },
            { lblname: 'Elder sisters', controlType: 'select', ngmodel: 'noOfelderSisId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfElderSisters', parentDependecy: 'hideSibsisIfZero' },
            { lblname: 'Younger  sisters', controlType: 'select', ngmodel: 'noOfyoungerSisId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfYoungerSisters', parentDependecy: 'hideSibsisIfZero' },
            { lblname: '', controlType: 'break' }
        ];


        model.brother = [
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'youngerElderBro', required: true, ownArray: 'broElderYoungerArr', parameterValue: 'BroElderYounger' },
            { lblname: 'Name', controlType: 'textbox', ngmodel: 'broName', required: true, parameterValue: 'BroName' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'broEducation', parameterValue: 'BroEducationDetails' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'broProfessionCatgory', typeofdata: 'newProfessionCatgory', parameterValue: 'BroProfessionCategoryID' },
            { lblname: 'Designationt', controlType: 'textbox', ngmodel: 'broDesignation', parameterValue: 'BroProfessionDetails' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'broComapnyName', parameterValue: 'BroCompanyName' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'broJobLocation', parameterValue: 'BroJobLocation' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'broCountryCodeId',
                strmobile: 'broMobileNumber',
                dalternative: 'broAlternativeCountryCodeId',
                stralternative: 'broAlternativeNumber',
                dland: 'broLandountryCodeId',
                strareacode: 'broLandAreaCodeId',
                strland: 'broLandNumberId',
                strmail: 'broEmail',

                mobileCodeIdParameterValue: 'BroMobileCountryCodeID',
                mobileNumberParameterValue: 'BroMobileNumber',
                landCountryCodeIdParameterValue: 'BroLandCountryCodeID',
                landAreaCodeIdParameterValue: 'BroLandAreaCode',
                landNumberParameterValue: 'BroLandNumber',
                emailParameterValue: 'BroEmail'
            },
            { lblname: 'Is Married', controlType: 'radio', ngmodel: 'broIsMarried', required: true, arrbind: 'boolType', parameterValue: 'BIsMarried', },
            { lblname: 'Spouse Name', controlType: 'textbox', ngmodel: 'spouseName', parameterValue: 'BroWifeName', parentDependecy: 'ismarried' },
            { lblname: 'Spouse Education', controlType: 'textbox', ngmodel: 'spouseEducation', parameterValue: 'BrowifeEducationDetails', parentDependecy: 'ismarried' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'spouseProfCatgory', typeofdata: 'newProfessionCatgory', parameterValue: 'BroSpouseProfessionCategoryID', parentDependecy: 'ismarried' },
            { lblname: 'Spouse Designation', controlType: 'housewife', ngmodelText: 'spouseDesignation', ngmodelChk: 'chkspousehousewife', parameterValueText: 'BroWifeProfessionDetails', parameterValueChk: 'MotherProfessiondetails', parentDependecy: 'ismarried' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'spouseCompany', parameterValue: 'BroWifeCompanyName', parentDependecy: 'ismarried' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'spouseJobLocation', parameterValue: 'BroWifeJobLocation', parentDependecy: 'ismarried' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'spouseCountryCodeId',
                strmobile: 'spouseMobNumber',
                dalternative: 'spouseAlternativeCountryCodeId',
                stralternative: 'spouseAlternativeNumber',
                dland: 'spouseLandCountryCodeId',
                strareacode: 'spouseLandAreaCodeId',
                strland: 'spouseLandNumberId',
                strmail: 'spouseEmail',
                parentDependecy: 'ismarried',
                mobileCodeIdParameterValue: 'BroWifeMobileCountryCodeID',
                mobileNumberParameterValue: 'BroWifeMobileNumber',
                landCountryCodeIdParameterValue: 'BroWifeLandCountryCodeID',
                landAreaCodeIdParameterValue: 'BroWifeLandAreacode',
                landNumberParameterValue: 'BroWifeLandNumber',
                emailParameterValue: 'BrotherSpouseEmail'

            },
            { lblname: 'Spouse Father SurName', controlType: 'textbox', ngmodel: 'spouseFatherLastName', parameterValue: 'BroWifeFatherSurName', parentDependecy: 'ismarried' },
            { lblname: 'Spouse Father Name', controlType: 'textbox', ngmodel: 'spouseFatherFirstName', parameterValue: 'BroWifeFatherName', parentDependecy: 'ismarried' },
            { lblname: 'Spouse Father Caste', controlType: 'select', ngmodel: 'spouseFatherCaste', typeofdata: 'caste', parameterValue: 'SibilingSpouseFatherCasteID', parentDependecy: 'ismarried' },
            {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dstate: 'broSpouseFatherStateId',
                ddistrict: 'broSpouseFatherDistrictId',
                parentDependecy: 'ismarried',
                countryParameterValue: 'BroSpouseFatherCountryID',
                stateParameterValue: 'BroSpouseFatherStateID',
                districtParameterValue: 'BroSpouseFatherDitrictID'
            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'broSpouseCityId', parameterValue: 'BroSpouseFatherNativePlace', parentDependecy: 'ismarried' }

        ];

        model.sister = [
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'youngerElderSis', required: true, ownArray: 'sisElderYoungerArr', parameterValue: 'SisElderYounger' },
            { lblname: 'Name', controlType: 'textbox', ngmodel: 'sisName', required: true, parameterValue: 'SisName' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'sisEducation', parameterValue: 'siseducationdetails' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'sisProfessionCatgory', typeofdata: 'newProfessionCatgory', parameterValue: 'SisProfessionCategoryID' },
            { lblname: 'Designationt', controlType: 'housewife', ngmodelText: 'sisDesignation', ngmodelChk: 'chksishousewife', parameterValueText: 'sisprofessiondetails' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'sisComapnyName', parameterValue: 'SisCompanyName' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'sisJobLocation', parameterValue: 'SisJobLocation' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'sisCountryCodeId',
                strmobile: 'sisMobileNumber',
                dalternative: 'sisAlternativeCountryCodeId',
                stralternative: 'sisAlternativeNumber',
                dland: 'sisLandountryCodeId',
                strareacode: 'sisLandAreaCodeId',
                strland: 'sisLandNumberId',
                strmail: 'sisEmail',

                mobileCodeIdParameterValue: 'SisMobileCountryCodeID',
                mobileNumberParameterValue: 'SisMobileNumber',
                landCountryCodeIdParameterValue: 'SisLandCountryCodeID',
                landAreaCodeIdParameterValue: 'SisLandAreaCode',
                landNumberParameterValue: 'SisLandNumber',
                emailParameterValue: 'SisEmail'
            },
            { lblname: 'Is Married', controlType: 'radio', ngmodel: 'sisIsMarried', required: true, arrbind: 'boolType', parameterValue: 'SIsMarried' },
            { lblname: 'Husband Name', controlType: 'textbox', ngmodel: 'husbandName', parameterValue: 'SisHusbandName', parentDependecy: 'isSismarried' },
            { lblname: 'Husband Education', controlType: 'textbox', ngmodel: 'husbandEducation', parameterValue: 'sisspouseeducationdetails', parentDependecy: 'isSismarried' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'husbandProfCatgory', typeofdata: 'newProfessionCatgory', parameterValue: 'SisSpouseProfessionCategoryID', parentDependecy: 'isSismarried' },
            { lblname: 'Husband Designation', controlType: 'textbox', ngmodel: 'husbandDesignation', parameterValue: 'sisspouseprofessiondetails', parentDependecy: 'isSismarried' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'husbandCompany', parameterValue: 'SisHusCompanyName', parentDependecy: 'isSismarried' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'husbandJobLocation', parameterValue: 'SisHusJobLocation', parentDependecy: 'isSismarried' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'husbandCountryCodeId',
                strmobile: 'husbandMobNumber',
                dalternative: 'husbandAlternativeCountryCodeId',
                stralternative: 'husbandAlternativeNumber',
                dland: 'husbandLandCountryCodeId',
                strareacode: 'husbandLandAreaCodeId',
                strland: 'husbandLandNumberId',
                strmail: 'husbandEmail',
                parentDependecy: 'isSismarried',
                mobileCodeIdParameterValue: 'SisHusbandMobileCountryCodeID',
                mobileNumberParameterValue: 'SisHusbandMobileNumber',
                landCountryCodeIdParameterValue: 'SisHusbandLandCountryCodeID',
                landAreaCodeIdParameterValue: 'SisHusbandLandAreacode',
                landNumberParameterValue: 'SisHusbandLandNumber',
                emailParameterValue: 'SisSpouseEmail'
            },
            { lblname: 'Husband Father SurName', controlType: 'textbox', ngmodel: 'husbandFatherLastName', parameterValue: 'SisHusbandFatherSurName', parentDependecy: 'isSismarried' },
            { lblname: 'Husband Father Name', controlType: 'textbox', ngmodel: 'spouseFatherFirstName', parameterValue: 'SisHusbandFatherName', parentDependecy: 'isSismarried' },
            { lblname: 'Husband Father Caste', controlType: 'select', ngmodel: 'spouseFatherCaste', typeofdata: 'caste', parameterValue: 'SibilingSpouseFatherCasteID', parentDependecy: 'isSismarried' },
            {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dstate: 'broSpouseFatherStateId',
                ddistrict: 'broSpouseFatherDistrictId',
                parentDependecy: 'isSismarried',
                countryParameterValue: 'SisSpouseFatherCountryID',
                stateParameterValue: 'SisSpouseFatherStateID',
                districtParameterValue: 'SisSpouseFatherDitrictID'
            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'broSpouseCityId', parameterValue: 'SisSpouseFatherNativePlace', parentDependecy: 'isSismarried' }

        ];

        model.broElderYoungerArr = [
            { "label": "Elder", "title": "Elder", "value": 42 },
            { "label": "Younger", "title": "Younger", "value": 41 }
        ];
        model.sisElderYoungerArr = [
            { "label": "Elder", "title": "Elder", "value": 322 },
            { "label": "Younger", "title": "Younger", "value": 321 }
        ];

        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editSibblingModel', factory);

    factory.$inject = ['editSibblingService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'SelectBindService', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getSibblingeData: function(obj) {
                return http.get(editviewapp.apipathold + 'CustomerPersonal/getsiblingsDetailsDisplay', { params: { CustID: obj } });
            },
            submitSibBroData: function(obj1) {
                return http.post(editviewapp.apipathold + 'CustomerPersonalUpdate/CustomerSibBrotherUpdatedetails', JSON.stringify(obj1));
            },
            submitSibSisData: function(obj1) {
                return http.post(editviewapp.apipathold + 'CustomerPersonalUpdate/CustomerSibSisterUpdatedetails', JSON.stringify(obj1));
            },
            submitSibCountsData: function(obj1) {
                return http.post(editviewapp.apipathold + 'CustomerPersonalUpdate/UpdateSibblingCounts', JSON.stringify(obj1));
            },
            allowblockWebusers: function(custid) {
                return http.get(editviewapp.apipathold + 'StaticPages/getRegisteredBranchStatus', { params: { StrCustID: custid } });
            }

        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editSibblingService', factory);

    factory.$inject = ['$http'];
})(angular);
 (function(angular) {
     'use strict';

     function controller(editSpouseModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editSpouseModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('editSpouseCtrl', controller);

     controller.$inject = ['editSpouseModel', '$scope', '$window'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(editSpouseService, authSvc, alertss, commonFactory, uibModal, filter, stateParams) {
        var model = {};
        model.scope = {};
        // var logincustid = authSvc.getCustId();
        var custID = stateParams.CustID;
        //  logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.spouseArray = [];
        model.ChildArray = [];
        model.spouObj = {};
        model.childObj = {};
        model.noofChldrenAray = commonFactory.numbersBind('', 0, 10);
        model.childCount = 0;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        model.init = function() {
            custID = stateParams.CustID;
            model.pageload();
            return model;
        };

        model.pageload = function() {
            editSpouseService.getSpouseData(custID).then(function(response) {
                if (response.data.length > 0) {
                    model.spouseArray = response.data[0].length > 0 ? JSON.parse(response.data[0]) : [];
                    model.ChildArray = response.data[1].length > 0 ? JSON.parse(response.data[1]) : [];

                    model.childCount = response.data !== undefined && response.data[0].length > 0 && (JSON.parse(response.data[0])).length > 0 ? (JSON.parse(response.data[0]))[0].NoOfChildrens : [];

                    console.log(model.spouseArray);
                    console.log(model.ChildArray);
                }
            });
        };

        model.populatepopup = function(type, item) {
            model.eventType = 'add';
            switch (type) {

                case 'Spouse':
                    model.popupdata = model.spouse;
                    model.popupHeader = 'Spouse Details';
                    model.Cust_Spouse_ID = null;
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.Cust_Spouse_ID = item.Cust_Spouse_ID;
                        model.txtSpousename = item.NAME;
                        model.txtSpoueEducation = item.EducationDetails;
                        model.txtspouseProfession = item.ProfessionDetails;
                        model.txtHouseFlatnumber = item.HouseFlatNumberID;
                        model.txtApartmentname = item.AppartmentName;
                        model.txtStreetname = item.StreetName;
                        model.txtAreaname = item.AreaName;
                        model.txtLandmark = item.LandMark;
                        model.ddlspouseCountry = item.Country;
                        model.ddlspouseState = item.STATE;
                        model.ddlspouseDistrict = item.District;
                        model.ddlspouseCity = item.City;
                        model.txtspouseZip = item.Zip;
                        model.txtMarriedon = item.MarriageDate;
                        model.txtSeparateddate = item.SeperatedDate;
                        model.rbtspousediverse = item.LeagallyDivorceID;
                        model.txtLegalDivorsedate = item.DateofLegallDivorce;
                        model.txtspousefather = item.FatherFirstName;
                        model.txtspouselastname = item.FatherLastName;
                        model.txtpreviousmarriage = item.ReasonforDivorce;
                        model.rbtnspousefamily = item.MyFamilyPlanningID;
                        model.ddlspousechidrens = item.NoOfChildrens;
                    }

                    commonFactory.open('modelContent.html', model.scope, uibModal);
                    break;

                case 'Child':
                    model.Cust_Children_ID = null;
                    model.popupdata = model.child;
                    model.popupHeader = 'Children Details';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.Cust_Children_ID = item.Cust_Children_ID;
                        model.txtchildname = item.ChildName;
                        model.rdlgenderchild = item.ChildGender;
                        model.txtdobchild = item.ChildDOB;
                        model.rbtChildstayingWith = item.ChildStayingWithID;
                        model.ddlrelation = item.ChildStayingWithRelation;
                        commonFactory.open('modelContent.html', model.scope, uibModal);

                    } else if (model.childCount !== undefined && model.childCount !== null &&
                        model.childCount !== 0 && model.ChildArray.length < model.childCount) {

                        commonFactory.open('modelContent.html', model.scope, uibModal);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'cannot add more children', 4500);
                    }
                    break;
            }

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.updateData = function(inObj, type) {
            switch (type) {
                case "Spouse Details":
                    model.spouseSubmit(inObj);
                    break;
                case "Children Details":
                    model.childSubmit(inObj);
                    break;
            }
        };
        model.spouseSubmit = function(inObj) {

            inObj.GetDetails.CustID = custID;
            inObj.GetDetails.Cust_Spouse_ID = model.Cust_Spouse_ID;
            model.childCount = inObj.GetDetails.ddlspousechidrens;

            editSpouseService.submitSpouseData(inObj).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                if (response.data === 1) {
                    model.pageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Spouse Details Submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Spouse Details Updation failed', 4500);
                }

            });
        };

        model.childSubmit = function(inObj) {
            inObj.GetDetails.CustID = custID;
            inObj.GetDetails.Cust_Children_ID = model.Cust_Children_ID;
            editSpouseService.submitChildeData(inObj).then(function(response) {
                console.log(response);
                commonFactory.closepopup();
                if (response.data === 1) {
                    model.pageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Spouse Childern Details Submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Spouse Childern Details Updation failed', 4500);
                }
            });


        };
        model.spouse = [
            { lblname: 'Name', controlType: 'textbox', ngmodel: 'txtSpousename', parameterValue: 'NAME' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'txtSpoueEducation', parameterValue: 'Education' },
            { lblname: 'Profession', controlType: 'textbox', ngmodel: 'txtspouseProfession', parameterValue: 'Profession' },
            { lblname: 'House/Flat number', controlType: 'textbox', ngmodel: 'txtHouseFlatnumber', parameterValue: 'HouseFlatnumber' },
            { lblname: 'Apartment name', controlType: 'textbox', ngmodel: 'txtApartmentname', parameterValue: 'Apartmentname' },
            { lblname: 'Street name', controlType: 'textbox', ngmodel: 'txtStreetname', parameterValue: 'Streetname' },
            { lblname: 'Area name', controlType: 'textbox', ngmodel: 'txtAreaname', parameterValue: 'Areaname' },
            { lblname: 'Landmark', controlType: 'textbox', ngmodel: 'txtLandmark', parameterValue: 'Landmark' },
            {
                lblname: 'country',
                controlType: 'country',
                countryshow: true,
                cityshow: true,
                othercity: false,
                dcountry: 'ddlspouseCountry',
                dstate: 'ddlspouseState',
                ddistrict: 'ddlspouseDistrict',
                dcity: 'ddlspouseCity',
                countryParameterValue: 'Country',
                stateParameterValue: 'STATE',
                districtParameterValue: 'District',
                cityParameterValue: 'City',
            },
            { lblname: 'Zip', controlType: 'textboxNumberrestrict', ngmodel: 'txtspouseZip', maxLength: 8, parameterValue: 'Zip' },
            { lblname: 'Married on', controlType: 'date', ngmodel: 'txtMarriedon', parameterValueDate: 'Marriedon' },
            { lblname: 'Separated date', controlType: 'date', ngmodel: 'txtSeparateddate', parameterValueDate: 'Separateddate' },
            { lblname: 'Legally divorced', controlType: 'radio', ngmodel: 'rbtspousediverse', arrbind: 'boolType', parameterValue: 'Legallydivorced' },
            { lblname: 'Legally Divorced date', controlType: 'date', ngmodel: 'txtLegalDivorsedate', parameterValueDate: 'Dateoflegaldivorce' },
            { lblname: 'Father first name', controlType: 'textbox', ngmodel: 'txtspousefather', parameterValue: 'Fatherfirstname' },
            { lblname: 'Father last name', controlType: 'textbox', ngmodel: 'txtspouselastname', parameterValue: 'Fatherlastname' },
            { lblname: 'Notes about previous marriage', controlType: 'textareaSide', ngmodel: 'txtpreviousmarriage', parameterValue: 'Notesaboutpreviousmarriage' },
            { lblname: 'Family planning', controlType: 'radio', ngmodel: 'rbtspousediverse', arrbind: 'boolType', parameterValue: 'Familyplanning' },
            { lblname: 'No of children', controlType: 'select', ngmodel: 'ddlspousechidrens', dataSource: model.noofChldrenAray, parameterValue: 'Noofchildren' },


        ];
        model.child = [
            { lblname: 'Name of the child', controlType: 'textbox', ngmodel: 'txtchildname', parameterValue: 'Nameofthechild' },
            { lblname: 'Gender of the child', controlType: 'radio', ngmodel: 'rdlgenderchild', ownArray: 'gender', parameterValue: 'Genderofthechild' },
            { lblname: 'DOB of the child', controlType: 'date', required: false, ngmodel: 'txtdobchild', parameterValueDate: 'DOB' },
            { lblname: 'Child staying with', controlType: 'radio', ngmodel: 'rbtChildstayingWith', ownArray: 'relation', parameterValue: 'Childstayingwith' },
            { lblname: 'Child staying with Relation', controlType: 'select', ngmodel: 'ddlrelation', typeofdata: 'childStayingWith', parameterValue: 'Childstayingwithrelation' },
        ];
        model.gender = [
            { "label": "Male", "title": "Male", "value": 1 },
            { "label": "Female", "title": "Female", "value": 2 }
        ];
        model.relation = [
            { "label": "Father Side", "title": "Father Side", "value": 1 },
            { "label": "Mother Side", "title": "Mother Side", "value": 2 }
        ];
        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editSpouseModel', factory);

    factory.$inject = ['editSpouseService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$filter', '$stateParams'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getSpouseData: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerPersonalSpouse_Details', { params: { CustID: obj } });
            },
            submitSpouseData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/UpdateSpoucedetails_Customersetails', JSON.stringify(obj1));
            },
            submitChildeData: function(obj1) {
                return http.post(editviewapp.apipath + 'CustomerPersonalUpdate/UpdateSpouseChildDetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editSpouseService', factory);

    factory.$inject = ['$http'];
})(angular);
(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .controller('popupCtrl', controller)

    controller.$inject = ['commonFactory', '$uibModal', '$scope'];

    function controller(commonFactory, uibModal, scope) {
        var vm = this;
        scope.model = {};
        scope.openModel = function() {
            commonFactory.open('popup.html', scope, uibModal);
        };
        // scope.model.education.updateData = function(response) {
        //     //call back functuon after submitting api in edit view popup
        // };
        // scope.model.profession.updateData = function(response) {
        //     //call back functuon after submitting api in edit view popup
        // };
        scope.model.mainArray = { popupHeader: 'Education Details', formName: 'eduform', apiPath: '' };
        //parameterValue =name for sending in submit object
        scope.model.popupdata = [
            { lblname: 'Is Highest Degree', controlType: 'radio', ngmodel: 'IsHighestDegreeId', required: true, arrbind: 'boolType', parameterValue: 'IsHighestDegree' },
            { lblname: 'Education category', typeofdata: 'educationcategory', controlType: 'select', ngmodel: 'EduCatgoryId', required: true, parameterValue: 'EduCatgory', method: 'dllChange', childName: 'EducationGroup', changeApi: 'EducationGroup' },
            { lblname: 'Education group', parentName: 'EducationGroup', controlType: 'Changeselect', ngmodel: 'EdugroupId', required: true, parameterValue: 'EdugroupId', changeApi: 'EducationSpecialisation' },
            { lblname: 'Edu specialization', controlType: 'select', ngmodel: 'EduspecializationId', required: true, childArrar: 'height', parameterValue: 'Eduspecialization' },
            { lblname: 'University', controlType: 'textbox', ngmodel: 'universityId', parameterValue: 'university' },
            { lblname: 'College', controlType: 'textbox', ngmodel: 'collegeId', parameterValue: 'college' },
            { lblname: 'Pass of year', controlType: 'select', ngmodel: 'passOfyear', childArrar: 'height', parameterValue: 'passOfyear' },
            {
                lblname: 'country',
                controlType: 'country',
                countryshow: 'countryshow',
                cityshow: 'cityshow',
                othercity: 'othercity',
                dcountry: 'ddlCountry',
                dstate: 'ddlState',
                ddistrict: 'ddlDistrict',
                dcity: 'ddlcity',
                strothercity: 'txtcity',
                countryParameterValue: 'country',
                stateParameterValue: 'state',
                districtParameterValue: 'district',
                cityParameterValue: 'city',
                cityotherParameterValue: 'cityother'
            },
            {
                lblname: 'Educational merits',
                controlType: 'textarea',
                ngmodel: 'Edumerits',
                parameterValue: 'Edumerits'
            }

        ];
        scope.model.profession = [];
        //controller=
        /*
        ..education edit button click lo
          vm.popupData=model.education;
          //whenever user click on profession edit click
          vm.popupData=model.profession;
          
        */
        /*<slide-popup model="popupData">
    </slide-popup>*/
        // scope.model.IsHighestDegreeId = '1';
    }
})();
(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .factory('popupmdl', factory)

    factory.$inject = ['$http'];

    function factory($http) {
        var model = {};

        scope.model = {};
        scope.openModel = function() {
            commonFactory.open('popup.html', scope, uibModal);
        };
        // scope.model.education.updateData = function(response) {
        //     //call back functuon after submitting api in edit view popup
        // };
        // scope.model.profession.updateData = function(response) {
        //     //call back functuon after submitting api in edit view popup
        // };
        scope.model.mainArray = { popupHeader: 'Education Details', formName: 'eduform', apiPath: '' };
        //parameterValue =name for sending in submit object
        scope.model.popupdata = [
            { lblname: 'Is Highest Degree', controlType: 'radio', ngmodel: 'IsHighestDegreeId', required: true, arrbind: 'boolType', parameterValue: 'IsHighestDegree' },
            { lblname: 'Education category', typeofdata: 'educationcategory', controlType: 'select', ngmodel: 'EduCatgoryId', required: true, parameterValue: 'EduCatgory', method: 'dllChange', childName: 'EducationGroup', changeApi: 'EducationGroup' },
            { lblname: 'Education group', parentName: 'EducationGroup', controlType: 'Changeselect', ngmodel: 'EdugroupId', required: true, parameterValue: 'EdugroupId', changeApi: 'EducationSpecialisation' },
            { lblname: 'Edu specialization', controlType: 'select', ngmodel: 'EduspecializationId', required: true, childArrar: 'height', parameterValue: 'Eduspecialization' },
            { lblname: 'University', controlType: 'textbox', ngmodel: 'universityId', parameterValue: 'university' },
            { lblname: 'College', controlType: 'textbox', ngmodel: 'collegeId', parameterValue: 'college' },
            { lblname: 'Pass of year', controlType: 'select', ngmodel: 'passOfyear', childArrar: 'height', parameterValue: 'passOfyear' },
            {
                lblname: 'country',
                controlType: 'country',
                countryshow: 'countryshow',
                cityshow: 'cityshow',
                othercity: 'othercity',
                dcountry: 'ddlCountry',
                dstate: 'ddlState',
                ddistrict: 'ddlDistrict',
                dcity: 'ddlcity',
                strothercity: 'txtcity',
                countryParameterValue: 'country',
                stateParameterValue: 'state',
                districtParameterValue: 'district',
                cityParameterValue: 'city',
                cityotherParameterValue: 'cityother'
            },
            {
                lblname: 'Educational merits',
                controlType: 'textarea',
                ngmodel: 'Edumerits',
                parameterValue: 'Edumerits'
            }

        ];
        scope.model.profession = [];
    }
})();

angular.module('KaakateeyaEmpEdit').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/editAstro/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\" class=\"right_col\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <page-review dispaly-name=\"'Astro details'\" sectionid=\"'23'\" custid=\"page.model.CustID\"></page-review>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div id=\"divlnkasro\" class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Astro Details </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                    <div ng-if=\"page.model.AstroArr.length==0\" cssclass=\"edit_page_add_button\">\r" +
    "\n" +
    "                        <a ng-click=\"page.model.populateAstro();\" class=\"edit_page_add_button\" href=\"javascript:void(0);\">Add</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.AstroArr\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\" ng-repeat=\"item in page.model.AstroArr track by $index\">\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "                        <div ng-hide=\"item.TimeOfBirth===null\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"TimeofBirth\" style=\"font-weight:bold;\">Time of Birth</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblTimeofBirth\">{{item.TimeOfBirth}}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"PlaceofBirth\" style=\"font-weight:bold;\">Place of Birth</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblPlaceofBirth\">{{ item.CityOfBirth +\",\"+item.DistrictOfBirth+\",\"+item.StateOfBirth+\",\"+item.CountryOfBirth}}</span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-hide=\"item.TypeofStar===null\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"Telugustar\" style=\"font-weight:bold;\">Star Language</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblTelugustar\">{{ item.TypeofStar+((item.StarName!=\"\" &&  item.StarName!=null)?\" - \"+\r" +
    "\n" +
    "                                            item.StarName:\"\")+((item.Paadam!=\"\" &&  item.Paadam!=null)?\" (\"+item.Paadam+\")\":\"\") }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-hide=\"item.Rassi===null\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"raasimoonsign\" style=\"font-weight:bold;\">Raasi/moon sign</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblraasimoonsign\">{{ item.Rassi}}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-hide=\"item.Lagnam===null\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"Lagnam\" style=\"font-weight:bold;\">Lagnam</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblLagnam\">  {{ item.Lagnam }}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-hide=\"item.Gothram===null\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"GothramGotra\" style=\"font-weight:bold;\">Gothram/Gotra</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblGothramGotra\">  {{ item.Gothram}}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-hide=\"item.MeternalGothramID===null\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"MaternalGothram\" style=\"font-weight:bold;\">Maternal Gothram</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblMaternalGothram\">{{ item.MeternalGothramID }}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-hide=\"item.manglikkujadosham===null\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"manglikkujadosham\" style=\"font-weight:bold;\">manglik/kuja dosham</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblmanglikkujadosham\">{{ item.manglikkujadosham }}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.AstroArr.length>0\">\r" +
    "\n" +
    "                        <a ng-click=\"page.model.populateAstro(item);\" class=\"edit_page_edit_button\" href=\"javascript:void(0);\">Edit</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <br>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"edit_page_details_item_desc clearfix\" style=\"padding: 0 0 0 20px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"radio-group-my input-group\" ng-show=\"page.model.ImageUrl==='' || page.model.ImageUrl===null\">\r" +
    "\n" +
    "                <md-radio-group ng-required=\"true\" name=\"rdlUploadGenerate\" layout=\"row\" ng-model=\"page.model.atroObj.rdlUploadGenerate\" ng-change=\"page.model.uploadGenerateHoro(page.model.atroObj.rdlUploadGenerate);\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                    <md-radio-button value=\"0\">Upload Horoscope</md-radio-button>\r" +
    "\n" +
    "                    <md-radio-button value=\"1\"> Generate Horoscope </md-radio-button>\r" +
    "\n" +
    "                </md-radio-group>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ng-hide=\"page.model.ImageUrl==='' || page.model.ImageUrl===null\">\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                    <img ng-model=\"page.model.imghoroName\" ng-src=\"{{page.model.ImageUrl}}\" Style=\"width: 250px; height: 250px;\" ng-show=\"!page.model.iframeShow\" />\r" +
    "\n" +
    "                    <iframe border=\"0\" id=\"iframe\" frameborder=\"0\" height=\"300\" width=\"800\" ng-show=\"page.model.iframeShow\"></iframe>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item_desc clearfix\" style=\"padding: 0 0 0 20px;\">\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix  pull-left\">\r" +
    "\n" +
    "                    <a ID=\"btndeletehoro\" class=\"edit_page_del_button\" href=\"javascript:void(0);\" ng-click=\"page.model.shoedeletePopup();\" data-placement=\"bottom\" data-toggle=\"tooltip\" data-original-title=\"Delete Astro Details\">\r" +
    "\n" +
    "               Delete <ng-md-icon icon=\"delete\" style=\"fill:#665454\" size=\"18\"></ng-md-icon></a>\r" +
    "\n" +
    "                    <a Style=\"padding-left: 100px;\" class=\"btn btn-link\" ng-click=\"page.model.vewHoro();\">View<span class=\"glyphicon glyphicon-eye-open\"></span></a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"astroContent.html\">\r" +
    "\n" +
    "        <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "        </slide-popup>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"AddHoroPopup.html\">\r" +
    "\n" +
    "        <form name=\"uploadForm\" novalidate role=\"form\" ng-submit=\"page.model.upload(up);\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Upload Horoscope </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body\" id=\"modal-body\">\r" +
    "\n" +
    "                <label class=\"control-label\">Use this file formats like gif, jpeg, png,jpg</label>\r" +
    "\n" +
    "                <br>\r" +
    "\n" +
    "                <ul id=\"ulprofession\">\r" +
    "\n" +
    "                    <input type=\"file\" file-model=\"up.myFile\" />\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-footer\">\r" +
    "\n" +
    "                <input value=\"Cancel\" class=\"button_custom button_custom_reset\" ng-click=\"page.model.cancel();\" type=\"button\">\r" +
    "\n" +
    "                <input value=\"Upload\" class=\"button_custom\" type=\"submit\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"deletehoroPopup.html\">\r" +
    "\n" +
    "        <form name=\"uploadForm\" novalidate role=\"form\" ng-submit=\"page.model.deleteHoroImage();\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Delete Horoscope </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body\" id=\"modal-body\">\r" +
    "\n" +
    "                <div class=\"text-center\">Are you sure to delete horoscope?</div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-footer\">\r" +
    "\n" +
    "                <input value=\"Close\" class=\"button_custom button_custom_reset\" ng-click=\"page.model.cancel();\" type=\"button\">\r" +
    "\n" +
    "                <input value=\"Delete\" class=\"button_custom\" type=\"submit\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"AstroCityPopup.html\">\r" +
    "\n" +
    "        <div class=\"modal-header alert alert-danger\" id=\"div2\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"close\" ng-click=\"page.model.cancel();\">&times;</button>\r" +
    "\n" +
    "            <h4 class=\"modal-title\">\r" +
    "\n" +
    "                <span id=\"lblcityheader\">we are unable to genearte horoscope with your given city <b style=\"color: green\"> Administrative Buildings </b>,so please select Nearest city to your place of birth</span>\r" +
    "\n" +
    "            </h4>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body\" id=\"modalbodyIDnew\">\r" +
    "\n" +
    "            <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                <select multiselectdropdown ng-model=\"page.model.ddlAstrocity\" ng-options=\"item.value as item.label for item in page.model.AstrocityArr\" ng-change=\"page.model.AstroCityChange(page.model.ddlAstrocity);\"></select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-footer\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-default\" ng-click=\"page.model.cancel();\">Close</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"AstroimagePopup.html\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "            <h3 class=\"modal-title text-center\" id=\"modal-title\">Horoscope\r" +
    "\n" +
    "                <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                    <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\"></ng-md-icon>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "            <img ng-src=\"{{page.model.ImageUrl}}\" style=\"width:500px;height:500px;\" />\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-footer\">\r" +
    "\n" +
    "            <div class=\"pull-right\">\r" +
    "\n" +
    "                <input value=\"Cancel\" class=\"button_custom button_custom_reset  pull-right\" ng-click=\"page.model.cancel();\" type=\"button\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"RefreshPopup.html\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"modal-body clearfix\" id=\"modal-body\">\r" +
    "\n" +
    "            <button ng-click=\"page.model.generatedhoroS3Upload();\" class=\"btn btn-success center-block\">Refresh Page<span class=\"fa fa-refresh\"></span></button>&nbsp;&nbsp;\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editContact/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <div ID=\"updatevvv\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <h4>Candidate Contact details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "                        <span style=\"color: #08CFD2;\">RelationName :Mobile :{{page.model.primaryRel.PrimaryMobileRelName}} & Email :{{page.model.primaryRel.PrimaryEmailRelName}}</span></h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div ID=\"updatecabndidatecontactDetails\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <a href=\"javascript:void(0);\" class=\"edit_page_add_button\" ng-click=\"page.model.showContactPopup('Candidate');\">Add\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.candidateContactArr\" ng-repeat=\"item in page.model.candidateContactArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"reviewdiv\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                        <div ID=\"updatecandMoblie\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span ID=\"candMoblie\" Font-Bold=\"true\">Moblie #</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span ID=\"lblcandMoblie\">{{item.CandidateMobilewithcode}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <label ng-show=\"(item.primarymobile===1)|| (item.mobileisverfied) ?true:false \">\r" +
    "\n" +
    "    <span  ng-class=\"item.mobileisverfied==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\">\r" +
    "\n" +
    "    </span></label>\r" +
    "\n" +
    "                                <a href=\"javascript:void(0);\" ng-show=\"(item.primarymobile)&&(((item.mobileisverfied))==true?false:true) ?true:false\" ng-click=\"page.model.sendMobileCode(item.Candidatemobilecountrycode,item.Candidatemobilecountrycode,item.CandidateMobileNumber,item.emaILcust_family_id);\"> &nbsp;&nbsp;&nbsp;&nbsp;verify mobile</a>                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "                                <a href=\"javascript:void(0);\" ng-click=\"page.model.setprimaryrelationPopup();\">RelationName</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanellnkcandmobilesedit\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.showContactPopup('Candidate',item);\">Edit\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelcandidatelandnum\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"candidatelandnum\" Font-Bold=\"true\">Land line #</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblcandidatelandnum\">{{item.Candidatelandlinewithcode}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <label ng-show=\"(item.primarylandline==1)|| (item.Landisverfied) ?true:false\">\r" +
    "\n" +
    "     <span  ng-class=\"(item.Landisverfied)==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\"  style=\"color:#00FF00;\"></span>\r" +
    "\n" +
    " </label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelcandidateemail\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"candidateemail\" Font-Bold=\"true\">Email</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblcandidateemail\">{{item.CandidateEmail}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <label ng-show=\"(item.primaryemail || item.isemailVerified) ?true:false\">\r" +
    "\n" +
    "    <span  ng-class=\"item.isemailVerified==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\"></span>\r" +
    "\n" +
    "</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" ng-show=\"(item.primaryemail)&&(((item.isemailVerified))==true?false:true) ?true:false\" ng-click=\"page.model.verifymail();\">verify email</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Candidate Address Details</h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.candidateAddrArr\" ng-repeat=\"item in page.model.candidateAddrArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"Div1\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelFlatno\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\" id=\"flatdiv\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"Flatno\" Font-Bold=\"true\">Flat no</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblFlatno\">{{item.Flatno}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanellnkaddresssedit\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.showContactPopup('candidateAddr',item);\">Edit\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelApartmentno\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"divapartment\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"Apartmentno\" Font-Bold=\"true\">Apartment no</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblApartmentno\">{{item.Apartmentno}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelAreaname\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"divareaname\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"Areaname\" Font-Bold=\"true\">Area name</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblAreaname\">{{item.Areaname}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelStreetnames\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\" id=\"streetname\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"Streetnamecand\" Font-Bold=\"true\">Street name</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblStreetnamecand\">{{item.Streetname}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelLandmark\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\" id=\"landmarkdiv\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"Landmark\" Font-Bold=\"true\">Landmark</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblLandmark\">{{item.Landmark}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelCountry\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\" id=\"CountryNamediv\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"Country\" Font-Bold=\"true\">Country</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblfulladdress\">{{item.fulladdress}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Parent Contact Details</h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                    <div ID=\"UpdatePanelparentcontacts\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.parentContactArr\" ng-repeat=\"item in page.model.parentContactArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"Div2\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelparentcontactsDetails\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanellnkparentcontactsDetailst\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.showContactPopup('parent',item);\">Edit\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelFathername\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"Fathername\" Font-Bold=\"true\">{{item.Motheremailreletionship===\"39\"?\"Father Name\":\"Mother Name\"}}</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblFathername\">{{item.NAME}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelfathermobile\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"fathermobile\" Font-Bold=\"true\">Moblie #</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblfathermobile\">{{item.Mobilewithcode}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <label ng-show=\"(item.primarymobile===1)|| (item.Mothermobileisverfied) ?true:false \">\r" +
    "\n" +
    "    <span  ng-class=\"item.Mothermobileisverfied==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\">\r" +
    "\n" +
    "    </span></label>\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" ng-show=\"(item.primarymobile)&&(((item.Mothermobileisverfied))==true?false:true) ?true:false\" ng-click=\"page.model.sendMobileCode(item.mobilecountrycode,item.mobilecountrycode,item.mobilenumber,item.MotheremaILcust_family_id);\"> &nbsp;&nbsp;&nbsp;&nbsp;verify mobile</a>                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelfatherland\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"fatherlandnum\" Font-Bold=\"true\">Land line #</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblfatherlandnum\">{{item.landlinewithcode}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <label ng-show=\"(item.primarylandline==1)|| (item.MotherLandisverfied) ?true:false\">\r" +
    "\n" +
    "     <span  ng-class=\"(item.MotherLandisverfied)==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\"  style=\"color:#00FF00;\"></span>\r" +
    "\n" +
    " </label>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelEmail\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"Email\" Font-Bold=\"true\">Email</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblmotherEmail\">{{item.Email}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <label ng-show=\"(item.Motherprimaryemail || item.MotherisemailVerified) ?true:false\">\r" +
    "\n" +
    "    <span  ng-class=\"item.MotherisemailVerified==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\"></span>\r" +
    "\n" +
    "</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" ng-show=\"(item.Motherprimaryemail)&&(((item.MotherisemailVerified))==true?false:true) ?true:false\" ng-click=\"page.model.verifymail();\">verify email</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <h4>Siblings Contact Details</h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div ID=\"UpdatePanelBrotherContactDetails\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"page.model.SiiblingContactArr\" ng-repeat=\"item in page.model.SiiblingContactArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"Div3\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelsiblingcontactsDetails\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanellnksiblingDetailst\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.showContactPopup('sibbling',item,'SelfFlag');\">Edit\r" +
    "\n" +
    "                        </a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelbrothername\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"brothername\" Font-Bold=\"true\">{{(item.Siblingemailreletionship===\"41\" || item.Siblingemailreletionship===\"42\" )?\"Brother Name\":\"Sister Name\"}}</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblbrothername\">{{item.SiblingName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelbrothermobile\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"brothermobile\" Font-Bold=\"true\">Moblie #</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblbrothermobile\">{{item.SiblingMobilewithcode}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <label ng-show=\"(item.primarymobile===1)|| (item.Siblingmobileisverfied) ?true:false \">\r" +
    "\n" +
    "    <span  ng-class=\"item.Siblingmobileisverfied==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\">\r" +
    "\n" +
    "    </span></label>\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" ng-show=\"(item.primarymobile)&&(((item.Siblingmobileisverfied))==true?false:true) ?true:false\" ng-click=\"page.model.sendMobileCode(item.Siblingmobilecountrycode,item.Siblingmobilecountrycode,item.Siblingmobilenumber,item.SiblingemaILcust_family_id);\"> &nbsp;&nbsp;&nbsp;&nbsp;verify mobile</a>                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelbrotherland \" class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span Font-Bold=\"true \">Land line #</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span>{{item.Siblinglandlinewithcode}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <label ng-show=\"(item.primarylandline==1)|| (item.SiblingLandisverfied) ?true:false\">\r" +
    "\n" +
    "     <span  ng-class=\"(item.SiblingLandisverfied)==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\"  style=\"color:#00FF00;\"></span>\r" +
    "\n" +
    " </label>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelbrotherEmail\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"brotherEmail\" Font-Bold=\"true\">Email</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblbrotherEmail\">{{item.SiblingEmail}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <label ng-show=\"(item.Siblingprimaryemail || item.SiblingisemailVerified) ?true:false\">\r" +
    "\n" +
    "    <span  ng-class=\"item.SiblingisemailVerified==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\"></span>\r" +
    "\n" +
    "</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" ng-show=\"(item.Siblingprimaryemail)&&(((item.SiblingisemailVerified))==true?false:true) ?true:false\" ng-click=\"page.model.verifymail();\">verify email</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdateEditSpouse \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "                                <div id=\"nowife \">\r" +
    "\n" +
    "                                    <div ID=\"updatenowifr \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div ID=\"UpdatePSpouse \" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.showContactPopup('sibbling',item,'SpouseFlag');\">Edit\r" +
    "\n" +
    "                                                            </a>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div ID=\"UpdatePanelbrotherwifename \" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <span ID=\"brotherwifename \" Font-Bold=\"true \">{{item.Siblingemailreletionship===41 || item.Siblingemailreletionship==42 ?\"Brother Wife \":\"Sister Husband\"}}</span></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span ID=\"lblbrotherwifename\">{{item.SiblingSpouseNAme}}</span></h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div ID=\"UpdatePanelbrotherwifemobile\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <span ID=\"brotherwifemobilenum\" Font-Bold=\"true\">Moblie #</span></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span ID=\"lblbrotherwifemobilenum\">{{item.SiblingSpouseMobilenumberwithcode}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div ID=\"UpdatePanelbrotherwifeland\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <span ID=\"brotherwifelandnum\" Font-Bold=\"true\">Land line #</span></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span ID=\"lblbrotherwifelandnum\">{{item.SiblingSpouseLandnumberwithcode}}</span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div ID=\"upSpouseEmail\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <span ID=\"SpouseEmail\" Font-Bold=\"true\">Email</span></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span ID=\"lblSpouseEmail\">{{item.SiblingSpouseEmail}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Relative Contact Details</h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.relativeContactArr\" ng-repeat=\"item in page.model.relativeContactArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"Div4\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelRelativecontactsDetails\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanellnkFatherBrothercontactsDetailst\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.showContactPopup('relative',item);\">Edit\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelFatherBrothername\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"FatherBrothername\" Font-Bold=\"true\">{{item.lblname}}</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblFatherBrothername\">{{item.NAME}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelFatherBrothermobile\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"FatherBrothermobile\" Font-Bold=\"true\">Moblie #</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblFatherBrothermobile\">{{item.Mobilewithcode}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <label ng-show=\"(item.primarymobile===1)|| (item.mobileisverfied) ?true:false \">\r" +
    "\n" +
    "    <span  ng-class=\"item.mobileisverfied==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\">\r" +
    "\n" +
    "    </span></label>\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" ng-show=\"(item.primarymobile)&&(((item.mobileisverfied))==true?false:true) ?true:false\" ng-click=\"page.model.sendMobileCode(item.mobilecountrycode,item.mobilecountrycode,item.mobilenumber,item.emaILcust_family_id);\"> &nbsp;&nbsp;&nbsp;&nbsp;verify mobile</a>                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelFatherBrotherland \" class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"FatherBrotherlandnum \" Font-Bold=\"true \">Land line #</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblFatherBrotherlandnum \">{{item.landlinewithcode}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <label ng-show=\"(item.primarylandline==1)|| (item.Landisverfied) ?true:false\">\r" +
    "\n" +
    "     <span  ng-class=\"(item.Landisverfied)==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\"  style=\"color:#00FF00;\"></span>\r" +
    "\n" +
    " </label>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelFatherBrotherEmail \" class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"FatherBrotherEmail \" Font-Bold=\"true \">Email</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblFatherBrotherEmail \">{{item.Email}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <label ng-show=\"(item.primaryemail || item.isemailVerified) ?true:false\">\r" +
    "\n" +
    "    <span  ng-class=\"item.isemailVerified==true?'glyphicon glyphicon-check':'glyphicon glyphicon-ok'\"></span>\r" +
    "\n" +
    "</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" ng-show=\"(item.primaryemail)&&(((item.isemailVerified))==true?false:true) ?true:false\" ng-click=\"page.model.verifymail();\">verify email</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item \">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix \">\r" +
    "\n" +
    "                <h4>Reference Contact details</h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix \">\r" +
    "\n" +
    "                    <div ID=\"UpdatePanelreference \">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item \">\r" +
    "\n" +
    "                <div ng-if=\"page.model.referenceContactArr\" ng-repeat=\"item in page.model.referenceContactArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"Div5 \" class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelreferencername \" class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"referencename \" Font-Bold=\"true \">Name</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblreferencename \">{{item.CandidateName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"updatereferenceMoblie \" class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span ID=\"referenceMoblie \" Font-Bold=\"true \">Moblie #</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span ID=\"lblreferenceMoblie \">{{item.CandidateMobilewithcode}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanellnkreferencemobilesedit \" class=\"edit_page_item_ui clearfix \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a class=\"edit_page_edit_button\" href=\"javascript:void(0);\" ng-click=\"page.model.showContactPopup('reference',item);\">Edit\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelreferencelandnum \" class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"referencelandnum \" Font-Bold=\"true \">Land line #</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblreferencelandnum \">{{item.Candidatelandlinewithcode}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ID=\"UpdatePanelreferenceemail \" class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"referenceemail \" Font-Bold=\"true \">Email</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblreferenceemail \">{{item.CandidateEmail}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"SibContactContent.html\">\r" +
    "\n" +
    "    <form name=\"sibForm\" novalidate role=\"form\" ng-submit=\"page.model.commonContactSubmit(page.model.sibobj.SiblingemaILcust_family_id,page.model.sibobj.txtsiblingname,\r" +
    "\n" +
    "    page.model.sibobj.ddlSiblingmob,page.model.sibobj.txtSiblingmob,page.model.sibobj.ddlsiblingmob2,page.model.sibobj.txtsiblingmob2,page.model.sibobj.ddlsiblinglandcode,\r" +
    "\n" +
    "    page.model.sibobj.txtsiblinglandarea,page.model.sibobj.txtsiblinglandnumber,page.model.sibobj.txtsiblinglemail,page.model.sibFlag)\">\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "            <h3 class=\"modal-title text-center\" id=\"modal-title\">Siblings Contact Details\r" +
    "\n" +
    "                <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                    <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "            <ul>\r" +
    "\n" +
    "                <li class=\"clearfix\">\r" +
    "\n" +
    "                    <label for=\"lblsiblingname\" class=\"pop_label_left\">Name</label>\r" +
    "\n" +
    "                    <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                        <input type=\"text\" ng-model=\"page.model.sibobj.txtsiblingname\" class=\"form-control\" readonly=\"true\" tabindex=\"1\" />\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "                <contact-directive emailhide=\"true\" dmobile=\"page.model.sibobj.ddlSiblingmob\" strmobile=\"page.model.sibobj.txtSiblingmob\" dalternative=\"page.model.sibobj.ddlsiblingmob2\" stralternative=\"page.model.sibobj.txtsiblingmob2\" dland=\"page.model.sibobj.ddlsiblinglandcode\"\r" +
    "\n" +
    "                    strareacode=\"page.model.sibobj.txtsiblinglandarea\" strland=\"page.model.sibobj.txtsiblinglandnumber\" strmail=\"page.model.sibobj.txtsiblinglemail\"></contact-directive>\r" +
    "\n" +
    "                <li class=\"row\">\r" +
    "\n" +
    "                    <edit-footer></edit-footer>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"parentContactContent.html\">\r" +
    "\n" +
    "    <form name=\"parentForm\" novalidate role=\"form\" ng-submit=\"page.model.commonContactSubmit(page.model.parentobj.MotheremaILcust_family_id,\r" +
    "\n" +
    "    page.model.parentobj.txtFathername,page.model.parentobj.ddlcandidatefathermobcode,page.model.parentobj.txtcandidatefathermob,page.model.parentobj.ddlcandidatefathermob2code,\r" +
    "\n" +
    "    page.model.parentobj.txtcandidatefathermob2,page.model.parentobj.ddlcandidatefathelandcode,page.model.parentobj.txtcandidatefathelandareacode\r" +
    "\n" +
    "    ,page.model.parentobj.txtcandidatefathelandnumber,page.model.parentobj.txtcandidatefatheremail,'Parent')\">\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "            <h3 class=\"modal-title text-center\" id=\"modal-title\">Parent contact details\r" +
    "\n" +
    "                <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                    <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "            <ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"clearfix\">\r" +
    "\n" +
    "                    <label for=\"lblFathername\" class=\"pop_label_left\">Name</label>\r" +
    "\n" +
    "                    <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                        <input type=\"text\" ng-model=\"page.model.parentobj.txtFathername\" class=\"form-control\" readonly=\"true\" tabindex=\"1\" />\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <contact-directive emailhide=\"true\" dmobile=\"page.model.parentobj.ddlcandidatefathermobcode\" strmobile=\"page.model.parentobj.txtcandidatefathermob\" dalternative=\"page.model.parentobj.ddlcandidatefathermob2code\" stralternative=\"page.model.parentobj.txtcandidatefathermob2\"\r" +
    "\n" +
    "                    dland=\"page.model.parentobj.ddlcandidatefathelandcode\" strareacode=\"page.model.parentobj.txtcandidatefathelandareacode\" strland=\"page.model.parentobj.txtcandidatefathelandnumber\" strmail=\"page.model.parentobj.txtcandidatefatheremail\"></contact-directive>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"row\">\r" +
    "\n" +
    "                    <edit-footer></edit-footer>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"relativeContactContent.html\">\r" +
    "\n" +
    "    <form name=\"relativeForm\" novalidate role=\"form\" ng-submit=\"page.model.commonContactSubmit(page.model.relativeobj.emaILcust_family_id,page.model.relativeobj.txtrelativename\r" +
    "\n" +
    "    ,page.model.relativeobj.ddlRelativemob,\r" +
    "\n" +
    "    page.model.relativeobj.txtRelativemob,page.model.relativeobj.ddlRelativemob2,page.model.relativeobj.txtRelativemob2,page.model.relativeobj.ddllandRelativecode,page.model.relativeobj.txtRelativeareacode\r" +
    "\n" +
    "    ,page.model.relativeobj.txtlandnumberRelative,page.model.relativeobj.txtRelativeemail,'relative')\">\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "            <h3 class=\"modal-title text-center\" id=\"modal-title\">Relative Contact Details\r" +
    "\n" +
    "                <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                    <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "            <ul>\r" +
    "\n" +
    "                <li class=\"clearfix\">\r" +
    "\n" +
    "                    <label for=\"lblrelativename\" class=\"pop_label_left\">Name</label>\r" +
    "\n" +
    "                    <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                        <input type=\"text\" ng-model=\"page.model.relativeobj.txtrelativename\" class=\"form-control\" readonly=\"true\" tabindex=\"1\" />\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <contact-directive emailhide=\"true\" dmobile=\"page.model.relativeobj.ddlRelativemob\" strmobile=\"page.model.relativeobj.txtRelativemob\" dalternative=\"page.model.relativeobj.ddlRelativemob2\" stralternative=\"page.model.relativeobj.txtRelativemob2\" dland=\"page.model.relativeobj.ddllandRelativecode\"\r" +
    "\n" +
    "                    strareacode=\"page.model.relativeobj.txtRelativeareacode\" strland=\"page.model.relativeobj.txtlandnumberRelative\" strmail=\"page.model.relativeobj.txtRelativeemail\"></contact-directive>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"row\">\r" +
    "\n" +
    "                    <edit-footer></edit-footer>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"candidateContactContent.html\">\r" +
    "\n" +
    "    <form name=\"candidateForm\" novalidate role=\"form\" ng-submit=\"page.model.commonContactSubmit(page.model.candidateobj.emaILcust_family_id,'',\r" +
    "\n" +
    "    page.model.candidateobj.ddlcandidateMobileCountryID,\r" +
    "\n" +
    "    page.model.candidateobj.txtcandidatemobilenumber,page.model.candidateobj.ddlcandidateMobileCountryID2,\r" +
    "\n" +
    "    page.model.candidateobj.txtFBMobileNumber2,page.model.candidateobj.ddlcandidateLandLineCountry,page.model.candidateobj.txtcandidateAreCode,\r" +
    "\n" +
    "    page.model.candidateobj.txttxtcandidateAreCodeLandNumber,\r" +
    "\n" +
    "    page.model.candidateobj.txtcandidateEmails,'Candidate')\">\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "            <h3 class=\"modal-title text-center\" id=\"modal-title\">Candidate Contact details\r" +
    "\n" +
    "                <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                    <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "            <ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"clearfix\">\r" +
    "\n" +
    "                    <div id=\"divrelationer\">\r" +
    "\n" +
    "                        <label for=\"lblreationName\" class=\"pop_label_left\">Details of</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <contact-directive emailhide=\"true\" dmobile=\"page.model.candidateobj.ddlcandidateMobileCountryID\" strmobile=\"page.model.candidateobj.txtcandidatemobilenumber\" dalternative=\"page.model.candidateobj.ddlcandidateMobileCountryID2\" stralternative=\"page.model.candidateobj.txtFBMobileNumber2\"\r" +
    "\n" +
    "                    dland=\"page.model.candidateobj.ddlcandidateLandLineCountry\" strareacode=\"page.model.candidateobj.txtcandidateAreCode\" strland=\"page.model.candidateobj.txttxtcandidateAreCodeLandNumber\" strmail=\"page.model.candidateobj.txtcandidateEmails\"></contact-directive>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"row\">\r" +
    "\n" +
    "                    <edit-footer></edit-footer>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"referenceContactContent.html\">\r" +
    "\n" +
    "    <form name=\"refForm\" novalidate role=\"form\" ng-submit=\"page.model.submitContactReference(page.model.referenceobj)\">\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "            <h3 class=\"modal-title text-center\" id=\"modal-title\">Reference Contact details\r" +
    "\n" +
    "                <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                    <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "            <ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"clearfix\">\r" +
    "\n" +
    "                    <label for=\"lblreferencename\" class=\"pop_label_left\">Name</label>\r" +
    "\n" +
    "                    <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                        <input type=\"text\" ng-model=\"page.model.referenceobj.txtreferencename\" class=\"form-control\" readonly=\"true\" tabindex=\"1\" />\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <contact-directive emailhide=\"true\" dmobile=\"page.model.referenceobj.ddlreferencemobile\" strmobile=\"page.model.referenceobj.txtreferencemobile\" dalternative=\"page.model.referenceobj.ddlreferencemobile2\" stralternative=\"page.model.referenceobj.txtreferencemobile2\"\r" +
    "\n" +
    "                    dland=\"page.model.referenceobj.ddlreferencelandnumber\" strareacode=\"page.model.referenceobj.txtreferenceAreCode\" strland=\"page.model.referenceobj.txtreferencelandnumber\" strmail=\"page.model.referenceobj.txtreferenceemail\"></contact-directive>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"row\">\r" +
    "\n" +
    "                    <edit-footer></edit-footer>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"candidateAddrContent.html\">\r" +
    "\n" +
    "    <form name=\"addrForm\" novalidate role=\"form\" ng-submit=\"page.model.CandidateAddressSubmit(page.model.canAddrobj)\">\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "            <h3 class=\"modal-title text-center\" id=\"modal-title\">Candidate Address Details\r" +
    "\n" +
    "                <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                    <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "            <ul>\r" +
    "\n" +
    "                <ul>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"lblCandidateHouseflat\" class=\"pop_label_left\">House/Flat number</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input type=\"text\" ng-model=\"page.model.canAddrobj.txtCandidateHouse_flat\" class=\"form-control\" maxlength=\"100\" tabindex=\"1\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <label for=\"lblCandidateApartmentName\" class=\"pop_label_left\">Apartment name</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input type=\"text\" ng-model=\"page.model.canAddrobj.txtCandidateApartmentName\" class=\"form-control\" maxlength=\"100\" tabindex=\"2\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <label for=\"lblCandidateStreetName\" class=\"pop_label_left\">Street name</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input type=\"text\" ng-model=\"page.model.canAddrobj.txtCandidateStreetName\" class=\"form-control\" maxlength=\"100\" tabindex=\"3\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <label for=\"lblCandidateAreaName\" class=\"pop_label_left\">Area Name</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <input type=\"text\" ng-model=\"page.model.canAddrobj.txtCandidateAreaName\" class=\"form-control\" maxlength=\"100\" tabindex=\"4\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <label for=\"lblCandidateeLandmark\" class=\"pop_label_left\">Landmark</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input type=\"text\" ng-model=\"page.model.canAddrobj.txtCandidateLandmark\" class=\"form-control\" maxlength=\"100\" tabindex=\"5\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <country-directive countryshow=\"true\" cityshow=\"false\" othercity=\"false\" dcountry=\"page.model.canAddrobj.ddlCandidateCountryContact\" dstate=\"page.model.canAddrobj.ddlCandidateStateContact\" ddistrict=\"page.model.canAddrobj.ddlCandidateDistricContact\" require=true></country-directive>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <label for=\"lblCityCandidate\" class=\"pop_label_left\">City<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <input type=\"text\" ng-model=\"page.model.canAddrobj.txtCandidateCity\" class=\"form-control\" maxlength=\"100\" tabindex=\"9\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <label for=\"lblCandidateZip_pin\" class=\"pop_label_left\">Zip/Pin</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <input type=\"text\" ng-model=\"page.model.canAddrobj.txtCandidateZip_no\" class=\"form-control\" maxlength=\"8\" onkeydown=\"return checkwhitespace(event,this.id);\" tabindex=\"10\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "                <li class=\"row\">\r" +
    "\n" +
    "                    <edit-footer></edit-footer>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"primaryRelationContent.html\">\r" +
    "\n" +
    "    <form name=\"refForm\" novalidate role=\"form\" ng-submit=\"page.model.primaryRelationSubmit(page.model.setrelObj.ddlPrimaryMobileRel,page.model.setrelObj.ddlPrimaryEmailRel,'1')\">\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "            <h3 class=\"modal-title text-center\" id=\"modal-title\">Candidate Primary Contact relation\r" +
    "\n" +
    "                <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                    <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "            <ul>\r" +
    "\n" +
    "                <li>\r" +
    "\n" +
    "                    <div class=\"row\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"col-lg-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"Div4\">\r" +
    "\n" +
    "                                <label for=\"lblMobile\" class=\"pop_label_left\">Mobile #  </label>\r" +
    "\n" +
    "                                <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                                    <select multiselectdropdown ng-model=\"page.model.setrelObj.ddlPrimaryMobileRel\" typeofdata=\"'childStayingWith'\"></select>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"col-lg-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"Div1\">\r" +
    "\n" +
    "                                <label for=\"lblMobile\" class=\"pop_label_left\">Email #  </label>\r" +
    "\n" +
    "                                <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <select multiselectdropdown ng-model=\"page.model.setrelObj.ddlPrimaryEmailRel\" typeofdata=\"'childStayingWith'\"></select>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <br/>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"row\">\r" +
    "\n" +
    "                    <edit-footer></edit-footer>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"verifyMobileContent.html\">\r" +
    "\n" +
    "    <form name=\"refForm\" novalidate role=\"form\" ng-submit=\"page.model.verifyMobCode(page.model.verifymobObj.txtVerificationcode)\">\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "            <h3 class=\"modal-title text-center\" id=\"modal-title\">Mobile verification code sent successfully to {{page.model.popupMobilenumber}}\r" +
    "\n" +
    "                <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                    <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\"></ng-md-icon>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "            <ul>\r" +
    "\n" +
    "                <li class=\"clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"row\">\r" +
    "\n" +
    "                        <span style=\"color: #000; font-size: 13px; margin-left: 20px; font-weight: bold;\">Click yes, If you want to verify by you \r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <br />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"Divrbt\" class=\"radio-group-my\" runat=\"server\">\r" +
    "\n" +
    "                        <label class=\"control-label\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <md-radio-group name=\"rbtnVerf\" layout=\"row\" ng-model=\"page.model.verifymobObj.rbtnVerf\" class=\"md-block\" ng-change=\"page.model.verifymobObj.rbtnVerf==='2'?page.model.cancel():''\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                            <md-radio-button value=\"1\" class=\"md-primary\">Yes</md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"2\"> No </md-radio-button>\r" +
    "\n" +
    "                        </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <br />\r" +
    "\n" +
    "                    <br />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div ng-if=\"page.model.verifymobObj.rbtnVerf==='1'\">\r" +
    "\n" +
    "                        <b>Mobile verify Code : </b><input type=\"text\" height=\"40\" ng-model=\"page.model.verifymobObj.txtVerificationcode\" maxlength=\"6\" class=\"form-control\" style=\"width:50%;\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"row\">\r" +
    "\n" +
    "                    <edit-footer></edit-footer>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<style>\r" +
    "\n" +
    "    .fa-check-circle {\r" +
    "\n" +
    "        font-size: 21px;\r" +
    "\n" +
    "        color: green;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editEducation/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "        <page-review dispaly-name=\"'Education details'\" linkval=\"model.lnkeducationandprofReview\" sectionid=\"'6,7,8'\" custid=\"page.model.CustID\"></page-review>\r" +
    "\n" +
    "        <div class=\"edit_page_item\" ng-if=\"page.model.Admin === 1 || page.model.Admin === '1'\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Customer Personal Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.custEmpLastModificationDate!=undefined && page.model.custEmpLastModificationDate!=null && page.model.custEmpLastModificationDate!==''\">ModifiedBy :{{page.model.custEmpLastModificationDate}}</span>\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.CustomerDataArr.length==0\">\r" +
    "\n" +
    "                    <a id=\"lnkpersonaldetailsadd\" class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.showpopup('custData');\">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.CustomerDataArr\" ng-repeat=\"item in page.model.CustomerDataArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"reviewdivpersonal\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                        <div id=\"UpdatePanel6\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"gender\">Gender</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblGender\">\r" +
    "\n" +
    "                            {{item.Gender}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanellblMaritalStatus\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"MaritalStatus\">Marital Status</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblMaritalStatus\">\r" +
    "\n" +
    "                            {{item.MartialStatus}}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdatePanelLnkpersonaledit\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a href=\"javascript:void(0);\" ng-click=\"page.model.showpopup('custData',item);\" visible='<%# Request.QueryString[\"Admin\"] == \"1\" %>' class=\"edit_page_edit_button\">Edit\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePaneldateofbirth\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"divdateofbirth\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"dateofbirth\" font-bold=\"true\">Date Of Birth</span></h6>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lbldateofbirth\">{{item.DateofBirth}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelheight\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"divcandidateheight\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblcandidateheight\" font-bold=\"true\">Height</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblheight\">{{item.Height}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelcolor\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\" id=\"divcomplexion\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblcolor\" font-bold=\"true\">Complexion</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblcomplexion\">{{item.Complexion}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelreligion\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"divreligion\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"religion\" font-bold=\"true\">Religion</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblReligion\">{{item.Religion}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanel1\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"div1\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"span1\" font-bold=\"true\">Mother Tongue</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblmothertongue\">{{item.Mothertongue}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelpersonalcaste\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"divpersonalcaste\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblcaste\" font-bold=\"true\">Caste</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblcandidatecaste\">{{item.Caste+(item.SubCaste!=='' && item.SubCaste!==null?'('+item.SubCaste+')':'')}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"lblsubcaste\" font-bold=\"true\">Physical Status</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblsubcastecandidate\">{{item.PhysicalStatus}}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelBorncitizenship\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"divBorncitizenship\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblcitizenship\" font-bold=\"true\">BornCitizenship</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblborncitizenship\">{{item.Citizenship}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\" id=\"divEducation\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Education Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.eduEmpLastModificationDate!=null && page.model.eduEmpLastModificationDate!=='' && page.model.eduEmpLastModificationDate!==undefined\">ModifiedBy :{{page.model.eduEmpLastModificationDate}}</span></h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix \">\r" +
    "\n" +
    "                    <a class=\"edit_page_add_button\" href=\"javascript:void(0); \" ng-click=\"page.model.showpopup('showEduModal'); \">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.educationSelectArray\" ng-repeat=\"item in page.model.educationSelectArray\">\r" +
    "\n" +
    "                    <div id=\"reviewdiv \" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls': 'edit_page_details_item_desc clearfix' \">\r" +
    "\n" +
    "                        <div id=\"lbleducationgroup \" class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lbleducationgroup \" ng-style=\"{color: item.EduHighestDegree==1? 'Red': 'Black'} \">{{item.EducationCategory!=null?(item.EducationCategory==\"Below Graduation \"?\"Under Graduation \":\"Education \"):\"Education \"}}</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <label id=\"edgoup \" ng-style=\"{color: item.EduHighestDegree==1? 'Red': ''} \">{{item.EducationGroup+\" \"+((item.EducationSpecialization!=null?\"( \" +item.EducationSpecialization+\") \":\" \"))+\"\r" +
    "\n" +
    "                        \"+((item.EduPassOfYear!=null?\",Completed \"+\"- \"+item.EduPassOfYear:\" \"))}} </label>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"editeducationbutton \" class=\"edit_page_item_ui clearfix \">\r" +
    "\n" +
    "                            <a id=\"LinkButton1dfd \" href=\"javascript:void(0); \" ng-click=\"page.model.showpopup( 'showEduModal',item) \">Edit</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a ng-if=\"item.EduHighestDegree!==1\" href=\"javascript:void(0); \" class=\"edit_page_del_button \" ng-click=\"page.model.DeleteEduPopup(item.EducationID); \">Delete</a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"divuniversityhiding \" class=\"edit_page_details_item_desc clearfix \" ng-hide=\"item.EduUniversity===null \">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"Label1 \">University</span>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblTuniversity \">{{item.EduUniversity}}</span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"divCollege \" class=\"edit_page_details_item_desc clearfix \" ng-hide=\"item.EduCollege===null \">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"Label9 \">College</span>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblTcollege \">{{item.EduCollege}}</span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix \" id=\"divcityviewhiding \" ng-hide=\"item.EduCityIn===null \">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"Label3 \" font-bold=\"true \">City Study In</span>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblcountry \">{{item.EduCityIn+\", \"+ (item.EduDistrictIn!==null?item.EduDistrictIn+\", \":'')+ item.EduStateIn+\", \"+item.EduCountryIn}}</span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"divmerit \" class=\"edit_page_details_item_desc clearfix \" ng-hide=\"item.Educationdesc==null \">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"Label5 \" font-bold=\"true \">Education Merits</span>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblmerits \">{{item.Educationdesc}}</span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item \">\r" +
    "\n" +
    "            <div id=\"divlnkAddProfession \" class=\"edit_page_item_head clearfix \">\r" +
    "\n" +
    "                <h4>Professional Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style=\"color: #08CFD2 \" ng-show=\"page.model.profEmpLastModificationDate!=null && page.model.profEmpLastModificationDate!=='' && page.model.profEmpLastModificationDate!==undefined\">ModifiedBy :{{page.model.profEmpLastModificationDate}}</span></h4>\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix \">\r" +
    "\n" +
    "                    <div ng-if=\"page.model.ProfessionSelectArray.length==0 \">\r" +
    "\n" +
    "                        <a class=\"edit_page_add_button \" href=\"javascript:void(0); \" ng-click=\"page.model.showpopup( 'showProfModal') \">Add</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit_page_details_item \">\r" +
    "\n" +
    "                <div ng-if=\"page.model.ProfessionSelectArray\" ng-repeat=\"item in page.model.ProfessionSelectArray\">\r" +
    "\n" +
    "                    <div id=\"reviewdiv \" ng-class=\"item.reviewstatus===false? 'reviewCls': '' \">\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix \">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"lblprofession \" style=\"font-weight:bold; \">Profession</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"txtProfession \">{{item.Professional+\" \"+(item.CompanyName !=null && item.CompanyName !=\" \"?\"in \"+\" \"+item.CompanyName:'')}}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"edit_page_item_ui clearfix \" ng-if=\"page.model.ProfessionSelectArray.length>0\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a id=\"Linkedit\" class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.showpopup('showProfModal',item)\">Edit</a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"divcitywork\" class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.CityWorkingIn==null\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"lblcitywork\" style=\"font-weight:bold;\">City working in </span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblcityworkingg\">{{(item.CityWorkingIn!=null?\" \"+item.CityWorkingIn:\" \")+ \" \" +(item.StateWorkingIn!=null && item.StateWorkingIn!=\" \"?\",\"+item.StateWorkingIn:\"\")+\" \"+(item.CountryWorkingIn!=null && item.CountryWorkingIn!=\"\"? \", \"+item.CountryWorkingIn:\" \")}}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"Div1\">\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.Salary===null\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblsal\" style=\"font-weight:bold;\">Monthly salary</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblsalaryy\">{{item.Currency+\" \"+(item.Salary!=null && item.Salary!=\"\"?\" \"+item.Salary+\"/-\":\"\")}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"Div2\" class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.WorkingFromDate===null\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblworkfrom\" style=\"font-weight:bold;\">Working from date</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblworkingfrom\">{{item.WorkingFromDate | date:'dd-MM-yyyy'}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"Div3\" class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.VisaStatus===null\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblvisa\">visa status</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"txtvisa\">{{item.VisaStatus}}</span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"Div4\" class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.ResidingSince===null\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"lblsincedate\">Since date</span>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"txtsincedate\">{{item.ResidingSince | date:'dd-MM-yyyy'}}</span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"Div5\" class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.ArrivingDate===null\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"lblarrival\">Arrival Date</span>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"txtarrival\">{{item.ArrivingDate | date:'dd-MM-yyyy'}}</span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"Div6\" class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.DepartureDate===null\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"lbldepartture\">Departure Date</span>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"txtdaparture\"> {{item.DepartureDate | date:'dd-MM-yyyy'}}</span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"Div7\" class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.OccupationDetails===null\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"lblOccupation\" style=\"font-weight:bold;\">Occupation Details</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span>{{item.OccupationDetails}} </span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div id=\"divlnkadd\" class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Mention your goals, interests and hobbies etc</h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                    <div id=\"upAboutAdd\" ng-if=\"page.model.lblaboutUrself===undefined || page.model.lblaboutUrself==='' || page.model.lblaboutUrself===null\">\r" +
    "\n" +
    "                        <a class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.showpopup('showAboutModal')\">Add</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div id=\"reviewdiv\" ng-class=\"AboutReviewStatusID===0?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "                    <div class=\"form-group\">\r" +
    "\n" +
    "                        <div id=\"uplblAbout\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h5 style=\"float: none; width: 92%; display: block;\">\r" +
    "\n" +
    "                                <span>{{page.model.lblaboutUrself}}</span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-if=\"page.model.lblaboutUrself!==undefined && page.model.lblaboutUrself!=='' && page.model.lblaboutUrself!==null\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                            <a class=\"edit_page_edit_button\" href=\"javascript:void(0);\" ng-click=\"page.model.showpopup('showAboutModal',page.model.lblaboutUrself)\">Edit</a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"deleteEduContent.html\">\r" +
    "\n" +
    "        <form class=\"EditViewClass\" name=\"deletetForm\" novalidate role=\"form\" ng-submit=\"page.model.deleteEduSubmit();\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Alert\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix\" id=\"modal-body\">\r" +
    "\n" +
    "                <b class=\"text-center\"> Do you want to delete Education details</b>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"modal-footer\">\r" +
    "\n" +
    "                <button type=\"submit\" class=\"btn btn-success\">Delete</button>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"page.model.cancel();\">Cancel</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"commonEduCatiobpopup.html\">\r" +
    "\n" +
    "        <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "        </slide-popup>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<style>\r" +
    "\n" +
    "    .multiselect {\r" +
    "\n" +
    "        border: solid 1px #ADA2A2 !important;\r" +
    "\n" +
    "        color: #000;\r" +
    "\n" +
    "        background: #fff !important;\r" +
    "\n" +
    "        box-shadow: none !important;\r" +
    "\n" +
    "        height: 34px !important;\r" +
    "\n" +
    "        line-height: 33px;\r" +
    "\n" +
    "        margin: 0 !important;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editManagePhoto/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"register_page_main\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"my_photos_main my_photos_main_edit\">\r" +
    "\n" +
    "                <!--<h6>Upload your recent Photos for better response</h6>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"clear\">&nbsp;</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <br />\r" +
    "\n" +
    "                <div class=\"dragzone\">\r" +
    "\n" +
    "                    <div class=\"pics_selected_list_main clearfix\">\r" +
    "\n" +
    "                        <div class=\"pics_selected_list_main_lt clearfix\">\r" +
    "\n" +
    "                            <!--<p class=\"clearfix\"><span>Upload your three different photos</span></p>-->\r" +
    "\n" +
    "                            <div ng-if=\"page.model.manageArr\" class=\"clearfix\" ng-repeat=\"item in page.model.manageArr\" style=\"width:33%;float:left;\">\r" +
    "\n" +
    "                                <div class=\"photos\">\r" +
    "\n" +
    "                                    <div class=\"pics_selected_list_item clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div id=\"divFalseCustomer\">\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <div class=\"row\" ng-show='item.UploadedBy== null?false:true'>\r" +
    "\n" +
    "                                                    <div class=\"col-lg-12\" ng-show='item.UploadedBy== null?false:true'>\r" +
    "\n" +
    "                                                        <label style=\"color: maroon !important;\">Uploaded By :</label>\r" +
    "\n" +
    "                                                        <label id=\"lblUploadedText\" font-bold=\"true\" forecolor=\"Black\">{{item.UploadedBy}}</label>\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "                                                    <br />\r" +
    "\n" +
    "                                                    <div class=\"col-lg-12\">\r" +
    "\n" +
    "                                                        <label id=\"lblUploadedDate\" font-bold=\"true\" style=\"color: maroon !important;\">Uploaded Date:</label>\r" +
    "\n" +
    "                                                        <label id=\"lblUploadedDateText\" font-bold=\"true\" forecolor=\"Black\">{{item.UploadedDate}}</label>\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <div id=\"Div3\" class=\"row\" ng-show='item.strModifiedByEmpID==null?false:true'>\r" +
    "\n" +
    "                                                    <div class=\"col-lg-12\">\r" +
    "\n" +
    "                                                        <label id=\"lblModifiedBy\" font-bold=\"true\" style=\"color: maroon !important;\">Modified By :</label>\r" +
    "\n" +
    "                                                        <label id=\"lblModifiedByText\" font-bold=\"true\" forecolor=\"Black\">{{item.strModifiedByEmpID}}</label>\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "                                                    <br />\r" +
    "\n" +
    "                                                    <div class=\"col-lg-12\" ng-show='item.ModifiedDate==null?false:true'>\r" +
    "\n" +
    "                                                        <label id=\"lblModifiedDate\" font-bold=\"true\" style=\"color: maroon !important;\">Modified Date:</label>\r" +
    "\n" +
    "                                                        <label id=\"lblModifiedDateText\" font-bold=\"true\" text=\"\" forecolor=\"Black\">{{item.ModifiedDate}}</label>\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div ng-class=\"item.IsActive == 0 && item.PhotoName !== null?'cssMaskdiv clearfix':''\">\r" +
    "\n" +
    "                                            <img ng-model=\"imgPhotoName\" ng-src=\"{{item.ImageUrl}}\" />\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div class=\"pics_selected_list_item_ui clearfix\">\r" +
    "\n" +
    "                                            <div class=\"photos_icon\">\r" +
    "\n" +
    "                                                <a href=\"javascript:void(0);\" ng-click=\"page.model.AddImage($index+1,item.Cust_Photos_ID,item.DisplayOrder,item.IsActive);\" ng-show=\"{{item.addButtonvisible}}\">\r" +
    "\n" +
    "                                                    <ng-md-icon icon=\"add_a_photo\" style=\"fill:#665454\" size=\"25\">Add</ng-md-icon>\r" +
    "\n" +
    "                                                </a>\r" +
    "\n" +
    "                                                <a href=\"javascript:void(0);\" ng-show=\"{{item.IsMain==1?false:(item.PhotoName!=null?true:false)}}\" ng-click=\"page.model.DeleteImage(item.keyname,item.Cust_Photos_ID);\">\r" +
    "\n" +
    "                                                    <ng-md-icon icon=\"delete\" style=\"fill:#665454\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                                                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "                                                <a href=\"javascript:void(0);\" class=\"set_pic\" ng-click=\"page.model.setAsProfilePic(item.Cust_Photos_ID);\" style=\"color:#665454;font-weight:bold;\" ng-show='{{item.IsMain==\"1\"?false:(item.PhotoName!=null?true:false) }}'>\r" +
    "\n" +
    "                                            Set as Profilepic\r" +
    "\n" +
    "                                            </a>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"clear\"></div>\r" +
    "\n" +
    "                            <div class=\"edit_page_photo_manage_submit\">\r" +
    "\n" +
    "                                <div class=\"edit_page_photo_manage_protect pull-left clearfix\" ng-show=\"{{loginpaidstatus===1}}\">\r" +
    "\n" +
    "                                    <label class=\"\">\r" +
    "\n" +
    "                                \r" +
    "\n" +
    "                                <div class=\"radio_my2 clearfix\">\r" +
    "\n" +
    "                                <label style=\"font-size: 14px !important; font-weight: 400;\"> Protect with Password :</label> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;\r" +
    "\n" +
    "                                    <md-radio-group layout=\"row\" ng-model=\"rbtProtectPassword\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\" ng-change=\"page.model.setPhotoPassword(rbtProtectPassword);\">\r" +
    "\n" +
    "                                        <md-radio-button value=\"1\" class=\"md-primary\">Yes</md-radio-button>\r" +
    "\n" +
    "                                        <md-radio-button value=\"0\"> No </md-radio-button>\r" +
    "\n" +
    "                                    </md-radio-group>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                </label>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        </br>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"clearfix\"></div>\r" +
    "\n" +
    "                        <div class=\"photo_upload_instrctns_list clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a ID=\"phtoguide\" href=\"javascript:void(0);\" ng-click=\"page.model.redirectPage('PhotoGuideLines');\">Photo guidelines\r" +
    "\n" +
    "                        </a>\r" +
    "\n" +
    "                            <a ID=\"photofaq\" href=\"javascript:void(0);\" ng-click=\"page.model.redirectPage('Faqs');\">Photo faq’s\r" +
    "\n" +
    "                        </a>\r" +
    "\n" +
    "                            <a ID=\"photoupload\" href=\"javascript:void(0);\" ng-click=\"page.model.redirectPage('uploadTips');\">Photo upload tips\r" +
    "\n" +
    "                        </a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"my_photos_main_block2 clearfix\">\r" +
    "\n" +
    "                <div class=\"clearfix pics_incorrect_list\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <h3> Such Photos cannot be Uploaded</h3>\r" +
    "\n" +
    "                    <table id=\"DataList3\" class=\"clearfix\" style=\"border-collapse: collapse;\" cellspacing=\"0\">\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "                            <tr>\r" +
    "\n" +
    "                                <td>\r" +
    "\n" +
    "                                    <img id=\"DataList3_ctl00_images\" src=\"src\\images/Side-face.png\">\r" +
    "\n" +
    "                                    <p>\r" +
    "\n" +
    "                                        Side Face\r" +
    "\n" +
    "                                    </p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td>\r" +
    "\n" +
    "                                    <img id=\"DataList3_ctl01_images\" src=\"src\\images/Blir.png\">\r" +
    "\n" +
    "                                    <p>\r" +
    "\n" +
    "                                        Blur\r" +
    "\n" +
    "                                    </p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td>\r" +
    "\n" +
    "                                    <img id=\"DataList3_ctl02_images\" src=\"src\\images/Group-photos.png\">\r" +
    "\n" +
    "                                    <p>\r" +
    "\n" +
    "                                        Group Photo\r" +
    "\n" +
    "                                    </p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td>\r" +
    "\n" +
    "                                    <img id=\"DataList3_ctl03_images\" src=\"src\\images/Water-mark.png\">\r" +
    "\n" +
    "                                    <p>\r" +
    "\n" +
    "                                        Watermark\r" +
    "\n" +
    "                                    </p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"pics_selected_list_main_rt clearfix pics_correct_list\">\r" +
    "\n" +
    "                    <h3>Photos that can be uploaded</h3>\r" +
    "\n" +
    "                    <table id=\"DataList2\" class=\"clearfix\" style=\"border-collapse: collapse;\" cellspacing=\"0\">\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "                            <tr>\r" +
    "\n" +
    "                                <td>\r" +
    "\n" +
    "                                    <img id=\"DataList2_ctl00_images\" src=\"src\\images/Close-up.png\">\r" +
    "\n" +
    "                                    <p>\r" +
    "\n" +
    "                                        Close Up\r" +
    "\n" +
    "                                    </p>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td>\r" +
    "\n" +
    "                                    <img id=\"DataList2_ctl01_images\" src=\"src\\images/Fulsize.png\">\r" +
    "\n" +
    "                                    <p>\r" +
    "\n" +
    "                                        Full Size\r" +
    "\n" +
    "                                    </p>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"clear\">&nbsp;</div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"my_photos_main_block3\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <p>\r" +
    "\n" +
    "                    <img src=\"src/images/whatsup.png\" alt=\"Mail\" style=\"width: 50px; height: 40px;\">Whatsup your photos to\r" +
    "\n" +
    "                    <span>91-9848535373</span> - Kindly mention your Profile ID and name\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "                <p>\r" +
    "\n" +
    "                    <img src=\"src/images/icon_email.png\" alt=\"Mail\">Can also Email your photos to <span>photos@telugumarriages.com</span> - Kindly mention your Profile ID and name\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"AddimagePopup.html\">\r" +
    "\n" +
    "        <form class=\"EditViewClass\" name=\"uploadForm\" novalidate role=\"form\" ng-submit=\"page.model.upload(page.model.up)\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Upload Photo </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body\" id=\"modal-body\">\r" +
    "\n" +
    "                <ul id=\"ulprofession\">\r" +
    "\n" +
    "                    <input type=\"file\" file-model=\"page.model.up.myFile\" />\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-footer\">\r" +
    "\n" +
    "                <input value=\"Cancel\" class=\"button_custom button_custom_reset\" ng-click=\"page.model.cancel();\" type=\"button\">\r" +
    "\n" +
    "                <input value=\"Upload\" class=\"button_custom\" type=\"submit\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"deleteimagePopup.html\">\r" +
    "\n" +
    "        <form class=\"EditViewClass\" name=\"uploadForm\" novalidate role=\"form\" ng-submit=\"page.model.Delete(up);\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Delete Photo </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body\" id=\"modal-body\">\r" +
    "\n" +
    "                <div class=\"text-center\">Are you sure to delete photo?</div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-footer\">\r" +
    "\n" +
    "                <input value=\"Close\" class=\"button_custom button_custom_reset\" ng-click=\"page.model.cancel();\" type=\"button\">\r" +
    "\n" +
    "                <input value=\"Delete\" class=\"button_custom\" type=\"submit\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<style>\r" +
    "\n" +
    "    .cssMaskdiv {\r" +
    "\n" +
    "        position: relative;\r" +
    "\n" +
    "        display: inline-block;\r" +
    "\n" +
    "        overflow: hidden;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .cssMaskdiv:after {\r" +
    "\n" +
    "        background: rgba(0, 0, 0, 0.5) none repeat scroll 0 0;\r" +
    "\n" +
    "        color: #ffffff;\r" +
    "\n" +
    "        content: \"Under Review\";\r" +
    "\n" +
    "        display: block;\r" +
    "\n" +
    "        font-size: 14px;\r" +
    "\n" +
    "        /* height: 100%; */\r" +
    "\n" +
    "        left: 0;\r" +
    "\n" +
    "        padding: 50% 0;\r" +
    "\n" +
    "        position: absolute;\r" +
    "\n" +
    "        text-align: center;\r" +
    "\n" +
    "        top: 0;\r" +
    "\n" +
    "        width: 100%;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .pics_incorrect_list h3 {\r" +
    "\n" +
    "        background: url(src/images/icon_x_mark.png) no-repeat center left !important;\r" +
    "\n" +
    "        color: #f26522 !important;\r" +
    "\n" +
    "        line-height: 18px;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .my_photos_main_block2 h3 {\r" +
    "\n" +
    "        background: url(src/images/icon_tick_mark.png) no-repeat center left;\r" +
    "\n" +
    "        text-transform: uppercase;\r" +
    "\n" +
    "        font-size: 14px;\r" +
    "\n" +
    "        color: #000;\r" +
    "\n" +
    "        line-height: 18px;\r" +
    "\n" +
    "        display: block;\r" +
    "\n" +
    "        padding: 0 0 0 30px;\r" +
    "\n" +
    "        margin: 0 0 20px 0;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>"
  );


  $templateCache.put('app/editOfcePurpose/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>About Profile Details</h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                    <a id=\"lnkAboutProfile\" class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.showPopup();\" ng-show=\"dataval===''?true:false\">Add\r" +
    "\n" +
    "                    \r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                    <h5>\r" +
    "\n" +
    "                        <span id=\"lblAboutProfile\">{{page.model.dataval}}</span>\r" +
    "\n" +
    "                    </h5>\r" +
    "\n" +
    "                    <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                        <a id=\"LinkButton1dfd\" data-placement=\"bottom\" class=\"edit_page_edit_button\" href=\"javascript:void(0);\" ng-click=\"page.model.showPopup(page.model.dataval);\" ng-hide=\"dataval===''?true:false\">Edit\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"AboutModalContent.html\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "        </slide-popup>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!--<form class=\"EditViewClass\" name=\"aboutForm\" novalidate role=\"form\" ng-submit=\"page.model.AboutProfleSubmit(page.model.aboutObj.txtAboutprofile)\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">About Your Profile\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "                <ul>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label id=\"lblabout\" style=\"color: #9b2828; font-size: 13px;\">\r" +
    "\n" +
    "            				(You can write anything about this profile)*</label>\r" +
    "\n" +
    "                        <textarea ng-model=\"page.model.aboutObj.txtAboutprofile\" style=\"width: 500px; height: 150px;\" class=\"col-lg-10\" maxlength=\"1000\" required ng-class=\"form-control\" required />\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <label id=\"Label1\" style=\"color: red; font-size: 13px;\" class=\"pull-right\">(max 1000 characters)</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"row\">\r" +
    "\n" +
    "                        <edit-footer></edit-footer>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editParent/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <page-review dispaly-name=\"'Parent details'\" sectionid=\"'11,12,13,15'\" custid=\"page.model.CustID\"></page-review>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\" id=\"divlnkaddparents\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Parents Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" id=\"spanEduModID\" ng-show=\"page.model.parentmodifiedby!=null && page.model.parentmodifiedby!=='' && page.model.parentmodifiedby!==undefined\">ModifiedBy :{{page.model.parentmodifiedby}}</span>\r" +
    "\n" +
    "                    <span style=\"color: #08CFD2\" id=\"spanEduModID\" visible=\"false\">\r" +
    "\n" +
    "                    <label id=\"lblParentsDetailsmodby\" forecolor=\"#08CFD2\"></label>\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.parentArr.length===0\">\r" +
    "\n" +
    "                    <a data-toggle=\"tooltip\" data-original-title=\"Add Parents Details\" class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.populateModel('parent');\">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.parentArr\" ng-repeat=\"item in page.model.parentArr\">\r" +
    "\n" +
    "                    <div id=\"reviewdiv\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"lfathername\" font-bold=\"true\"></label>Father Name</h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"LBfathername\">{{item.FatherName}}</span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.parentArr.length>0\">\r" +
    "\n" +
    "                                    <a id=\"LinkButton1dfd\" href=\"javascript:void(0):\" data-original-title=\"Edit Parents Details\" class=\"edit_page_edit_button\" ng-click=\"page.model.populateModel('parent',item);\">Edit</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"lblfathereducation\" font-bold=\"true\">Education</label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblfathereducationdetails\">\r" +
    "\n" +
    "                                    {{item.FatherEducationDetails }}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label font-bold=\"true\">Profession Category</label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span>\r" +
    "\n" +
    "                                    {{item.FatherProfessionCategory }}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"lblFatherprofession\" font-bold=\"true\">Designation</label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblfatherprofessiondetails\">\r" +
    "\n" +
    "                                   {{item.FatherProfDetails }}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\" id=\"fathercompnay\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"lblfatherprofessionloc\" font-bold=\"true\">Company & JobLocation</label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblfatherprofandloc\">\r" +
    "\n" +
    "                                   {{((item.FathercompanyName!=null && (item.FathercompanyName!=\"\")?item.FathercompanyName:\"NotSpecified\"))\r" +
    "\n" +
    "                                        +\" \"+((item.FatherJoblocation!=null && (item.FatherJoblocation!=\"\")?\",\" +\" \"+item.FatherJoblocation:''))}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"ownerdiv0\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"lblfathernumber\" font-bold=\"true\">Father contact nos</label>\r" +
    "\n" +
    "                                    </h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblfathermobile\">\r" +
    "\n" +
    "                                       {{((item.FatherMobilenumber!=null && (item.FatherMobilenumber!=\"\")?item.FatherMobilenumber:\"\"))\r" +
    "\n" +
    "                                        +\" \"+((item.FatherLandNumber!=null && (item.FatherLandNumber!=\"\")?\"&\"+\" \"+item.FatherLandNumber:\"\")) }}\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"fatheremail\" font-bold=\"true\">Father Email</label>\r" +
    "\n" +
    "                                    </h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFatherEmail\">\r" +
    "\n" +
    "                                       {{ item.FatherEmail }}\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"lblfathersfather\">Father's Father Name</label></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblfathersfath\">\r" +
    "\n" +
    "                                  {{  ((item.FatherFathername!=null && (item.FatherFathername!=\"\")?item.FatherFathername:\"\"))\r" +
    "\n" +
    "                                        }}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"ownerdiv1\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"FFContactNos\">FF contact nos</label></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFFContactNos\">\r" +
    "\n" +
    "                                       {{((item.FFMobileNumberWithcode!=null && (item.FFMobileNumberWithcode!=\"\")?item.FFMobileNumberWithcode:\"\"))\r" +
    "\n" +
    "                                       + ((item.FFLandNumberwithCode!=null && item.FFLandNumberwithCode!=\"\")?\" & \"+item.FFLandNumberwithCode:\"\") }}\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"FnativePlace\" font-bold=\"true\">Native Place</label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblFnativePlace\">\r" +
    "\n" +
    "                                   {{\r" +
    "\n" +
    "                                        ((item.FatherNativeplace!=null && item.FatherNativeplace!=\"\")?item.FatherNativeplace:\"\" )+\r" +
    "\n" +
    "                                        ((item.FatherDistric!=null && item.FatherDistric!=\"\")?\" ,\"+item.FatherDistric:\"\")+\r" +
    "\n" +
    "                                        ((item.FatherState!=null && item.FatherState!=\"\")?\" ,\"+item.FatherState:\"\" )+\r" +
    "\n" +
    "                                        ((item.FatherCountry!=null && item.FatherCountry!=\"\")?\" ,\"+item.FatherCountry:\"\" )}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <hr />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"lblmothername\" font-bold=\"true\" forecolor=\"Red\">\r" +
    "\n" +
    "                                Mother Name\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblmothernameandedu\">\r" +
    "\n" +
    "                                    {{item.MotherName}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"lbleducationmother\">Education</label></h6>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblmotherducation\">\r" +
    "\n" +
    "                                   {{ ((item.MotherEducationDetails!=null && item.MotherEducationDetails!=\"\")?item.MotherEducationDetails:\"\" )}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label font-bold=\"true\">Profession Category</label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span>\r" +
    "\n" +
    "                                    {{item.MotherProfessionCategory }}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"lblprofessionmotherr\" font-bold=\"true\">Designation</label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblmotherprofdetails\">\r" +
    "\n" +
    "                                  {{((item.MotherProfedetails!=null && item.MotherProfedetails!=\"\")?\r" +
    "\n" +
    "                                                item.MotherProfedetails:\"\" )}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"mothercompany\" class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.MotherProfedetails=='HouseWife'\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"lblmotherprofession\">Company & JobLocation</label></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblmotherprofandloc\">\r" +
    "\n" +
    "                                   {{((item.MothercompanyName!=null && (item.MothercompanyName!=\"\")?item.MothercompanyName:\"\"))+\" \"+\r" +
    "\n" +
    "                                            ((item.MotherJoblocation!=null && (item.MotherJoblocation!=\"\")?\", \"+\" \"+\r" +
    "\n" +
    "                                            item.MotherJoblocation:''))}}\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"ownerdiv2\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"lblmothercontacts\">Mother contact nos</label></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblmompmobile\">\r" +
    "\n" +
    "                                       {{((item.MotherMobilenumber!=null && item.MotherMobilenumber!=\"\")?item.MotherMobilenumber:\"\" )+\" \"+((item.MotherLandNumber!=null && (item.MotherLandNumber!=\"\")?\"&\"+\" \"+item.MotherLandNumber:\"\"))}}\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"lblmotheremail\" font-bold=\"true\">Mother Email</label>\r" +
    "\n" +
    "                                    </h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblmomemail\">\r" +
    "\n" +
    "                                        {{ item.MotherEmail }}\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"lblmotherfatherupp\" font-bold=\"true\">Mother's Father Name</label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblMotherFatherName\">\r" +
    "\n" +
    "                                   {{item.MotherFatherName }}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                                </label>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"MotherFatherLastName\" font-bold=\"true\">Mother's Father SurName</label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblMotherFatherLastName\">\r" +
    "\n" +
    "                                  {{item.MotherFatherLastName}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"ownerdiv3\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"mContactNos\" font-bold=\"true\">MF Contact nos</label>\r" +
    "\n" +
    "                                    </h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblmContactNos\">\r" +
    "\n" +
    "                                       {{ item.MMMobileNumberWithcode+\r" +
    "\n" +
    "                                        ((item.MMLandNumberwithCode!=null && item.MMLandNumberwithCode!=\"\")?\" & \"+item.MMLandNumberwithCode:\"\") }}\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <label id=\"MNativePlace\" font-bold=\"true\">Native Place</label>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblMNativePlace\">\r" +
    "\n" +
    "                                   {{((item.MotherNativeplace!=null && item.MotherNativeplace!=\"\")?item.MotherNativeplace:\"\") +\r" +
    "\n" +
    "                                        ((item.MotherDistric!=null && item.MotherDistric!=\"\")?\" ,\"+item.MotherDistric:\"\" )+\r" +
    "\n" +
    "                                        ((item.MotherState!=null && item.MotherState!=\"\")?\" ,\"+item.MotherState:\"\" )+\r" +
    "\n" +
    "                                        ((item.MotherCountry!=null && item.MotherCountry!=\"\")?\" ,\"+item.MotherCountry:\"\" )}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div id=\"divParentIntercasteHide\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"ParentsInterCaste\">Are Parents InterCaste</label></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblParentsInterCaste\">{{item.Intercaste }}</span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\" ng-if=\"item.Intercaste==='Yes'\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"lFatherCaste\">Father Caste</label></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFatherCaste\">{{item.FatherCaste }}</span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\" ng-if=\"item.Intercaste==='Yes'\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"lMotherCaste\">Mother Caste</label>\r" +
    "\n" +
    "                                    </h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblMotherCaste\">{{item.MotherCaste }}</span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <hr />\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"edit_page_item\" id=\"divlnkAddcontactaddress\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Contact Address &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.addrmodifiedby!=null && page.model.addrmodifiedby!=='' && page.model.addrmodifiedby!==undefined\">ModifiedBy :{{page.model.addrmodifiedby}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.addressArr.length===0\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <a ng-click=\"page.model.populateModel('Address',item);\" href=\"javascript:void(0);\" data-original-title=\"Add Contact Address\" class=\"edit_page_add_button\">Add</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"page.model.addressArr\" ng-repeat=\"item in page.model.addressArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"Div1\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblhousenum\" font-bold=\"true\">House/Flat No</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblhouseflat\">\r" +
    "\n" +
    "                                {{ item.FlatNumber}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"divapartment\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblapartmentname\" font-bold=\"true\">Apt Name</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblapartment\">\r" +
    "\n" +
    "                                {{ item.ApartmentName}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.addressArr.length>0\">\r" +
    "\n" +
    "                            <a ng-click=\"page.model.populateModel('Address',item);\" href=\"javascript:void(0);\">Edit</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"divareaname\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblareaname\" font-bold=\"true\">Area Name</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblareanamee\">\r" +
    "\n" +
    "                                {{ item.AreaName}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblstreet\" font-bold=\"true\">Street Name</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblstreetname\">\r" +
    "\n" +
    "                                {{ item.StreetName}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblland\" font-bold=\"true\">Land Mark</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lbllandmark\">\r" +
    "\n" +
    "                                {{ item.LandMark}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblcityy\" font-bold=\"true\">City</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblcityname\">\r" +
    "\n" +
    "                                {{ item.CityName+\" \"+(item.DistrictName!=null?\",\"+ item.DistrictName:\"\")+(item.StateName!=null?\",\"+ item.StateName:\"\")+(item.CountryName!=null?\",\"+item.CountryName:\"\")+(item.Zip!=null?\"-\"+item.Zip:\"\") }}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"edit_page_item\" id=\"divlnkAddphsysicall\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Physical Attribute & Health Details of Candidate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.physicalmodifiedby!=null && page.model.physicalmodifiedby!=='' && page.model.physicalmodifiedby!==undefined\">ModifiedBy :{{page.model.physicalmodifiedby}}</span></h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.physicalArr.length===0\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.populateModel('physicalAttributes',item);\" data-original-title=\"Add Physical Attribute & Health Details\" class=\"edit_page_add_button\">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <divng-if=\"page.model.physicalArr\" ng-repeat=\"item in page.model.physicalArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"Div2\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lbllDiet\" font-bold=\"true\">Diet</label></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblDiet\">\r" +
    "\n" +
    "                                {{ item.Diet}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lbllDrink\">Drink</label></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblDrink\">\r" +
    "\n" +
    "                                {{ item.Drink}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lbllSmoke\">Smoke</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblSmoke\">\r" +
    "\n" +
    "                                {{ item.Smoke}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lbllBodyType\">Body Type</label></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblBodyType\">\r" +
    "\n" +
    "                                {{ item.BodyType}}\r" +
    "\n" +
    "                            </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblbodyweight\" font-bold=\"true\">Body Weight</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblweight\">\r" +
    "\n" +
    "                                {{ item.BodyWeight}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblbloodgroup\" font-bold=\"true\">Blood Group</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblbloodgrop\">\r" +
    "\n" +
    "                                {{ item.BloodGroupName}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblhealthconditions\" font-bold=\"true\">Health Conditions</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblhealthcondition\">\r" +
    "\n" +
    "                                {{ item.Healthcondition}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.physicalArr.length>0\">\r" +
    "\n" +
    "                            <a data-original-title=\"Edit Physical Attribute & Health Details\" class=\"edit_page_edit_button\" href=\"javascript:void(0);\" ng-click=\"page.model.populateModel('physicalAttributes',item);\">Edit</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <label id=\"lblhealthdescription\" font-bold=\"true\">Health Condition Description</label>\r" +
    "\n" +
    "                            </h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblhealthdescriptions\">\r" +
    "\n" +
    "                                {{ item.HealthConditionDescription}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                            </h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"edit_page_item\" id=\"divlnkaboutt\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>About My Family </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.lblaboutMyfamily==='' || page.model.lblaboutMyfamily===null\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <a data-original-title=\"Add About My Family\" class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.populateModel('AboutFamily');\">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div id=\"lstAboutMyFamily\">\r" +
    "\n" +
    "                    <div id=\"Div3\" ng-class=\"AboutFamilyReviewStatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblAboutMyFamily\">\r" +
    "\n" +
    "                                    {{page.model.lblaboutMyfamily}}\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                                <label id=\"Label5\" visible=\"false\"></label>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.lblaboutMyfamily!='' && page.model.lblaboutMyfamily!=null\">\r" +
    "\n" +
    "                                <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" data-original-title=\"Edit About My Family\" ng-click=\"page.model.populateModel('AboutFamily',page.model.lblaboutMyfamily);\">Edit</a>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div id=\"popupDiv\">\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"commonParentpopup.html\">\r" +
    "\n" +
    "        <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "        </slide-popup>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<style>\r" +
    "\n" +
    "    .md-dialog-container {\r" +
    "\n" +
    "        z-index: 99999999999;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editPartnerpreference/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <page-review dispaly-name=\"'PartnerPreference details'\" sectionid=\"'16,17,18,20,21,22'\" custid=\"page.model.CustID\"></page-review>\r" +
    "\n" +
    "        <div ng-if=\"page.model.partnerPrefArr\" ng-repeat=\"item in page.model.partnerPrefArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit_page_item\">\r" +
    "\n" +
    "                <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                    <h4>PartnerPreference Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" runat=\"server\" ng-show=\"page.model.partnermodifiedby!=null && page.model.partnermodifiedby!=='' && page.model.partnermodifiedby!==undefined\">ModifiedBy :{{page.model.partnermodifiedby}}</span>\r" +
    "\n" +
    "                    </h4>\r" +
    "\n" +
    "                    <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.partnerPrefArr.length===0\">\r" +
    "\n" +
    "                        <a ng-click=\"page.model.partnerprefPopulate();\" class=\"edit_page_add_button\" href=\"javascript:void(0);\">Add</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                    <div id=\"uppartner\">\r" +
    "\n" +
    "                        <div id=\"reviewdiv\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"UpdatePanel21\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"partnergen\" style=\"color:Red;font-weight:bold;\">Gender</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblpartnergen\" style=\"color:Red;\">{{ item.Gender}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div ng-if=\"page.model.partnerPrefArr.length>0\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                                <a ng-click=\"page.model.partnerprefPopulate(item);\" class=\"edit_page_edit_button\" href=\"javascript:void(0);\">Edit</a>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel10\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"agegap\" style=\"font-weight:bold;\">Age Gap</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblagegap\">{{ item.AgeGap}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel13\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"height\" style=\"font-weight:bold;\">Height</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblheight\">{{ item.Height}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel15\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"mothertongue\" style=\"font-weight:bold;\">mother tongue</span></h6>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblmothertongue\">{{ item.Mothertongue }}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel16\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"Religion\" style=\"font-weight:bold;\">Religion</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblReligion\">{{ item.Religion}}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel17\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"caste\" style=\"font-weight:bold;\">caste</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblcaste\">{{ item.Caste}}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel1\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"subcaste\" style=\"font-weight:bold;\">subcaste</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblsubcaste\">{{ item.Subcaste}}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel2\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"maritalstatus\" style=\"font-weight:bold;\">marital status</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblmaritalstatus\">{{ item.MaritalStatus}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"updateeducationgroup\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"Education\" style=\"font-weight:bold;\">Education</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblEducation\">{{ item.EducationGroup!=null?item.EducationGroup:item.EducationCategory}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"UpdatePanel5\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"profession\" style=\"font-weight:bold;\">profession</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblprofession\">{{ item.ProfessionGroup}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"UpdatePanel6\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"MangalikKujadosham\" style=\"font-weight:bold;\">Manglik/Kujadosham</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblMangalikKujadosham\">{{ item.Kujadosham}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel7\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"preferredstarLanguage\" style=\"font-weight:bold;\">preferred star Language</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblpreferredstarLanguage\">{{ item.StarLanguage}}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"UpdatePanel8\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"preferredstar\" style=\"font-weight:bold;\">Non preferred stars</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblpreferredstar\">{{ item.Stars}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel12\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"Diet\" style=\"font-weight:bold;\">Diet</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblDiet\">{{ item.Diet}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"UpdatePanel18\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"preferredCountry\" style=\"font-weight:bold;\">Domicile</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblpreferredCountry\">{{ item.Domicel}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"UpdatePanel18\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"preferredCountry\" style=\"font-weight:bold;\">preferred Country</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblpreferredCountry\">{{ item.CountryName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel19\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"preferredState\" style=\"font-weight:bold;\">preferred State</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblpreferredState\">{{ item.StateName}}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel36\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"RegionName\" style=\"font-weight:bold;\">Region</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblRegionName\">{{ item.RegionName}}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanel40\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"BranchName\" style=\"font-weight:bold;\">Branch</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblBranchName\">{{ item.BranchName}}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit_page_item\">\r" +
    "\n" +
    "                <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                    <h4>Partner Description ( Describe qualities you are looking for in your partner)</h4>\r" +
    "\n" +
    "                    <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                        <div ng-if=\"page.model.partnerDescription==='' || page.model.partnerDescription===null\">\r" +
    "\n" +
    "                            <a id=\"lnkpartnerdesc\" class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.partnerdescPopulate();\"> Add</a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanel9\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblpartnerdesc\">{{ page.model.partnerDescription}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-if=\"item.PartnerDescripition!=''  && item.PartnerDescripition!=null\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                            <a id=\"lnkpartnerdesc\" class=\"edit_page_edit_button\" href=\"javascript:void(0);\" ng-click=\"page.model.partnerdescPopulate(item);\"> Edit</a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"partnerPrefContent.html\">\r" +
    "\n" +
    "        <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "        </slide-popup>\r" +
    "\n" +
    "        <!--<form class=\"EditViewClass\" name=\"partnerFormForm\" novalidate role=\"form\" ng-submit=\"page.model.partnerPrefSubmit(page.model.partnerObj)\" accessible-form>\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Partnerprefernece details\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <ul id=\"divclear\">\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"lblGender\" class=\"pop_label_left\">Gender</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <md-radio-group name=\"rbtlGender\" style=\"font-weight: 700;color:black;\" layout=\"row\" ng-model=\"page.model.partnerObj.rbtlGender\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                            <md-radio-button value=\"1\" class=\"md-primary\">Male</md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"2\">Female </md-radio-button>\r" +
    "\n" +
    "                        </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblagegapp\" class=\"pop_label_left\">Age Gap<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my select-box-my-double input-group\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.partnerObj.ddlFromAge\" ng-options=\"item.value as item.label for item in page.model.ageGapArr\" required></select>\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.partnerObj.ddlToAge\" ng-options=\"item.value as item.label for item in page.model.ageGapArr\" required></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblpatnerheight\" class=\"pop_label_left\">Height<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my select-box-my-double input-group\">\r" +
    "\n" +
    "                            <select multiselectdropdown required ng-model=\"page.model.partnerObj.ddlFromheight\" typeofdata=\"'heightregistration'\" required></select>\r" +
    "\n" +
    "                            <select multiselectdropdown required ng-model=\"page.model.partnerObj.ddltoHeight\" typeofdata=\"'heightregistration'\" required></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblReligion\" class=\"pop_label_left\">Religion<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple=\"multiple\" ng-model=\"page.model.partnerObj.lstReligion\" typeofdata=\"'Religion'\" ng-change=\"page.model.changeBind('caste',page.model.partnerObj.lstReligion,page.model.partnerObj.lstMothertongue);\" required></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblmothertongue\" class=\"pop_label_left\">Mother tongue<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstMothertongue\" typeofdata=\"'Mothertongue'\" ng-change=\"page.model.changeBind('caste',page.model.partnerObj.lstReligion,page.model.partnerObj.lstMothertongue);\" required></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblpartnerCaste\" class=\"pop_label_left\">Caste<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstCaste\" ng-options=\"item.value as item.label for item in page.model.casteArr\" ng-change=\"page.model.changeBind('subCaste',page.model.partnerObj.lstCaste);\" required></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblSubcaste\" class=\"pop_label_left\">Subcaste</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my \">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstSubcaste\" ng-options=\"item.value as item.label for item in page.model.subCasteArr\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblMaritalstatus\" class=\"pop_label_left\">Marital status<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstMaritalstatus\" typeofdata=\"'MaritalStatus'\" required></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblEducationcategory\" class=\"pop_label_left\">Education category</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstEducationcategory\" typeofdata=\"'educationcategory'\" ng-change=\"page.model.changeBind('EducationCatgory',page.model.partnerObj.lstEducationcategory);\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblEducationgroup\" class=\"pop_label_left\">Education group</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstEducationgroup\" ng-options=\"item.value as item.label for item in page.model.eduGroupArr\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblEmployedin\" class=\"pop_label_left\">Employed in</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstEmployedin\" typeofdata=\"'ProfCatgory'\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblProfessiongroup\" class=\"pop_label_left\">Profession group </label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstProfessiongroup\" typeofdata=\"'ProfGroup'\"></select>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"lblPreferredstar\" class=\"pop_label_left\">Domicile</label>\r" +
    "\n" +
    "                        <md-radio-group name=\"rbtDomacile\" style=\"font-weight: 700;color:black;\" layout=\"row\" ng-model=\"page.model.partnerObj.rbtDomacile\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                            <md-radio-button value=\"0\" class=\"md-primary\">India</md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"1\">Abroad </md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"2\">Both</md-radio-button>\r" +
    "\n" +
    "                        </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblPreferredcountry\" class=\"pop_label_left\">Preferred country 	</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstPreferredcountry\" typeofdata=\"'Country'\" ng-change=\"page.model.changeBind('Country',page.model.partnerObj.lstPreferredcountry);\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblPreferredstate\" class=\"pop_label_left\">Preferred state</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstPreferredstate\" ng-options=\"item.value as item.label for item in page.model.stateArr\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\" id=\"divRegioncontrol\">\r" +
    "\n" +
    "                        <label for=\"lblRegion\" class=\"pop_label_left\">Region</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstRegion\" typeofdata=\"'region'\" ng-change=\"page.model.changeBind('region',page.model.partnerObj.lstRegion);\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblBranch\" class=\"pop_label_left\">Branch</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstBranch\" ng-options=\"item.value as item.label for item in page.model.branchArr\"></select>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"lblDiet\" class=\"pop_label_left\">Diet</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <md-radio-group name=\"rbtDiet\" style=\"font-weight: 700;color:black;\" layout=\"row\" ng-model=\"page.model.partnerObj.rbtDiet\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                            <md-radio-button value=\"27\" class=\"md-primary\">Veg</md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"28\"> Non Veg </md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"29\"> Both </md-radio-button>\r" +
    "\n" +
    "                        </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"lblManglik\" class=\"pop_label_left\">Manglik/Kuja dosham</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <md-radio-group name=\"rbtManglikKujadosham\" style=\"font-weight: 700;color:black;\" layout=\"row\" ng-model=\"page.model.partnerObj.rbtManglikKujadosham\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                            <md-radio-button value=\"0\" class=\"md-primary\">Yes</md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"1\">No </md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"2\"> Does Not Matter </md-radio-button>\r" +
    "\n" +
    "                        </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"lblPreferredstar\" class=\"pop_label_left\">Preferred star Language</label>\r" +
    "\n" +
    "                        <md-radio-group name=\"rbtPreferredstarLanguage\" style=\"font-weight: 700;color:black;\" ng-change=\"page.model.changeBind('star',page.model.partnerObj.rbtPreferredstarLanguage);\" layout=\"row\" ng-model=\"page.model.partnerObj.rbtPreferredstarLanguage\" class=\"md-block\"\r" +
    "\n" +
    "                            flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                            <md-radio-button value=\"1\" class=\"md-primary\">Telugu</md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"2\">Tamil </md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"3\">Kannada</md-radio-button>\r" +
    "\n" +
    "                        </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <label for=\"\" class=\"pop_label_left\">Star Preference</label>\r" +
    "\n" +
    "                        <md-radio-group name=\"rbtPreferredstars\" style=\"font-weight: 700;color:black;\" layout=\"row\" ng-model=\"page.model.partnerObj.rbtPreferredstars\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                            <md-radio-button value=\"0\" class=\"md-primary\">Preferredstars</md-radio-button>\r" +
    "\n" +
    "                            <md-radio-button value=\"1\">NonPreferredstars </md-radio-button>\r" +
    "\n" +
    "                        </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"\" class=\"pop_label_left\"></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown multiple ng-model=\"page.model.partnerObj.lstpreferedstars\" ng-options=\"item.value as item.label for item in page.model.starArr\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"row\">\r" +
    "\n" +
    "                        <br/>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <edit-footer></edit-footer>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </form>-->\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"partnerDescContent.html\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "        </slide-popup>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!--<form class=\"EditViewClass\" name=\"aboutForm\" novalidate role=\"form\" ng-submit=\"page.model.partnerDescriptionSubmit(page.model.partnerDescObj)\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Partner Description\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"20\"></ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "                <ul>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <textarea ng-model=\"page.model.partnerDescObj.txtpartnerdescription\" style=\"width: 500px; height: 150px;\" class=\"col-lg-10\" maxlength=\"1000\" required ng-class=\"form-control\" required />\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"row\">\r" +
    "\n" +
    "                        <br/>\r" +
    "\n" +
    "                        <edit-footer></edit-footer>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </form>-->\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editProfileSetting/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Profile Settings\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div ng-if=\"page.model.profileSettingArr\" class=\"edit_page_details_item\" ng-repeat=\"item in page.model.profileSettingArr\">\r" +
    "\n" +
    "                <div id=\"fullupdatefatherbrother\">\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelFBProfession\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblprofilecurrentstatus\" font-bold=\"true\">Application Status</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblprofcurrentstatus\">{{item.ProfileStatus}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanellnkFatherSister\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.showprofilepopup('profileSetting',item);\">Edit</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpApplicationStatusmodifybydiv\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"ApplicationStatusmodifybydiv\" class=\"edit_page_details_item_desc clearfix\" visible={{item.EmployeeName !=\"\" && Eval( \"EmployeeName\")!=null?true:false }}>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"ApplicationStatusmodifyby\" font-bold=\"true\">Application Status ModifiedBy</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblApplicationStatusmodifyby\">{{item.EmployeeName}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"inactivediv\" ng-show=\"item.ProfileStatusID==='55' || item.ProfileStatusID===55\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"divtotalinactive\">\r" +
    "\n" +
    "                                <div id=\"UpdatePanel9\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <span id=\"span1\" font-bold=\"true\">No of Days to be inactivated </span>\r" +
    "\n" +
    "                                        </h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblNoofDaysinactivated\">{{item.NoofDaysinactivated}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div id=\"UpdatePanel12\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <span id=\"span6\" font-bold=\"true\">Reason for InActive</span>\r" +
    "\n" +
    "                                        </h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblReason4InActive\">{{item.Reason4InActive}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div id=\"UpdatePanel13\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <span id=\"span8\" font-bold=\"true\">Requested By</span>\r" +
    "\n" +
    "                                        </h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblRequestedBy\">{{item.RequestedBy}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelFBProfessionDetails\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"profilegrade\" font-bold=\"true\">Profile Grade</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblprofilegrade\">{{item.ProfileGrade}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"Updatelblprofilegrademodifyby\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\" ng-show=\"item.ProfileGradeModifiedByEmp !=='' && item.ProfileGradeModifiedByEmp!=null\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblprofilegrademodifyby\" font-bold=\"true\">Profile Grade ModifiedBy</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"ProfileGradeModifiedByEmp\">{{item.ProfileGradeModifiedByEmp}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"edit_page_item\" id=\"divconfidential\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Confidential status\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div ng-if=\"page.model.ConfidentialArr\" class=\"edit_page_details_item\" ng-repeat=\"item in page.model.ConfidentialArr\">\r" +
    "\n" +
    "                <div id=\"UpdatePanel2\">\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelFBCurrentLocation\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"isConfidential\" font-bold=\"true\">isConfidential</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblisConfidential\">{{item.ConfindentialStatus}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanel1\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.showprofilepopup('confidential',item);\">Edit</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanel6\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"span5\" font-bold=\"true\">Very High Confidential</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblvryconfidential\">{{item.HighConfidentialStatus}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"edit_page_item\" id=\"divcprofiledisplaysettings\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Profile Display Settings\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\" ng-if=\"page.model.profileDisplayArr\" ng-repeat=\"item in page.model.profileDisplayArr\">\r" +
    "\n" +
    "                <div id=\"UpdatePanel4\">\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdatePanel3\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.showprofilepopup('profileDisplay',item);\">Edit</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanel7\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"span3\" font-bold=\"true\">Display In</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblProfileDisplayName\">{{item.ProfileDisplayName}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanel8\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblprofileloginstatus\" font-bold=\"true\">Profile Current Login Status Is</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblprofileloginstatusis\">{{item.LoginStatusName}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"divBlockdisplay\" visible={{item.Blockflag==\"1\" ? true: false }}>\r" +
    "\n" +
    "                            <div id=\"uplblcreateblockeddate\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"lblcreatedate\">{{item.LoginStatusName == \"Blocked\" ? \"Blocked Date\": \"Allowed Date\" }}</span>\r" +
    "\n" +
    "                                    </h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblcreateblockeddate\">{{item.BlockDate}}</span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"uplblblockedempname\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"lblblockedempname\">{{item.LoginStatusName == \"Blocked\" ? \"Blocked By\": \"Allowed By\" }}</span>\r" +
    "\n" +
    "                                    </h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"span2\">{{item.BlockEmapName}}</span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"upblockedreason\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"lblreason\">{{item.LoginStatusName == \"Blocked\" ? \"Reason For Blocked\": \"Reason For Allowed\" }}</span>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblBlockedReason\">{{item.ProfileBlockReason}}</span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Grade Selections\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div id=\"updatecontenGrade\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"divAddGrade\" visible=\"false\">\r" +
    "\n" +
    "                        <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                            <div ng-if=\"page.model.gradeSelectionArr.length===0\">\r" +
    "\n" +
    "                                <a class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.showprofilepopup('grading');\">Add</a>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\" ng-if=\"page.model.gradeSelectionArr\" ng-repeat=\"item in page.model.gradeSelectionArr\">\r" +
    "\n" +
    "                <div id=\"UpdatePanel14\">\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdatePanelGrade\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.showprofilepopup('grading',item);\">Edit</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatepanelEdu\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblEducationGradeText\" font-bold=\"true\">Education</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblEducationGrade\">{{item.EducationGrade}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelProfession\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblprofessionGradeText\" font-bold=\"true\">Profession</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblprofessionGrade\">{{item.ProfileGrade}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"updateproperty\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblpropertyGradeText\">Property</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblpropertyGrade\">{{item.PropertyGrade}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"updatefamily\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblfamilyGradeText\">Family</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblfamilyGrade\">{{item.FamilyGrade}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"updatePhoto\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblPhotoGradeText\">Photo</span>\r" +
    "\n" +
    "                                </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblPhotoGrade\">{{item.PhotoGrade}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdatePaneCreatedBYEmp\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblCreatedBYEmp\">Created By</span> </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblCreatedBYEmpGrade\">{{item.CreatedBYEmp}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdateCreatedDateGrade\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblCreatedDateGrade\">CreatedDate</span> </h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblCreatedDatedisplay\">{{item.CreatedDate}}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!--\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"profileSettingContent.html\">\r" +
    "\n" +
    "        <form class=\"EditViewClass\" name=\"psForm\" novalidate role=\"form\" ng-submit=\"page.model.profileSettingSubmit(page.model.psObj)\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Profile Settings\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\"></ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "                <ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"Relationshiptype\" class=\"pop_label_left\">Application Status</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right pop_radios_list\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <md-radio-group ng-required=\"true\" name=\"rdlapplicationstatus\" layout=\"row\" ng-model=\"page.model.psObj.rdlapplicationstatus\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                                <md-radio-button value=\"54\" class=\"md-primary\">Active</md-radio-button>\r" +
    "\n" +
    "                                <md-radio-button value=\"55\"> Inactive </md-radio-button>\r" +
    "\n" +
    "                            </md-radio-group>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <div id=\"divinactive\" ng-if=\"page.model.psObj.rdlapplicationstatus==='55' || page.model.psObj.rdlapplicationstatus===55\">\r" +
    "\n" +
    "                        <li class=\"clearfix\">\r" +
    "\n" +
    "                            <label for=\"Relationshiptype\" class=\"pop_label_left\">No of Days to be inactivated </label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                                <input type=\"number\" ng-model=\"page.model.psObj.txtnoofdaysinactive\" class=\"form-control\" MaxLength=\"25\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li class=\"clearfix\">\r" +
    "\n" +
    "                            <label for=\"Relationshiptype\" class=\"pop_label_left\">Reason for InActive</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                                <textarea ng-model=\"page.model.psObj.txtreasonforinactive\" class=\"form-control\" TabIndex=\"9\" MaxLength=\"2000\"></textarea>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li class=\"clearfix\">\r" +
    "\n" +
    "                            <label for=\"Relationshiptype\" class=\"pop_label_left\">Requested By</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                                <select multiselectdropdown id=\"estt\" ng-model=\"page.model.psObj.ddlrequestedby\" typeofdata=\"'childStayingWith'\"></select>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"Relationshiptype\" class=\"pop_label_left\">Profile Grade</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right pop_radios_list\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <md-radio-group ng-required=\"true\" name=\"rdlprofilegrade\" layout=\"row\" ng-model=\"page.model.psObj.rdlprofilegrade\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                                <md-radio-button value=\"1\" class=\"md-primary\">A</md-radio-button>\r" +
    "\n" +
    "                                <md-radio-button value=\"2\"> B </md-radio-button>\r" +
    "\n" +
    "                                <md-radio-button value=\"3\"> C </md-radio-button>\r" +
    "\n" +
    "                            </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"row\">\r" +
    "\n" +
    "                        <edit-footer></edit-footer>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"confidentialContent.html\">\r" +
    "\n" +
    "        <form class=\"EditViewClass\" name=\"refForm\" novalidate role=\"form\" ng-submit=\"page.model.confidentialSubmit(page.model.csObj)\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Confidential Settings\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "                <ul>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"Firstname\" class=\"pop_label_left\">isConfidential</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <md-checkbox ng-model=\"page.model.csObj.chkisconfidential\" name=\"chkisconfidential\" aria-label=\"Checkbox 1\">\r" +
    "\n" +
    "                            </md-checkbox>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"Firstname\" class=\"pop_label_left\">Very High Confidential</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <md-checkbox ng-model=\"page.model.csObj.chkvryhighconfidential\" name=\"chkvryhighconfidential\" aria-label=\"Checkbox 1\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </md-checkbox>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"row\">\r" +
    "\n" +
    "                        <edit-footer></edit-footer>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"profileDisplayContent.html\">\r" +
    "\n" +
    "        <form class=\"EditViewClass\" name=\"psdForm\" novalidate role=\"form\" ng-submit=\"page.model.profileSettingDisplaySubmit(page.model.psdObj)\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Profile Display Settings\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "                <ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"displayin\" class=\"pop_label_left\">Display In</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right pop_radios_list\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <md-radio-group ng-required=\"true\" name=\"rdldisplayin\" layout=\"row\" ng-model=\"page.model.psdObj.rdldisplayin\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                                <md-radio-button value=\"279\" class=\"md-primary\">Only Online</md-radio-button>\r" +
    "\n" +
    "                                <md-radio-button value=\"280\"> Onlly Offline </md-radio-button>\r" +
    "\n" +
    "                                <md-radio-button value=\"434\"> Both </md-radio-button>\r" +
    "\n" +
    "                            </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"displayin\" class=\"pop_label_left\">Password Block/Release</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right pop_radios_list\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <md-radio-group ng-required=\"true\" name=\"rdlpwdblock\" layout=\"row\" ng-model=\"page.model.psdObj.rdlpwdblock\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                                <md-radio-button value=\"439\" class=\"md-primary\">Allow</md-radio-button>\r" +
    "\n" +
    "                                <md-radio-button value=\"440\"> Block </md-radio-button>\r" +
    "\n" +
    "                            </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"displayin\" class=\"\" style=\"color: #9b2828; font-size: 15px;\">Reason</label>\r" +
    "\n" +
    "                        <textarea ng-model=\"page.model.psdObj.txtblockedreason\" class=\"col-lg-10 form-control\" MaxLength=\"1000\" />\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"row\">\r" +
    "\n" +
    "                        <edit-footer></edit-footer>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"gradeSelectionContent.html\">\r" +
    "\n" +
    "        <form class=\"EditViewClass\" name=\"gradeForm\" novalidate role=\"form\" ng-submit=\"page.model.gradeSubmit(page.model.gradeObj)\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Grade Selections\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "                <ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"Relationshiptype\" class=\"pop_label_left\">Education</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.gradeObj.ddlEducationgrade\" typeofdata=\"'gradeSelection'\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"Relationshiptype\" class=\"pop_label_left\">Profession</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.gradeObj.ddlProfessionGrade\" typeofdata=\"'gradeSelection'\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"Relationshiptype\" class=\"pop_label_left\">Property</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.gradeObj.ddlpropertyGrade\" typeofdata=\"'gradeSelection'\"></select>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"Relationshiptype\" class=\"pop_label_left\">Family</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.gradeObj.ddlfamilyGrade\" typeofdata=\"'gradeSelection'\"></select>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"Relationshiptype\" class=\"pop_label_left\">Photo</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.gradeObj.ddlphotoGrade\" typeofdata=\"'gradeSelection'\"></select>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"row\">\r" +
    "\n" +
    "                        <edit-footer></edit-footer>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </script>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"commonProfileSettingpopup.html\">\r" +
    "\n" +
    "        <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "        </slide-popup>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editProperty/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <page-review dispaly-name=\"'Property details'\" sectionid=\"'34'\" custid=\"page.model.CustID\"></page-review>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div id=\"upppp\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                    <h4>Property Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.propertymodifiedby!=null && page.model.propertymodifiedby!=='' && page.model.propertymodifiedby!==undefined\">ModifiedBy :{{page.model.propertymodifiedby}}</span>\r" +
    "\n" +
    "                    </h4>\r" +
    "\n" +
    "                    <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.propertyArr.length===0\">\r" +
    "\n" +
    "                        <a class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.populateProperty()\">Add</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div id=\"reviewdiv\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\" ng-if=\"page.model.propertyArr\" ng-repeat=\"item in page.model.propertyArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "                        <div id=\"uplFamilyStatus\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"lblfamilystatus\" style=\"font-weight: bold;\">Family Status</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblfmstatus\">{{(item.FamilyStatus!=null && item.FamilyStatus!=\"\")?item.FamilyStatus:\"Not Specified\" }}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-if=\"page.model.propertyArr.length>0\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                            <a id=\"lnkedittt\" class=\"edit_page_edit_button\" href=\"javascript:void(0);\" ng-click=\"page.model.populateProperty(item)\">Edit</a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                        <h6>\r" +
    "\n" +
    "                            <span id=\"lblproperty\" style=\"font-weight: bold;\">Property Value</span></h6>\r" +
    "\n" +
    "                        <h5>\r" +
    "\n" +
    "                            <span id=\"lblpropertyval\">{{((item.PropertyValue!=null && item.PropertyValue!=\"\")?item.PropertyValue+\" Lakhs\":\"\")}}</span>\r" +
    "\n" +
    "                        </h5>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"isproperty\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <h6>\r" +
    "\n" +
    "                            <label id=\"lblpropertysharedproperty\" style=\"font-weight: bold;\">Property Type</label></h6>\r" +
    "\n" +
    "                        <h5>\r" +
    "\n" +
    "                            <span id=\"lblisProperty\">{{((item.isProperty!=null && item.isProperty!=\"\")?item.isProperty:\"Not Specified\") }}</span></h5>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                        <h6>\r" +
    "\n" +
    "                            <span id=\"lblpropdet\" style=\"font-weight: bold;\">Property Details</span></h6>\r" +
    "\n" +
    "                        <h5>\r" +
    "\n" +
    "                            <span id=\"lblpropertydetails\">{{(item.PropertyDetails!=null && (item.PropertyDetails!=\"\"))?item.PropertyDetails:\"\"}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <hr>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <script type=\"text/ng-template\" id=\"propertyContent.html\">\r" +
    "\n" +
    "            <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "            </slide-popup>\r" +
    "\n" +
    "        </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editReference/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <page-review dispaly-name=\"'Reference details'\" sectionid=\"'29'\" custid=\"page.model.CustID\"></page-review>\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Reference Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.referencemodifiedby!=null && page.model.referencemodifiedby!=='' && page.model.referencemodifiedby!==undefined\">ModifiedBy :{{page.model.referencemodifiedby}}</span></h4>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                    <a class=\"edit_page_add_button\" href=\"javascript:void(0)\" ng-click=\"page.model.referencePopulate();\">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div id=\"fullupdate\">\r" +
    "\n" +
    "                    <div ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\" ng-if=\"page.model.ReferenceArr\" ng-repeat=\"item in page.model.ReferenceArr\">\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div id=\"uplRelationShipType\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"RelationShipType\" style=\"font-weight:bold;\">RelationShip Type</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblRelationShipType\">{{item.Relatioshiptype }}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div ng-if=\"page.model.ReferenceArr.length>0\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                                <a class=\"edit_page_edit_button\" href=\"javascript:void(0);\" ng-click=\"page.model.referencePopulate(item);\">Edit</a>\r" +
    "\n" +
    "                                <a href=\"javascript:void(0);\" class=\"edit_page_del_button\" ng-click=\"page.model.DeletePopup(item.RefrenceCust_Reference_ID)\">Delete</a>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"Name\" style=\"font-weight:bold;\">Name</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblName\">{{item.RefrenceName }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"uplEducationRef\">\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"uplProfessionDetails\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"ProfessionDetails\" style=\"font-weight:bold;\">Profession</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblProfessionDetails\">{{item.RefrenceProfessionDetails }}</span>\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"uplNativePlace\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"NativePlace\" style=\"font-weight:bold;\">Native Place</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblNativePlace\">{{item.RefrenceNativePlace }}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"uplCurrentLocation\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"CurrentLocation\" style=\"font-weight:bold;\">Current Location</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblCurrentLocation\">{{item.RefenceCurrentLocation }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"update0\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"ownerdiv0\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div id=\"uplContacts\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <span id=\"Contacts\" style=\"font-weight:bold;\">Contacts</span></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblContacts\">{{item.RefrenceMobileNumberWithcode+(item.RefrenceLandNumberwithCode!=null&&item.RefrenceLandNumberwithCode!=\"\"?\"&\"+item.RefrenceLandNumberwithCode:\"\") }}</span></h5>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div id=\"uplEmail\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <span id=\"Email\" style=\"font-weight:bold;\">Email</span></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblEmail\">{{item.RefrenceEmail }}</span></h5>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"uplNarration\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Narration\" style=\"font-weight:bold;\">Narration</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblNarration\">{{item.RefrenceNarration }}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <hr>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <script type=\"text/ng-template\" id=\"referenceContent.html\">\r" +
    "\n" +
    "            <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "            </slide-popup>\r" +
    "\n" +
    "        </script>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<style>\r" +
    "\n" +
    "    .md-dialog-container {\r" +
    "\n" +
    "        z-index: 99999999999;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .reviewCls {\r" +
    "\n" +
    "        background-image: url(src/images/img_kaaka_Seal_b.png);\r" +
    "\n" +
    "        background-repeat: no-repeat;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editRelative/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "        <page-review dispaly-name=\"'Relatives details'\" sectionid=\"'27,28,32,33'\" custid=\"page.model.CustID\"></page-review>\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Father's Brother Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.FBemodifiedby!=null && page.model.FBemodifiedby!=='' && page.model.FBemodifiedby!==undefined\">ModifiedBy :{{page.model.FBemodifiedby}}</span>\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.FBArr.length===0\">\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.relativePopulatePopulate('FB');\" class=\"edit_page_add_button\" tabindex=\"0\">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.FBArr\" ng-repeat=\"item in page.model.FBArr\">\r" +
    "\n" +
    "                    <div id=\"reviewdiv\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <div id=\"upFatherBrother\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"FBName\" style=\"font-weight:bold;\">FB Name</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFBName\">{{item.FatherbrotherName+\"(\"+item.FatherBrotherElderyounger+\")\"}}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div ng-if=\"page.model.FBArr.length>0\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" ng-click=\"page.model.relativePopulatePopulate('FB',item);\" class=\"edit_page_edit_button\" href=\"javascript:void(0);\">Edit</a>\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" class=\"edit_page_del_button\" ng-click=\"page.model.DeletePopup('father brother',item.FatherbrotherCustfamilyID);\">Delete</a>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanelFBProfession\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"FBEducation\" style=\"font-weight:bold;\">Education</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFBEducation\">{{item.FatherBrotherEducationDetails}}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanelFBProfessionDetails\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"FBProfessionDetails\" style=\"font-weight:bold;\">Profession</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblProfessionDetails\">{{item.FatherbrotherProfessionDetails }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"UpdatePanelFBCurrentLocation\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"FBCurrentLocation\" style=\"font-weight:bold;\">Current Location</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblCurrentLocation\">{{item.FatherbrotherCurrentLocation }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"update0\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div id=\"ownerdiv0\">\r" +
    "\n" +
    "                                    <div id=\"UpdatePanelFBcontacts\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <span id=\"FBcontacts\" style=\"font-weight:bold;\">FB contacts</span></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblFBcontacts\">{{(item.FatherbrotherMobileNumberWithCode!=null?item.FatherbrotherMobileNumberWithCode:'')+\" \"\r" +
    "\n" +
    "                                        +(item.FatherbrotherLandnumberwithcode!=null&&item.FatherbrotherLandnumberwithcode.ToString()!=\"\"?\"&\"+\r" +
    "\n" +
    "                                        item.FatherbrotherLandnumberwithcode:\" \") }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div id=\"UpdatePanelFBEmail\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <span id=\"FBEmail\" style=\"font-weight:bold;\">FB Email</span></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblFBEmail\">{{item.FatherbrotherEmail }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Father's Sister Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.FSmodifiedby!=null && page.model.FSmodifiedby!=='' && page.model.FSmodifiedby!==undefined\">ModifiedBy :{{page.model.FSmodifiedby}}</span>\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.FSArr.length===0\">\r" +
    "\n" +
    "                    <a class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.relativePopulatePopulate('FS');\" tabindex=\"0\">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.FSArr\" ng-repeat=\"item in page.model.FSArr\">\r" +
    "\n" +
    "                    <div id=\"reviewdiv\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <div id=\"upFathersister\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"FsName\" style=\"font-weight:bold;\">FsName</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFsName\">{{item.FatherSisterName+\"(\"+item.FatherSisterElderyounger+\")\" }}</span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div ng-if=\"page.model.FSArr.length>0\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                                    <a ng-click=\"page.model.relativePopulatePopulate('FS',item);\" class=\"edit_page_edit_button\" href=\"javascript:void(0);\">Edit</a>\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" class=\"edit_page_del_button\" ng-click=\"page.model.DeletePopup('father sister',item.FatherSisterCustfamilyID);\">Delete</a>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanelFshName\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"FshName\" style=\"font-weight:bold;\">Fsh Name</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFshName\">{{item.FatherSisterSpouseName }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanelFshEducation\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"lblEducationfsh\" style=\"font-weight:bold;\">Fsh Education</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFshEducation\">{{item.FatherSisterSpouseEducationDetails }}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanelFshprofessiondetails\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"Fshprofessiondetails\" style=\"font-weight:bold;\">Fsh Profession</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFshprofessiondetails\">{{item.FathersisterSpouseProfessionDetails }}</span></h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"UpdatePanelFshCurrentLocation\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"FshCurrentLocation\" style=\"font-weight:bold;\">Fsh Current Location</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFshCurrentLocation\">{{item.FatherSisterCurrentLocation }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"UpdatePanelFshNativeplace\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"FshNativeplace\" style=\"font-weight:bold;\">Fsh Native Place</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblFshNativeplace\">{{(item.FathersisterSpouseNativePlace!=null?item.FathersisterSpouseNativePlace:'')+\" \"+(item.FatherSisterSpousDistrict!=null && \r" +
    "\n" +
    "                                                item.FatherSisterSpousDistrict.ToString()!=\"\"? \",\"+item.FatherSisterSpousDistrict:\"\")+\" \"+(item.FatherSisterSpousestate!=null && \r" +
    "\n" +
    "                                                item.FatherSisterSpousestate.ToString()!=\"\"? \",\"+item.FatherSisterSpousestate:\"\")+\" \"+(item.FatherSisterSpousecountry!=null && \r" +
    "\n" +
    "                                                item.FatherSisterSpousecountry.ToString()!=\"\"? \",\"+item.FatherSisterSpousecountry:\"\")  }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div id=\"update1\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div id=\"ownerdiv1\">\r" +
    "\n" +
    "                                    <div id=\"UpdatePanelFShcontactnos\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <span id=\"FShcontactnos\" style=\"font-weight:bold;\">FSh contact nos</span></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblFSHcontacts\">{{(item.FatherSisterspouseMobileNumberWithCode!=null?item.FatherSisterspouseMobileNumberWithCode:'')+\" \"+(item.FatherSisterspouseLandnumberwithcode!=null&&\r" +
    "\n" +
    "                                    item.FatherSisterspouseLandnumberwithcode.ToString()!=\"\"?\"&\"+item.FatherSisterspouseLandnumberwithcode:\"\") }}</span></h5>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div id=\"UpdatePanelFSHEmail\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <span id=\"FSHEmail\" style=\"font-weight:bold;\">Fsh Email</span></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblFSHEmail\">{{item.FatherSisterspouseEmail }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Mother's Brother Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.MBmodifiedby!=null && page.model.MBmodifiedby!=='' && page.model.MBmodifiedby!==undefined\">ModifiedBy :{{page.model.MBmodifiedby}}</span></h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.MBrr.length===0\">\r" +
    "\n" +
    "                    <a class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.relativePopulatePopulate('MB');\" tabindex=\"0\">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.MBrr\" ng-repeat=\"item in page.model.MBrr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"reviewdiv\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <div id=\"upmotherbrother\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"MBName\" style=\"font-weight:bold;\">MB Name</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblMBName\">{{item.MotherBrotherName+\"(\"+item.MotherBrotherElderyounger+\")\" }}</span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div ng-if=\"page.model.MBrr.length>0\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" ng-click=\"page.model.relativePopulatePopulate('MB',item);\" class=\"edit_page_edit_button\">Edit</a>\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" class=\"edit_page_del_button\" ng-click=\"page.model.DeletePopup('mother brother',item.MotherBrotherCustfamilyID);\">Delete</a>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <span id=\"lblMotherbrithereducation\" style=\"font-weight:bold;\">Education</span></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblMotherbrithereducationdetails\">{{item.MotherBrotherEducationDetails }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <span id=\"MBProfessionDetails\" style=\"font-weight:bold;\">Profession</span></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblMBProfessionDetails\">{{item.MotherBrotherProfessionDetails }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <span id=\"MBCurrentLocation\" style=\"font-weight:bold;\">Current Location</span></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblMBCurrentLocation\">{{item.MotherBrotherCurrentLocation }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div id=\"update2\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div id=\"ownerdiv2\">\r" +
    "\n" +
    "                                        <div id=\"UpdatePanelMBcontacts\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <span id=\"MBcontacts\" style=\"font-weight:bold;\">MB contacts</span></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblMBcontacts\">{{(item.MotherBrotherMobileNumberWithCode!=null?item.MotherBrotherMobileNumberWithCode:'')+\" \"+(item.MotherBrotherLandnumberwithcode!=null&& \r" +
    "\n" +
    "                                                    item.MotherBrotherLandnumberwithcode.ToString()!=\"\"?\"&\"+item.MotherBrotherLandnumberwithcode:\"\") }}</span></h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"UpdatePanelMBEmail\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <span id=\"MBEmail\" style=\"font-weight:bold;\">MB Email</span></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblMBEmail\">{{item.MotherBrotherEmail }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Mother's Sister Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.MSmodifiedby!=null && page.model.MSmodifiedby!=='' && page.model.MSmodifiedby!==undefined\">ModifiedBy :{{page.model.MSmodifiedby}}</span>\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.MSArr.length===0\">\r" +
    "\n" +
    "                    <a class=\"edit_page_add_button\" href=\"javascript:void(0);\" ng-click=\"page.model.relativePopulatePopulate('MS');\" tabindex=\"0\">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.MSArr\" ng-repeat=\"item in page.model.MSArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"reviewdiv\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <div id=\"upMothersister\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span id=\"MsName\" style=\"font-weight:bold;\">MsName</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblMsName\">{{item.MotherSisterName+\"(\"+item.MotherSisterElderyounger+\")\" }}</span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div ng-if=\"page.model.MSArr.length>0\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" ng-click=\"page.model.relativePopulatePopulate('MS',item);\" class=\"edit_page_edit_button\">Edit</a>\r" +
    "\n" +
    "                                    <a href=\"javascript:void(0);\" class=\"edit_page_del_button\" ng-click=\"page.model.DeletePopup('mother sister',item.MotherSisterCustfamilyID);\">Delete</a>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"MshName\" style=\"font-weight:bold;\">Msh Name</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblMshName\">{{item.MotherSisterSpouseName}}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"lblMshEducation\" style=\"font-weight:bold;\">Msh Education</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblMshEducationdetails\">{{item.MothersisterspouseEducationdetails }}</span></h5>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span style=\"font-weight:bold;\">Msh profession</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span>{{item.MotherSisterProfessionDetails }}</span></h5>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdatePanelMshCurrentLocation\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"MshCurrentLocation\" style=\"font-weight:bold;\">Msh Current Location</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblMshCurrentLocation\">{{item.MotherSisterCurrentLocation }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelMshNativeplace\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"MshNativeplace\" style=\"font-weight:bold;\">Msh Native Place</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblMshNativeplace\">{{(item.MotherSisterSpouseNativePlace!=null?item.MotherSisterSpouseNativePlace:'')+\" \"+(item.Mothersisterspousedistrict!=null && \r" +
    "\n" +
    "                                                item.Mothersisterspousedistrict.ToString()!=\"\"? \",\"+item.Mothersisterspousedistrict:\"\")+\" \"+(item.Motherssisterspousestate!=null && \r" +
    "\n" +
    "                                                item.Motherssisterspousestate.ToString()!=\"\"? \",\"+item.Motherssisterspousestate:\"\")+\" \"+(item.MothersisterspouseCountry!=null && \r" +
    "\n" +
    "                                                item.MothersisterspouseCountry.ToString()!=\"\"? \",\"+item.MothersisterspouseCountry:\"\")  }}    </span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"update3\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div id=\"ownerdiv3\">\r" +
    "\n" +
    "                                <div id=\"UpdatePanelMshcontactnos\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <span id=\"Mshcontactnos\" style=\"font-weight:bold;\">Msh contact nos</span></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblMshcontactnos\">{{(item.MotherSisterspouseMobileNumberWithCode!=null?item.MotherSisterspouseMobileNumberWithCode:'')+\" \"+(item.MotherSisterspouseLandnumberwithcode!=null \r" +
    "\n" +
    "                                            && item.MotherSisterspouseLandnumberwithcode.ToString()!=\"\" ?\r" +
    "\n" +
    "                                            \"&\"+item.MotherSisterspouseLandnumberwithcode:\"\") }}</span></h5>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div id=\"UpdatePanelMsHEmail\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <span id=\"MsHEmail\" style=\"font-weight:bold;\">Msh Email</span></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblMsHEmail\">{{item.MotherSisterspouseEmail }}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"ModalContent.html\">\r" +
    "\n" +
    "        <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "        </slide-popup>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<style>\r" +
    "\n" +
    "    .md-dialog-container {\r" +
    "\n" +
    "        z-index: 99999999999;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editSibbling/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "        <page-review dispaly-name=\"'Siblings details'\" sectionid=\"'14,25,26'\" custid=\"page.model.CustID\"></page-review>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Sibling Details\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.sibblingCountArr.length===0\">\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.sibblingPopulatePopulate('sibCounrt')\" class=\"edit_page_add_button\">Add</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div id=\"upnoofSibblings\" class=\"edit_page_details_item\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div id=\"lstnoofbros\">\r" +
    "\n" +
    "                    <div ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\" ng-if=\"page.model.sibblingCountArr\" ng-repeat=\"item in page.model.sibblingCountArr\">\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <div class=\"form-group\">\r" +
    "\n" +
    "                                    <div id=\"uplNoOfBrothers\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label id=\"NoOfBrothers\" font-bold=\"true\">No of Brothers</label>\r" +
    "\n" +
    "                                        </h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblNoOfBrothers\">\r" +
    "\n" +
    "                                            {{ item.NoOfBrothers }}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div id=\"brotherHide\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div ng-hide=\"item.NoOfElderBrothers===null || item.NoOfElderBrothers===0\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <label id=\"noofelderbrother\" font-bold=\"true\">No of elder brothers</label></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblnoofelderbrother\">\r" +
    "\n" +
    "                                                {{ item.NoOfElderBrothers }}\r" +
    "\n" +
    "                                        </span>\r" +
    "\n" +
    "                                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div ng-hide=\"item.NoOfYoungerBrothers===null || item.NoOfYoungerBrothers===0\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <label id=\"Noofyoungerbrother\" font-bold=\"true\">No of younger brother</label>\r" +
    "\n" +
    "                                            </h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblnofyoungbro\">\r" +
    "\n" +
    "                                                {{ item.NoOfYoungerBrothers }}\r" +
    "\n" +
    "                                        </span>\r" +
    "\n" +
    "                                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div class=\"edit_page_item_ui clearfix\" ng-if=\"page.model.sibblingCountArr.length>0\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"edit_page_edit_button\" ng-click=\"page.model.sibblingPopulatePopulate('sibCounrt',item)\">Edit</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div ng-hide=\"item.NoOfSisters===null\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label font-bold=\"true\">No of sisters</label></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblNoofsisters\">\r" +
    "\n" +
    "                                            {{ item.NoOfSisters }}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div id=\"sisterHideDiv\">\r" +
    "\n" +
    "                                        <div ng-hide=\"item.NoOfElderSisters===null || item.NoOfElderSisters===0\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <label font-bold=\"true\">No of elder sisters</label></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblNoofeldersisters\">\r" +
    "\n" +
    "                                                {{ item.NoOfElderSisters }}\r" +
    "\n" +
    "                                        </span>\r" +
    "\n" +
    "                                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div ng-hide=\"item.NoOfYoungerSisters===null || item.NoOfYoungerSisters===0\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <label font-bold=\"true\">No of younger sisters</label></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span>\r" +
    "\n" +
    "                                                {{ item.NoOfYoungerSisters }}\r" +
    "\n" +
    "                                        </span>\r" +
    "\n" +
    "                                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Brother Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.broModifiedby!=null && page.model.broModifiedby!=='' && page.model.broModifiedby!==undefined\">ModifiedBy :{{page.model.broModifiedby}}</span>\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                    <div id=\"uplnkbrotherdetails\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <a href=\"javascript:void(0);\" ng-click=\"page.model.sibblingPopulatePopulate('brother')\" class=\"edit_page_add_button\">Add\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div id=\"uplstSibbling\" class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.BrotherArr\" ng-repeat=\"item in page.model.BrotherArr\">\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "                        <div id=\"Div1\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <div id=\"uplElderbrotherName\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label id=\"ElderbrotherName\" font-bold=\"true\" style=\"color:red;\">\r" +
    "\n" +
    "                                        Brother Name</label></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblElderbrotherName\" style=\"color:red;\">\r" +
    "\n" +
    "                                            {{ item.SibilingName+\" (\"+item.brotherYoungerORelder+\")\" }}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div id=\"upllnkbrodetailseb\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <a class=\"edit_page_edit_button\" href=\"javascript:void(0);\" ng-click=\"page.model.sibblingPopulatePopulate('brother',item)\">Edit</a>\r" +
    "\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"edit_page_del_button\" ng-click=\"page.model.DeletePopup('brother',item.SibilingCustfamilyID);\">Delete</a>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div id=\"brothereducation\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label id=\"lblEducationbrother\" font-bold=\"true\">Education</label></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblBrotherEducationDetails\">\r" +
    "\n" +
    "                                            {{ item.SibilingEducationDetails!=null?item.SibilingEducationDetails:''}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label font-bold=\"true\">Profession Category</label></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span>\r" +
    "\n" +
    "                                            {{ item.ProfessionCategory}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label id=\"Label2\" font-bold=\"true\">Designation</label></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblBrotherprofessionDetails\">\r" +
    "\n" +
    "                                            {{ item.SibilingProfessionDetails}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div id=\"uplprofessioneb\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div id=\"professiondiv\">\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label id=\"profession\" font-bold=\"true\">Company&JobLocation</label></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblprofession\">\r" +
    "\n" +
    "                                            {{ (item.SibilingCompany!==null?item.SibilingCompany:'')+\" \"+(item.SibilingJobPLace.ToString()!=\"\" && item.SibilingJobPLace!=null?\",\"+item.SibilingJobPLace:\"\") }}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div id=\"update0\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div id=\"ownerdiv0\">\r" +
    "\n" +
    "                                        <div id=\"uplConactNoeb\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"ConactNo\" font-bold=\"true\">Conact Nos</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblConactNo\">\r" +
    "\n" +
    "                                                    {{ (item.SibilingMobileNumberWithCode!==null?item.SibilingMobileNumberWithCode:'')+\r" +
    "\n" +
    "                                                ((item.SibilngLandnumberwithcode.ToString()!=\"\" && item.SibilngLandnumberwithcode!=null)?\",\"+item.SibilngLandnumberwithcode:\"\")}}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div id=\"brotheremail\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"brotheremail\" font-bold=\"true\">Email</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblbrotheremail\">\r" +
    "\n" +
    "                                                    {{ item.SibilingEmail }}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div id=\"uuuuuuuppp\" ng-if=\"item.SibilingMarried==1\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div id=\"BROTHERDIV\">\r" +
    "\n" +
    "                                        <div id=\"uplWifeNameeb\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div id=\"divWifeNamenew\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"SpouseName\" font-bold=\"true\" style=\"font-weight: bold; font-family: helvetica; font-size: 18px\">\r" +
    "\n" +
    "                                                Spouse Name</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblWifeName\">\r" +
    "\n" +
    "                                                    {{ item.SibilingSpouseName}}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"lblbrotherwifeeducationdetails\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div id=\"divlblbrotherwifeeducation\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"lblbrotherwifeeducation\" font-bold=\"true\">Education</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblbrotherwifeeducationdetails\">\r" +
    "\n" +
    "                                                    {{ item.SibilingSpouseEducationDetails}}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label font-bold=\"true\">Profession Category</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span>\r" +
    "\n" +
    "                                            {{ item.SpouseProfessionCategory}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div id=\"lblbrotherwifeprofessiondetails\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div id=\"divlblbrotherwifeprofession\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"lblbrotherwifeprofession\" font-bold=\"true\">Designation</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblbrotherwifeprofessiondetails\">\r" +
    "\n" +
    "                                                    {{ item.SibilingSpouseProfessionDetails}}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"uplwifeprofessioneb\" class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.SibilingSpouseProfessionDetails=='HouseWife'\">\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <label id=\"wifeprofession\" font-bold=\"true\">Company&JobLocation</label></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblwifeprofession\">\r" +
    "\n" +
    "                                                    {{ ((item.spoucecompanyName.ToString()!=\"\" && item.spoucecompanyName!=null)?item.spoucecompanyName:\"\")+((item.spoucejobloc.ToString()!=\"\"\r" +
    "\n" +
    "                                                    && item.spoucejobloc!=null)?\",\"+item.spoucejobloc:\"\") }}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"update1\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div id=\"ownerdiv1\">\r" +
    "\n" +
    "                                                <div id=\"wifenumbers\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                    <div id=\"divspousecontactnumbers\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                        <h6>\r" +
    "\n" +
    "                                                            <label id=\"lblbrotherwife\" font-bold=\"true\">Contact Nos</label></h6>\r" +
    "\n" +
    "                                                        <h5>\r" +
    "\n" +
    "                                                            <span id=\"lblbrotherwifemobnumbers\">\r" +
    "\n" +
    "                                                           {{ (item.SibilingSpouceMobileNumberWithCode!==null?item.SibilingSpouceMobileNumberWithCode:'')\r" +
    "\n" +
    "                                                          +((item.SibilingSpouceLandNumberWithCode.ToString()!=\"\" && item.SibilingSpouceLandNumberWithCode!=null)?\",\"+item.SibilingSpouceLandNumberWithCode:\"\") }}\r" +
    "\n" +
    "                                                    </span>\r" +
    "\n" +
    "                                                        </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <div id=\"Brotherwife\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                                    <h6>\r" +
    "\n" +
    "                                                        <label id=\"brotherwifeemail\" font-bold=\"true\">Email</label></h6>\r" +
    "\n" +
    "                                                    <h5>\r" +
    "\n" +
    "                                                        <span id=\"lblbrotherwifeemail\">\r" +
    "\n" +
    "                                                            {{ item.SpouseEmail }}\r" +
    "\n" +
    "                                                    </span>\r" +
    "\n" +
    "                                                    </h5>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"uplWifeFatherfirstnameeb\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <label id=\"lWifeFatherfirstname\" font-bold=\"true\">Spouse Father's Name</label></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblWifeFatherfirstname\">\r" +
    "\n" +
    "                                                    {{ item.SibilingSpouseFatherName }}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"brotherspusefathercaste\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <label id=\"botherwifefathercaste\" font-bold=\"true\">Spouse Father Caste</label></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblbotherwifefathercaste\">\r" +
    "\n" +
    "                                                    {{ item.SibilingSpouseFatherCaste }}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                            </h5>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"upBroSpouseFatherNativePlace\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                            <h6>\r" +
    "\n" +
    "                                                <label id=\"BroSpouseFatherNativePlace\" font-bold=\"true\">Native Place</label></h6>\r" +
    "\n" +
    "                                            <h5>\r" +
    "\n" +
    "                                                <span id=\"lblBroSpouseFatherNativePlace\">\r" +
    "\n" +
    "                                                   {{((item.BroSpouseFatherCity!=null && item.BroSpouseFatherCity.ToString()!=\"\")?item.BroSpouseFatherCity:\"\") +\r" +
    "\n" +
    "                                        ((item.BroSpouseFatherDistrictname!=null && item.BroSpouseFatherDistrictname.ToString()!=\"\")?\" ,\"+item.BroSpouseFatherDistrictname:\"\" )+\r" +
    "\n" +
    "                                        ((item.BroSpouseFatherStatename!=null && item.BroSpouseFatherStatename.ToString()!=\"\")?\" ,\"+item.BroSpouseFatherStatename:\"\" )+\r" +
    "\n" +
    "                                        ((item.BroSpouseFatherCountryname!=null && item.BroSpouseFatherCountryname.ToString()!=\"\")?\" ,\"+item.BroSpouseFatherCountryname:\"\" )}}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                            </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Sister Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #08CFD2\" ng-show=\"page.model.sisModifiedby!=null && page.model.sisModifiedby!=='' && page.model.sisModifiedby!==undefined\">ModifiedBy :{{page.model.sisModifiedby}}</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                    <div id=\"uplnksisterdet\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <a href=\"javascript:void(0);\" ng-click=\"page.model.sibblingPopulatePopulate('sister')\" data-original-title=\"Add Sister Details\" class=\"edit_page_add_button\">Add\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div id=\"uplistsister\" class=\"edit_page_details_item\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"page.model.sisterArr\" ng-repeat=\"item in page.model.sisterArr\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "                        <div id=\"Div2\" ng-class=\"item.reviewstatus===false?'edit_page_details_item_desc clearfix reviewCls':'edit_page_details_item_desc clearfix'\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "                                    <div id=\"uplsisnamees\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label id=\"sisname\" font-bold=\"true\" style=\"color:red;\">Sister Name\r" +
    "\n" +
    "                                    </label>\r" +
    "\n" +
    "                                        </h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblsisname\" style=\"color:red;\">\r" +
    "\n" +
    "                                            {{ item.SibilingName+\" (\"+item.SisterElderORyounger+\")\"}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div id=\"upllnksisteredites\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <a class=\"edit_page_edit_button\" data-original-title=\"Edit Sister Details\" href=\"javascript:void(0);\" ng-click=\"page.model.sibblingPopulatePopulate('sister',item)\">Edit\r" +
    "\n" +
    "                                         \r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"edit_page_del_button\" ng-click=\"page.model.DeletePopup('sister',item.SibilingCustfamilyID);\">Delete</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div id=\"sistereducationdetails\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label id=\"lblsistereducation\" font-bold=\"true\">Education</label></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblsistereducationdetails\">\r" +
    "\n" +
    "                                            {{ item.SibilingEducationDetails}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label font-bold=\"true\">Profession Category</label></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span>\r" +
    "\n" +
    "                                            {{ item.ProfessionCategory}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div id=\"lblsisterprofessiondetails\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <h6>\r" +
    "\n" +
    "                                            <label id=\"lblsisterprofession\" font-bold=\"true\">Designation</label></h6>\r" +
    "\n" +
    "                                        <h5>\r" +
    "\n" +
    "                                            <span id=\"lblsisterprofessiondetails\">\r" +
    "\n" +
    "                                            {{ item.SibilingProfessionDetails}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                        </h5>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div id=\"uplsisprofes\" class=\"edit_page_details_item_desc clearfix\" ng-hide=\"item.SibilingProfessionDetails=='HouseWife'\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <label id=\"sisprof\" font-bold=\"true\">Company & Job Location </label></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span id=\"lblsisprof\">\r" +
    "\n" +
    "                                            {{ (item.SibilingCompany!==null?item.SibilingCompany:'')+ ((item.SibilingJobPLace.ToString()!=\"\" && item.SibilingJobPLace!=null)?\",\"+item.SibilingJobPLace:\"\")}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                    </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div id=\"update2\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div id=\"ownerdiv2\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div id=\"uplsisnumbers\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"sisnumbers\" font-bold=\"true\">Contact Nos</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblsisnumbers\">\r" +
    "\n" +
    "                                                    {{ (item.SibilingMobileNumberWithCode!==null?item.SibilingMobileNumberWithCode:'')+\r" +
    "\n" +
    "                                                ((item.SibilngLandnumberwithcode.ToString()!=\"\" && item.SibilngLandnumberwithcode!=null)?\",\"+item.SibilngLandnumberwithcode:\"\")}}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"sisterwifeemail\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"sisteremail\" font-bold=\"true\">Email</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblsisteremail\">\r" +
    "\n" +
    "                                                    {{ item.SibilingEmail }}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div id=\"pqw\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div id=\"Sisterspousedetails\" ng-if=\"item.SibilingMarried==1\">\r" +
    "\n" +
    "                                        <div id=\"uplhusnamees\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div id=\"divhusname\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"husname\" font-bold=\"true\" style=\"font-weight: bold; font-family: helvetica; font-size: 18px\">\r" +
    "\n" +
    "                                                Husband Name</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblhusname\">\r" +
    "\n" +
    "                                                    {{ item.SibilingSpouseName}}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div id=\"lblsisterspouseeducation\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                            <div id=\"divlblsisterspouseeducation\">\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"lblsisterspouseeducation\" font-bold=\"true\">Education</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lbllblsisterspouseeducationdetails\">\r" +
    "\n" +
    "                                                    {{ item.SibilingSpouseEducationDetails}}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label font-bold=\"true\">Profession Category</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span>\r" +
    "\n" +
    "                                            {{ item.SpouseProfessionCategory}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div id=\"lblsisterspouseprofession\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div id=\"divlblsisterspouseprofession\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"lblsisterspouseprofession\" font-bold=\"true\">Designation</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblsisterspouseprofessiondetails\">\r" +
    "\n" +
    "                                                    {{ item.SibilingSpouseProfessionDetails}}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"uplhusprofes\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div id=\"divlblsisterspousecmpy\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"husprof\" font-bold=\"true\">Company&JobLocation</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblhusprof\">\r" +
    "\n" +
    "                                                    {{((item.spoucecompanyName.ToString()!=\"\" && item.spoucecompanyName!=null)?\" \"+item.spoucecompanyName:\"\")+((item.spoucejobloc.ToString()!=\"\" && item.spoucejobloc!=null)?\",\"+item.spoucejobloc:\"\") }}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"update3\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div id=\"ownerdiv3\">\r" +
    "\n" +
    "                                                <div id=\"husbandnumbers\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                    <div id=\"divmobilesisterhus\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                        <h6>\r" +
    "\n" +
    "                                                            <label id=\"lblsisterhusband\" font-bold=\"true\">Conact Nos</label></h6>\r" +
    "\n" +
    "                                                        <h5>\r" +
    "\n" +
    "                                                            <span id=\"lblhusbandnumbers\">\r" +
    "\n" +
    "                                                          {{ (item.SibilingSpouceMobileNumberWithCode!==null?item.SibilingSpouceMobileNumberWithCode:'')+((item.SibilingSpouceLandNumberWithCode.ToString()!=\"\" && item.SibilingSpouceLandNumberWithCode!=null)?\",\"\r" +
    "\n" +
    "                                                            +item.SibilingSpouceLandNumberWithCode:\"\")}}\r" +
    "\n" +
    "                                                    </span>\r" +
    "\n" +
    "                                                        </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <div id=\"lblsisterspouseemail\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                    <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                        <h6>\r" +
    "\n" +
    "                                                            <label id=\"sisterspouseemail\" font-bold=\"true\">Email</label></h6>\r" +
    "\n" +
    "                                                        <h5>\r" +
    "\n" +
    "                                                            <span id=\"lblsisterspouseemail\">{{ item.SpouseEmail }}\r" +
    "\n" +
    "                                                    </span>\r" +
    "\n" +
    "                                                        </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"uplhusfathernamees\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div id=\"divhusfathernames\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"husfathernames\" font-bold=\"true\">Husband Father Name</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblhusfathername\">\r" +
    "\n" +
    "                                                    {{ item.SibilingSpouseFatherName }}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"sisterspousefathercaste\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div id=\"divsisterspousefathercaste\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"sisterhusbandfathercaste\" font-bold=\"true\">Husband Father Caste</label></h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblsisterSpousefathercaste\">\r" +
    "\n" +
    "                                                    {{ item.SibilingSpouseFatherCaste }}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div id=\"upSisNativePlace\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div>\r" +
    "\n" +
    "                                                <h6>\r" +
    "\n" +
    "                                                    <label id=\"SisSpouseFatherNativePlace\" font-bold=\"true\">Native Place</label>\r" +
    "\n" +
    "                                                </h6>\r" +
    "\n" +
    "                                                <h5>\r" +
    "\n" +
    "                                                    <span id=\"lblSisSpouseFatherNativePlace\">\r" +
    "\n" +
    "                                                   {{((item.SisSpousefatherCity!=null && item.SisSpousefatherCity.ToString()!=\"\")?item.SisSpousefatherCity:\"\") +\r" +
    "\n" +
    "                                        ((item.SisSpouseFatherDistrictname!=null && item.SisSpouseFatherDistrictname.ToString()!=\"\")?\" ,\"+item.SisSpouseFatherDistrictname:\"\" )+\r" +
    "\n" +
    "                                        ((item.SisSpouseFatherStatename!=null && item.SisSpouseFatherStatename.ToString()!=\"\")?\" ,\"+item.SisSpouseFatherStatename:\"\" )+\r" +
    "\n" +
    "                                        ((item.SisSpouseFatherCountryname!=null && item.SisSpouseFatherCountryname.ToString()!=\"\")?\" ,\"+item.SisSpouseFatherCountryname:\"\" )}}\r" +
    "\n" +
    "                                            </span>\r" +
    "\n" +
    "                                                </h5>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!--<script type=\"text/ng-template\" id=\"SibblingCountPopup.html\">\r" +
    "\n" +
    "        <form class=\"EditViewClass\" name=\"sibblingCoutForm\" novalidate role=\"form\" ng-submit=\"page.model.sibblingCountsSubmit(page.model.SibCountObj)\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Sibling Details\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"20\"></ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "                <ul>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblnoofsiblings\" class=\"pop_label_left\">No of Brothers<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.SibCountObj.ddlnoofsiblings\" ng-change=\"enableSubmit();\" ng-options=\"item.value as item.label for item in page.model.sibCountsBindArr\" required></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\" ng-show=\"page.model.SibCountObj.ddlnoofsiblings!==0\">\r" +
    "\n" +
    "                        <label for=\"lblnoofelderrother\" class=\"pop_label_left\">Elder Brother</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.SibCountObj.ddlnoofelderrother\" ng-change=\"enableSubmit();\" ng-options=\"item.value as item.label for item in page.model.sibCountsBindArr\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\" ng-show=\"page.model.SibCountObj.ddlnoofsiblings!==0\">\r" +
    "\n" +
    "                        <label for=\"lblnoofyoungerbrother\" class=\"pop_label_left\">Younger Brother</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.SibCountObj.ddlnoofyoungerbrother\" ng-change=\"enableSubmit();\" ng-options=\"item.value as item.label for item in page.model.sibCountsBindArr\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblnoofsisters\" class=\"pop_label_left\">No of sisters<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.SibCountObj.ddlnoofsisters\" ng-change=\"enableSubmit();\" ng-options=\"item.value as item.label for item in page.model.sibCountsBindArr\" required></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\" ng-show=\"page.model.SibCountObj.ddlnoofsisters!==0\">\r" +
    "\n" +
    "                        <label for=\"lblnoofeldersisters\" class=\"pop_label_left\">Elder sisters</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.SibCountObj.ddlnoofeldersisters\" ng-change=\"enableSubmit();\" ng-options=\"item.value as item.label for item in page.model.sibCountsBindArr\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\" ng-show=\"page.model.SibCountObj.ddlnoofsisters!==0\">\r" +
    "\n" +
    "                        <label for=\"lblnoofyoungersisters\" class=\"pop_label_left\">Younger  sisters</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.SibCountObj.ddlnoofyoungersisters\" ng-change=\"enableSubmit();\" ng-options=\"item.value as item.label for item in page.model.sibCountsBindArr\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"row\">\r" +
    "\n" +
    "                        <br/>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <edit-footer></edit-footer>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"brotherModalContent.html\">\r" +
    "\n" +
    "        <form class=\"EditViewClass\" name=\"brotherForm\" novalidate role=\"form\" ng-submit=\"brotherForm.$valid  && page.model.sibBroSubmit(page.model.broObj)\" accessible-form>\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Brother details\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"20\">Delete</ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "                <ul>\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"lblElderYounger\" style=\"padding-top: 2%;\" class=\"pop_label_left\">Elder/Younger<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <md-input-container style=\"font-weight: 700;color:black;\">\r" +
    "\n" +
    "                            <md-radio-group ng-required=\"true\" name=\"rdlBElderYounger\" layout=\"row\" ng-model=\"page.model.broObj.rdlBElderYounger\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                                <md-radio-button value=\"42\" class=\"md-primary\">Elder</md-radio-button>\r" +
    "\n" +
    "                                <md-radio-button value=\"41\"> Younger </md-radio-button>\r" +
    "\n" +
    "                            </md-radio-group>\r" +
    "\n" +
    "                            <div ng-messages=\"brotherForm.rdlBElderYounger.$invalid\">\r" +
    "\n" +
    "                                <div ng-if=\"brotherForm.rdlBElderYounger.$invalid && (brotherForm.$submitted)\">This field is required.</div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </md-input-container>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblBroName\" class=\"pop_label_left\">Name<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input ng-model=\"page.model.broObj.txtBName\" class=\"form-control\" tabindex=\"2\" maxlength=\"100\" required/>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblbrotherreducation\" class=\"pop_label_left\">Education</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input ng-model=\"page.model.broObj.txtbrotherreducation\" class=\"form-control\" tabindex=\"3\" maxlength=\"150\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblbroprofessioncat\" class=\"pop_label_left\">Profession Category</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.broObj.ddlbroprofessionCatgory\" typeofdata=\"'newProfessionCatgory'\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblbrotherprofession\" class=\"pop_label_left\">Designation</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input ng-model=\"page.model.broObj.txtbrotherprofession\" class=\"form-control\" tabindex=\"4\" maxlength=\"200\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblwifescmpy\" class=\"pop_label_left\">Company Name</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input ng-model=\"page.model.broObj.txtBCompanyname\" class=\"form-control\" tabindex=\"5\" maxlength=\"100\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblbrojobloc\" class=\"pop_label_left\">Job Location</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input ng-model=\"page.model.broObj.txtBJoblocation\" class=\"form-control\" tabindex=\"6\" maxlength=\"100\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li style=\"height: 15px;\"></li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <contact-directive emailhide=\"true\" dmobile=\"page.model.broObj.ddlBMObileCountryID\" strmobile=\"page.model.broObj.txtBmobilenumber\" dalternative=\"page.model.broObj.ddlBMObileCountryID2\" stralternative=\"page.model.broObj.txtBmobilenumber2\" dland=\"page.model.broObj.ddlBLandLineCountryID\"\r" +
    "\n" +
    "                        strareacode=\"page.model.broObj.txtBAreCode\" strland=\"page.model.broObj.txtBLandNumber\" strmail=\"page.model.broObj.txtBEmails\"></contact-directive>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblIsMarried\" style=\"padding-top: 2%;\" class=\"pop_label_left\">Married<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <md-input-container style=\"font-weight: 700;color:black;\">\r" +
    "\n" +
    "                            <md-radio-group ng-required=\"true\" name=\"rdlBIsMarried\" ng-change=\"page.model.BIsMarried(page.model.broObj.rdlBIsMarried);\" layout=\"row\" ng-model=\"page.model.broObj.rdlBIsMarried\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                                <md-radio-button value=\"1\" class=\"md-primary\">Yes</md-radio-button>\r" +
    "\n" +
    "                                <md-radio-button value=\"0\"> No </md-radio-button>\r" +
    "\n" +
    "                            </md-radio-group>\r" +
    "\n" +
    "                            <div ng-messages=\"brotherForm.rdlBIsMarried.$invalid\">\r" +
    "\n" +
    "                                <div ng-if=\"brotherForm.rdlBIsMarried.$invalid && (brotherForm.$submitted)\">This field is required.</div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </md-input-container>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <div ng-if=\"page.model.broObj.rdlBIsMarried==1\">\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblWifeName\" class=\"pop_label_left\">Spouse Name</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.broObj.txtBWifeName\" class=\"form-control\" tabindex=\"19\" maxlength=\"100\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblWifeEducation\" class=\"pop_label_left\">Spouse Education</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.broObj.txtbrotherwifeeducation\" class=\"form-control\" tabindex=\"20\" maxlength=\"150\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label class=\"pop_label_left\">Profession Category</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                                <select multiselectdropdown ng-model=\"page.model.broObj.ddlbroSpouseprofessionCatgory\" typeofdata=\"'newProfessionCatgory'\"></select>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblwifescmpy\" class=\"pop_label_left\">Spouse Designation</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.broObj.txtbrotherwifeprofession\" class=\"form-control\" tabindex=\"21\" maxlength=\"200\" />\r" +
    "\n" +
    "                                <label class=\"checkbox-inline\"><input ng-model=\"page.model.broObj.chkboxbrotherwifeprofession\" type=\"checkbox\" ng-change=\"page.model.BhousewiseChk(page.model.broObj);\"><span>&nbsp;HouseWife</span> </label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"brothercmpyyy\" ng-hide=\"page.model.broObj.chkboxbrotherwifeprofession==true\">\r" +
    "\n" +
    "                            <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                                <label for=\"lblwifescmpy\" class=\"pop_label_left\">Company Name</label>\r" +
    "\n" +
    "                                <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                    <input ng-model=\"page.model.broObj.txtBWifeCompanyName\" class=\"form-control\" tabindex=\"23\" maxlength=\"100\" />\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </li>\r" +
    "\n" +
    "                            <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                                <label for=\"lblwifefjobloc\" class=\"pop_label_left\">Job Location</label>\r" +
    "\n" +
    "                                <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                    <input ng-model=\"page.model.broObj.txtBwifeJoblocation\" class=\"form-control\" tabindex=\"24\" maxlength=\"100\" />\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </li>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <li style=\"height: 15px;\"></li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <contact-directive emailhide=\"true\" dmobile=\"page.model.broObj.ddlBWMobileCode\" strmobile=\"page.model.broObj.txtBWifeMobileNumber\" dalternative=\"page.model.broObj.ddlBWMobileCode2\" stralternative=\"page.model.broObj.txtBWifeMobileNumber2\" dland=\"page.model.broObj.ddlBWifeLandLineCountryCode\"\r" +
    "\n" +
    "                            strareacode=\"page.model.broObj.txtBWifeLandLineAreaCode\" strland=\"page.model.broObj.txtBWifeLandLineNumber\" strmail=\"page.model.broObj.txtwifeEmail\"></contact-directive>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"divWifeSurname\">\r" +
    "\n" +
    "                            <li class=\"clearfix form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <label for=\"lblwifefathername\" class=\"pop_label_left\">Spouse Father SurName</label>\r" +
    "\n" +
    "                                <div class=\"pop_controls_right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <input ng-model=\"page.model.broObj.txtBWifeFatherSurName\" class=\"form-control\" tabindex=\"36\" maxlength=\"50\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </li>\r" +
    "\n" +
    "                            <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                                <label for=\"lblNatveWife\" class=\"pop_label_left\">Spouse Father Name</label>\r" +
    "\n" +
    "                                <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                    <input ng-model=\"page.model.broObj.txtBWWifeFatherName\" class=\"form-control\" tabindex=\"37\" maxlength=\"100\" />\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <li class=\"clearfix form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <label for=\"lblspousefatherCaste\" class=\"pop_label_left\">Spouse Father Caste</label>\r" +
    "\n" +
    "                                <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <select multiselectdropdown ng-model=\"page.model.broObj.ddlborherspousefathercaste\" typeofdata=\"'caste'\"></select>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </li>\r" +
    "\n" +
    "                            <country-directive countryshow=\"false\" dcountry=\"CountryVal\" cityshow=\"false\" othercity=\"false\" dstate=\"page.model.broObj.ddlBroSpousefatherState\" ddistrict=\"page.model.broObj.ddlBroSpousefatherDistrict\"></country-directive>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                                <label for=\"lblBroSpouseCity\" class=\"pop_label_left\">Native Place</label>\r" +
    "\n" +
    "                                <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "                                    <input ng-model=\"page.model.broObj.txtBroSpousefatherCity\" <cl></cl>ass=\"form-control\" tabindex=\"41\" maxlength=\"100\" />\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </li>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <li class=\"row \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <edit-footer></edit-footer>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"sisterModalContent.html\">\r" +
    "\n" +
    "        <form class=\"EditViewClass\" name=\"sibsisForm\" novalidate role=\"form\" ng-submit=\"sibsisForm.$valid  && page.model.sibSisSubmit(page.model.sisObj)\" accessible-form>\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <h3 class=\"modal-title text-center\" id=\"modal-title\">Sister details\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"page.model.cancel();\">\r" +
    "\n" +
    "                        <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"20\">Delete</ng-md-icon>\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body clearfix pop_content_my\" id=\"modal-body\">\r" +
    "\n" +
    "                <ul id=\"ulsibilingsister\">\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"lblElderYounger\" style=\"padding-top: 2%;\" class=\"pop_label_left\">Elder/Younger<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"radio-group-my\">\r" +
    "\n" +
    "                            <md-input-container style=\"font-weight: 700;color:black;\">\r" +
    "\n" +
    "                                <md-radio-group ng-required=\"true\" name=\"rbtSElderyounger\" layout=\"row\" ng-model=\"page.model.sisObj.rbtSElderyounger\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                                    <md-radio-button value=\"322\" class=\"md-primary\">Elder</md-radio-button>\r" +
    "\n" +
    "                                    <md-radio-button value=\"321\"> Younger </md-radio-button>\r" +
    "\n" +
    "                                </md-radio-group>\r" +
    "\n" +
    "                                <div ng-messages=\"sibsisForm.rbtSElderyounger.$invalid\">\r" +
    "\n" +
    "                                    <div ng-if=\"sibsisForm.rbtSElderyounger.$invalid && (sibsisForm.$submitted)\">This field is required.</div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </md-input-container>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblSisName\" class=\"pop_label_left\">Name<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input ng-model=\"page.model.sisObj.txtSisterName\" class=\"form-control\" tabindex=\"2\" maxlength=\"100\" required/>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblsisEducation\" class=\"pop_label_left\">Education</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input ng-model=\"page.model.sisObj.txtsisEducation\" class=\"form-control\" tabindex=\"3\" maxlength=\"150\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblbroprofessioncat\" class=\"pop_label_left\">Profession Category</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                            <select multiselectdropdown ng-model=\"page.model.sisObj.ddlsisprofessionCatgory\" typeofdata=\"'newProfessionCatgory'\"></select>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                        <label for=\"lblsisProfession\" class=\"pop_label_left\">Designation</label>\r" +
    "\n" +
    "                        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                            <input ng-model=\"page.model.sisObj.txtsisProfession\" class=\"form-control\" tabindex=\"4\" maxlength=\"200\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <input ng-model=\"page.model.sisObj.chksisProfession\" type=\"checkbox\" ng-change=\"page.model.ShousewiseChk(page.model.sisObj);\"><span>&nbsp;HouseWife</span>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <div id=\"divsiscmpyyy\" ng-hide=\"page.model.sisObj.chksisProfession==true\">\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblsisscmpy\" class=\"pop_label_left\">Company Name</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.sisObj.txtSCompanyName\" class=\"form-control\" tabindex=\"6\" maxlength=\"100\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblsissjobloc\" class=\"pop_label_left\">Job Location</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.sisObj.txtSjobloc\" class=\"form-control\" tabindex=\"7\" maxlength=\"100\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div style=\"height: 15px;\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <contact-directive emailhide=\"true\" dmobile=\"page.model.sisObj.ddlSMobileCountyCodeID\" strmobile=\"page.model.sisObj.txtSMobileNumber\" dalternative=\"page.model.sisObj.ddlSMobileCountyCodeID2\" stralternative=\"page.model.sisObj.txtSMobileNumber2\" dland=\"page.model.sisObj.ddlSLandLineCountryCodeID\"\r" +
    "\n" +
    "                        strareacode=\"page.model.sisObj.txtSAreacoude\" strland=\"page.model.sisObj.txtSNumber\" strmail=\"page.model.sisObj.txtSEmails\"></contact-directive>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <li class=\"clearfix\">\r" +
    "\n" +
    "                        <label for=\"lblIsMarried\" class=\"pop_label_left\">Is Married<span style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"radio-group-my\">\r" +
    "\n" +
    "                            <md-input-container style=\"font-weight: 700;color:black;\">\r" +
    "\n" +
    "                                <md-radio-group ng-required=\"true\" name=\"rdlSIsMarried\" layout=\"row\" ng-change=\"page.model.SIsMarried(page.model.sisObj.rdlSIsMarried);\" ng-model=\"page.model.sisObj.rdlSIsMarried\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                                    <md-radio-button value=\"1\" class=\"md-primary\">Yes</md-radio-button>\r" +
    "\n" +
    "                                    <md-radio-button value=\"0\"> No </md-radio-button>\r" +
    "\n" +
    "                                </md-radio-group>\r" +
    "\n" +
    "                                <div ng-messages=\"sibsisForm.rdlSIsMarried.$invalid\">\r" +
    "\n" +
    "                                    <div ng-if=\"sibsisForm.rdlSIsMarried.$invalid && (sibsisForm.$submitted)\">This field is required.</div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </md-input-container>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"divSister\" ng-if=\"page.model.sisObj.rdlSIsMarried==1\">\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblhussisfamilyStatus\" class=\"pop_label_left\">Husband Name</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.sisObj.txtShusName\" class=\"form-control\" tabindex=\"20\" maxlength=\"100\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblHusbandEducation\" class=\"pop_label_left\">Husband Education</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.sisObj.txtHusbandEducation\" class=\"form-control\" tabindex=\"21\" maxlength=\"150\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblbroprofessioncat\" class=\"pop_label_left\">Profession Category</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                                <select multiselectdropdown ng-model=\"page.model.sisObj.ddlsisSpouseprofessionCatgory\" typeofdata=\"'newProfessionCatgory'\"></select>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblHusbandProfession\" class=\"pop_label_left\">Husband Designation</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.sisObj.txtHusbandProfession\" class=\"form-control\" tabindex=\"22\" maxlength=\"200\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblhuscmpy\" class=\"pop_label_left\">Company Name</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.sisObj.txtShusCompanyName\" class=\"form-control\" tabindex=\"23\" maxlength=\"100\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblhussjobloc\" class=\"pop_label_left\">Job Location</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.sisObj.txtShusjobloc\" class=\"form-control\" tabindex=\"24\" maxlength=\"100\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li style=\"height: 15px;\"></li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <contact-directive emailhide=\"true\" dmobile=\"page.model.sisObj.ddlSHusMobileCountryID\" strmobile=\"page.model.sisObj.txtSHusMobileNumber\" dalternative=\"page.model.sisObj.ddlSHusMobileCountryID2\" stralternative=\"page.model.sisObj.txtSHusMobileNumber2\" dland=\"page.model.sisObj.ddlSHusLandCountryID\"\r" +
    "\n" +
    "                            strareacode=\"page.model.sisObj.txtSHusLandArea\" strland=\"page.model.sisObj.txtSHusLandNumber\" strmail=\"page.model.sisObj.txtHusbandEmail\"></contact-directive>\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblwifefathername\" class=\"pop_label_left\">Husband Father SurName</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.sisObj.txtHusbandFatherSurName\" class=\"form-control\" tabindex=\"36\" maxlength=\"50\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblNatvehus\" class=\"pop_label_left\">Husband Father Name</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.sisObj.txtHusbandFatherName\" class=\"form-control\" tabindex=\"37\" maxlength=\"100\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <label for=\"lblsisterspousefatherCaste\" class=\"pop_label_left\">Husband Father Caste</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right select-box-my\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <select multiselectdropdown ng-model=\"page.model.sisObj.ddlsisterspusefathercaste\" typeofdata=\"'caste'\"></select>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <country-directive countryshow=\"false\" cityshow=\"false\" othercity=\"false\" dcountry=\"CountryVal\" dstate=\"page.model.sisObj.ddlSisSpouceFatherState\" ddistrict=\"page.model.sisObj.ddlSisSpouceFatherDistrict\"></country-directive>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <li class=\"clearfix form-group\">\r" +
    "\n" +
    "                            <label for=\"lblSisSpouceFatherCity\" class=\"pop_label_left\">Native Place</label>\r" +
    "\n" +
    "                            <div class=\"pop_controls_right\">\r" +
    "\n" +
    "                                <input ng-model=\"page.model.sisObj.txtSisSpouceFatherCity\" class=\"form-control\" tabindex=\"41\" maxlength=\"100\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <li class=\"row \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <edit-footer></edit-footer>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </script>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"commonSibblingpopup.html\">\r" +
    "\n" +
    "        <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "        </slide-popup>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<style>\r" +
    "\n" +
    "    .md-dialog-container {\r" +
    "\n" +
    "        z-index: 99999999999;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/editSpouse/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"'templates/sideMenu.html'\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"edit_pages_content_main clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Spouse Details</h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <a href=\"javascrip:void(0);\" class=\"edit_page_add_button\" ng-click=\"page.model.populatepopup('Spouse');\">Add\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ng-if=\"page.model.spouseArray\" ng-repeat=\"item in page.model.spouseArray\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div id=\"reviewdiv\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"updatespousename\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <h6>\r" +
    "\n" +
    "                                <span id=\"spouseName\" font-bold=\"true\">Name</span></h6>\r" +
    "\n" +
    "                            <h5>\r" +
    "\n" +
    "                                <span id=\"lblspouseName\">{{item.NAME}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanellnkspouseedit\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <a class=\"edit_page_edit_button\" href=\"javascrip:void(0);\" ng-click=\"page.model.populatepopup('Spouse',item);\">Edit\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdatePanelspouseProfession\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"spouseEducation\" font-bold=\"true\">Education</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblspouseEducation\">{{item.EducationDetails}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelspouseProfessionDetails\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"spouseProfessionDetails\" font-bold=\"true\">Profession</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblspouseProfessionDetails\">{{item.ProfessionDetails}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdatePanelMarriedon\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Marriedon\" font-bold=\"true\">Married on</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblMarriedon\">{{item.MarriageDate}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelSeparateddate\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Separateddate\" font-bold=\"true\">Separated date</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblSeparateddate\">\r" +
    "\n" +
    "                                {{item.SeperatedDate}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelLegallydivorced\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Legallydivorced\" font-bold=\"true\">Legally divorced</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblLegallydivorced\"></span> {{item.LeagallyDivorce}}\r" +
    "\n" +
    "                                </h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdatePanelFamilyplanning\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"LabelFamilyplanning\" font-bold=\"true\">Family planning</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"Familyplanning\">{{item.MyFamilyPlanning}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelDateofegallydivorce\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Dateoflegallydivorce\" font-bold=\"true\">Date of legally divorce</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblDateoflegallydivorce\">{{item.DateofLegallDivorce}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdatePanelReasonfordivorce\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Reasonfordivorce\" font-bold=\"true\">Reason for divorce</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblReasonfordivorce\">{{item.ReasonforDivorce}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelFathername\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Fathername\" font-bold=\"true\">Father name</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblFathername\" ng-show=\"item.FatherFirstName\">{{item.FatherFirstName+\" \"+item.FatherLastName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"UpdatePanellblNoOfChildrens\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblnoofchildrenss\" font-bold=\"true\">No Of Children</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblNoOfChildrens\">{{item.NoOfChildrens}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelHouseFlatnumber\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"HouseFlatnumber\" font-bold=\"true\">House/Flat number</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblHouseFlatnumber\">{{item.HouseFlatNumberID}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelApartmentname\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Apartmentname\" font-bold=\"true\">Apartmentname</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblApartmentname\">{{item.AppartmentName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelStreetname\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Streetname\" font-bold=\"true\">Street name</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblStreetname\">{{item.StreetName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelAreaname\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Areaname\" font-bold=\"true\">Area name</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblAreaname\">{{item.AreaName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelLandmark\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"lblLandark\" font-bold=\"true\">Land mark</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblLandmark\">{{item.LandMark}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelCountry\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"Country\" font-bold=\"true\">Country</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblCountry\">{{item.CountryName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelState\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"State\" font-bold=\"true\">State</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblState\">{{item.StateName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelDistrict\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"District\" font-bold=\"true\">District</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblDistrict\">{{item.DistrictName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div id=\"UpdatePanelCity\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span id=\"City\" font-bold=\"true\">City</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span id=\"lblCity\">{{item.CityName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"edit_page_item\">\r" +
    "\n" +
    "            <div class=\"edit_page_item_head clearfix\">\r" +
    "\n" +
    "                <h4>Children Details </h4>\r" +
    "\n" +
    "                <div class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "                    <div ID=\"UpdatePanelChildrenDetails\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <a href=\"javascrip:void(0);\" ng-click=\"page.model.populatepopup('Child');\" class=\"edit_page_add_button\">Add\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"edit_page_details_item\">\r" +
    "\n" +
    "                <div ID=\"UpdatePanelfullChildrenDetails\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div ng-if=\"page.model.ChildArray\" ng-repeat=\"item in page.model.ChildArray\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div id=\"reviewdiv\" class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"Nameofthechild\" Font-Bold=\"true\" ForeColor=\"Red\">Name of the child</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblNameofthechild\">{{item.ChildName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div ID=\"UpdatePanellnkchidrensedit\" class=\"edit_page_item_ui clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <a href=\"javascrip:void(0);\" ng-click=\"page.model.populatepopup('Child',item);\" class=\"edit_page_edit_button\">Edit\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                <a title=\"\" data-placement=\"bottom\" data-toggle=\"tooltip\" data-original-title=\"Delete chidrens Details\" class=\"edit_page_del_button\">delete\r" +
    "\n" +
    "                                           \r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span ID=\"Genderofthechild\" Font-Bold=\"true\">Gender of the child</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span ID=\"lblGenderofthechild\">{{item.GenderName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span ID=\"Dateofbirthofthechild\" Font-Bold=\"true\">DOB of the child</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span ID=\"lblDateofbirthofthechild\">{{item.ChildDOB}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <divclass=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <h6>\r" +
    "\n" +
    "                                        <span ID=\"Childstayingwith\" Font-Bold=\"true\">Child staying with</span></h6>\r" +
    "\n" +
    "                                    <h5>\r" +
    "\n" +
    "                                        <span ID=\"lblChildstayingwith\">{{item.ChildStayingWith}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"edit_page_details_item_desc clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <h6>\r" +
    "\n" +
    "                                    <span ID=\"Childstayingwithrelation\" Font-Bold=\"true\">Child staying with relation</span></h6>\r" +
    "\n" +
    "                                <h5>\r" +
    "\n" +
    "                                    <span ID=\"lblChildstayingwithrelation\">{{item.ChildernRelationName}}</span></h5>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"modelContent.html\">\r" +
    "\n" +
    "        <slide-popup model=\"page.model\" eventtype=\"page.model.eventType\">\r" +
    "\n" +
    "        </slide-popup>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<script src=\"build/js/custom.js\" type=\"text/javascript\"></script>"
  );


  $templateCache.put('app/popup/index.html',
    "<div ng-class=\"'EditViewClass'\" class=\"right_col\" style=\"padding-top: 6%;padding-left: 1%;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <button ng-click=\"openModel();\">    Add</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <slide-popup model=\"model\">\r" +
    "\n" +
    "    </slide-popup>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/directives/slidePopup/index.html',
    "<form class=\"EditViewClass\" name=\"dynamicForm\" novalidate role=\"form\" ng-submit=\"dynamicForm.$valid && submit();\" accessible-form>\r" +
    "\n" +
    "    <div class=\"modal-header\">\r" +
    "\n" +
    "        <h3 class=\"modal-title text-center\" id=\"modal-title\">{{model.popupHeader}}\r" +
    "\n" +
    "            <a href=\"javascript:void(0);\" ng-click=\"cancel();\">\r" +
    "\n" +
    "                <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"20\"> </ng-md-icon>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-body\">\r" +
    "\n" +
    "        <ul class=\"modal-body pop_content_my clearfix\">\r" +
    "\n" +
    "            <li ng-show=\"item.parentDependecy===undefined?true:model[item.parentDependecy](item)\" class=\"clearfix form-group\" ng-repeat=\"item in model.popupdata\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <label ng-if=\"item.controlType!=='country' && item.controlType!=='contact'  && item.controlType!=='bindHtml' && item.controlType!=='about'\" for=\"item.lblname\" ng-class=\"{'radiocls':item.controlType==='radio'}\" class=\"pop_label_left\">{{item.lblname}}<span ng-if=\"item.required\" style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "                <label class=\"col-lg-12\" ng-class=\"item.classname\" ng-if=\"item.controlType==='bindHtml'\">\r" +
    "\n" +
    "               <span ng-bind-html=\"item.html\"></span>\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "                <div ng-if=\"!item.dataSource && item.controlType==='select'\" class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model[item.ngmodel]\" typeofdata=\"item.typeofdata\" ng-required=\"item.required\" ng-change=\"ddlChange(model[item.ngmodel],model[item.secondParent],item.childName,item.changeApi)\"></select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='select' && item.dataSource\" class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model[item.ngmodel]\" ng-required=\"item.required\" ng-options=\"item1.value as item1.label for item1 in item.dataSource\"></select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='Changeselect'\" class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model[item.ngmodel]\" ng-required=\"item.required\" ng-options=\"itm.value as itm.label for itm in item.dataSource\" ng-change=\"ddlChange(model[item.ngmodel],model[item.secondParent],item.childName,item.changeApi)\"></select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='textbox'\" class=\"pop_controls_right\">\r" +
    "\n" +
    "                    <input type=\"text\" ng-model=\"model[item.ngmodel]\" ng-change=\"model[item.method]();\" maxlength=\"150\" class=\"form-control\" ng-required=\"item.required\" />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='textboxNumber'\" class=\"pop_controls_right select-box-my-double\">\r" +
    "\n" +
    "                    <input type=\"text\" ng-model=\"model[item.ngmodel]\" maxlength=\"{{item.maxLength}}\" onkeydown=\"return (((event.keyCode == 8) || (event.keyCode == 46) || (event.keyCode >= 35 && event.keyCode <= 40) || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))\"\r" +
    "\n" +
    "                        class=\"form-control\" ng-required=\"item.required\" />\r" +
    "\n" +
    "                    <span ng-if=\"item.span\" font-bold=\"true\">{{item.spanText}}</span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='textboxNumberrestrict'\" class=\"pop_controls_right\">\r" +
    "\n" +
    "                    <input type=\"text\" ng-model=\"model[item.ngmodel]\" maxlength=\"{{item.maxLength}}\" onkeydown=\"return (((event.keyCode == 8) || (event.keyCode == 46) || (event.keyCode >= 35 && event.keyCode <= 40) || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))\"\r" +
    "\n" +
    "                        class=\"form-control\" ng-required=\"item.required\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='textarea'\">\r" +
    "\n" +
    "                    <textarea ng-model=\"model[item.ngmodel]\" maxlength=\"500\" rows=\"4\" cols=\"20\" ng-required=\"item.required\" style=\"max-width:515px;width:100%;\"></textarea>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='textareaSide'\" class=\"pop_controls_right select-box-my\" style=\"padding-bottom:2%;\">\r" +
    "\n" +
    "                    <textarea type=\"text\" ng-model=\"model[item.ngmodel]\" rows=\"2\" class=\"form-control\" ng-required=\"item.required\" style=\"width:96%;\" />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='textboxSelect'\" class=\"pop_controls_right select-box-my select-box-my-double\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model[item.ngmodelSelect]\" typeofdata=\"item.typeofdata\"></select>\r" +
    "\n" +
    "                    <input ng-model=\"model[item.ngmodelText]\" class=\"form-control\" maxlength=\"7\" onkeydown=\"return (((event.keyCode == 8) || (event.keyCode == 46) || (event.keyCode >= 35 && event.keyCode <= 40) || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)));\"\r" +
    "\n" +
    "                    />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <md-input-container ng-if=\"item.controlType==='radio'\" style=\"font-weight: 700; color: black;margin-top:-1px;\">\r" +
    "\n" +
    "                    <md-radio-group ng-change=\"ddlChange(model[item.ngmodel],model[item.secondParent],item.childName,item.changeApi)\" ng-required=\"item.required\" layout=\"row\" ng-model=\"model[item.ngmodel]\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                        <md-radio-button ng-value=\"rd.value\" ng-repeat=\"rd in item.dataSource\" class=\"md-primary\">{{rd.label}}</md-radio-button>\r" +
    "\n" +
    "                    </md-radio-group>\r" +
    "\n" +
    "                    <div ng-if=\"dynamicForm.$invalid && dynamicForm.$submitted\">\r" +
    "\n" +
    "                        <span style=\"color:red;\">This field is required</span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </md-input-container>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='checkbox'\" class=\"pop_controls_right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <md-checkbox ng-model=\"model[item.ngmodel]\" name=\"chkisconfidential\" aria-label=\"Checkbox 1\" ng-change=\"model[item.method](model[item.ngmodel],item.ngmodel)\">\r" +
    "\n" +
    "                    </md-checkbox>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='date'\" class=\"pop_controls_right\">\r" +
    "\n" +
    "                    <custom-datepickeredit ng-model=\"model[item.ngmodel]\" ngClass=\"'dateclass'\" date-options=\"dateOptions\"></custom-datepickeredit>\r" +
    "\n" +
    "                    <!--<date-picker strdate=\"model[item.ngmodel]\"></date-picker>-->\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='country'\">\r" +
    "\n" +
    "                    <country-directive require=\"item.require\" countryshow=\"item.countryshow\" cityshow=\"item.cityshow\" othercity=\"item.othercity\" dcountry=\"model[item.dcountry]\" dstate=\"model[item.dstate]\" ddistrict=\"model[item.ddistrict]\" dcity=\"model[item.dcity]\" strothercity=\"model[item.strothercity]\"></country-directive>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='contact'\">\r" +
    "\n" +
    "                    <contact-directive emailhide=\"item.emailhide\" dmobile=\"model[item.dmobile]\" strmobile=\"model[item.strmobile]\" dalternative=\"model[item.dalternative]\" stralternative=\"model[item.stralternative]\" dland=\"model[item.dland]\" strareacode=\"model[item.strareacode]\"\r" +
    "\n" +
    "                        strland=\"model[item.strland]\" strmail=\"model[item.strmail]\"></contact-directive>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='housewife'\" class=\"pop_controls_right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <input ng-model=\"model[item.ngmodelText]\" class=\"form-control\" maxlength=\"200\" tabindex=\"32\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <label class=\"checkbox-inline checkbox_my\" style=\"padding: 5px 0 6px 0;\">\r" +
    "\n" +
    "                <input type=checkbox ng-model=\"model[item.ngmodelChk]\"  ng-change=\"model[item.ngmodelText]=chkChange(model[item.ngmodelChk]);\"/><span>&nbsp;HouseWife</span>\r" +
    "\n" +
    "                    </label>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='about'\" class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"control-label\" style=\"color: #9b2828; font-size: 13px;\">{{item.displayTxt}}</label>\r" +
    "\n" +
    "                    <textarea ng-model=\"model[item.ngmodel]\" ng-maxlength=\"item.maxlength\" rows=\"4\" cols=\"20\" ng-required=\"item.required\" style=\"max-width:515px;width:100%;\"></textarea>\r" +
    "\n" +
    "                    <label id=\"Label1\" style=\"color: red; font-size: 13px;\" class=\"pull-right\" ng-if=\"item.maxlength!=undefined\">(max {{item.maxlength}} characters)</label>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='multiselect'\" class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model[item.ngmodel]\" multiple typeofdata=\"item.typeofdata\" ng-required=\"item.required\" ng-change=\"ddlChange(model[item.ngmodel],model[item.secondParent],item.childName,item.changeApi)\"></select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='Changemultiselect'\" class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model[item.ngmodel]\" multiple ng-required=\"item.required\" ng-options=\"inneritem.value as inneritem.label for inneritem in item.dataSource\" ng-change=\"ddlChange(model[item.ngmodel],model[item.secondParent],item.childName,item.changeApi)\"></select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='doublemultiselect'\" class=\"pop_controls_right select-box-my select-box-my-double input-group\">\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model[item.ngmodelSelect1]\" typeofdata=\"item.typeofdata\" ng-required=\"item.required\" ng-change=\"ddlChange(model[item.ngmodel],model[item.secondParent],item.childName,item.changeApi)\"></select>\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model[item.ngmodelSelect2]\" typeofdata=\"item.typeofdata\" ng-required=\"item.required\" ng-change=\"ddlChange(model[item.ngmodel],model[item.secondParent],item.childName,item.changeApi)\"></select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='astroTimeOfBirth'\" class=\"pop_controls_right select-box-my select-box-my-trible select-box-my-trible3 input-group\">\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model.ddlFromHours\" ng-options=\"item.value as item.label for item in model.hrsbindArr\" required></select>\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model.ddlFromMinutes\" ng-options=\"item.value as item.label for item in model.minbindArr\" required></select>\r" +
    "\n" +
    "                    <select multiselectdropdown ng-model=\"model.ddlFromSeconds\" ng-options=\"item.value as item.label for item in model.secbindArr\" required></select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"item.controlType==='break'\">\r" +
    "\n" +
    "                    <br>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "            <li class=\"row\">\r" +
    "\n" +
    "                <br/>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"col-lg-9\">\r" +
    "\n" +
    "                    <button class=\"button_custom  pull-right\" ng-disabled=\"loading\" type=\"submit\" promise-btn=\"page.model.submitPromise\">Submit</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-lg-3\">\r" +
    "\n" +
    "                    <input value=\"Cancel\" class=\"button_custom button_custom_reset pull-right\" ng-click=\"cancel();\" type=\"button\"></div>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<style>\r" +
    "\n" +
    "    /*.requiredStar::after {\r" +
    "\n" +
    "        content: \" * \";\r" +
    "\n" +
    "        float: right;\r" +
    "\n" +
    "        color: red;\r" +
    "\n" +
    "        font-size: 22px !important;\r" +
    "\n" +
    "        padding-left: 6px;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .radiocls {\r" +
    "\n" +
    "        padding-top: 2%;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .multiselect {\r" +
    "\n" +
    "        border: solid 1px #ADA2A2 !important;\r" +
    "\n" +
    "        color: #000;\r" +
    "\n" +
    "        background: #fff !important;\r" +
    "\n" +
    "        box-shadow: none !important;\r" +
    "\n" +
    "        height: 34px !important;\r" +
    "\n" +
    "        margin: 0 !important;\r" +
    "\n" +
    "    }*/\r" +
    "\n" +
    "    /*.help-block {\r" +
    "\n" +
    "        padding-left: 40%;\r" +
    "\n" +
    "    }*/\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .datepicker3 {\r" +
    "\n" +
    "        background: url(src/images/date_icon.png) no-repeat 98% 44% !important;\r" +
    "\n" +
    "        /*height: 35px !important;*/\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .datepicker3 {\r" +
    "\n" +
    "        background: url(src/images/date_icon.png) no-repeat 98% 44% !important;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .datepicker4 {\r" +
    "\n" +
    "        background: url(src/images/date_icon.png) no-repeat 98% 44% !important;\r" +
    "\n" +
    "        background-color: #f0f0cc !important;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .dateclass {\r" +
    "\n" +
    "        width: 96% !important;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>"
  );


  $templateCache.put('common/templates/Photopopup.html',
    "<div class=\"modal-content\">\r" +
    "\n" +
    "    <div class=\"modal-header\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"model.cancel()\">×</button>\r" +
    "\n" +
    "        <h4 class=\"modal-title\">Photo Album</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-body\">\r" +
    "\n" +
    "        <div class=\"bs-example\">\r" +
    "\n" +
    "            <div id=\"slideshow\" class=\"carousel slide\" data-interval=\"3000\" data-ride=\"carousel\">\r" +
    "\n" +
    "                <ol class=\"carousel-indicators\">\r" +
    "\n" +
    "                    <li ng-repeat=\"slide in model.SlideArr\" data-target=\"#slideshow\" ng-class=\"$index+1==1?'active':''\" data-slide-to=\"$index+1-1\"></li>\r" +
    "\n" +
    "                </ol>\r" +
    "\n" +
    "                <div class=\"carousel-inner\">\r" +
    "\n" +
    "                    <div ng-class=\"($index+1)==1?'item active':'item'\" ng-repeat=\"slide in model.SlideArr\">\r" +
    "\n" +
    "                        <img id=\"imh\" ng-src=\"{{slide.FullPhotoPath}}\" style=\"margin-left: auto;\r" +
    "\n" +
    "    margin-right: auto;\"></img>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <a data-target=\"#slideshow\" id=\"a1\" class=\"carousel-control left\" href=\"javascript:void(0)\" data-slide=\"prev\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-chevron-left\"></span>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "                <a data-target=\"#slideshow\" id=\"a2\" class=\"carousel-control right\" href=\"javascript:void(0)\" data-slide=\"next\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-chevron-right\"></span>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div ng-hide=\"true\">\r" +
    "\n" +
    "                <img src=\"http://d16o2fcjgzj2wp.cloudfront.net/Images/HoroscopeImages/86974_HaroscopeImage/86974_HaroscopeImage.jpg\" style=\"height: 500px; width: 500px;\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/templates/contacttemplate.html',
    "<div id=\"ownerdiv4\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <li id=\"divfathernumbersowner\" class=\"clearfix form-group\">\r" +
    "\n" +
    "        <label for=\"lblContactNumbersfather\" class=\"pop_label_left\">Contact Numbers</label>\r" +
    "\n" +
    "        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <a data-toggle=\"tooltip\" style=\"padding-right:20%;\" data-original-title=\"Add Mobile Number\" tabindex=\"6\" ng-click=\"showhidemob($event,'mob');\" href=javascript:void(0);>\r" +
    "\n" +
    "                <ng-md-icon icon=\"smartphone\" style=\"fill:#337ab7\" size=\"20\"></ng-md-icon>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <a data-toggle=\"tooltip\" style=\"padding-right:20%;\" data-original-title=\"Add  Land Number\" tabindex=\"7\" ng-click=\"showhidemob($event,'land');\" href=javascript:void(0);>\r" +
    "\n" +
    "                <ng-md-icon icon=\"call\" style=\"fill:#337ab7\" size=\"20\"></ng-md-icon>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <a data-toggle=\"tooltip\" ng-show=\"emailhide\" data-original-title=\"Add  Email ID\" tabindex=\"8\" ng-click=\"showhidemob($event,'mail');\" href=javascript:void(0);>\r" +
    "\n" +
    "                <ng-md-icon icon=\"mail\" style=\"fill:#337ab7\" size=\"20\"></ng-md-icon>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <li class=\"clearfix form-group\" ng-show=\"pmob\">\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "            <label for=\"lblMobile\" class=\"pop_label_left\">Mobile #  </label>\r" +
    "\n" +
    "            <div class=\"pop_controls_right select-box-my select-box-my-double\">\r" +
    "\n" +
    "                <select multiselectdropdown ng-model=\"dmobile\" typeofdata=\"'countryCode'\"></select>\r" +
    "\n" +
    "                <input type=text ng-model=\"strmobile\" class=\"form-control\" maxlength=\"10\" tabindex=\"10\" />\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "    <li class=\"clearfix form-group\" ng-show=\"amob\">\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "            <label for=\"lblMobilefather\" class=\"pop_label_left\">Altenate Number</label>\r" +
    "\n" +
    "            <div class=\"pop_controls_right select-box-my select-box-my-double\">\r" +
    "\n" +
    "                <select multiselectdropdown ng-model=\"dalternative\" typeofdata=\"'countryCode'\"></select>\r" +
    "\n" +
    "                <input type=text class=\"form-control\" ng-model=\"stralternative\" maxlength=\"10\" tabindex=\"12\" />\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "    <li class=\"clearfix form-group\" ng-show=\"land\">\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "            <label for=\"lblLandLine\" class=\"pop_label_left\">Land line #  </label>\r" +
    "\n" +
    "            <div class=\"pop_controls_right select-box-my select-box-my-trible\">\r" +
    "\n" +
    "                <select multiselectdropdown ng-model=\"dland\" typeofdata=\"'countryCode'\"></select>\r" +
    "\n" +
    "                <input type=text ng-model=\"strareacode\" class=\"form-control\" maxlength=\"4\" tabindex=\"14\" />\r" +
    "\n" +
    "                <input type=text ng-model=\"strland\" class=\"form-control\" maxlength=\"8\" tabindex=\"15\" />\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "    <li class=\"clearfix form-group\" ng-show=\"mail\">\r" +
    "\n" +
    "        <label for=\"lblEmail\" class=\"pop_label_left\">Email  </label>\r" +
    "\n" +
    "        <div class=\"pop_controls_right\">\r" +
    "\n" +
    "            <input type=text ng-model=\"strmail\" class=\"form-control\" placeholder=\"Enter Email\" text=\" \" tabindex=\"16\" />\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<style type=\"text/css\">\r" +
    "\n" +
    "    body {\r" +
    "\n" +
    "        color: black;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    .multiselect-selected-text {\r" +
    "\n" +
    "        overflow: hidden;\r" +
    "\n" +
    "        display: block;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>"
  );


  $templateCache.put('common/templates/countryTemplate.html',
    "<div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <li class=\"clearfix form-group\" ng-show=\"countryshow\">\r" +
    "\n" +
    "        <label for=\"lblCountry\" class=\"pop_label_left\">Country<span ng-if=\"require==true\" style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "            <select multiselectdropdown ng-model=\"dcountry\" ng-change=\"changeBind('Country',dcountry);\" typeofdata=\"'Country'\" ng-required=\"require\"></select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "        <label for=\"State\" class=\"pop_label_left\">State<span ng-if=\"require==true\" style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "            <select multiselectdropdown ng-model=\"dstate\" ng-options=\"item.value as item.label for item in stateArr\" ng-change=\"changeBind('State',dstate,dcountry);\" ng-required=\"require\"></select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "    <li class=\"clearfix form-group\">\r" +
    "\n" +
    "        <div id=\"divEduDistric\">\r" +
    "\n" +
    "            <label for=\"lblDistrict\" class=\"pop_label_left\">District<span ng-if=\"require==true\" style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "            <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "                <select multiselectdropdown ng-model=\"ddistrict\" ng-options=\"item1.value as item1.label for item1 in districtArr\" ng-change=\"changeBind('District',ddistrict);\" ng-required=\"(dcountry===1 || dcountry==='1')?require:false\"></select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "    <li class=\"clearfix form-group\" ng-show=\"cityshow\">\r" +
    "\n" +
    "        <label for=\"lblCityworking\" class=\"pop_label_left\">City<span ng-if=\"require==true\" style=\"color: red; margin-left: 3px;\">*</span></label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"pop_controls_right select-box-my input-group\">\r" +
    "\n" +
    "            <div ng-show=\"!cityinput\">\r" +
    "\n" +
    "                <select multiselectdropdown ng-model=\"dcity\" ng-options=\"item.value as item.label for item in cityeArr\" ng-required=\"cityshow==true?require:false\"></select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div ng-show=\"othercity\">\r" +
    "\n" +
    "                <input ng-model=\"strothercity\" ng-show=\"cityinput\" class=\"form-control\" maxlength=\"100\" />\r" +
    "\n" +
    "                <a id=\"lnkCity\" href=\"javascript:void(0);\" ng-click=\"ShowCity();\">Not in List</a>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/templates/deletepopup.html',
    "<form class=\"EditViewClass\"   name=\"deleteForm\" novalidate role=\"form\" ng-submit=\"page.model.deleteSubmit()\">\r" +
    "\n" +
    "    <div class=\"modal-header\">\r" +
    "\n" +
    "        <h3 class=\"modal-title text-center\" id=\"modal-title\">Alert\r" +
    "\n" +
    "            <a href=\"javascript:void(0);\" ng-click=\"cancel();\">\r" +
    "\n" +
    "                <ng-md-icon icon=\"close\" style=\"fill:#c73e5f\" class=\"pull-right\" size=\"25\">Delete</ng-md-icon>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-body clearfix\" id=\"modal-body\">\r" +
    "\n" +
    "        <b class=\"text-center\"> Do you want to delete <span>{{deleteDisplayTxt}}</span> details</b>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"submit\" class=\"btn btn-success\">Delete</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-danger\" ng-click=\"page.model.cancel();\">Cancel</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</form>"
  );


  $templateCache.put('common/templates/reviewConfirmationPopup.html',
    "<form class=\"EditViewClass\" name=\"reviewConfirmForm\" novalidate role=\"form\" ng-submit=\"reviewSubmit();\">\r" +
    "\n" +
    "    <div class=\"modal-header text-center\" style=\"color: #57b5e3;\r" +
    "\n" +
    "    border-bottom: 3px solid #57b5e3;font-size: 30px;\">\r" +
    "\n" +
    "        <i class=\"glyphicon glyphicon-alert\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-title text-center\" style=\"font-size: 17px;color: #737373;font-weight: bold;\">Confirmation</div>\r" +
    "\n" +
    "    <div class=\"modal-body clearfix\" id=\"modal-body\">\r" +
    "\n" +
    "        <b class=\"text-center\" style=\"color:gray;\"> Do you want to Review the {{reviewdisplay}}</b>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"submit\" class=\"btn btn-success\">Review</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-danger\" ng-click=\"cancel();\">Cancel</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</form>"
  );

}]);

(function() {
    'use strict';
    angular
        .module('KaakateeyaEmpEdit')
        .constant('arrayConstantsEdit', {
            'MaritalStatus': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Unmarried", "title": "Unmarried", "value": 43 },
                { "label": "Divorce", "title": "Divorce", "value": 44 },
                { "label": "Widow/Widower", "title": "Widow/Widower", "value": 45 },
                { "label": "Separated", "title": "Separated", "value": 46 }
            ],
            "heightregistration": [
                { "label": "4'8 in - 142 cms", "title": "4'8 in - 142 cms", "value": 9 },
                { "label": "4'9 in - 144 cms", "title": "4'9 in - 144 cms", "value": 10 }, { "label": "4'10 in - 147 cms", "title": "4'10 in - 147 cms", "value": 11 },
                { "label": "4'11 in - 150 cms", "title": "4'11 in - 150 cms", "value": 12 }, { "label": "5'0 in - 152 cms", "title": "5'0 in - 152 cms", "value": 13 },
                { "label": "5'1 in - 155 cms", "title": "5'1 in - 155 cms", "value": 14 }, { "label": "5'2 in - 157 cms", "title": "5'2 in - 157 cms", "value": 15 },
                { "label": "5'3 in - 160 cms", "title": "5'3 in - 160 cms", "value": 16 }, { "label": "5'4 in - 162 cms", "title": "5'4 in - 162 cms", "value": 17 },
                { "label": "5'5 in - 165 cms", "title": "5'5 in - 165 cms", "value": 18 }, { "label": "5'6 in - 167 cms", "title": "5'6 in - 167 cms", "value": 19 },
                { "label": "5'7 in - 170 cms", "title": "5'7 in - 170 cms", "value": 20 }, { "label": "5'8 in - 172 cms", "title": "5'8 in - 172 cms", "value": 21 },
                { "label": "5'9 in - 175 cms", "title": "5'9 in - 175 cms", "value": 22 }, { "label": "5'10 in - 177 cms", "title": "5'10 in - 177 cms", "value": 23 },
                { "label": "5'11 in - 180 cms", "title": "5'11 in - 180 cms", "value": 24 }, { "label": "6'0 in - 183 cms", "title": "6'0 in - 183 cms", "value": 25 },
                { "label": "6'1 in - 185 cms", "title": "6'1 in - 185 cms", "value": 26 }, { "label": "6'2 in - 188 cms", "title": "6'2 in - 188 cms", "value": 27 },
                { "label": "6'3 in - 190 cms", "title": "6'3 in - 190 cms", "value": 28 }, { "label": "6'4 in - 193 cms", "title": "6'4 in - 193 cms", "value": 29 },
                { "label": "6'5 in - 195 cms", "title": "6'5 in - 195 cms", "value": 30 }, { "label": "6'6 in - 198 cms", "title": "6'6 in - 198 cms", "value": 31 },
                { "label": "6'7 in - 200 cms", "title": "6'7 in - 200 cms", "value": 32 }, { "label": "6'8 in - 203 cms", "title": "6'8 in - 203 cms", "value": 33 },
                { "label": "6'9 in - 205 cms", "title": "6'9 in - 205 cms", "value": 34 }, { "label": "6'10 in - 208 cms", "title": "6'10 in - 208 cms", "value": 35 },
                { "label": "6'11 in - 210 cms", "title": "6'11 in - 210 cms", "value": 36 }, { "label": "7'0 in - 213 cms\t", "title": "7'0 in - 213 cms\t", "value": 37 },
                { "label": "7'1 in - 215 cms\t", "title": "7'1 in - 215 cms\t", "value": 38 }, { "label": "7'2 in - 218 cms\t", "title": "7'2 in - 218 cms\t", "value": 39 }
            ],
            "height": [
                { "label": "--Select--", "title": "--select--", "value": "" },
                { "label": "4'0 in - 122 cms", "title": "4'0 in - 122 cms", "value": 1 }, { "label": "4'1 in - 124 cms", "title": "4'1 in - 124 cms", "value": 2 },
                { "label": "4'2 in - 127 cms", "title": "4'2 in - 127 cms", "value": 3 },
                { "label": "4'3 in - 130 cms", "title": "4'3 in - 130 cms", "value": 4 }, { "label": "4'4 in - 132 cms", "title": "4'4 in - 132 cms", "value": 5 },
                { "label": "4'5 in - 135 cms", "title": "4'5 in - 135 cms", "value": 6 }, { "label": "4'6 in - 137 cms", "title": "4'6 in - 137 cms", "value": 7 },
                { "label": "4'7 in - 140 cms", "title": "4'7 in - 140 cms", "value": 8 },
                { "label": "4'8 in - 142 cms", "title": "4'8 in - 142 cms", "value": 9 },
                { "label": "4'9 in - 144 cms", "title": "4'9 in - 144 cms", "value": 10 }, { "label": "4'10 in - 147 cms", "title": "4'10 in - 147 cms", "value": 11 },
                { "label": "4'11 in - 150 cms", "title": "4'11 in - 150 cms", "value": 12 }, { "label": "5'0 in - 152 cms", "title": "5'0 in - 152 cms", "value": 13 },
                { "label": "5'1 in - 155 cms", "title": "5'1 in - 155 cms", "value": 14 }, { "label": "5'2 in - 157 cms", "title": "5'2 in - 157 cms", "value": 15 },
                { "label": "5'3 in - 160 cms", "title": "5'3 in - 160 cms", "value": 16 }, { "label": "5'4 in - 162 cms", "title": "5'4 in - 162 cms", "value": 17 },
                { "label": "5'5 in - 165 cms", "title": "5'5 in - 165 cms", "value": 18 }, { "label": "5'6 in - 167 cms", "title": "5'6 in - 167 cms", "value": 19 },
                { "label": "5'7 in - 170 cms", "title": "5'7 in - 170 cms", "value": 20 }, { "label": "5'8 in - 172 cms", "title": "5'8 in - 172 cms", "value": 21 },
                { "label": "5'9 in - 175 cms", "title": "5'9 in - 175 cms", "value": 22 }, { "label": "5'10 in - 177 cms", "title": "5'10 in - 177 cms", "value": 23 },
                { "label": "5'11 in - 180 cms", "title": "5'11 in - 180 cms", "value": 24 }, { "label": "6'0 in - 183 cms", "title": "6'0 in - 183 cms", "value": 25 },
                { "label": "6'1 in - 185 cms", "title": "6'1 in - 185 cms", "value": 26 }, { "label": "6'2 in - 188 cms", "title": "6'2 in - 188 cms", "value": 27 },
                { "label": "6'3 in - 190 cms", "title": "6'3 in - 190 cms", "value": 28 }, { "label": "6'4 in - 193 cms", "title": "6'4 in - 193 cms", "value": 29 },
                { "label": "6'5 in - 195 cms", "title": "6'5 in - 195 cms", "value": 30 }, { "label": "6'6 in - 198 cms", "title": "6'6 in - 198 cms", "value": 31 },
                { "label": "6'7 in - 200 cms", "title": "6'7 in - 200 cms", "value": 32 }, { "label": "6'8 in - 203 cms", "title": "6'8 in - 203 cms", "value": 33 },
                { "label": "6'9 in - 205 cms", "title": "6'9 in - 205 cms", "value": 34 }, { "label": "6'10 in - 208 cms", "title": "6'10 in - 208 cms", "value": 35 },
                { "label": "6'11 in - 210 cms", "title": "6'11 in - 210 cms", "value": 36 }, { "label": "7'0 in - 213 cms\t", "title": "7'0 in - 213 cms\t", "value": 37 },
                { "label": "7'1 in - 215 cms\t", "title": "7'1 in - 215 cms\t", "value": 38 }, { "label": "7'2 in - 218 cms\t", "title": "7'2 in - 218 cms\t", "value": 39 }
            ],
            "Religion": [
                { "label": "--Select--", "title": "--select--", "value": "" },
                { "label": "Hindu", "title": "Hindu", "value": 1 },
                { "label": "Christian", "title": "Christian", "value": 2 },
                { "label": "Muslim", "title": "Muslim", "value": 3 },
                { "label": "Other", "title": "Other", "value": 6 },
                { "label": "Catholic", "title": "Catholic", "value": 9 },
                { "label": "Roma Catholic", "title": "Roma Catholic", "value": 15 },
                { "label": "ROMAN CATHOLIC", "title": "ROMAN CATHOLIC", "value": 16 }
            ],
            "Mothertongue": [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Telugu", "title": "Telugu", "value": 1 },
                { "label": "Tamil", "title": "Tamil", "value": 2 },
                { "label": "Kannada", "title": "Kannada", "value": 3 },
                { "label": "Hindi", "title": "Hindi", "value": 4 },
                { "label": "Punjabi", "title": "Punjabi", "value": 5 },
                { "label": "Urdu", "title": "Urdu", "value": 6 },
                { "label": "Lambadi", "title": "Lambadi", "value": 7 },
                { "label": "Marati", "title": "Marati", "value": 8 },
                { "label": "Gujaraathi", "title": "Gujaraathi", "value": 9 },
                { "label": "English", "title": "English", "value": 10 },
                { "label": "Malayalam", "title": "Malayalam", "value": 11 },
                { "label": "Saurashtra", "title": "Saurashtra", "value": 12 }, { "label": "Orea", "title": "Orea", "value": 13 },
                { "label": "telugu", "title": "telugu", "value": 14 }
            ],
            "educationcategory": [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Bachelors in Engineering", "title": "Bachelors in Engineering", "value": 1 },
                { "label": "Bachelors in Degree", "title": "Bachelors in Degree", "value": 2 },
                { "label": "Diploma", "title": "Diploma", "value": 3 },
                { "label": "Doctorate/phd", "title": "Doctorate/phd", "value": 4 },
                { "label": "Masters in Engineering", "title": "Masters in Engineering", "value": 5 },
                { "label": "Bachelors in Medicine", "title": "Bachelors in Medicine", "value": 6 },
                { "label": "Masters in Degree", "title": "Masters in Degree", "value": 7 },
                { "label": "Finance - ICWAI/CA/CS", "title": "Finance - ICWAI/CA/CS", "value": 10 },
                { "label": "Union Public Service Commision-Civil Services", "title": "Union Public Service Commision-Civil Services", "value": 11 },
                { "label": "Masters in Medicine", "title": "Masters in Medicine", "value": 13 },
                { "label": "Below Graduation", "title": "Below Graduation", "value": 15 },
                { "label": "Not given", "title": "Not given", "value": 21 },
                { "label": "Other", "title": "Other", "value": 22 }
            ],
            "visastatus": [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Student Visa", "title": "Student Visa", "value": 284 },
                { "label": "Work Permit", "title": "Work Permit", "value": 285 },
                { "label": "Temporary Visa", "title": "Temporary Visa", "value": 286 },
                { "label": "Citizen", "title": "Citizen", "value": 521 },
                { "label": "Permanent Resident", "title": "Permanent Resident", "value": 522 },
                { "label": "Green Card", "title": "Green Card", "value": 553 }
            ],
            "stars": [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Bharani", "title": "Bharani", "value": 2 },
                { "label": "Krithika", "title": "Krithika", "value": 3 },
                { "label": "Rohini", "title": "Rohini", "value": 4 },
                { "label": "Mrigasira", "title": "Mrigasira", "value": 5 },
                { "label": "Arudra", "title": "Arudra", "value": 6 },
                { "label": "Punarvasu", "title": "Punarvasu", "value": 7 },
                { "label": "Pushyami", "title": "Pushyami", "value": 8 },
                { "label": "Aslesha", "title": "Aslesha", "value": 9 },
                { "label": "Makha", "title": "Makha", "value": 10 },
                { "label": "Pubba", "title": "Pubba", "value": 11 },
                { "label": "Utharapalguni", "title": "Utharapalguni", "value": 12 },
                { "label": "Hastham", "title": "Hastham", "value": 13 },
                { "label": "Chitta", "title": "Chitta", "value": 14 },
                { "label": "Swathi", "title": "Swathi", "value": 15 },
                { "label": "Vishaka", "title": "Vishaka", "value": 16 },
                { "label": "Anuradha", "title": "Anuradha", "value": 18 },
                { "label": "Jesta", "title": "Jesta", "value": 19 },
                { "label": "Moola", "title": "Moola", "value": 20 },
                { "label": "Poorvashada", "title": "Poorvashada", "value": 21 },
                { "label": "Utharashada", "title": "Utharashada", "value": 22 },
                { "label": "Sravanam", "title": "Sravanam", "value": 23 },
                { "label": "Dhanishta", "title": "Dhanishta", "value": 24 },
                { "label": "Sathabisham", "title": "Sathabisham", "value": 25 },
                { "label": "Poorvabadra", "title": "Poorvabadra", "value": 26 },
                { "label": "Uthirabadra", "title": "Uthirabadra", "value": 27 },
                { "label": "Revathi", "title": "Revathi", "value": 28 },
                { "label": "Anuradha", "title": "Anuradha", "value": 30 },
                { "label": "Arudra", "title": "Arudra", "value": 31 },
                { "label": "Ashwini", "title": "Ashwini", "value": 32 },
                { "label": "Aslesha", "title": "Aslesha", "value": 33 },
                { "label": "Chitra", "title": "Chitra", "value": 34 },
                { "label": "Dhanshita", "title": "Dhanshita", "value": 35 },
                { "label": "Hasta", "title": "Hasta", "value": 36 },
                { "label": "Jyehsta", "title": "Jyehsta", "value": 37 },
                { "label": "Kritika", "title": "Kritika", "value": 38 },
                { "label": "Magha", "title": "Magha", "value": 39 },
                { "label": "Moola", "title": "Moola", "value": 40 },
                { "label": "Mrigasira", "title": "Mrigasira", "value": 41 },
                { "label": "Poorvabhadra", "title": "Poorvabhadra", "value": 42 },
                { "label": "Poorvashadha", "title": "Poorvashadha", "value": 43 },
                { "label": "Punarvasu", "title": "Punarvasu", "value": 44 },
                { "label": "Poorvaphalguni", "title": "Poorvaphalguni", "value": 45 },
                { "label": "Pushya", "title": "Pushya", "value": 46 },
                { "label": "Satabisha", "title": "Satabisha", "value": 47 },
                { "label": "Sravana", "title": "Sravana", "value": 48 },
                { "label": "Swati", "title": "Swati", "value": 49 },
                { "label": "Uttarashadha", "title": "Uttarashadha", "value": 50 },
                { "label": "Uttarabhadrapada", "title": "Uttarabhadrapada", "value": 51 },
                { "label": "Uttaraphalguni", "title": "Uttaraphalguni", "value": 52 },
                { "label": "Visakha", "title": "Visakha", "value": 53 },
                { "label": "Uttara", "title": "Uttara", "value": 54 },
                { "label": "Uttarabhadra", "title": "Uttarabhadra", "value": 55 }
            ],
            'starLanguage': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Telugu", "title": "Telugu", "value": 1 },
                { "label": "Tamil", "title": "Tamil", "value": 2 },
                { "label": "Kannada", "title": "Kannada", "value": 3 },
            ],
            'region': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "AP", "title": "AP", "value": 408 },
                { "label": "TN", "title": "TN", "value": 409 },
                { "label": "KT", "title": "KT", "value": 410 }
            ],
            'bodyType': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Athletic", "title": "Athletic", "value": 21 },
                { "label": "Average", "title": "Average", "value": 22 },
                { "label": "Slim", "title": "Slim", "value": 23 },
                { "label": "Heavy", "title": "Heavy", "value": 24 },
                { "label": "Doesn't Matter", "title": "Doesn't Matter", "value": 37 }
            ],
            'bloodGroup': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "O+", "title": "O+", "value": 61 },
                { "label": "A+", "title": "A+", "value": 63 },
                { "label": "B+", "title": "B+", "value": 64 },
                { "label": "AB+", "title": "AB+", "value": 65 },
                { "label": "O-", "title": "O-", "value": 66 },
                { "label": "A-", "title": "A-", "value": 67 },
                { "label": "B-", "title": "B-", "value": 68 }
            ],
            'healthCondition': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "No Health Problems", "title": "No Health Problems", "value": 220 },
                { "label": "HIV", "title": "HIV", "value": 222 },
                { "label": "Diabetes", "title": "Diabetes", "value": 223 },
                { "label": "LowBP", "title": "LowBP", "value": 224 },
                { "label": "HighBP", "title": "HighBP", "value": 225 },
                { "label": "Heart Ailments", "title": "Heart Ailments", "value": 226 }
            ],
            'lagnam': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Dhansu", "title": "Dhansu", "value": 1 },
                { "label": "Kanya", "title": "Kanya", "value": 2 },
                { "label": "Karkatakam", "title": "Karkatakam", "value": 3 },
                { "label": "Khumbam", "title": "Khumbam", "value": 4 },
                { "label": "Makhram", "title": "Makhram", "value": 5 },
                { "label": "Meenam", "title": "Meenam", "value": 6 },
                { "label": "Mesham", "title": "Mesham", "value": 7 },
                { "label": "Midhunam", "title": "Midhunam", "value": 8 },
                { "label": "Simham", "title": "Simham", "value": 9 },
                { "label": "Thula", "title": "Thula", "value": 10 },
                { "label": "Vrichikam", "title": "Vrichikam", "value": 11 },
                { "label": "Vrushabam", "title": "Vrushabam", "value": 12 }
            ],
            'ZodaicSign': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "mesha", "title": "mesha", "value": 527 },
                { "label": "vrushaba", "title": "vrushaba", "value": 528 },
                { "label": "midhuna", "title": "midhuna", "value": 529 },
                { "label": "karkataka", "title": "karkataka", "value": 530 },
                { "label": "Simha", "title": "Simha", "value": 531 },
                { "label": "Kanya", "title": "Kanya", "value": 532 },
                { "label": "Thula", "title": "Thula", "value": 533 },
                { "label": "Vruchika", "title": "Vruchika", "value": 534 },
                { "label": "Dhanu", "title": "Dhanu", "value": 535 },
                { "label": "Makara", "title": "Makara", "value": 536 },
                { "label": "Kumbha", "title": "Kumbha", "value": 537 },
                { "label": "Meena", "title": "Meena", "value": 538 },
            ],
            'paadam': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "1", "title": "1", "value": 304 },
                { "label": "2", "title": "2", "value": 305 },
                { "label": "3", "title": "3", "value": 306 },
                { "label": "4", "title": "4", "value": 539 },
            ],
            'familyStatus': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Lower Middle Class", "title": "Lower Middle Class", "value": 290 },
                { "label": "Middle Class", "title": "Middle Class", "value": 291 },
                { "label": "Upper Middle Class", "title": "Upper Middle Class", "value": 292 },
                { "label": "Rich", "title": "Rich", "value": 293 },
                { "label": "Affluent", "title": "Affluent", "value": 294 },
                { "label": "Others", "title": "Others", "value": 516 },
                { "label": "High Class", "title": "High Class", "value": 517 }
            ],
            'RelationshipType': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Friend", "title": "Friend", "value": 318 },
                { "label": "Relative", "title": "Relative", "value": 319 },
                { "label": "Not Given", "title": "Not Given", "value": 549 },

            ],
            "childStayingWith": [
                { "label": "--select-- ", "title": "--select--", "value": 0 },
                { "label": "Father", "title": "Father", "value": 39 },
                { "label": "Mother", "title": "Mother", "value": 40 },
                { "label": "YoungerBrother", "title": "YoungerBrother", "value": 41 },
                { "label": "ElderBrother", "title": "ElderBrother", "value": 42 },
                { "label": "Self", "title": "Self", "value": 283 },
                { "label": "YoungerSister", "title": "YoungerSister", "value": 321 },
                { "label": "ElderSister", "title": "ElderSister", "value": 322 },
                { "label": "FatherYoungerBrother", "title": "FatherYoungerBrother", "value": 323 },
                { "label": "FatherElderBrother", "title": "FatherElderBrother", "value": 324 },
                { "label": "FatherYoungerSister", "title": "FatherYoungerSister", "value": 325 },
                { "label": "FatherElderSister", "title": "FatherElderSister", "value": 326 },
                { "label": "MotherYoungerBrother", "title": "MotherYoungerBrother", "value": 327 },
                { "label": "MotherElderBrother", "title": "MotherElderBrother", "value": 328 },
                { "label": "MotherYoungerSister", "title": "MotherYoungerSister", "value": 329 },
                { "label": "MotherElderSister", "title": "MotherElderSister", "value": 320 },
                { "label": "Spouse", "title": "Spouse", "value": 334 },
                { "label": "XRelation", "title": "XRelation", "value": 554 },
                { "label": "GrandFather", "title": "GrandFather", "value": 556 },
                { "label": "GrandMother", "title": "GrandMother", "value": 557 },
                { "label": "SisterHusband", "title": "SisterHusband", "value": 558 },
                { "label": "Friend", "title": "Friend", "value": 559 },
                { "label": "Relative", "title": "Relative", "value": 560 },
                { "label": "Uncle", "title": "Uncle", "value": 561 },
                { "label": "Aunt", "title": "Aunt", "value": 562 }

            ],
            'newProfessionCatgory': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "state govt job", "title": "state govt job", "value": 567 },
                { "label": "central govt job", "title": "central govt job", "value": 568 },
                { "label": "private job", "title": "private job", "value": 569 },
                { "label": "doctor", "title": "doctor", "value": 570 },
                { "label": "business", "title": "business", "value": 571 }
            ],
            'gradeSelection': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "A", "title": "A", "value": 216 },
                { "label": "B", "title": "B", "value": 217 },
                { "label": "C", "title": "C", "value": 218 },
                { "label": "D", "title": "D", "value": 219 }
            ],
            'Complexion': [
                { "label": "--select-- ", "title": "--select--", "value": "" },
                { "label": "Very Fair", "title": "Very Fair", "value": 17 },
                { "label": "Fair", "title": "Fair", "value": 18 },
                { "label": "Medium", "title": "Medium", "value": 19 },
                { "label": "Dark", "title": "Dark", "value": 20 },
                { "label": "Doesn't Matter", "title": "Doesn't Matter", "value": 38 }
            ],
            'PhysicalStatus': [
                { "label": "--select-- ", "title": "--select--", "value": "" },
                { "label": "Normal", "title": "Normal", "value": 25 },
                { "label": "Physically Challenged", "title": "Physically Challenged", "value": 26 }
            ],
            // added
            'boolType': [
                { "label": "Yes", "title": "Yes", "value": 1 },
                { "label": "No", "title": "No", "value": 0 }
            ],
            'gender': [
                { "label": "Male", "title": "Male", "value": 1 },
                { "label": "Female", "title": "Female", "value": 2 }
            ],
            'Domicile': [
                { "label": "India", "title": "India", "value": 0 },
                { "label": "Abroad", "title": "Abroad", "value": 1 },
                { "label": "Both", "title": "Both", "value": 2 }
            ],
            'Diet': [
                { "label": "Veg", "title": "Veg", "value": 27 },
                { "label": "Non Veg", "title": "Non Veg", "value": 28 },
                { "label": "Both", "title": "Both", "value": 29 }
            ],
            'Kujadosham': [
                { "label": "Yes", "title": "Yes", "value": 0 },
                { "label": "No", "title": "No", "value": 1 },
                { "label": "Does Not Matter", "title": "Does Not Matter", "value": 2 }
            ],
            'preferredStarlanguage': [
                { "label": "Telugu", "title": "Telugu", "value": 1 },
                { "label": "Tamil", "title": "Tamil", "value": 2 },
                { "label": "Kannada", "title": "Kannada", "value": 3 }
            ],
            'StarPreference': [
                { "label": "Preferredstars", "title": "Preferredstars", "value": 0 },
                { "label": "NonPreferredstars", "title": "NonPreferredstars", "value": 1 }
            ],
            'Drink': [
                { "label": "Yes", "title": "Yes", "value": 30 },
                { "label": "No", "title": "No", "value": 31 },
                { "label": "Occasional", "title": "Occasional", "value": 32 }
            ]
        });

}());

// (function(){
//     'use strict';

//     angular
//         .module('module')
//         .constant('constant', constant);

// }());
(function(angular) {
    'use strict';
    /** @ngInject */
    function ControllerCtrl(scope, authSvc, $uibModal, $state) {
        var vm = this;
        var modalpopupopen;
        vm.lock = false;
        vm.CurrentDate = new Date();
        vm.logincounts = [];
        vm.initheader = function() {
            var empname = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            // authSvc.getmacaddress();
            // authSvc.getClientIp();
            vm.name = authSvc.LoginEmpName();
            vm.empphoto = authSvc.empphoto();

        };
        vm.initheader();

        vm.logout = function() {
            vm.name = "";
            $state.go("login", {});
            authSvc.logout();
        };
        vm.lockscreen = function() {
            vm.lock = true;
            vm.passwordemployee = "";
        };
    }
    angular
        .module('Kaakateeya')
        .controller('headerctrl', ['$scope', 'authSvc', '$uibModal', '$state',
            ControllerCtrl
        ]);

}(angular));
(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .factory('commonFactory', factory)

    factory.$inject = ['SelectBindService', '$filter'];

    function factory(SelectBindService, filter) {
        var modalpopupopen;

        return {
            open: function(url, scope, uibModal, size) {
                modalpopupopen = uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: url,
                    scope: scope,
                    size: size,
                    backdrop: 'static',
                    keyboard: false

                });
            },
            closepopup: function() {
                modalpopupopen.close();
            },
            listSelectedVal: function(val) {

                var str = null;
                if (val !== undefined && val !== null && val !== '') {
                    if (angular.isString(val)) {
                        str = val === '' ? null : val;
                    } else if (angular.isNumber(val)) {
                        str = val === '' ? null : val;
                    } else if (angular.isArray(val)) {
                        str = val.join(',');
                    } else {
                        str = val;
                    }
                }
                return str;
            },
            StateBind: function(parentval) {
                var stateArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    stateArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    SelectBindService.stateSelect(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            stateArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return stateArr;
            },
            districtBind: function(parentval) {
                var disttrictArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    disttrictArr.push({ "label": "--select--", "title": "--select--", "value": "" });

                    SelectBindService.districtSelect(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            disttrictArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return disttrictArr;
            },
            cityBind: function(parentval) {
                var cityeArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    cityeArr.push({ "label": "--select--", "title": "--select--", "value": "" });

                    SelectBindService.citySelect(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            cityeArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return cityeArr;
            },

            professionBind: function(parentval) {
                var professionArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    professionArr.push({ "label": "--select--", "title": "--select--", "value": "" });

                    SelectBindService.ProfessionSpecialisation(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            professionArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return professionArr;
            },
            educationGroupBind: function(parentval) {

                var educationGroupArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    if (parentval !== undefined && parentval !== null && parentval !== '') {
                        educationGroupArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                        SelectBindService.EducationGroup(parentval).then(function(response) {
                            _.each(response.data, function(item) {
                                educationGroupArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            });
                        });
                    }
                }
                return educationGroupArr;
            },
            educationSpeciakisationBind: function(parentval) {
                var educationSpecialArr = [];

                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    educationSpecialArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    SelectBindService.EducationSpecialisation(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            educationSpecialArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return educationSpecialArr;
            },

            numbersBind: function(str, from, to) {
                var numArr = [];

                numArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                for (var i = from; i <= to; i++) {
                    numArr.push({ "label": i + " " + str, "title": i + " " + str, "value": i });
                }
                return numArr;
            },
            numberBindWithZeros: function(str, from, to) {
                var numArr = [];
                var y;
                numArr.push({ "label": str, "title": str, "value": "" });
                for (var x = from; x <= to; x++) {
                    if (x < 10)
                        y = ("0" + x);
                    else
                        y = x;
                    numArr.push({ "label": y, "title": y, "value": parseInt(y) });
                }
                return numArr;
            },
            starBind: function(parentval) {
                var starArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    starArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    SelectBindService.stars(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            starArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return starArr;
            },
            casteDepedency: function(parentval1, parentval2) {
                var casteArr = [];
                parentval1 = parentval1 === null || parentval1 === undefined ? '' : parentval1;
                parentval2 = parentval2 === null || parentval2 === undefined ? '' : parentval2;
                casteArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                SelectBindService.castedependency(parentval1, parentval2).then(function(response) {
                    _.each(response.data, function(item) {
                        casteArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    });
                });
                return casteArr;
            },
            subCaste: function(parentval1) {
                var subcasteArr = [];
                if (parentval1 !== undefined && parentval1 !== null && parentval1 !== '') {
                    subcasteArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    SelectBindService.subCasteBind(parentval1).then(function(response) {
                        _.each(response.data, function(item) {
                            subcasteArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return subcasteArr;
            },
            branch: function(parentval1) {
                var branchArr = [];
                if (parentval1 !== undefined && parentval1 !== null && parentval1 !== '') {
                    branchArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    SelectBindService.branch(parentval1).then(function(response) {
                        _.each(response.data, function(item) {
                            branchArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return branchArr;
            },
            showConfirm: function(ev, mdDialog, header, okTxt, cancelTxt) {

                var status = false;
                var confirm = mdDialog.confirm()
                    .title(header)
                    //.textContent('All of the banks have agreed to forgive you your debts.')
                    .ariaLabel('Lucky day')
                    //.targetEvent(ev)
                    .cancel(cancelTxt)
                    .ok(okTxt);

                return confirm;

            },
            checkvals: function(val) {
                return (val !== undefined && val !== null && val !== '') ? true : false;
            },
            convertDateFormat: function(val, format) {

                format = format || 'DD-MM-YYYY';
                if (val !== undefined && val !== null && val !== '') {
                    return moment(val).format(format);
                } else {
                    return '';
                }
            },

            AstroCity: function(countryName, stateName) {
                var AstrocityArr = [];
                AstrocityArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                SelectBindService.AstroCities(countryName, stateName).then(function(response) {
                    _.each(response.data, function(item) {
                        AstrocityArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    });
                });
                return AstrocityArr;
            }
        };

    }
})();
(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .directive('contactDirective', directive);

    directive.$inject = ['SelectBindService', 'commonFactory', '$mdDialog'];

    function directive(SelectBindService, commonFactory, mdDialog) {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                dmobile: '=',
                strmobile: '=',
                dalternative: '=',
                stralternative: '=',
                dland: '=',
                strareacode: '=',
                strland: '=',
                strmail: '=',
                emailhide: '='
            },
            templateUrl: 'common/templates/contacttemplate.html'
        };
        return directive;

        function link(scope, element, attrs) {
            debugger;
            scope.amob = (scope.stralternative !== null && scope.stralternative !== '' && scope.stralternative !== undefined) ? true : false;
            scope.land = (scope.strareacode !== null && scope.strareacode !== '' && scope.strareacode !== undefined) ? true : false;
            scope.mail = (scope.strmail !== null && scope.strmail !== '' && scope.strmail !== undefined && scope.emailhide === true) ? true : false;
            scope.pmob = (scope.strmobile !== null && scope.strmobile !== '' && scope.strmobile !== undefined) ? true : false;

            scope.showhidemob = function(ev, type) {

                scope.confirm = null;
                switch (type) {
                    case 'mob':
                        if (scope.pmob === false) {
                            scope.pmob = true;
                        } else {
                            var lNaumber = scope.strland;
                            scope.checkMobile(ev, lNaumber, 'land', 'landline');
                        }
                        break;

                    case 'land':

                        var lNaumber1 = scope.stralternative;
                        scope.checkMobile(ev, lNaumber1, 'mob', 'alternative');
                        break;

                    case 'mail':
                        scope.mail = true;
                        break;
                }

            };

            scope.checkMobile = function(ev, strval, type, strdisplay) {
                if (strval !== "" && strval !== undefined && strval !== null) {
                    scope.confirm = commonFactory.showConfirm(ev, mdDialog, 'Are You Sure To Delete ' + strdisplay + ' Number', 'delete', 'cancel');
                    scope.test(type);

                } else {
                    scope.clear(type);
                }
            };
            scope.clear = function(type) {

                if (type === 'mob') {
                    scope.amob = false;
                    scope.land = true;
                    scope.dalternative = "";
                    scope.stralternative = "";
                } else {
                    scope.amob = true;
                    scope.land = false;
                    scope.dland = "";
                    scope.strareacode = "";
                    scope.strland = "";

                }
            };

            scope.test = function(type) {

                mdDialog.show(scope.confirm).then(function() {

                    scope.clear(type);

                }, function() {

                });
            };
        }
    }

})();
(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .directive('countryDirective', directive);

    directive.$inject = ['SelectBindService', 'commonFactory'];

    function directive(SelectBindService, commonFactory) {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                countryshow: '=',
                cityshow: '=',
                dcountry: '=',
                dstate: '=',
                ddistrict: '=',
                dcity: '=',
                othercity: '=',
                strothercity: '=',
                require: '='
            },
            templateUrl: 'common/templates/countryTemplate.html'
        };
        return directive;

        function link(scope, element, attrs) {

            if (scope.countryshow === true) {
                if (scope.dcountry !== undefined) {
                    scope.stateArr = commonFactory.StateBind(scope.dcountry);
                }
            } else {
                scope.dcountry = '1';
                SelectBindService.stateSelect('1').then(function(response) {
                    scope.stateArr = [];
                    scope.stateArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    _.each(response.data, function(item) {
                        scope.stateArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    });
                });
            }
            if ((scope.dcountry === '1' || scope.dcountry === 1) && scope.dstate !== undefined) {
                scope.districtArr = commonFactory.districtBind(scope.dstate);
            } else {
                if (scope.dstate !== undefined) {
                    scope.cityeArr = commonFactory.districtBind(scope.dstate);
                }
            }

            if (scope.cityshow === true && scope.cityeArr === undefined) {
                if (scope.ddistrict !== undefined) {
                    scope.cityeArr = commonFactory.cityBind(scope.ddistrict);
                }
            }

            scope.changeBind = function(type, parentval, countryVal) {

                switch (type) {
                    case 'Country':
                        scope.stateArr = commonFactory.StateBind(parentval);
                        break;

                    case 'State':
                        if (countryVal === '1' || countryVal === 1) {
                            scope.districtArr = commonFactory.districtBind(parentval);
                        } else {
                            scope.districtArr = [];
                            scope.cityeArr = commonFactory.districtBind(parentval);
                        }
                        break;

                    case 'District':
                        if (scope.cityshow === true) {
                            scope.cityeArr = commonFactory.cityBind(parentval);
                        }
                        break;
                }

            };
            scope.ShowCity = function() {
                scope.cityinput = true;
                scope.dcity = '';
            };



        }
    }

})();
(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .factory('alert', factory)

    factory.$inject = ['$mdDialog', '$uibModal', '$timeout'];

    function factory($mdDialog, uibModal, timeout) {
        var modalinstance, forgetpassword;

        return {
            open: function(msg, classname) {
                classname = classname || "success";
                toastr.options = {
                    "closeButton": true,
                    "debug": true,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": app.global.alertType,
                    "preventDuplicates": false,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": 3000,
                    "extendedTimeOut": 2000,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut",
                    "onclick": null
                };
                switch (classname) {
                    case 'success':
                        toastr.success(msg, "done");
                        break;
                    case 'error':
                        toastr.error(msg, 'Oops');
                        break;
                    case 'warning':
                        toastr.warning(msg, 'Alert');
                        break;
                    case 'info':
                        toastr.info(msg, 'Info');
                        break;
                    default:
                        toastr.success(msg, 'Done');
                        break;
                }
            },
            dynamicpopup: function(url, $scope, uibModal, size) {
                modalinstance = uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: url,
                    scope: $scope,
                    size: size || 'lg',
                    backdrop: 'static',
                    keyboard: false
                });
            },
            dynamicpopupclose: function() {
                modalinstance.close();
            },

            mddiologcancel: function() {
                $mdDialog.hide();
            },
            timeoutoldalerts: function($scope, cls, msg, time) {
                // $scope.typecls = '';
                // $scope.typecls = cls;
                // $scope.msgs = msg;
                modalinstance = uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: '<div class=' + cls + '><div class="modal-header"><a href="javascript:void(0);" ng-click="close();"><ng-md-icon icon="close" style="fill:#c73e5f" class="pull-right" size="20"></ng-md-icon></a><h4 class="modal-title"><center>Alert</center></h4></div></div><div class="modal-body" id="modalbodyID"><p class="text-center" style="color:black;">' + msg + '</p></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="close();">Close</button></div>',
                    $scope: $scope
                });

                timeout(function() {
                    modalinstance.close();
                }, time || 9500);

                $scope.close = function() {
                    modalinstance.close();
                };
            }


        };
    }
})();
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
            template: '<input id="{{id}}" style="width:96%;" ng-class="ngClass"  placeholder="{{placeholder}}" type="text"  class="datepicker3 form-control" ng-model="ngModel" ui-date="dateOptions"/>'
        };
        return directive;

        function link(scope, element, attrs) {

            //  if (scope.strdate !== '' && scope.strdate !== undefined && scope.strdate !== null)
            // scope.strdate = new Date(scope.strdate);
        }
    }

})();
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
                if (booltype === true) {
                    scope.reviewdisplay = scope.dispalyName;
                    commonFactory.open('common/templates/reviewConfirmationPopup.html', scope, uibModal, 'sm');

                }
            };

            scope.reviewSubmit = function() {
                baseService.menuReviewstatus(scope.custid, '1', scope.sectionid).then(function(response) {

                    if (response.data !== undefined && response.data.length > 0) {
                        if (JSON.parse(response.data[0])[0].STATUS === 1) {
                            commonFactory.closepopup();
                            scope.showChk = false;
                            baseService.menuReviewstatus(scope.custid, '0', '').then(function(response) {
                                model.lnkparentsReview = model.lnksiblingsReview = model.lnkrelativesReview = model.lnkeducationandprofReview = model.lnkpartnerReview = model.lnkastroReview = model.lnkreferenceReview = model.lnkpropertyReview = '';
                                model.menuReviewdata = JSON.parse(response.data);
                                _.each(model.menuReviewdata, function(item) {
                                    var SectionID = item.SectionID;
                                    switch (SectionID) {
                                        case 11:
                                        case 12:
                                        case 13:
                                        case 15:
                                            model.lnkparentsReview = 'red';
                                            break;
                                        case 14:
                                        case 25:
                                        case 26:
                                            model.lnksiblingsReview = 'red';
                                            break;
                                        case 27:
                                        case 28:
                                        case 32:
                                        case 33:
                                            model.lnkrelativesReview = 'red';
                                            break;
                                        case 6:
                                        case 7:
                                        case 8:
                                            model.lnkeducationandprofReview = 'red';
                                            break;
                                        case 16:
                                        case 22:
                                            model.lnkpartnerReview = 'red';
                                            break;
                                        case 23:
                                            model.lnkastroReview = 'red';
                                            break;
                                        case 29:
                                            model.lnkreferenceReview = 'red';
                                            break;
                                        case 34:
                                            model.lnkpropertyReview = 'red';
                                            break;
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

(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .directive('slidePopup', directive);

    directive.$inject = ['commonFactory', '$uibModal', 'arrayConstantsEdit', 'SelectBindService', 'popupSvc', 'authSvc', '$stateParams', '$filter'];

    function directive(commonFactory, uibModal, cons, SelectBindService, popupSvc, authSvc, stateParams, filter) {

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

            var CustID = stateParams.CustID;
            var loginEmpid = authSvc.LoginEmpid();
            var AdminID = authSvc.isAdmin();
            scope.getExpression = function(val) {
                console.log(val);
                return val;
            }
            scope.ddlChange = function(value, value2, text, apiPath) {
                if (apiPath) {

                    if (value2) {

                        SelectBindService[apiPath](commonFactory.listSelectedVal(value), commonFactory.listSelectedVal(value2)).then(function(res) {
                            _.map(_.where(scope.model.popupdata, { parentName: text }), function(item) {
                                var depData = [];
                                _.each(res.data, function(item) {
                                    depData.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                });
                                item.dataSource = [];
                                item.dataSource = depData;
                            });
                        });
                    } else {
                        SelectBindService[apiPath](commonFactory.listSelectedVal(value)).then(function(res) {
                            _.map(_.where(scope.model.popupdata, { parentName: text }), function(item) {
                                var depData = [];
                                _.each(res.data, function(item) {
                                    depData.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                });
                                item.dataSource = [];
                                item.dataSource = depData;
                            });
                        });
                    }
                }
            };

            _.each(scope.model.popupdata, function(item) {
                if (item.arrbind) {
                    var Arr = cons[item.arrbind];
                    if (Arr !== undefined && Arr.length > 0 && angular.lowercase(Arr[0].title) === '--select--') {
                        Arr.splice(0, 1);
                    }
                    item.dataSource = [];
                    item.dataSource = Arr;
                }
                if (item.ownArray) {
                    var Array = scope.model[item.ownArray];
                    if (Array !== undefined && Array.length > 0 && angular.lowercase(Array[0].title) === '--select--') {
                        Array.splice(0, 1);
                    }
                    item.dataSource = [];
                    item.dataSource = Array;
                }
                if (scope.eventtype === 'add') {
                    if (item.ngmodel)
                        scope.model[item.ngmodel] = undefined;
                    else if (item.controlType === 'country') {
                        scope.model[item.dcountry] = undefined;
                        scope.model[item.dstate] = undefined;
                        scope.model[item.ddistrict] = undefined;
                        scope.model[item.dcity] = undefined;
                        scope.model[item.strothercity] = undefined;
                    } else if (item.controlType === 'textboxSelect') {
                        scope.model[item.ngmodelSelect] = undefined;
                        scope.model[item.ngmodelText] = undefined;
                    } else if (item.controlType === 'contact') {
                        scope.model[item.dmobile] = undefined;
                        scope.model[item.strmobile] = undefined;
                        scope.model[item.dalternative] = undefined;
                        scope.model[item.stralternative] = undefined;
                        scope.model[item.dland] = undefined;
                        scope.model[item.strareacode] = undefined;
                        scope.model[item.strland] = undefined;
                        scope.model[item.strmail] = undefined;
                    }

                }

                if (scope.model[item.ngmodel] && item.childName) {
                    scope.ddlChange(scope.model[item.ngmodel], scope.model[item.secondParent], item.childName, item.changeApi);
                }
            });

            scope.model.returnString = function(str) {
                return 'dynamicForm.' + str + '.$invalid';
            };
            scope.submit = function() {

                var parameters = {};
                _.each(scope.model.popupdata, function(item) {
                    if (item.parameterValue) {
                        parameters[item.parameterValue] = commonFactory.listSelectedVal(scope.model[item.ngmodel]);
                    } else if (item.controlType === 'country') {
                        parameters[item.countryParameterValue] = item.countryshow === false ? 1 : scope.model[item.dcountry];
                        parameters[item.stateParameterValue] = scope.model[item.dstate];
                        parameters[item.districtParameterValue] = scope.model[item.ddistrict];
                        parameters[item.cityParameterValue] = scope.model[item.dcity];
                        parameters[item.cityotherParameterValue] = scope.model[item.strothercity];
                    } else if (item.controlType === 'textboxSelect') {
                        parameters[item.parameterValueSelect] = scope.model[item.ngmodelSelect];
                        parameters[item.parameterValueText] = scope.model[item.ngmodelText];
                    } else if (item.controlType === 'contact') {
                        parameters[item.mobileCodeIdParameterValue] = scope.model[item.dmobile];
                        parameters[item.mobileNumberParameterValue] = scope.model[item.strmobile];
                        parameters[item.landCountryCodeIdParameterValue] = commonFactory.checkvals(scope.model[item.dalternative]) ? scope.model[item.dalternative] : (commonFactory.checkvals(scope.model[item.dland]) ? scope.model[item.dland] : null);
                        parameters[item.landAreaCodeIdParameterValue] = commonFactory.checkvals(scope.model[item.stralternative]) ? null : (commonFactory.checkvals(scope.model[item.strareacode]) ? scope.model[item.strareacode] : null);
                        parameters[item.landNumberParameterValue] = commonFactory.checkvals(scope.model[item.stralternative]) ? scope.model[item.stralternative] : (commonFactory.checkvals(scope.model[item.strland]) ? scope.model[item.strland] : null);
                        parameters[item.emailParameterValue] = scope.model[item.strmail];
                    } else if (item.controlType === 'doublemultiselect') {
                        parameters[item.parameterValue1] = commonFactory.listSelectedVal(scope.model[item.ngmodelSelect1]);
                        parameters[item.parameterValue2] = commonFactory.listSelectedVal(scope.model[item.ngmodelSelect2]);
                    } else if (item.controlType === 'housewife') {
                        parameters[item.parameterValueText] = commonFactory.listSelectedVal(scope.model[item.ngmodelText]);
                        parameters[item.parameterValueChk] = commonFactory.listSelectedVal(scope.model[item.ngmodelChk]);
                    } else if (item.controlType === 'astroTimeOfBirth') {
                        parameters.TimeofBirth = scope.model.ddlFromHours + ":" + scope.model.ddlFromMinutes + ":" + scope.model.ddlFromSeconds;
                    } else if (item.controlType === 'date') {
                        debugger;
                        //parameters[item.parameterValueDate] = scope.model[item.ngmodel];
                        parameters[item.parameterValueDate] = scope.model[item.ngmodel] !== '' && scope.model[item.ngmodel] !== 'Invalid date' ? filter('date')(scope.model[item.ngmodel], 'yyyy-MM-dd') : '';
                    }
                });

                var inputDataObj = {
                    GetDetails: parameters,
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

            scope.chkChange = function(chk) {
                return chk === true ? 'HouseWife' : '';
            };
            scope.dateOptions = {
                changeMonth: true,
                changeYear: true,
                yearRange: "-40:+5",
                dateFormat: 'dd-mm-yy'
            };
        }
    }

})();
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
angular.module('ui.date', [])

.constant('uiDateConfig', {})

.directive('uiDate', ['uiDateConfig', '$timeout', function(uiDateConfig, $timeout) {
    'use strict';
    var options;
    options = {};
    angular.extend(options, uiDateConfig);
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, controller) {
            var getOptions = function() {
                return angular.extend({}, uiDateConfig, scope.$eval(attrs.uiDate));
            };
            var initDateWidget = function() {
                var showing = false;
                var opts = getOptions();

                // If we have a controller (i.e. ngModelController) then wire it up
                if (controller) {

                    // Set the view value in a $apply block when users selects
                    // (calling directive user's function too if provided)
                    var _onSelect = opts.onSelect || angular.noop;
                    opts.onSelect = function(value, picker) {
                        scope.$apply(function() {
                            showing = true;
                            controller.$setViewValue(element.datepicker("getDate"));
                            _onSelect(value, picker);
                            element.blur();
                        });
                    };
                    opts.beforeShow = function() {
                        showing = true;
                    };
                    opts.onClose = function(value, picker) {
                        showing = false;
                    };
                    element.on('blur', function() {
                        if (!showing) {
                            scope.$apply(function() {
                                element.datepicker("setDate", element.datepicker("getDate"));
                                controller.$setViewValue(element.datepicker("getDate"));
                            });
                        }
                    });

                    // Update the date picker when the model changes
                    controller.$render = function() {
                        debugger;
                        var date = controller.$viewValue;
                        if (date) {
                            var dateFormat = moment(date).format("DD-MM-YYYY");
                            // if (angular.isDefined(date) && date !== null && !angular.isDate(date) && date !== "") {
                            //    throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
                            // }
                            element.datepicker("setDate", dateFormat);
                        }
                    };
                }
                // If we don't destroy the old one it doesn't update properly when the config changes
                element.datepicker('destroy');
                // Create the new datepicker widget
                element.datepicker(opts);
                if (controller) {
                    // Force a render to override whatever is in the input text box
                    controller.$render();
                }
            };
            // Watch for changes to the directives options
            scope.$watch(getOptions, initDateWidget, true);
        }
    };
}]);
(function(angular) {
    'use strict';


    function factory($http, service) {
        var model = {};

        model.init = function() {
            model.Countryf();
            model.stateSelectf();
            model.countryCodeselectf();
            model.currencyf();
            return model;
        };

        model.Countryf = function() {
            service.countrySelect().then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.Country = option;
            });
        };

        model.stateSelectf = function() {
            service.stateSelect('1').then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.IndiaStates = option;
            });
        };

        model.countryCodeselectf = function() {
            service.countryCodeselect().then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.countryCode = option;
            });
        };

        model.currencyf = function() {
            service.currency().then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.currency = option;
            });
        };


        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('countryArrayModel', factory);

    factory.$inject = ['$http', 'SelectBindService'];

})(angular);
(function(angular) {
    'use strict';


    function factory($http, service) {
        var model = {};

        model.init = function() {
            model.ProfCatgoryf();
            model.ProfessionGroupf();
            return model;
        };

        model.ProfCatgoryf = function() {
            service.ProfessionCatgory().then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.ProfCatgory = option;
            });
        };

        model.ProfessionGroupf = function() {
            service.ProfessionGroup().then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.ProfGroup = option;
            });
        };

        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('eduprofArrayModel', factory);

    factory.$inject = ['$http', 'SelectBindService'];

})(angular);
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
        .factory('otherArrayModel', factory);

    factory.$inject = ['$http', 'SelectBindService'];

})(angular);
(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .factory('authSvc', factory)

    factory.$inject = ['$injector'];

    function factory($injector) {
        function setUser(value) {

            setSession("LoginEmpid", value.EmpID);
            setSession("LoginEmpName", value.FirstName + " " + value.LastName);
            setSession("empBranchID", value.BranchID);
            setSession("isAdmin", value.isAdmin);
            setSession("isManagement", value.isManagement);
            setSession("empRegionID", value.RegionID);
            setSession("empphoto", value.EmpPhotoPath);
        }

        function getSession(key) {
            return sessionStorage.getItem(key);
        }

        function setSession(key, value) {
            if (value === undefined || value === null) {
                clearSession(key);
            } else {
                sessionStorage.setItem(key, value);
            }
        }

        function clearSession(key) {
            sessionStorage.removeItem(key);
        }

        function clearUserSession() {
            clearSession('LoginEmpid');
            clearSession('LoginEmpName');
            clearSession('empBranchID');
            clearSession('isAdmin');
            clearSession('isManagement');
            clearSession('empRegionID');
            clearSession('macAddress');
            clearSession('empphoto');
        }

        function getUser() {
            return {
                LoginEmpid: getSession('LoginEmpid'),
                LoginEmpName: getSession('LoginEmpName'),
                empBranchID: getSession('empBranchID'),
                isAdmin: getSession('isAdmin'),
                isManagement: getSession('isManagement'),
                empRegionID: getSession('empRegionID')

            };
        }

        return {
            user: function(value) {
                if (value) {
                    setUser(value);
                }
                return getUser();
            },
            isAuthenticated: function() {
                return !!getSession('cust.id');
            },
            clearUserSessionDetails: function() {
                return clearUserSession();
            },
            logout: function() {
                clearUserSession();
                //route.go('home', {});
            },
            LoginEmpid: function() {
                return getSession('LoginEmpid');
            },
            LoginEmpName: function() {
                return getSession('LoginEmpName');
            },
            empBranchID: function() {
                return getSession('empBranchID');
            },
            isAdmin: function() {
                return '1';
            },
            isManagement: function() {
                return getSession('isManagement');
            },
            empRegionID: function() {
                return getSession('empRegionID');
            },
            empphoto: function() {
                return getSession('empphoto');
            },
            macAddress: function() {
                return getSession('macAddress');
            },
            clientIp: function() {
                return getSession('getClientIp');
            },
            getmacaddress: function() {
                return $http.get('/getmac').then(function(res) {
                    console.log(res);
                    setSession("macAddress", res.data);
                    return res.data;
                });
            },
            getClientIp: function() {
                return $http.get('/getClientIp').then(function(res) {
                    console.log(res);
                    console.log(((res.data).indexOf("::1") !== -1));
                    console.log(((res.data).indexOf("127.0.0.1") !== -1));
                    var response;
                    if ((res.data).indexOf("::1") !== -1 || (res.data).indexOf("127.0.0.1") !== -1) {
                        response = "183.82.98.109";
                        setSession("getClientIp", response);
                    } else {
                        response = res.data;
                        setSession("getClientIp", response);
                    }
                    return response;
                    //(((res.data).indexOf("::1") !== -1) ? "183.82.98.109" : res.data);
                });
            },
            getpaidstatus: function() {
                return getSession('cust.paidstatus');
            }
        };
    }
})();
// (function(editviewapp) {
//     'use strict';
//     editviewapp.factory('errorInterceptor', ['$rootScope', '$q', function($rootScope, $q) {
//         return {
//             request: function(config) {
//                 $rootScope.$broadcast('request-start');
//                 config.headers = config.headers || {};
//                 return config;
//             },
//             responseError: function(rejection) {
//                 $rootScope.$broadcast('request-fail');
//                 $rootScope.$broadcast('notify-error', rejection);
//                 return $q.reject(rejection);
//             },
//             response: function(config) {
//                 $rootScope.$broadcast('request-end');
//                 var deferred = $q.defer();
//                 deferred.resolve(config);
//                 return deferred.promise;
//             }
//         };
//     }]);
//     angular.module('KaakateeyaEmpEdit').config(['$httpProvider', function($httpProvider) {
//         $httpProvider.interceptors.push('errorInterceptor');
//     }]);
// }(window.editviewapp));
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
(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .factory('SelectBindService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            countrySelect: function() {
                return http.get(editviewapp.apipath + 'Dependency/getCountryDependency', { params: { dependencyName: "", dependencyValue: "" } });
            },
            stateSelect: function(dependencyVal) {

                return http.get(editviewapp.apipath + 'Dependency/getCountryDependency', { params: { dependencyName: "state", dependencyValue: dependencyVal } });
            },
            districtSelect: function(dependencyVal1) {
                return http.get(editviewapp.apipath + 'Dependency/getCountryDependency', { params: { dependencyName: "distric", dependencyValue: dependencyVal1 } });
            },
            citySelect: function(dependencyVal2) {

                return http.get(editviewapp.apipath + 'Dependency/getCountryDependency', { params: { dependencyName: "city", dependencyValue: dependencyVal2 } });
            },
            EducationCatgory: function() {
                return http.get(editviewapp.apipath + 'Dependency/getEducationDependency', { params: { dependencyName: "", dependencyValue: "" } });
            },
            EducationGroup: function(dependencyVal2) {

                return http.get(editviewapp.apipath + 'Dependency/getEducationDependency', { params: { dependencyName: "educationGroup", dependencyValue: dependencyVal2 } });
            },
            EducationSpecialisation: function(dependencyVal2) {

                return http.get(editviewapp.apipath + 'Dependency/getEducationDependency', { params: { dependencyName: "educationSpeacialisation", dependencyValue: dependencyVal2 } });
            },
            ProfessionCatgory: function() {
                return http.get(editviewapp.apipath + 'Dependency/getProfessionDependency', { params: { dependencyName: "ProfessionCategory", dependencyValue: "" } });
            },
            ProfessionGroup: function() {
                return http.get(editviewapp.apipath + 'Dependency/getProfessionDependency', { params: { dependencyName: "", dependencyValue: "" } });
            },
            ProfessionSpecialisation: function(dependencyVal2) {

                return http.get(editviewapp.apipath + 'Dependency/getProfessionDependency', { params: { dependencyName: "ProfessionSpecialisation", dependencyValue: dependencyVal2 } });
            },
            casteselect: function() {

                return http.get(editviewapp.apipath + 'Dependency/getDropdown_filling_values', { params: { strDropdownname: "CasteName" } });
            },
            countryCodeselect: function() {

                return http.get(editviewapp.apipath + 'Dependency/getDropdown_filling_values', { params: { strDropdownname: "CountryCode" } });
            },
            currency: function() {

                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Currency', dependencyValue: '', dependencyflagID: '' } });
            },
            stars: function(obj) {
                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'StarType', dependencyValue: obj, dependencyflagID: '' } });
            },
            castedependency: function(obj1, obj2) {
                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Caste', dependencyValue: obj1, dependencyflagID: obj2 } });
            },
            subCasteBind: function(obj1) {

                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'SubCaste', dependencyValue: obj1, dependencyflagID: '' } });
            },
            branch: function(obj1) {

                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Region', dependencyValue: obj1, dependencyflagID: '' } });
            },
            AstroCities: function(countryName, statename) {
                return http.get(editviewapp.apipath + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Horo', dependencyValue: countryName, dependencyflagID: statename } });
            },
            DeleteSection: function(obj) {
                console.log(JSON.stringify(obj));
                return http.get(editviewapp.apipath + 'CustomerPersonalUpdate/getCustomerSectionsDeletions', { params: { sectioname: obj.sectioname, CustID: obj.CustID, identityid: obj.identityid } });
            }

        };
    }
})();
 (function(angular) {
     'use strict';

     function controller(baseModel, scope, $state, stateParams) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             scope.model = model = baseModel;
             model.scope = scope;
             scope.model.init();
         };

         scope.redirect = function(type) {

             $state.go('editview.' + type, { CustID: stateParams.CustID });

         };
         scope.backgroundcolor = function(status) {
             console.log(status);
             var color = '#EFEFEF';
             switch (status) {
                 case 54:
                     color = '#EFEFEF';
                     break;
                 case 55:
                     color = '#185615';
                     break;
                 case 56:
                 case 394:
                     color = '#BCC3BE';
                     break;
                 case 57:
                 case 393:
                     color = '#17F067';
                     break;
             }
             return color;
         };
         vm.init();
     }
     angular
         .module('KaakateeyaEmpEdit')
         .controller('baseCtrl', controller);

     controller.$inject = ['baseModel', '$scope', '$state', '$stateParams'];
 })(angular);
(function(angular) {
    'use strict';


    function factory(baseService, authSvc, uibModal, commonFactory, stateParams, filter) {
        var model = {};
        // var logincustid = authSvc.getCustId();
        var CustID = stateParams.CustID;
        model.lnkeducationandprofReview = false;
        model.scope = {};
        model.init = function() {
            CustID = stateParams.CustID;
            model.menuItem();
            baseService.personalDetails(CustID).then(function(response) {
                model.PersonalObj = response.data;
                // model.imgsrc = authSvc.getprofilepic();
                if (model.PersonalObj !== null && model.PersonalObj !== undefined) {
                    baseService.nodatastatus(model.PersonalObj.ProfileID).then(function(res) {
                        model.rev = res.data;
                    });
                }
                model.unreviewedLinks();
            });
            return model;
        };

        model.unreviewedLinks = function() {
            switch (model.PersonalObj.ProfileStatusID) {
                case 54:
                    model.mymenucolor = '#EFEFEF';
                    break;
                case 55:
                    model.mymenucolor = '#185615';
                    break;
                case 56:
                case 394:
                    model.mymenucolor = '#BCC3BE';
                    break;
                case 57:
                case 393:
                    model.mymenucolor = '#17F067';
                    break;
                default:
                    model.mymenucolor = '#EFEFEF';
                    break;
            }
            baseService.menuReviewstatus(CustID, '0', '').then(function(response) {
                model.lnkparentsReview = model.lnksiblingsReview = model.lnkrelativesReview = model.lnkeducationandprofReview = model.lnkpartnerReview = model.lnkastroReview = model.lnkreferenceReview = model.lnkpropertyReview = '';
                model.menuReviewdata = JSON.parse(response.data);
                _.each(model.menuReviewdata, function(item) {
                    var SectionID = item.SectionID;
                    switch (SectionID) {
                        case 11:
                        case 12:
                        case 13:
                        case 15:
                            model.lnkparentsReview = 'red';
                            break;
                        case 14:
                        case 25:
                        case 26:
                            model.lnksiblingsReview = 'red';
                            break;
                        case 27:
                        case 28:
                        case 32:
                        case 33:
                            model.lnkrelativesReview = 'red';
                            break;
                        case 6:
                        case 7:
                        case 8:
                            model.lnkeducationandprofReview = 'red';
                            break;
                        case 16:
                        case 22:
                            model.lnkpartnerReview = 'red';
                            break;
                        case 23:
                            model.lnkastroReview = 'red';
                            break;
                        case 29:
                            model.lnkreferenceReview = 'red';
                            break;
                        case 34:
                            model.lnkpropertyReview = 'red';
                            break;
                    }

                });
            });

        };

        model.menuItem = function() {
            baseService.menudata(CustID).then(function(response) {

                model.branchdata = JSON.parse(response.data)[0];
                model.registrationdate = filter('date')(model.branchdata.RegistrationDate, 'dd-MM-yyyy hh:mm:ss');

                model.strCon = model.branchdata.HighConfendential == 1 && model.branchdata.IsConfidential == true ? ",SC" : (model.branchdata.HighConfendential == 1 ? ",SC" : (model.branchdata.IsConfidential == true ? ",C" : null));

            });
        };

        model.photorequestAndshow = function() {
            if (model.PersonalObj.ProfilePic.indexOf('Fnoimage.jpg') !== -1 || model.PersonalObj.ProfilePic.indexOf('Mnoimage.jpg') !== -1) {
                //photo request
                baseService.PhotoRequest(model.PersonalObj.ProfileID, '2').then(function(response) {
                    if (response.data !== undefined && response.data.length > 0) {}
                });

            } else {
                baseService.getPhotoInfn(CustID).then(function(response) {
                    if (response.data !== undefined && response.data.length > 0) {
                        model.SlideArr = [];
                        model.FPobj = JSON.parse(response.data[0]);
                        _.each(model.FPobj, function(item) {
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
        .factory('baseModel', factory);
    factory.$inject = ['baseService', 'authSvc', '$uibModal', 'commonFactory', '$stateParams', '$filter'];

})(angular);
(function(angular) {
    'use strict';

    function factory(http) {
        return {
            personalDetails: function(obj) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getpersonalMenuDetails', { params: { CustID: obj } });
            },
            menuReviewstatus: function(Custid, type, sectionid) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerPersonalMenuReviewStatus', { params: { CustID: Custid, iReview: type, SectionID: sectionid } });
            },
            nodatastatus: function(id) {
                return http.get(editviewapp.apipath + 'CustomerPersonalUpdate/getNoDataInformationLinkDisplay', { params: { ProfileID: id } });
            },
            getPhotoInfn: function(custid) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerPersonaloffice_purpose', {
                    params: { flag: '8', ID: custid, AboutProfile: '', IsConfidential: '', HighConfendential: '' }
                });
            },
            PhotoRequest: function(ProfileID, empid) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerphotoRequestDisplay', {
                    params: { profileid: ProfileID, EMPID: empid, ticketIDs: '' }
                });
            },
            menudata: function(custid) {
                return http.get(editviewapp.apipath + 'CustomerPersonal/getCustomerPersonaloffice_purpose', {
                    params: { flag: '9', ID: custid, AboutProfile: '', IsConfidential: '', HighConfendential: '' }
                });
            }

        };
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('baseService', factory);

    factory.$inject = ['$http'];
})(angular);