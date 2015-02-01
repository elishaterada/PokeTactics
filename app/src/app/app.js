/* global angular: false */

var exports = {};

angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router',
  'angular-loading-bar'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.run (function($rootScope) {
  // Define magic numbers used throughout the app
  $rootScope.config = {
    appName: 'PokéTactics',
    pokeSpritesSource: 'http://www.smogon.com/dex/media/sprites/xy/',
    colors: {
      primary: '#74ABB8'
    }
  };
  $rootScope.isEmpty = function (obj) {
     return angular.equals({},obj);
  };
  $rootScope.convertToSlug = function(text) {
    return text
        .toLowerCase()
        .replace(/ /g,'')
        .replace(/[^\w-]+/g,'')
        ;
  };
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | PokéTactics' ;
    }
  });
})

;

