/* global angular:false */

/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      'main': {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.factory('PokeapiServ', function ($http, $q, $rootScope) {
    return {
        getPokedex: function() {
          return $q.all([
              $http.get($rootScope.config.pokeapiSource + '/api/v1/pokedex/1/')
          ]).then(function (results) {
              var aggregatedData = [];
              angular.forEach(results, function (result) {
                  aggregatedData = aggregatedData.concat(result.data);
              });
              return aggregatedData;
          });
        },
        getPokemon: function(pokemonSource) {
          return $q.all([
              $http.get($rootScope.config.pokeapiSource + '/' + pokemonSource)
          ]).then(function (results) {
              var aggregatedData = [];
              angular.forEach(results, function (result) {
                  aggregatedData = aggregatedData.concat(result.data);
              });
              return aggregatedData;
          });
        },
        getSprites: function(spritesSource) {
          return $q.all([
              $http.get($rootScope.config.pokeapiSource + '/' + spritesSource)
          ]).then(function (results) {
              var aggregatedData = [];
              angular.forEach(results, function (result) {
                  aggregatedData = aggregatedData.concat(result.data);
              });
              return aggregatedData;
          });
        }
    };
})

.directive( 'pokeListItem', function() {
  return {
    restrict: 'E',
    templateUrl: 'home/home.pokemon-list-item.tpl.html'
  };
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', ['$scope', 'PokeapiServ', function HomeController( $scope, PokeapiServ ) {

  // Initiate Pokedex
  $scope.pokedex = [];

  // Initiate Pokemon List
  // TODO: Create this with function?
  $scope.pokemonList = {
    ref: [{name: null}, {name: null}, {name: null}, {name: null}, {name: null}, {name: null}],
    data: [null, null, null, null, null, null],
    sprites: [null, null, null, null, null, null]
  };

  $scope.pokemonRemove = function(index) {
    $scope.pokemonList.ref[index] = { name: null };
    $scope.pokemonList.data[index] = null;
    $scope.pokemonList.sprites[index] = null;
  };

  // Get Pokedex
  PokeapiServ.getPokedex().then(function(data){
    $scope.pokedex = data[0].pokemon;
  });

  // Get Pokemon
  // TODO: Avoid duplicates
  $scope.$watch('pokemonList.ref', function(pokemonRefNew, pokemonRefOld){


    var indexOfChangedItem = null;

    for( var i = 0; i < pokemonRefNew.length; i++ ) {
        if( pokemonRefNew[i].name !== pokemonRefOld[i].name ) {
          indexOfChangedItem = i;
        }
    }

    if ( indexOfChangedItem !== null ) {
      var pokemonDataUrl = pokemonRefNew[indexOfChangedItem].resource_uri;
      PokeapiServ.getPokemon(pokemonDataUrl).then(function(data){

        // Save pokemon data in Pokemon list array
        $scope.pokemonList.data[indexOfChangedItem] = data[0];

        // Get Sprites data
        PokeapiServ.getSprites($scope.pokemonList.data[indexOfChangedItem].sprites[0].resource_uri).then(function(sprites){
            $scope.pokemonList.sprites[indexOfChangedItem] = sprites;
        });

      });
    }
  }, true);

}])

;
