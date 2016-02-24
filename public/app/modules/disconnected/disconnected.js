/**
 * Created by pedro on 24/02/16.
 */
(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {


      $stateProvider
        .state('disconnected', {
          parent: 'modules',
          url: '/disconnected',
          data: {
            authorities: [],
            pageTitle: 'disconnected'
          },
          views: {
            'content@': {
              templateUrl: 'app/modules/disconnected/disconnected.html',
              controller: 'disconnectedController',
              controllerAs: 'vm'
            }
          }
        });
    });


})();
