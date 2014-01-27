// Generated by CoffeeScript 1.6.3
(function() {
  'use strict';
  var controller;

  controller = function(scope, ParseCrud, http, ngTableParams) {
    var DocumentUpload, Documents, onError, removeSuccess, saveSuccess;
    scope.text = '';
    scope.entity = {};
    scope.success = '';
    scope.errors = [];
    scope.data = [];
    scope.selected = 'new';
    DocumentUpload = new ParseCrud('DocumentUpload');
    DocumentUpload.list(function(d) {
      return scope.uploads = d;
    });
    Documents = new ParseCrud('Documents');
    Documents.list(function(d) {
      scope.data = d;
      return scope.tableParams.reload();
    });
    scope.save = function() {
      return Documents.save(scope.entity, saveSuccess, onError);
    };
    removeSuccess = function(e) {
      scope.data = _.filter(scope.data, function(d) {
        return d.id !== e.id;
      });
      return scope.tableParams.reload();
    };
    scope.remove = function(e) {
      return Documents.remove(e, removeSuccess, onError);
    };
    scope.tableParams = new ngTableParams({
      page: 1,
      count: 10
    }, {
      total: function() {
        return scope.data.length;
      },
      getData: function($defer, params) {
        var end, start;
        start = (params.page() - 1) * params.count();
        end = params.page() * params.count();
        return $defer.resolve(scope.data.slice(start, end));
      }
    });
    saveSuccess = function(e) {
      scope.data.push(e);
      scope.tableParams.reload();
      return scope.selected = 'list';
    };
    return onError = function() {
      debugger;
    };
  };

  angular.module('wordsApp').controller('UploadDocumentsCtrl', ['$scope', 'ParseCrud', '$http', 'ngTableParams', controller]);

}).call(this);

/*
//@ sourceMappingURL=documents.map
*/
