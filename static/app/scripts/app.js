// Generated by CoffeeScript 1.6.3
(function() {
  var configs, module;

  module = angular.module('wordsApp', ['restangular']);

  configs = function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  };

  module.config(configs);

}).call(this);

/*
//@ sourceMappingURL=app.map
*/
