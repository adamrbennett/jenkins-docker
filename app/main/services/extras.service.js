angular.
module('services').
service('extrasService', ['$http', 'apiRoot', function($http, apiRoot) {
    this.getExtras = function() {
      return $http.get(apiRoot + '/extras').then(function(res) {
        return res.data;
      });
    };
}]);
