controller = (scope, params, ParseCrud, timeout, http, ngTableParams)->

  id = params.id
  scope.id = params.id

  scope.text = ''
  scope.entity = {}
  scope.success = ''
  scope.errors = []
  scope.data = []
  scope.selected = 'upload'
  DocumentUpload = new ParseCrud 'DocumentUpload'
  DocumentUpload.list (d)->
    scope.data = d
    scope.tableParams.reload()

  removeFile = (name)->
    params =
      method: 'POST'
      url: '/removeupload'
      data:
        filename: name
    h = http params
    h.success (d)->
      scope.success = 'Removed successfully.'
      scope.tableParams.reload()
    h.error (e)->
      scope.success = ''
      scope.error = e

  scope.remove = (e)->
    filename = e.get('uploadname')
    removeSuccess = (e)->
      scope.data = _.filter scope.data, (d)-> d.id isnt e.id
      removeFile filename

    DocumentUpload.remove(e, removeSuccess)

  scope.tableParams = new ngTableParams
    page: 1
    count: 10
  ,
    total: -> scope.data.length
    getData: ($defer, params) ->
      $defer.resolve scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count())


  uploader = new plupload.Uploader
      browse_button: "browse"
      url: "/upload"
      filters:
        mime_types: [
          {title : "Text files", extensions : "txt"}
        ]

  uploader.init()

  scope.filesAdded = []

  uploader.bind "FilesAdded", (up, files) ->
    scope.$apply ->
      plupload.each files, (file) ->
        scope.filesAdded.push file

  saveSuccess = (e)->
    scope.data.push e
    scope.tableParams.reload()
    scope.$apply ->
      scope.selected = 'uploaded'
    
  saveError = ->
    debugger

  uploader.bind 'FileUploaded', (up, file, xhr)->
    res = JSON.parse xhr.response

    obj =
      filename: file.name
      uploadname: res.result

    DocumentUpload.save obj, saveSuccess, saveError

  uploader.bind 'UploadComplete', (up, file) ->
    scope.$apply ->
      scope.filesAdded.length = 0

  uploader.bind 'UploadProgress', (up, file) ->
    scope.$apply ->
      matches = _.filter scope.filesAdded, (f)-> f.id is file.id
      matches[0].percent = file.percent

  uploader.bind 'Error', (up, err) ->
    scope.$apply ->
      res = JSON.parse err.response
      scope.errors.push(res?.result)

  scope.upload = ->
    scope.errors.length = 0
    uploader.start()

angular.module('wordsApp')
  .controller 'UploadDocumentsCtrl',
  ['$scope', '$routeParams', 'ParseCrud', '$timeout', '$http', 'ngTableParams', controller]