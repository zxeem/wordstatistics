// Generated by CoffeeScript 1.6.3
(function() {
  var filter;

  filter = function() {
    return function(input) {
      return input.replace('0.0.0.0:5000', '#');
    };
  };

  angular.module('wordsApp').filter('noport', [filter]);

}).call(this);

/*
//@ sourceMappingURL=noport.map
*/