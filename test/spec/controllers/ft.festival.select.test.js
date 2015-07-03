/**
 * Created by black044 on 7/3/15.
 */

'use strict';

describe('Controller: FestivalSelectCtrl', function () {

  // load the controller's module
  beforeEach(module('ftGameTimeApp'));

  var FestivalSelectCtrl, ionicModal, festivalPurchased, festivalUnpurchased,
    scope, modal;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    festivalPurchased = [32, 56];
    festivalUnpurchased = [1, 2];
    ionicModal = {};

    ionicModal.fromTemplateUrl = function (modalUrl, modalInFunction, modalInObject){
      scope.modalUrl = modalUrl;
      scope.modalInFunction = modalInFunction;
      scope.modalInObject = modalInObject;

    };

    FestivalSelectCtrl = $controller('FestivalSelectCtrl', {
      $scope: scope,
      $ionicModal: ionicModal,
      FestivalPurchased: festivalPurchased,
      FestivalUnpurchased: festivalUnpurchased
    });
  }));

  it('should put objects on the scope that will be used to construct the date select modal', function () {

    expect(scope.modalUrl).toBe('modal.html');

    scope.modalInFunction('hello')
    expect(scope.dateCtrl).toBe('hello');

    expect(scope.modalInObject).toEqual({
      scope: scope,
      animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    });


  });
});
