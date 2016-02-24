/**
 * Created by pedro on 24/02/16.
 */
(function () {
  'use strict';

  angular.module('app')
    .controller('disconnectedController', function($log, $state, $rootScope) {
      var vm=this;

      this.retry=function () {
        $log.info('retry click');
        $rootScope.back();
      };


      return vm;
    });
})();
