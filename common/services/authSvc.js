(function() {
    'use strict';

    angular
        .module('KaakateeyaEmpEdit')
        .factory('authSvc', factory)

    factory.$inject = ['$injector'];

    function factory($injector) {
        function setUser(value) {
            //console.log(value);
            setSession('cust.id', value.CustID);
            setSession('cust.username', (value.FirstName + ' ' + value.LastName));
            setSession('cust.profileid', (value.ProfileID));
            setSession('cust.paidstatus', (value.PaidStatus));
            setSession('cust.profilepic', (value.ProfilePic));
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

            clearSession('cust.id');
            clearSession('cust.username');
            clearSession('cust.profileid');
            clearSession('cust.paidstatus');
            clearSession('cust.profilepic');
            clearSession('cust.GenderID');
        }

        function getUser() {
            return {
                custid: 91022,
                //111070,
                username: getSession('cust.username'),
                profileid: getSession('cust.profileid'),
                paidstatus: getSession('cust.paidstatus'),
                profilepic: getSession('cust.profilepic'),
                GenderID: getSession('cust.GenderID')
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
            getCustId: function() {
                return 91022;
            },
            getProfileid: function() {
                return getSession('cust.profileid');
            },
            getpaidstatus: function() {
                return getSession('cust.paidstatus');
            },
            getprofilepic: function() {
                return getSession('cust.profilepic');
            },
            getGenderID: function() {
                return getSession('cust.GenderID');
            },
            clearUserSessionDetails: function() {
                return clearUserSession();
            },
            logout: function() {
                clearUserSession();
                window.location = "#/";
            },
            login: function(username, password) {

                var body = {
                    Username: username,
                    Password: password
                };
                return $injector.invoke(function($http) {
                    return $http.post(app.apiroot + 'DB/userLogin/person', body)
                        .then(function(response) {
                            if (response.status === 200) {

                                return { success: true, response: response.data };
                            }
                            return { success: false, response: response.data };
                        });
                });
            }
        };
    }
})();