// Generated by CoffeeScript 1.6.3
(function() {
  var service;

  service = function(Restangular) {
    var httpFields;
    httpFields = {
      headers: {
        common: {
          Accept: 'application/json'
        }
      }
    };
    return function() {
      var config, create, get, getList, list, remove, rest, update;
      rest = {};
      list = function(cb) {
        return rest.getList().then(cb);
      };
      get = function(id, cb) {
        return rest.one(id).get().then(cb);
      };
      getList = function(ids, cb) {
        return cb();
      };
      create = function(obj, cb) {
        return rest.post(obj).then(cb);
      };
      update = function(obj, cb) {
        return rest.put(obj).then(cb);
      };
      remove = function(id, cb) {
        return cb(null);
      };
      config = function(api, baseUrl) {
        if (baseUrl == null) {
          baseUrl = 'app';
        }
        rest = Restangular.withConfig(function(configurer) {
          return configurer.setBaseUrl(baseUrl);
        }).all(api + '/');
        return this;
      };
      return {
        config: config,
        list: list,
        get: get,
        getList: getList,
        create: create,
        update: update,
        remove: remove
      };
    };
  };

  angular.module('wordsApp').factory('Crud', ['Restangular', service]);

}).call(this);

/*
//@ sourceMappingURL=crud.map
*/