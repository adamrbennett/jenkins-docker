describe('extras.service', function() {

    describe('#getExtras', function() {

        beforeEach(angular.mock.module('services'));

        it('should return an array', inject(function(extrasService) {
            var extras = extrasService.getExtras();
            assert(Array.isArray(extras), 'did not return an array');
        }));

        it('should return objects with name properties', inject(function(extrasService) {
            var extras = extrasService.getExtras();

            assert.isOk(extras, 'returned nothing');
            assert.typeOf(extras, 'array', 'did not return an array');

            extras.forEach(function(extra) {
                assert.typeOf(extra, 'object', 'did not return an array of objects');
                assert(extra.hasOwnProperty('name'), 'returned array object missing name property');
            });
        }));

    });

});