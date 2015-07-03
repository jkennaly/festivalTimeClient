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
        $scope.festivals.chooseFest = function () {
            $scope.dateCtrl.show();
        };
        $ionicModal.fromTemplateUrl('modal.html', function (modal) {
            $scope.dateCtrl = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
            focusFirstInput: true
        });

    }).controller('DateCtrl', function ($scope, $location, $state, $window, AppServer, Fest) {
        $scope.festivals.dateSelected = null;

        $scope.festivals.chooseDate = function () {

            var reqType;
            reqType = Fest.purchaseStatus($scope.festivals.selected.id) ? 'select_purchased' : 'select_unpurchased';

//          alert("Select Purchased Festival: " + $scope.festivals.selected );
            // submit a festival to receive the gametime data
            var data = {
                reqType: reqType,
                selectedFestival: $scope.festivals.selected.id,
                selectedDate: $scope.festivals.dateSelected.id
            };
            //                     console.log($scope.festivals.dateSelected);
            var reqChallenge = AppServer.request(data).response;

            reqChallenge.error(function () {
                $scope.dateCtrl.remove();
                $state.go('ft.login.failed.network');
            }).then(function () {
                $scope.dateCtrl.remove();
                $state.go('ft.gt.band.overview');
 //               $location.path('ft/gametime/band/overview');
 //               $window.location.reload();
            });
            return false;

            //           $scope.dateCtrl.hide();
        };


    });
