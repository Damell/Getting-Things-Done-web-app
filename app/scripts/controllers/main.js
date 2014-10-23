'use strict';

/**
 * @ngdoc function
 * @name gtdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gtdAppApp
 */
angular.module('gtdApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
