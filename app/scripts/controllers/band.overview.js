/**
 * Created by jbk on 10/5/14.
 */
'use strict';
/**
 * @ngdoc function
 * @name ftGameTimeApp.controller:BandOverviewCtrl
 * @description
 * # BandOverviewCtrl
 * Controller of the ftGameTimeApp
 */
angular.module('ftGameTimeApp')
    .controller('BandOverviewCtrl', function ($scope, Band) {
    var band = new Band;
    $scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
      $scope.bandIds = band.getIds();
//      console.log('CTRL - $ionicView.beforeEnter', viewInfo, state);
//      console.log('FestivalBands', band.getIds());

    });

        /* $scope.bandArray = [];

         for (var i = 0; i < FestivalBands.length; i++) {
         //            console.log("i: " + i + "FestivalBands[i]" + FestivalBands[i]);
         $scope.bandArray[i] = new Band(FestivalBands[i]);
         }*/




    });
