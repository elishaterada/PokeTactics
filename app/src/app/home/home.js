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
  'ui.router',
  'highcharts-ng'
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

.directive( 'pokeListItem', function() {
  return {
    restrict: 'E',
    templateUrl: 'home/home.pokemon-list-item.tpl.html'
  };
})

.directive( 'pokeListItemDetail', function() {
  return {
    restrict: 'E',
    templateUrl: 'home/home.pokemon-list-item-detail.tpl.html'
  };
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', ['$scope', function HomeController( $scope ) {

  // Initiate Pokedex
  $scope.pokedex = exports.BattlePokedex;

  // Initiate Pokemon List
  // TODO: Create this with function?
  $scope.pokemonList = {
    currentSelection: null,
    pokemon: [{},{},{},{},{},{}]
  };

  // Remove Pokemon data
  $scope.pokemonRemove = function(index) {
    $scope.pokemonList.pokemon[index] = {};
  };

  // Show Pokemon detail
  $scope.pokemonView = function(index) {
    $scope.pokemonList.currentSelection = index;
    chartPokemonStats();
  };

  // Get Pokemon Stats Chart
  // Highcharts - Correlation Cause and Effect
  var chartPokemonStats = function() {

    $scope.chartPokemonStats = {
      options: {
        chart: {
          type: 'bar',
          zoomType: null,
          style: {
            fontFamily: 'Roboto',
            fontWeight: 300
          },
          height: 200,
          spacing: [0,0,0,0]
        },
        title: null,
        legend: {
          enabled: false
        },
        xAxis: [{
          startOnTick: true,
          endOnTick: true,
          categories: ['HP', 'Attack', 'Defense', 'Sp. Atk.', 'Sp. Def', 'Speed'],
          labels:{
            enabled: true
          },
          tickWidth: 0,
          lineWidth: 0
        }],
        yAxis: [{
          min: 0,
          max: 255, // Maximum possible stat
          title: {
            enabled: false
          },
          labels: {
            enabled: false
          },
          gridLineWidth: 0
        }],
        credits: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        }
      },
      series: [{
          lineWidth: 0,
          color: $scope.config.colors.primary,
          data: null
      }]
    };

    $scope.chartPokemonStats.series[0].data = [
      $scope.pokemonList.pokemon[$scope.pokemonList.currentSelection].baseStats.hp,
      $scope.pokemonList.pokemon[$scope.pokemonList.currentSelection].baseStats.atk,
      $scope.pokemonList.pokemon[$scope.pokemonList.currentSelection].baseStats.def,
      $scope.pokemonList.pokemon[$scope.pokemonList.currentSelection].baseStats.spa,
      $scope.pokemonList.pokemon[$scope.pokemonList.currentSelection].baseStats.spf,
      $scope.pokemonList.pokemon[$scope.pokemonList.currentSelection].baseStats.spd
    ];

  };

}])

;
