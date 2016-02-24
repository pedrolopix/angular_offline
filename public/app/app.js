(function () {
  'use strict';


  angular.module('app', ['ui.router'])


    .run(function ($rootScope) {


    })


    .config(function ($stateProvider, $urlRouterProvider) {


      $urlRouterProvider.otherwise('/module1');

      $stateProvider
        .state('main', {
          'abstract': true
        });


    });

})();
