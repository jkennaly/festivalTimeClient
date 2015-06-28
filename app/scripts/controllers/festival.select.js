/**
 * Created by jbk on 10/5/14.
 */
'use strict';
/**
 * @ngdoc function
 * @name ftGameTimeApp.controller:FestivalSelectCtrl
 * @description
 * # FestivalSelectCtrl
 * Controller of the ftGameTimeApp
 */
angular.module('ftGameTimeApp')
    .controller('FestivalSelectCtrl', function ($scope, $ionicModal, FestivalPurchased, FestivalUnpurchased) {
        $scope.festivals = {};
        $scope.festivals.selected = null;
        $scope.festivals.purchased = FestivalPurchased;
        $scope.festivals.unpurchased = FestivalUnpurchased;
//        console.log("Rolling");

        $scope.festivals.chooseFest = function () {

            /*
             var reqType;
             reqType = $scope.festivals.purchased.indexOf($scope.festivals.selected) > -1 ? "select_purchased" : "select_unpurchased";

             //        alert("Select Purchased Festival: " + form.select_purchased);
             // submit a festival to receive the gametime data
             var data = {
             reqType: reqType,
             selectedFestival: $scope.festivals.selected.id
             };
             //            console.log($scope.festivals.selected);
             */


            $scope.dateCtrl.show();

        };

        $ionicModal.fromTemplateUrl('modal.html', function (modal) {
            $scope.dateCtrl = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
            focusFirstInput: true
        });

        /*
         var reqChallenge = AppServer.request(data).response;

         reqChallenge.success(function () {
         $location.path("/festival/home");
         }).error(function () {
         $location.path("/login/failed/network");
         });
         return false;
         */


    }).controller('DateCtrl', function ($scope, $location, $state, $window, AppServer) {
        $scope.festivals.dateSelected = null;

        $scope.festivals.chooseDate = function () {

            var reqType;
            reqType = $scope.festivals.purchased.indexOf($scope.festivals.selected) > -1 ? 'select_purchased' : 'select_unpurchased';

            //        alert("Select Purchased Festival: " + form.select_purchased);
            // submit a festival to receive the gametime data
            var data = {
                reqType: reqType,
                selectedFestival: $scope.festivals.selected.id,
                selectedDate: $scope.festivals.dateSelected.id
            };
            //                     console.log($scope.festivals.dateSelected);
            var reqChallenge = AppServer.request(data).response;

            reqChallenge.success(function () {
                $scope.dateCtrl.remove();
                $location.path('ft/gametime/band/overview');
                $window.location.reload();
            }).error(function () {
                $scope.dateCtrl.remove();
                $state.go('ft.login.failed.network');
            });
            return false;

            //           $scope.dateCtrl.hide();
        };


    });