/**
 * AngularJS 
 * @author vinu <vinodanasuri@gmail.com>
 */

/**
 * Main App Creation
 */

var editviewapp = angular.module('KaakateeyaEmpEdit', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngIdle', 'ngMaterial',
    'ngMessages', 'ngAria', 'ngPassword', 'jcs-autoValidate', 'angularPromiseButtons', 'KaakateeyaRegistration', 'oc.lazyLoad'
]);
editviewapp.apipath = 'http://183.82.0.58:8025/Api/';
// editviewapp.apipath = 'http://183.82.0.58:8010/Api/';
editviewapp.env = 'dev';

editviewapp.GlobalImgPath = 'http://d16o2fcjgzj2wp.cloudfront.net/';
editviewapp.GlobalImgPathforimage = 'https://s3.ap-south-1.amazonaws.com/kaakateeyaprod/';

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
        { name: 'editview.editEducation', url: '/Education', subname: ['common/directives/datePickerDirective.js'] },
        { name: 'editview.editManagePhoto', url: '/ManagePhoto', subname: ['common/services/selectBindServices.js'] },
        { name: 'editview.editParent', url: '/Parent', subname: [] },
        { name: 'editview.editPartnerpreference', url: '/Partnerpreference', subname: [] },
        { name: 'editview.editSibbling', url: '/Sibbling', subname: [] },
        { name: 'editview.editAstro', url: '/Astro', subname: [] },
        { name: 'editview.editProperty', url: '/Property', subname: [] },
        { name: 'editview.editRelative', url: '/Relative', subname: [] },
        { name: 'editview.editReference', url: '/Reference', subname: [] },
        { name: 'editview.editSpouse', url: '/Spouse', subname: ['common/directives/datePickerDirective.js'] },
        { name: 'editview.editContact', url: '/Contact', subname: [] },
        { name: 'editview.editOfcePurpose', url: '/OfcePurpose', subname: [] },
        { name: 'editview.editProfileSetting', url: '/ProfileSetting', subname: [] }
    ];
    $ocLazyLoadProvider.config({
        debug: true
    });
    $urlRouterProvider.otherwise('/Education');

    _.each(states, function(item) {

        var innerView = {};
        var edititem = item.name.slice(9);
        innerView = {
            "lazyLoadView@": {
                templateUrl: 'app/' + edititem + '/index.html',
                controller: edititem + 'Ctrl as page'
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