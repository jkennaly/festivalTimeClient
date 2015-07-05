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
    .controller('FestivalSelectCtrl', function ($scope, $ionicModal, $state, FestivalPurchased, FestivalUnpurchased, AppServer, Fest) {
    var reqChallenge = null;
      $scope.festivals = {};
        $scope.festivals.selected = null;
        $scope.festivals.purchased = FestivalPurchased;
        $scope.festivals.unpurchased = FestivalUnpurchased;
    $ionicModal.fromTemplateUrl('modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.dateCtrl = modal;

    });

    $scope.openModal = function() {
      $scope.dateCtrl.show();
    };
    $scope.closeModal = function() {
      $scope.dateCtrl.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.dateCtrl.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });


        $scope.festivals.chooseFest = function () {

          reqChallenge = null;
          $scope.festivals.dateSelected = null;
            $scope.dateCtrl.show();
        };
    $scope.festivals.chooseDate = function () {


        var reqType;
        reqType = Fest.purchaseStatus($scope.festivals.selected.id) ? 'select_purchased' : 'select_unpurchased';

        // submit a festival to receive the gametime data
        var data = {
          reqType: reqType,
          selectedFestival: $scope.festivals.selected.id,
          selectedDate: $scope.festivals.dateSelected.id
        };
        //                     console.log($scope.festivals.dateSelected);

        reqChallenge = AppServer.request(data).response;

        reqChallenge.error(function () {
          $scope.dateCtrl.hide();
          $state.go('ft.login.failed.network');
        }).then(function () {
          $scope.dateCtrl.hide();
//          alert("then");
          $state.go('ft.gt.band.overview');
          //               $location.path('ft/gametime/band/overview');
          //               $window.location.reload();
        });
//            return false;


    };

    }).controller('DateCtrl', function ($scope, $location, $state, $window, AppServer, Fest) {
        $scope.festivals.dateSelected = null;

        $scope.festivals.chooseDate = function () {

            var reqType;
            reqType = Fest.purchaseStatus($scope.festivals.selected.id) ? 'select_purchased' : 'select_unpurchased';

          alert("Select Purchased Festival: " + $scope.festivals.selected );
            // submit a festival to receive the gametime data
            var data = {
                reqType: reqType,
                selectedFestival: $scope.festivals.selected.id,
                selectedDate: $scope.festivals.dateSelected.id
            };
            //                     console.log($scope.festivals.dateSelected);

            var reqChallenge = AppServer.request(data).response;

            reqChallenge.error(function () {
                $scope.dateCtrl.hide();
                $state.go('ft.login.failed.network');
            }).then(function () {
              $scope.dateCtrl.hide();
                $state.go('ft.gt.band.overview');
 //               $location.path('ft/gametime/band/overview');
 //               $window.location.reload();
            });
//            return false;

        };


    });
