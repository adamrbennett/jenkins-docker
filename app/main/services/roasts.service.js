angular.
module('services').
service('roastsService', ['$http', 'apiRoot', function($http, apiRoot) {
    this.getRoasts = function() {
      return $http.get(apiRoot + '/roasts').then(function(res) {
        return res.data;
      });
    };
}]);
