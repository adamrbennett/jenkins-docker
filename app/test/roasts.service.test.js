describe('roasts.service', function() {

    describe('#getRoasts', function() {
        var mockRoasts = [
          {name: 'Roast 1'},
          {name: 'Roast 2'}
        ];

        beforeEach(angular.mock.module('services'));

        it('should return an array of objects with name properties', inject(function($httpBackend, apiRoot, roastsService) {
            $httpBackend.whenGET(apiRoot + '/roasts').respond(200, mockRoasts);
            var roasts;
            roastsService.getRoasts().then(function(res) {
              roasts = res;
            });
            $httpBackend.flush();

            assert.isOk(roasts, 'returned nothing');
            assert.typeOf(roasts, 'array', 'did not return an array');

            roasts.forEach(function(roast) {
                assert.typeOf(roast, 'object', 'not an object');
                assert(roast.hasOwnProperty('name'), 'name property missing');
            });
        }));

    });

});
