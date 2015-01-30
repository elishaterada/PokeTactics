/* global angular:false */

angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router'
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
    pokeapiSource: 'http://pokeapi.co',
    colors: {
      primary: '#26B5C0',
      secondary: '#8D8DB7',
      tertiary: '#C9D2DA'
    }
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

