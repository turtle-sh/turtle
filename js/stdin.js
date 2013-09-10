Stdin = function() {
  this.listeners = {};
};

Stdin.prototype.write = function(data) {
  this.trigger('write', data);
};
Stdin.prototype.log = function(data) {
  this.trigger('log', data);
};
Stdin.prototype.err = function(data) {
  this.trigger('err', data);
};
Stdin.prototype.clear = function(data) {
  this.trigger('clear', data);
};

Stdin.prototype.on = function(name, fn) {
  if(! (name in this.listeners) ) {
    this.listeners[name] = [];
  }
  this.listeners[name].push(fn);
};

Stdin.prototype.trigger = function(name, data) {
  _(this.listeners[name]).each(function(listener) {
    listener.apply(this, [data] );
  }, this);
};

