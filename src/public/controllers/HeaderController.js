app.controller("HeaderController", ['$scope', function($scope) {
    $scope.userName = "Michal Bernhard"

    $scope.$on('loginSuccessful', function(event, data) {
       alert("Login successfull event called! Data:" + data);
    })
}]);
