angular.
module('services').
service('roastsService', function() {
    this.getRoasts = function() {
        return [
            {name: 'Light'},
            {name: 'Medium'},
            {name: 'Dark'}
        ];
    };
});