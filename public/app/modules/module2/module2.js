/**
 * Created by pedro on 24/02/16.
 */
(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {


      $stateProvider
        .state('module2', {
          parent: 'modules',
          url: '/module2',
          data: {
            authorities: [],
            pageTitle: 'Module 2'
          },
          views: {
            'content@': {
              templateUrl: 'app/modules/module2/module2.html',
              controller: 'module2Controller'
            }
          }
        });
    });


})();
