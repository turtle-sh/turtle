Turtle = function(conf) {
  _.extend(this, conf);
  this.commands = [];

  this.ps1 = "<i class='icon-angle-right ps'></i>";

  this.el.append(this.template());

  this.stdout = new Stdout({
    el: this.el.find('.output')
  });



  this.inputEl = this.el.find('form.command input');
  this.el.find('form.command').submit( function(e) {
    e.preventDefault();
    this.exec(this.inputEl.val());
    this.inputEl.val('');
  }.bind(this) );
  this.el.find('form.command input').focus();
};

Turtle.prototype.template = function() {
  return '<div class="output"></div><form class="command">' + this.ps1 + '<input type="text" /></form>';
};

Turtle.prototype.exec = function(command) {
  this.stdout.log(this.ps1 + command);
  found = _(this.commands).some(function(commandObj) {
    if (commandObj.expr.test(command) ) {
      commandObj.fn.apply(this, commandObj.expr.exec(command).slice(1) );
      return true;
    }
  }, this);
  if(!found) {
    this.stdout.log("turtle: " + command + ": command not found")
  }
};


Turtle.prototype.addCommand = function(commandObj) {
  if (typeof commandObj.fn !== 'function') 
    throw "commandObj.fn must be a function.";
  if (typeof commandObj.expr !== 'object' && commandObj.expr.test) 
    throw "commandObj.fn must be a RegExp.";
  this.commands.push(commandObj);
};



Stdout = function(conf) {
  _.extend(this, conf)
};

Stdout.prototype.write = function(message) {
  messageArr = message.split('\n');
  if(!this.el.children().length) {
    this.el.append('<p></p>');
  }
  var nextLine = messageArr.shift();
  this.el.children().last().append(nextLine);
  while(messageArr.length) {
    nextLine = messageArr.shift();
    this.el.append('<p></p>')
    this.el.children().last().append(nextLine);
  }
};
Stdout.prototype.log = function(message) {
  if(this.el.children().length && this.el.children().last().html().length) {
    this.write('\n');
  }
  this.write(message);
  if(message.substring(message.length-1) !== '\n') {
    this.write('\n');
  }
};
Stdout.prototype.clear = function() {
  this.el.empty();
}


turtle = new Turtle({
  el: $('body')
});
