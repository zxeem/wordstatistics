// Generated by CoffeeScript 1.6.3
(function() {
  var Service;

  Service = function() {
    var Crud;
    return Crud = (function() {
      function Crud(name) {
        this.name = name;
        this["class"] = Parse.Object.extend(this.name);
      }

      Crud.prototype.save = function(obj, cb, errCB) {
        var instance, k, v;
        instance = new this["class"]();
        for (k in obj) {
          v = obj[k];
          instance.set(k, v);
        }
        instance.setACL(new Parse.ACL(Parse.User.current()));
        return instance.save(null, {
          success: cb,
          error: errCB
        });
      };

      Crud.prototype.getWith = function(id, keys, cb, errCB) {
        var key, query, _i, _len;
        query = new Parse.Query(this["class"]);
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          query.include(key);
        }
        return query.get(id, {
          success: cb,
          error: errCB
        });
      };

      Crud.prototype.get = function(id, cb, errCB) {
        var query;
        query = new Parse.Query(this["class"]);
        return query.get(id, {
          success: cb,
          error: errCB
        });
      };

      Crud.prototype.update = function(model, cb, errCB) {
        return model.save({
          success: cb,
          error: errCB
        });
      };

      Crud.prototype.remove = function(model, cb, errCB) {
        return model.destroy({
          success: cb,
          error: errCB
        });
      };

      Crud.prototype.listWith = function(keys, cb, errCB) {
        var key, query, _i, _len;
        query = new Parse.Query(this["class"]);
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          query.include(key);
        }
        query.descending('createdAt');
        return query.find({
          success: cb,
          error: errCB
        });
      };

      Crud.prototype.list = function(cb, errCB) {
        var query;
        query = new Parse.Query(this["class"]);
        query.descending('createdAt');
        return query.find({
          success: cb,
          error: errCB
        });
      };

      return Crud;

    })();
  };

  angular.module('wordsApp').service('ParseCrud', [Service]);

}).call(this);

/*
//@ sourceMappingURL=parsecrud.map
*/
