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

Stdout.prototype.err = function(e) {
  this.log('<font style="color: red">' + e.message + '</font>');
  stack = '' + e.stack.split('\n').slice(1).join('\n');
  this.log(stack);
}

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
