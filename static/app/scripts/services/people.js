// Generated by CoffeeScript 1.6.3
(function() {
  var service;

  service = function(Crud) {
    var crud;
    crud = Crud().config('people/');
    return crud;
  };

  angular.module('wordsApp').factory('People', ['Crud', service]);

}).call(this);

/*
//@ sourceMappingURL=people.map
*/
