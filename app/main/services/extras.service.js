angular.
module('services').
service('extrasService', function() {
    this.getExtras = function() {
        return [
            {name: 'Whipped Cream'},
            {name: 'Cinnamon'},
            {name: 'Chocolate Shavings'}
        ];
    };
});