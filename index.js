var crypto = require('crypto');
module.exports = function(strategy){
  if(!strategy){
    throw new Error('Strategy must be defined');
  } else if (!strategy.add){
    throw new Error('Strategy must have an add function');
  } else if (!strategy.get){
    throw new Error('Strategy must have a get function');
  }
  return {
    create:function(key, callback){
      var unique = String(Math.random()) + String(key);
      var hash = crypto.createHash('sha256');
      hash.update(unique, 'utf8');
      var token = hash.digest();
      process.nextTick(function(){
        strategy.add(key, token, function(err){
          process.nextTick(function(){
            callback(err, token);
          });
        });
      });

    },
    getTokens:function(key, callback){
      strategy.get(key, function(err, tokens){
        process.nextTick(function(){
          callback(err, tokens);
        });
      });
    }
  };
};
