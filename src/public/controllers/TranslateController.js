app.controller("TranslateController", ["$scope", "$http", "$log", function($scope,  $http, $log) {
    $scope.translations = []

    $scope.translate = function(word) {

        $log.info("trying to translate: ", word);

        $http({
            method: "POST",
            //url: "http://private-4018a-slovicka.apiary-mock.com/translate",
            url: "/api/translate/" + word,
            data: {
                "word": word,
                "context" : {
                    "uri": "http://expressjs.com/api.html",
                    "text" : "The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. In this documentation and by convention",
                    "tags" : ["#tag1", "#tag2"]
                }
            }
        }).success(function(translationsJson) {
            $log.debug(translationsJson);
            $scope.translations = translationsJson.translations;
        });

    }

}]);
