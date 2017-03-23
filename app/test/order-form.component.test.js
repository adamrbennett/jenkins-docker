describe('order-form.component', function() {

    describe('#save', function() {
        var mockOrder = {
          id: 1
        };

        beforeEach(angular.mock.module('order'));
        beforeEach(angular.mock.module('services'));
        beforeEach(angular.mock.module(function($provide) {
            $provide.constant('apiRoot', 'http://localhost:3000');
        }));


        it('should place the order', inject(function($rootScope, $componentController, $httpBackend, $mdDialog, apiRoot, orderService) {
            var scope = $rootScope.$new();
            var dialog = $mdDialog;
            dialog.show = sinon.stub();

            var roastsService = {
                getRoasts: sinon.stub().returns(new Promise(function(resolve, reject) {resolve([]);}))
            };

            var extrasService = {
                getExtras: sinon.stub().returns(new Promise(function(resolve, reject) {resolve([]);}))
            };
            var orderService = {
                placeOrder: sinon.spy(orderService.placeOrder)
            };

            var ctrl = $componentController('orderForm', {
                $scope: scope,
                roastsService: roastsService,
                extrasService: extrasService,
                orderService: orderService,
                $mdDialog: dialog
            });

            $httpBackend.whenPOST(apiRoot + '/orders').respond(200, mockOrder);
            var order = {
                name: 'Adam',
                type: 'french-press'
            };
            scope.save(order);
            $httpBackend.flush();

            assert(orderService.placeOrder.calledWith(order), 'order.service#placeOrder not called');
        }));

    });

});
