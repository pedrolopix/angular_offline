/**
 * Created by pedro on 24/02/16.
 */
(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {


      $stateProvider
        .state('module1', {
          parent: 'modules',
          url: '/module1',
          data: {
            authorities: [],
            pageTitle: 'Module 1'
          },
          views: {
            'content@': {
              templateUrl: 'app/modules/module1/module1.html',
              controller: 'module1Controller'
            }
          }
        });
    });


})();
