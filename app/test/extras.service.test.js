describe('extras.service', function() {

    describe('#getExtras', function() {
        var mockExtras = [
          {name: 'Extra 1'},
          {name: 'Extra 2'}
        ];

        beforeEach(angular.mock.module('services'));
        beforeEach(angular.mock.module(function($provide) {
            $provide.constant('apiRoot', 'http://localhost:3000');
        }));

        it('should return an array of objects with name properties', inject(function($httpBackend, apiRoot, extrasService) {
            $httpBackend.whenGET(apiRoot + '/extras').respond(200, mockExtras);
            var extras;
            extrasService.getExtras().then(function(res) {
              extras = res;
            });
            $httpBackend.flush();

            assert.isOk(extras, 'returned nothing');
            assert.typeOf(extras, 'array', 'did not return an array');

            extras.forEach(function(extra) {
                assert.typeOf(extra, 'object', 'did not return an array of objects');
                assert(extra.hasOwnProperty('name'), 'returned array object missing name property');
            });
        }));

    });

});
