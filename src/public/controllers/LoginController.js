console.debug("login controller file opened");
app.controller("LoginController", ["$scope", "$log", "$location", function($scope, $log, $location) {
    $log.debug("login controller");

    $scope.login = function() {
        $log.info("do login!");
        //alert("login!");

        $location.url("https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=130606690212-uv64123b4ebsb7ck3dcqtstt6urvnejp.apps.googleusercontent.com&scope=profile,plus.login&prompt=consent&redirect_uri=https://buznibuzna.com:8080/oauth");
    }
}]);
