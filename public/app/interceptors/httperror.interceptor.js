(function () {
  'use strict';


  angular.module('app')
    .factory('httpErrorInterceptor', function ($q, $rootScope, $log) {
      return {
        'responseError': function (response) {
          $log.debug('responseError:', response);
          if (response.status === -1) {
            $rootScope.$emit('app.httpError', response);
          }

          return response;
        },
        'requestError': function (rejection) {
          $log.debug('requestError:', rejection);
          return rejection;
        },
        'request': function (config) {
          $log.debug('request:', config);
          return config;
        }
      };
    })

    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('httpErrorInterceptor');
    })

    .run(function ($rootScope, $state, $log) {

      $rootScope.$on('app.httpError', function (event, httpResponse) {
        $log.debug('on app.httpError:');
        $rootScope.state.disconnected = true;
        $state.go('disconnected');
      });
    });

}());
