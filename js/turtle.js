Turtle = function(conf) {
  this.init.apply(this,arguments);
};

Turtle.prototype.init = function(conf) {
  _.extend(this, conf, Backbone.Events);
  this.commands = [];

  this.ps1 = "<span class='ps'>$</span>";

  this.el.append(this.template());

  this.stdout = new Stdout({
    el: this.el.find('.output')
  });
  this.storage = new Storage();

  this.inputEl = this.el.find('form.command input');
  this.el.find('form.command').submit( function(e) {
    e.preventDefault();
    var val = this.inputEl.val();
    this.inputEl.val('');
    this.stdout.log(this.ps1 + val);
    this.exec(val);
  }.bind(this) );


  $.getJSON('manifest.json', function(manifest) {
    this.manifest = manifest;
    this.exec('echo turtle v' + this.manifest.version);
    this.trigger('ready');
  }.bind(this));

};

Turtle.prototype.template = function() {
  return '<div class="output"></div><form class="command">' + this.ps1 + '<input type="text" /></form>';
};

Turtle.prototype.exec = function(command) {
  this.exit = function() {
    this.el.find('form.command input').focus();
  };
  found = _(this.commands).some(function(commandObj) {
    if (commandObj.expr.test(command) ) {
      try {
        commandObj.fn.apply(this, commandObj.expr.exec(command).slice(1) );
      } catch(e) {
        window.e = e;
        this.stdout.err(e)
      }
      return true;
    }
  }, this);
  if(!found) {
    this.stdout.log("turtle: " + command + ": command not found")
    this.exit();
  }
};


Turtle.prototype.addCommand = function(commandObj) {
  if (typeof commandObj.fn !== 'function') 
    throw "commandObj.fn must be a function.";
  if (typeof commandObj.expr !== 'object' && commandObj.expr.test) 
    throw "commandObj.fn must be a RegExp.";
  this.commands.push(commandObj);
};
