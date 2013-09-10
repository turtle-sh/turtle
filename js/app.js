require.config({
  baseUrl: 'commands'
});

storage = new Storage();

var coreCommands = [
  'ls',
  'pwd',
  'cd',
  'cat',
  'echo',
  'clear',
  'mount',
  'date',
  'ace',
  'vim',
  'rc',
  'vine',
  'sp',
  'q',
  'github',
  'page'
];

function loadCoreCommands() {
  var res = Q.defer();
  require(coreCommands,function() {
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
