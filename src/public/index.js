console.debug("index.js script");

var app = angular.module("slovicka", ['ngRoute']);

app.config(["$routeProvider", function($routeProvider) {
    console.debug("config of routeProvider", $routeProvider, this);

    $routeProvider
        .when('/login', {
          controller: 'LoginController',
          templateUrl: '/views/login.html'
        })
        .otherwise({
          controller: 'TranslateController',
          templateUrl: "/views/main.html"
        });

}]);

app.directive('focus', function($timeout) {
  return {
     scope : {
       trigger : '@focus'
     },
     link : function(scope, element) {
        scope.$watch('trigger', function(value) {
          if (value === "true") {
            $timeout(function() {
              element[0].focus();
            });
          }
       });
     }
   }
});

app.run(['$rootScope', '$location', '$http',
  function($rootScope, $location, $http) {

    // see what's going on when the route tries to change
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      // next is an object that is the route that we are starting to go to
      // current is an object that is the route where we are currently
      var currentPath = $location.path();
      console.log("current path:", currentPath);
      var pattern = /.*access_token=(.*?)\&/i
      var accessTokenMatcher = pattern.exec(currentPath);
      console.log(accessTokenMatcher)
      if (accessTokenMatcher != null && accessTokenMatcher.length > 0) {  // it matches
          var accessToken = accessTokenMatcher[1];
      }

      $rootScope.accessToken = accessToken;
      $rootScope.$broadcast('loginSuccessful', "login vole");

    });
  }
]);

app.factory("myInterceptor", ["$log", function($log) {
    $log.debug("log from regresp responseInterceptor");

    return {
        request: function(request) {
            $log.debug("request is ($@@#@): ", request);
            return request;
        },
        response: function(response) {
            $log.debug("response is ($@@#@): ", response);
            return response;
        },
        requestError: function(error) {
            $log.debug("request error is: ($@@#@): ", error);
        },
        responseError: function(error) {
            $log.debug("request error is: ($@@#@): ", error);
        }
    }
}]);

app.config(["$httpProvider", function($httpProvider) {
    console.debug("config of httpProvider", this);
    $httpProvider.interceptors.push('myInterceptor');
}]);
