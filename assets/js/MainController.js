(function() {
    var app = angular.module("testform");
    var errorMessage = "Sorry, there was an error with submitting your contact details. Please try again.";
    var successMessage = "Thank you. We will contact you shortly.";
    var warningMessage = "Sorry, there were some errors in your submission.";
    var processingMessage = "Please wait. Processing...";
    
    var MainController = function($scope, mybackend, $interval, $location) {    
        $scope.user = {
            firstname: "",
            dob: "",
            sex: ""
        };

        $scope.error = "";
        $scope.success = "";
        
        $scope.submitMyUser = function(user) {
            $scope.error = "";
            $scope.success = "";
            $scope.warning = "";
            
            var result = mybackend.validateMyUser(user);
            
            if (result.validate) {
                $scope.processing = processingMessage;
                mybackend.submitMyUser(user, onSuccess, onError);
            } else {                
                $scope.warning = warningMessage;
                $scope.validationErrors = result.errors;
            }
        };
        
        var onError = function(data) {
            $scope.processing = "";
            
            $scope.error = data.error ? data.error : errorMessage;
        }
        
        var onSuccess = function(data) {
            $scope.processing = "";
            
            if (data.success) {
                $scope.success = successMessage;
            } else {
                $scope.error = errorMessage;
            }
        }
    }
    
    app.controller("MainController", ["$scope", "mybackend", "$interval", "$location", MainController]);
}());