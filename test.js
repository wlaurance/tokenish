var t = require('./index'),
  assert = require('assert');

describe('tokenish', function(){
  it('should throw an error when no strategy', function(){
    try{
      t();
    } catch (e){
      assert.ok(e);
      assert.equal(e.toString(), 'Error: Strategy must be defined');
    }
  });
  it('should throw an error when no strategy when no method get', function(){
    try {
      t({add:function(){}});
    } catch (e){
      assert.ok(e);
      assert.equal(e.toString(), 'Error: Strategy must have a get function');
    }
  });
  it('should throw an error when no strategy when no method add', function(){
    try {
      t({get:function(){}});
    } catch (e){
      assert.ok(e);
      assert.equal(e.toString(), 'Error: Strategy must have an add function');
    }
  });
  it('should throw an error when no strategy when get isnt a function', function(){
    try {
      t({add:function(){}, get:'not a function'});
      //should throw error and not execute this
      assert.equal(true, false);
    } catch (e){
      assert.ok(e);
      assert.equal(e.toString(), 'Error: Strategy must have a get function');
    }
  });
  it('should throw an error when no strategy when add isnt a function', function(){
    try {
      t({get:function(){}, add:'not a function'});
      //should throw error and not execute this
      assert.equal(true, false);
    } catch (e){
      assert.ok(e);
      assert.equal(e.toString(), 'Error: Strategy must have an add function');
    }
  });
  it('should return a token given a valid strategy', function(done){
    var tokenish = t(require('tokenish-riak')());
    tokenish.createToken('myid', function(err, token){
      assert.ok(token);
      done();
    });
  });
  it('should return a list of tokens', function(done){
    var tokenish = t(require('tokenish-riak')());
    tokenish.getTokens('myid', function(err, tokens){
      assert.ok(tokens);
      assert.ok(tokens.length);
      assert.equal(tokens.length > 0, true);
      done();
    });
  });
});
