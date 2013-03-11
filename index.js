var crypto = require('crypto');
module.exports = function(strategy){
  if(!strategy){
    throw new Error('Strategy must be defined');
  } else if (!strategy.add || typeof(strategy.add) !== 'function'){
    throw new Error('Strategy must have an add function');
  } else if (!strategy.get || typeof(strategy.get) !== 'function'){
    throw new Error('Strategy must have a get function');
  } else if (!strategy.delete || typeof(strategy.delete) !== 'function'){
    throw new Error('Strategy must have a delete function');
  }
  return {
    createToken:function(key, callback){
      var unique = String(Math.random()) + String(key) + new Date().toJSON();
      var hash = crypto.createHash('sha256');
      hash.update(unique, 'utf8');
      var token = hash.digest('hex');
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
    },
    deleteToken:function(key, token, callback){
      strategy.delete(key, token, function(err){
        process.nextTick(function(){
          callback(err);
        });
      });
    },
    deleteTokens:function(key, callback){
      strategy.get(key, function(err, tokens){
        strategy.deleteAll(key, function(err){
          process.nextTick(function(){
            callback(err);
          });
        });
      });
    }
  };
};
