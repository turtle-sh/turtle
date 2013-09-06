Storage = function() {
  this.defaults = {
    rc: {
      ps1: "<span class='ps'>$</span>",
      "font-family": "courier"
    }
  };
};
Storage.prototype.get = function(key, fn) {
  chrome.storage.sync.get(key, function(obj) {
    if(!(key in obj) && key in this.defaults) {
      obj[key] = this.defaults[key];
    }
    fn(obj[key]);
  }.bind(this) );
};
Storage.prototype.set = function(key, val, fn) {
  var obj;
  if(typeof key !== 'object') {
    obj = {};
    obj[key] = val;
  } else {
    obj = key;
  }
  chrome.storage.sync.set(obj, fn);
};

