Stdout = function(conf) {
  _.extend(this, conf)
};

Stdout.prototype.write = function(message) {
  messageArr = message.toString().split('\n');
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

function formErr(err) {
    return formGithubErr(err);
}

function formGithubErr(err) {
  return {
    message: "<i class='icon-meh'></i> " + err.error + " " + err.request.statusText
  }
}

Stdout.prototype.err = function(e) {
  console.log(e);
  if(! e.message) {
    e = formErr(e);
  }
  console.log(e);
  this.log('<font style="color:#fd4741">' + e.message + '</font>');
  if(e.stack) {
    stack = '' + e.stack.split('\n').slice(1).join('\n');
    this.log(stack);
  }
}

Stdout.prototype.log = function(message) {
  message = message.toString();
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
