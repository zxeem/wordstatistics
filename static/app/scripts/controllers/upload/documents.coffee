controller = (scope, params, Service, timeout, http)->

  id = params.id
  scope.id = params.id

  scope.text = ''
  scope.entity = {}
  scope.success = ''
  scope.error = ''
  scope.selected = 'documents'

  uploader = new plupload.Uploader
      browse_button: "browse"
      url: "/upload"

  uploader.init()

  scope.filesAdded = []
  uploader.bind "FilesAdded", (up, files) ->
    plupload.each files, (file) ->
      scope.$apply ->
        scope.filesAdded.push file

  uploader.bind 'Error', (up, err) ->
    scope.error += "<br/>Error #" + err.code + ": " + err.message

  scope.upload = -> uploader.start()

angular.module('wordsApp')
  .controller 'UploadDocumentsCtrl',
  ['$scope', '$routeParams', 'Texts', '$timeout', '$http', controller]
