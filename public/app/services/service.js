(function () {
  'use strict';


  angular.module('app')


    .service('auth',function ($log, $http) {



      return {
        'autenticate': function () {
          $log.info('service auth, authorize');
          return $http.get('http://invalid/invalid');
        }
      };
    });



})();
