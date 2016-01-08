var fs = require('fs');
var path = require('path');
var Sprite = require('./lib/sprite-webpack')
var _ = require('lodash')

function SpriteWebpackPlugin(options) {
  var opt = Sprite.options;
  this.options = _.assign(opt, options);
}

SpriteWebpackPlugin.prototype.apply = function(compiler) {
  var self = this;
  var opt = self.options;
  var built = false;
  compiler.plugin("compilation", function(compilation) {
    compilation.plugin("optimize-tree", function(chunks, modules, callback) {
      if(built) {
        return callback();
      }
      built = true;
      Sprite.createStyles(opt);
      Sprite.createImage(opt, function(){
        Sprite.addImport(opt);
        callback()
      });
    })
  })
}

module.exports = SpriteWebpackPlugin;
