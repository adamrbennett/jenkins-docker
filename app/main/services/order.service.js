angular.
module('services').
service('orderService', function() {
    this.placeOrder = function(order) {
        order.id = Math.floor(Math.random() * (1000 - 1)) + 1;
        return order;
    };
});