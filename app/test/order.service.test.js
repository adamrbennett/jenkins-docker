describe('order.service', function() {

    describe('#placeOrder', function() {
        var mockOrder = {
          id: 1
        };

        beforeEach(angular.mock.module('services'));
        beforeEach(angular.mock.module(function($provide) {
            $provide.constant('apiRoot', 'http://localhost:3000');
        }));

        it('should return an order object with a numeric id', inject(function($httpBackend, apiRoot, orderService) {
            $httpBackend.whenPOST(apiRoot + '/orders').respond(200, mockOrder);
            var order = {};
            orderService.placeOrder(order).then(function(res) {
              order = res;
            });
            $httpBackend.flush();

            assert.isOk(order, 'returned nothing');
            assert.typeOf(order, 'object', 'did not return an object');
            assert(order.hasOwnProperty('id'), 'returned order is missing id property');
            assert.isNotNaN(order.id, 'returned order id is not numeric');
        }));

    });

});
