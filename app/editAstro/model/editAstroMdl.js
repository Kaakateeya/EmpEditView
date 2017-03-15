(function(angular) {
    'use strict';


    function factory(editAstroService, authSvc, alertss, commonFactory, uibModal, fileUpload, http) {

        var model = {};
        model.scope = {};

        // declaration part

        model.atroObj = [];
        model.generateData = [];
        model.ImageUrl = '';
        model.iframeShow = false;
        var s3obj = {};

        var logincustid = authSvc.getCustId();
        var custID = model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        var isSubmit = true;

        model.loginpaidstatus = authSvc.getpaidstatus();

        // end declaration part

        model.init = function() {
            model.astropageload();

            return model;
        };

        model.astropageload = function() {

            editAstroService.getAstroData(custID).then(function(response) {

                if (commonFactory.checkvals(response.data[0])) {
                    model.AstroArr = JSON.parse(response.data[0]);
                    model.generateData = JSON.parse(response.data[1]);
                    debugger;
                    if (commonFactory.checkvals(model.AstroArr[0] && commonFactory.checkvals(model.AstroArr[0].Horoscopeimage))) {

                        if (commonFactory.checkvals(model.AstroArr[0].Horoscopeimage) && (model.AstroArr[0].Horoscopeimage).indexOf('Horo_no') === -1) {
                            var extension = "jpg";
                            if ((model.AstroArr[0].Horoscopeimage).indexOf('.html') !== -1) {
                                extension = "html";
                            } else {
                                model.iframeShow = false;
                                extension = "jpg";
                            }

                            model.ImageUrl = editviewapp.GlobalImgPathforimage + "Images/Horoscopeimages/" + custID + "_HaromodelImage/" + custID + "_HaromodelImage." + extension;
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
                            model.ImageUrl = editviewapp.GlobalImgPathforimage + "Images/Horoscopeimages/" + custID + "_HaromodelImage/" + custID + "_HaromodelImage." + extensn;
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
            if (item !== undefined) {
                model.starArr = commonFactory.starBind(item.StarLanguageID);

                if (item.TimeOfBirth !== undefined) {
                    model.strdot = ((item.TimeOfBirth).split(' '))[0].split(':');
                    model.atroObj.ddlFromHours = parseInt(model.strdot[0]);
                    model.atroObj.ddlFromMinutes = parseInt(model.strdot[1]);
                    model.atroObj.ddlFromSeconds = parseInt(model.strdot[2]);
                }
                model.atroObj.ddlCountryOfBirthID = item.CountryOfBirthID;
                model.atroObj.ddlStateOfBirthID = item.StateOfBirthID;
                model.atroObj.ddlDistrictOfBirthID = item.DistrictOfBirthID;
                model.atroObj.ddlcity = item.CityOfBirthID;
                model.atroObj.ddlstarlanguage = item.StarLanguageID;
                model.atroObj.ddlstar = item.StarID;
                model.atroObj.ddlpaadam = item.PaadamID;
                model.atroObj.ddlLagnam = item.LagnamID;
                model.atroObj.ddlRaasiMoonsign = item.RaasiID;
                model.atroObj.txtGothramGotra = item.Gothram;
                model.atroObj.txtMaternalgothram = item.MeternalGothramID;
                model.atroObj.rdlkujaDosham = item.manglikID;
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

        model.astroSubmit = function(obj) {
            if (isSubmit) {
                isSubmit = false;
                $('#ssss').prop('disabled', true);
                var strFromTimeOfBirth = obj.ddlFromHours + ":" + obj.ddlFromMinutes + ":" + obj.ddlFromSeconds;

                model.astroData = {
                    GetDetails: {
                        CustID: custID,
                        TimeofBirth: strFromTimeOfBirth,
                        CountryOfBirthID: obj.ddlCountryOfBirthID,
                        StateOfBirthID: obj.ddlStateOfBirthID,
                        DistrictOfBirthID: obj.ddlDistrictOfBirthID,
                        CityOfBirthID: obj.ddlcity,
                        Starlanguage: obj.ddlstarlanguage,
                        Star: obj.ddlstar,
                        Paadam: obj.ddlpaadam,
                        Lagnam: obj.ddlLagnam,
                        RasiMoonsign: obj.ddlRaasiMoonsign,
                        GothramGotra: obj.txtGothramGotra,
                        Maternalgothram: obj.txtMaternalgothram,
                        ManglikKujadosham: obj.rdlkujaDosham,
                        Pblongitude: obj.PBlongitude,
                        pblatitude: obj.PBlatitude,
                        TimeZone: null
                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: null,
                        Admin: null
                    }
                };

                model.submitPromise = editAstroService.submitAstroData(model.astroData).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        if (model.datagetInStatus === 1) {
                            sessionStorage.removeItem('missingStatus');
                            route.go('mobileverf', {});
                        }
                        model.astropageload(custID);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);

                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation failed', 4500);
                    }
                });
            }
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.uploadGenerateHoro = function(val) {
            debugger;
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
                    var keyname = "Images/Horoscopeimages/" + custID + "_HaromodelImage/" + custID + "_HaromodelImage." + extension;

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

                                model.ImageUrl = editviewapp.GlobalImgPathforimage + "Images/Horoscopeimages/" + custID + "_HaromodelImage/" + custID + "_HaromodelImage." + extension;
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

                    s3obj = { Path: response.data.Path, KeyName: response.data.KeyName };
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
            var keynameq = "Images/Horoscopeimages/" + custID + "_HaromodelImage/" + custID + "_HaromodelImage." + extension;
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
            editAstroService.GenerateHoroS3(s3obj).then(function(response) {
                console.log(response);
            });
            model.astropageload(custID);
            commonFactory.closepopup();
        };









        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editAstroModel', factory)

    factory.$inject = ['editAstroService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'fileUpload', '$http'];

})(angular);