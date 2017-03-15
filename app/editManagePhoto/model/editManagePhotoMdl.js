(function(angular) {
    'use strict';


    function factory(editManagePhotoService, authSvc, alertss, commonFactory, uibModal, http, fileUpload) {
        var model = {};
        model.scope = {};
        //start declaration block
        var logincustid = authSvc.getCustId();
        var CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.loginpaidstatus = authSvc.getpaidstatus();
        var genderID = authSvc.getGenderID();

        model.photorowID = 0;

        //end declaration block

        model.init = function() {
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
            console.log(obj.myFile);
            var extension = (obj.myFile.name !== '' && obj.myFile.name !== undefined && obj.myFile.name !== null) ? (obj.myFile.name.split('.'))[1] : null;

            extension = angular.lowercase(extension);

            var gifFormat = "gif, jpeg, png,jpg";

            if (typeof(obj.myFile.name) != "undefined") {

                var size = parseFloat(obj.myFile.size / 1024).toFixed(2);
                if (extension !== null && gifFormat.indexOf(angular.lowercase(extension)) === -1) {
                    alert('Your uploaded image contains an unapproved file formats.');
                } else if (size > 4 * 1024) {
                    alert('Sorry,Upload Photo Size Must Be Less than 1 mb');
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
                                    EmpID: null,
                                    Admin: null
                                }
                            };

                            editManagePhotoService.submituploadData(model.uploadData).then(function(response) {
                                console.log(response);
                                if (response.status === 200) {

                                    model.manageArr = response.data;
                                    model.refreshPageLoad(model.manageArr);


                                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'submitted Succesfully', 4500);
                                } else {
                                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Updation failed', 4500);
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
                    window.open('#/registration/photoGuideLines', '_blank');
                    break;
                case 'Faqs':
                    window.open('#/faqs', '_blank');
                    break;
                case 'uploadTips':
                    window.open('#/registration/uploadTips', '_blank');
                    break;
            }
        };


        return model.init();
    }

    angular
        .module('KaakateeyaEmpEdit')
        .factory('editManagePhotoModel', factory)

    factory.$inject = ['editManagePhotoService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$http', 'fileUpload'];

})(angular);