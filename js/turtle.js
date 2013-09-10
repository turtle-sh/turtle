Turtle = function(conf) {
  this.init.apply(this,arguments);
};

Turtle.prototype.init = function(conf) {
  _.extend(this, conf, Backbone.Events);
  this.render();

  this.ps1 = "<span class='ps'>$</span>";

  this.render();

  this.storage = new Storage();

  this._cwd = '';

  $.getJSON('manifest.json', function(manifest) {
    this.manifest = manifest;
    this.exec('echo turtle v' + this.manifest.version);
    this.trigger('ready');
  }.bind(this));

};

Turtle.prototype.cwd = function() {
  return this._cwd;
};

Turtle.prototype.chdir = function(dir) {
  return this._cwd = dir;
};

Turtle.prototype.render = function() {
  this.el.html(this.template());
  // Establish stdout
  this.stdout = new Stdout({
    el: this.el.find('.output')
  });
  this.stdin = new Stdin();
  // Enter
  this.inputEl = this.el.find('form.command input');
  this.el.find('form.command').submit( function(e) {
    e.preventDefault();
    var val = this.inputEl.val();
    this.inputEl.val('');
    this.stdout.log(this.ps1 + val);
    this.exec(val);
  }.bind(this) );
};


Turtle.prototype.template = function() {
  return '<div class="output"></div><form class="command">' + this.ps1 + '<input type="text" /></form>';
};

Turtle.prototype.commands = Process.prototype.commands;


Turtle.prototype.exec = function(command) {
  var process = new Process();
  process.stdout.pipe(this.stdout);

  // Give the process something to exit
  process.exit = function(e) {
    if(e) {
      process.stdout.err(e);
    }
    this.el.find('form.command').show();
    this.el.find('form.command input')
      .focus();
    this.el.scrollTop(this.inputEl.position().top);
    
  }.bind(this);
  // Go into process-mode
  this.el.find('form.command').hide();

  // Search for and initiate the process
  found = _(this.commands).some(function(commandObj) {
    if (commandObj.expr.test(command) ) {
      try {
        commandObj.fn.call(process, command.split(' '));
      } catch(e) {
        window.e = e;
        process.stdout.err(e)
        process.exit();
      }
      return true;
    }
  }, this);

  // Or go back
  if(!found) {
    this.stdout.log("turtle: " + command + ": command not found")
    process.exit();
  }
};


Turtle.prototype.addCommand = function(commandObj) {
  try {
  if(_(commandObj).isArray()) {
    var addCommand = this.addCommand || this.prototype.addCommand;

    return _(commandObj).each(addCommand, this);
  }
  // Can be treated as static.
  var commandsArray = ('commands' in this) ? this.commands : this.prototype.commands;
  if (typeof commandObj.fn !== 'function') 
    throw "commandObj.fn must be a function.";
  if (typeof commandObj.expr !== 'object' && commandObj.expr.test) 
    throw "commandObj.fn must be a RegExp.";

  commandsArray.push(commandObj);
  } catch(e) {}
};


/* pipe thoughts
 *
 * wc.stdout.pipe(this.stdout);
 * cat.stdout.pipe(wc.stdin);
 *
 * wc
 * var text = [];
 * this.stdin.on('data', function(data) {
 *   text = text.concat(data);
 * });
 * this.stdin.on('end', function() {
 *    this.stdout.log(text.length);
 *    this.exit()
 * }.bind(this));
 *
 * So: 
 *  - objects need to have their own stdin, stdout
 *  - Yet continue to have access to things like exit() and el() and editor()
 *
 */

/* prompt
 *
 * prompt('subject');
 * prompt({
 *  name: 'subject',
 *  message: 'What's the subject of your email?',
 *  required: true
 * });
 *
 * prompt.subject
 *
 */

/* package
 *
 * install ls
 *
 * https://turtle.sh/package/ls
 *
 * 200: 
 *  https://github.com/itsjoesullivan/ls/blob/master/index.js
 *  curl index.js
 *  storage.set('package/ls', ls);
 *  packages.add('ls');
 *
 */
