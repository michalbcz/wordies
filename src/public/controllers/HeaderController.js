app.controller("HeaderController", ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
        $scope.username = "n/a"

        // todo: tohle by asi melo byt v servisni vrstve, ze?
        $scope.$on('loginSuccessful', function(event, data) {

           $http({
             method: 'GET',
             url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
             headers: { 'Authorization' : 'Bearer ' + $scope.accessToken }
           }).then(function success(response) {
                 console.dir(response);
                 var data = response.data;
                 var userId = data.id;
                 var username = data.name;
                 var imageUrl = data.picture;
                 $scope.username = username;
                 $rootScope.userId = userId;
                 $scope.imageUrl = imageUrl;
             }, function error(response) {
                 console.error("error!", response);
             });

      });
}]);
