var app = angular.
  module('coffeeMakerApp', [
      'services',
      'order'
  ]);

app.constant('apiRoot', 'http://localhost:3000');
