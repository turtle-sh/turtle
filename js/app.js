requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime()
});

storage = new Storage();

var coreCommands = [
  'pipe',
  'ls',
  'pwd',
  'cd',
  'cat',
  'mount',
  'turtle-sh/date',
  'ace',
  'rc',
  'vine',
  'split',
  'q',
  //'github',
  'page',
  'turtle-sh/echo',
  'turtle-sh/clear'
];

//If dev
var tests = [
  'test/parse/isCalled',
  'test/pwd/index'
];
coreCommands = coreCommands.concat(tests);

coreCommands.forEach(function(command, i) {
  if(command.indexOf('http') !== 0) {
    coreCommands[i] = parseCommandName(command);
  }
});
function parseCommandName(commandName) {
  if(commandName.substring(0,5) === 'test/') {
    return commandName;
  }
  if(commandName.indexOf('http') === 0) {
    return commandName;
  }
  var expr = /^([\w\-]+)\/([\w\-]+)$/;
  if(expr.test(commandName)) {
    var result = expr.exec(commandName);
    return "https://raw.github.com/" + commandName + "/master/index.js";
  }
  return "commands/" + commandName + "/index.js";
}

function loadCoreCommands() {
  var res = Q.defer();
  requirejs(coreCommands,function() {
    _(arguments).each(Turtle.prototype.addCommand, Turtle);
    res.resolve();
  });
  return res.promise;
}

loadCoreCommands().then(function() {
  turtle = new Turtle({
    el: $('body')
  });
});
