/**
 * Created by black044 on 6/29/15.
 */

angular.module('ftGameTimeApp')
  .factory('Fest', function (Objectify) {


    var purchasedFestivalData = Objectify.result("purchasedFestivals");
    var unpurchasedFestivalData = Objectify.result("unpurchasedFestivals");
    // instantiate our initial object
    var Fest = function (id) {
      var festSource, festIndex;
      this.id = id;
      if(this.purchaseStatus(id)) {
        festSource = purchasedFestivalData;
      } else {
        festSource = unpurchasedFestivalData;
      }
      festIndex = Fest.getIndex(id, festSource);
      this.website = festSource[festIndex].website;
      this.sitename = festSource[festIndex].sitename;
    };

    Fest.purchaseStatus = function (id) {
      var retval = false
      var arrayLength = purchasedFestivalData.length;
      for (var i = 0; i < arrayLength; i++) {
        if(purchasedFestivalData[i].id = id){
          retval = true;
        }
      }
      return retval;
    }

    Fest.prototype.getIndex = function (id, festArray){
      var index;
      var arrayLength = festArray.length;
      for (var i = 0; i < arrayLength; i++) {
        if(festArray[i].id = id){
          index = i;
        }
      }

      return index;
    }

    return Fest;
  });
