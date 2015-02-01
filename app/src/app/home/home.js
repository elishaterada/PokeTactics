/* global angular: false, exports: false */

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
  'highcharts-ng',
  'localytics.directives'
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

  // Initiate Pokemon Data
  $scope.pokemonDB = {
    pokedex: exports.BattlePokedex,
    abilities: exports.BattleAbilities,
    learnsets: exports.BattleLearnsets,
    pokedexLearnsetsMap: exports.BattlePokedexLearnsetsMap,
    items: exports.BattleItems,
    statuses: exports.BattleStatuses
  };

  // Initiate Pokemon List
  // TODO: Create this with function?
  $scope.pokemonList = {
    detail: null,
    pokemon: [
      {key: null, learnset: null, item: null, status: null},
      {key: null, learnset: null, item: null, status: null},
      {key: null, learnset: null, item: null, status: null},
      {key: null, learnset: null, item: null, status: null},
      {key: null, learnset: null, item: null, status: null},
      {key: null, learnset: null, item: null, status: null}
    ]
  };

  // Remove Pokemon data
  $scope.pokemonRemove = function(index) {

    // Remove current view data if it's the Pokemon that's removed
    if ( $scope.pokemonList.detail === index ) {
      $scope.pokemonList.detail = null;
    }

    // Reset Pokemon data
    $scope.pokemonList.pokemon[index] = {key: null, learnset: null, item: null, status: null};
  };

  // Show Pokemon detail
  $scope.pokemonView = function(index) {
    $scope.pokemonList.detail = index;
    chartPokemonStats();
  };

  // Get Pokemon data from slug
  $scope.pokemonGetPokemonData = function(pokemon) {

    // Convert index to pokemon key if queried from current Pokemon index
    if ( typeof pokemon === 'number' ) {
      pokemon = $scope.pokemonList.pokemon[pokemon].key;
    }

    return $scope.pokemonDB.pokedex[pokemon];
  };

  $scope.pokemonGetAbilityData = function(ability) {
    var abilitySlug = $scope.convertToSlug(ability);

    return $scope.pokemonDB.abilities[abilitySlug];
  };

  $scope.pokemonGetLearnsetData = function(pokemon) {

    // Convert index to Pokemon key if queried from current Pokemon index
    if ( typeof pokemon === 'number' ) {
      pokemon = $scope.pokemonList.pokemon[pokemon].key;
    }

    // Map special Pokemon (e.g. mega, alt-form) to its base specie for learnsets
    if ( $scope.pokemonDB.pokedexLearnsetsMap[pokemon] !== undefined ) {
      pokemon = $scope.pokemonDB.pokedexLearnsetsMap[pokemon];
    }

    return $scope.pokemonDB.learnsets[pokemon];
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

    var baseStats = $scope.pokemonGetPokemonData($scope.pokemonList.detail).baseStats;

    $scope.chartPokemonStats.series[0].data = [
      baseStats.hp,
      baseStats.atk,
      baseStats.def,
      baseStats.spa,
      baseStats.spf,
      baseStats.spd
    ];

  };

}])

;
