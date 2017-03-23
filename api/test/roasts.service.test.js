'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const assert = chai.assert;
const api = 'http://localhost:3000';

chai.use(chaiHttp);

describe('roasts.service', () => {

  describe('#getRoasts', () => {

    it('should return an array of objects with name properties', (done) => {
      chai.request(api).get('/roasts').end((err, res) => {
        assert.notOk(err, 'error accessing api');
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.length.should.be.above(0);
        res.body[0].should.have.property('name');
        done();
      });
    });

  });

});
