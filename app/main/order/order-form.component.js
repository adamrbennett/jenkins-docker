angular.
module('order').
component('orderForm', {
    templateUrl: '/main/order/order-form.template.html',
    controller: function($scope, $mdDialog, roastsService, extrasService, orderService) {
        var initial = {
            name: '',
            type: '',
            roast: '',
            extras: []
        };

        $scope.dialog = $mdDialog;

        roastsService.getRoasts().then(function(roasts) {
          $scope.roasts = roasts;
        });

        extrasService.getExtras().then(function(extras) {
          $scope.extras = extras;
        });

        $scope.save = function(order) {
            orderService.placeOrder(order).then(function(res) {
              $scope.order = res;
            });

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
