// Created: 11 November 2015
//
// Implementaion of a fake api.mybackend.com RESTful API
//
// Written for: Abi Shawcross <abi.shawcross@korusgroup.co.uk>

(function() {    
    var mybackend = function($http, $log) {
        var submitMyUser = function(userdata, onSuccess, onError) {            
            return $http.post(
                    "https://api.mybackend.com/users/",
                    userdata
                )
                .then(function(response) {
                    onSuccess(response.data);
                }, onError);
        }
        
        // valdate user input (very crude)
        var validateMyUser = function(user) {
            var validSex = ['Male', 'Female'];
            var result = {
                validate: true,
                errors: []
            };
            
            if (typeof user.firstname == "undefined" || user.firstname.length == 0) {
                result.errors.push("Please enter your first name");
                result.validate = false;
            }
            
            if (typeof user.dob == "undefined" || user.dob == null) {
                result.errors.push("Please enter your data of birth");
                result.validate = false;
            }
            
            var isUserSexValid = false;
            for (sex of validSex) {
                if (user.sex == sex) {
                    isUserSexValid = true;
                }
            }
            
            if (!isUserSexValid) {
                result.errors.push("Please select your sex");
                result.validate = false;
            }
            
            return result;
        }
            
        return {
            submitMyUser: submitMyUser,
            validateMyUser: validateMyUser
        }
    };
    
    var module = angular.module("testform");
    module.factory("mybackend", mybackend);
}());