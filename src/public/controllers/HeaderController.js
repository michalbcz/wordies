app.controller(
      "HeaderController", ['$scope', '$rootScope', '$http',
      function($scope, $rootScope, $http) {
        $scope.username = "n/a"

        $scope.$on('loginSuccessful', function(event, data) {

           $http({
             method: 'GET',
             url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
             headers: { 'Authorization' : 'Bearer ' + $scope.accessToken }
           }).then(function success(response) {
                 console.log(response);
                 var data = response.data;
                 var id = data.id;
                 var username = data.name;
                 $scope.username = username;
                 $rootScope.id = id;
             }, function error(response) {
                 console.error("error!", response);
             });

      });
}]);
