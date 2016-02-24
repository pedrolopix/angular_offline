/**
 * Created by pedro on 24/02/16.
 */
(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {


      $stateProvider
        .state('modules', {
          parent: 'main',
          abstract: true,
          data: {
            authorities: [],
            pageTitle: 'Modules'
          },
          views: {
            'menu@': {
              templateUrl: 'app/modules/modules.html',
              controller: 'modulesController'
            }
          }
        });
    });


})();
