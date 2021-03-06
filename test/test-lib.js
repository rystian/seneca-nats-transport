/* jslint node: true */
/* global describe: false, it: false */
'use strict';

var lib    = require('../'),
    seneca = require('seneca'),
    nats   = require('nats'),
    expect = require('chai').expect;

// Tests

describe('lib', function() {

  var server,
      client,
      nc;

  beforeEach(function() {
    server = seneca({log:'silent'});
    client = seneca({log:'silent'});
    nc     = nats.connect();
  });

  afterEach(function() {
    client.close();
    server.close();
    nc.close();

    client = null;
    server = null;
    nc     = null;
  });

  it('should listen messages', function(done) {

    var pattern = {role: 'foo', cmd: 'bar'},
        message = {role: 'foo', cmd: 'bar', argNum: 1, argStr: '2', argBool: true, argObj: {}, argAry: []};

    nc.subscribe('seneca_any_act', function(msg) {
      expect(JSON.parse(msg).act).to.deep.equal(message);
      done();
    });

    server
      .use(lib)
      .add(pattern, function(msg, done) { return done(null, msg); })
      .listen({type:'nats'});

    client
      .use(lib)
      .client({type:'nats'})
      .act(message);
  });

  it('should send messages', function(done) {

    var pattern = {role: 'foo', cmd: 'bar'},
        message = {role: 'foo', cmd: 'bar', argNum: 1, argStr: '2', argBool: true, argObj: {}, argAry: []};

    nc.subscribe('seneca_any_res', function(msg) {
      var res = JSON.parse(msg).res;
      expect(res).to.be.a('object');
      expect(res.role).to.equal('foo');
      expect(res.cmd).to.equal('bar');
      expect(res.argNum).to.equal(1);
      expect(res.argStr).to.equal('2');
      expect(res.argBool).to.equal(true);
      expect(res.argObj).to.be.a('object');
      expect(res.argAry).to.be.a('array');
      done();
    });

    server
      .use(lib)
      .add(pattern, function(msg, done) { return done(null, msg); })
      .listen({type:'nats'});

    client
      .use(lib)
      .client({type:'nats'})
      .act(message);
  });

});