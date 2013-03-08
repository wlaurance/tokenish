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
});
