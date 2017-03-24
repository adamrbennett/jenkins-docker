'use strict';

const config = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('order.service', () => {

  describe('#create', () => {

    it('should return a fulfilled order with an ID', (done) => {
      chai.request(config.apiRoot).post('/orders', {}).end((err, res) => {
        assert.notOk(err, 'error accessing api');
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('id');
        res.body.should.have.property('isFulfilled');
        res.body.id.should.not.be.NaN;
        res.body.isFulfilled.should.be.true;
        done();
      });
    });

  });

});
