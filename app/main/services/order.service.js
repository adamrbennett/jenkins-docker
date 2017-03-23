angular.
module('services').
service('orderService', ['$http', 'apiRoot', function($http, apiRoot) {
    this.placeOrder = function(order) {
        return $http.post(apiRoot + '/orders', order).then(function(res) {
          return res.data;
        });
    };
}]);
