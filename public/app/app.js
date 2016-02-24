(function () {
  'use strict';


  angular.module('app', ['ui.router'])


    .run(function ($rootScope, ENV, VERSION, $log, auth, $state, $location) {
      $rootScope.state = {
        disconnected: false,
        state: null,
        stateParams: null,
        previousState: null,
        previousStateParams: null,
        env: ENV,
        version: VERSION
      };

      $rootScope.back = function () {
        if ($rootScope.state.previousState === null  || $state.get($rootScope.state.previousState.name) === null || $rootScope.state.previousState.Name === 'disconnected') {
          $location.url('/');
          $log.info('goto home');
        } else {
          $state.go($rootScope.state.previousState.name, $rootScope.state.previousStateParams);
          $log.info('goto ',$rootScope.state.previousState.name);
        }
      };

      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $log.info('state changed to:', fromState.name);
        $rootScope.state.previousState = fromState;
        //$rootScope.state.previousStateName = fromState.name;
        $rootScope.state.previousStateParams = fromParams;
      });

      $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        $rootScope.state.state = toState;
        $rootScope.state.stateParams = toStateParams;

        if ($rootScope.state.state.name !== 'disconnected') {
          $log.info('state main, resolve authorize');
          return auth.autenticate();
        }
      });

    })


    .config(function ($stateProvider, $urlRouterProvider) {


      $urlRouterProvider.otherwise('/module1');

      $stateProvider
        .state('main', {
          abstract: true,
          resolve: {
            authorize: function (auth, $log, $rootScope) {
              if ($rootScope.state.state.name !== 'disconnected') {
                $log.info('state main, resolve authorize');
                return auth.autenticate();
              }
            }
          }

        });


    });

})();
