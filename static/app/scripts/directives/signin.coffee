"use strict"
controller = (root, scope, fb)->
  scope.model = {}

  scope.signinFacebook = ->

    scope.$watch ->
      fb.loaded
    , (loaded)->
        if loaded
          Parse.FacebookUtils.logIn null,
            success: (user) ->
              unless user.existed()
                alert "User signed up and logged in through Facebook!"
              else
                alert "User logged in through Facebook!"
            error: (user, error) ->
              alert "User cancelled the Facebook login or did not fully authorize."

    fb._init fb.fbParams



  scope.signin = (form)->
    if form.$invalid
      return
    
    Parse.User.logIn scope.model.email, scope.model.password,
      success: (user) ->
        root.user = user
        roleSuccess = (role) ->
          adminRelation = new Parse.Relation(role, "users")
          queryAdmins = adminRelation.query()
          queryAdmins.equalTo "objectId", root.user.id
          queryAdmins.first success: (result)->
            root.isAdmin = result

        query = new Parse.Query(Parse.Role)
        query.equalTo "name", "Administrator"
        query.first success: roleSuccess
        root.go '/'

      error: (user, error) ->
        console.log(error)
        alert("Invalid username or password. Please try again.")


angular.module("wordsApp").directive "signin", ->
  templateUrl: 'views/directives/signin.html'
  restrict: "E"
  replace: yes
  scope: on
  controller: ['$rootScope', '$scope', '$FB', controller]

