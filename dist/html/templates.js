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
    "                                <span id=\"lblcountry \">{{item.EduCityIn+\", \"+item.EduDistrictIn+\", \"+item.EduStateIn+\", \"+item.EduCountryIn}}</span>\r" +
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
    "                                    <span id=\"lblworkingfrom\">{{item.WorkingFromDate}}</span></h5>\r" +
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
    "                                <span id=\"txtsincedate\">{{item.ResidingSince}}</span>\r" +
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
    "                                <span id=\"txtarrival\">{{item.ArrivingDate}}</span>\r" +
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
    "                                <span id=\"txtdaparture\"> {{item.DepartureDate}}</span>\r" +
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
    "\r" +
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
    "\r" +
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
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
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
    "                                <div class=\"edit_page_details_item_desc clearfix\">\r" +
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
    "                                    <span id=\"lblFathername\">{{item.FatherFirstName+\" \"+item.FatherLastName}}</span></h5>\r" +
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
    "\r" +
    "\n" +
    "\r" +
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
    "                <md-input-container ng-if=\"item.controlType==='radio'\" style=\"font-weight: 700; color: black;\">\r" +
    "\n" +
    "                    <md-radio-group ng-change=\"ddlChange(model[item.ngmodel],model[item.secondParent],item.childName,item.changeApi)\" layout=\"row\" ng-model=\"model[item.ngmodel]\" class=\"md-block\" flex-gt-sm ng-disabled=\"manageakerts\">\r" +
    "\n" +
    "                        <md-radio-button ng-value=\"rd.value\" ng-repeat=\"rd in item.dataSource\" class=\"md-primary\">{{rd.label}}</md-radio-button>\r" +
    "\n" +
    "                    </md-radio-group>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
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
    "                    <date-picker strdate=\"model[item.ngmodel]\"></date-picker>\r" +
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
    "                <input type=text ng-model=\"strareacode\" maxlength=\"4\" tabindex=\"14\" />\r" +
    "\n" +
    "                <input type=text ng-model=\"strland\" maxlength=\"8\" tabindex=\"15\" />\r" +
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
