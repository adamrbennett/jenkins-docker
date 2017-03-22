angular.
module('order').
component('orderForm', {
    templateUrl: '/main/order/order-form.template.html',
    controller: function($scope, roastsService, extrasService, orderService, $mdDialog) {
        var initial = {
            name: '',
            type: '',
            roast: '',
            extras: []
        };

        $scope.dialog = $mdDialog;

        $scope.roasts = roastsService.getRoasts();
        $scope.extras = extrasService.getExtras();

        $scope.save = function(order) {
            $scope.order = orderService.placeOrder(order);

            $mdDialog.show({
                contentElement: '#saveDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        };

        $scope.reset = function() {
            $scope.order = angular.copy(initial);
        };

        // initialize order object
        $scope.reset();
    }
});
