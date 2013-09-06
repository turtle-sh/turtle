require.config({
  baseUrl: 'commands'
});

var coreCommands = [
  'ls',
  'pwd',
  'echo',
  'clear',
  'mount',
  'date',
  'ace',
  'vim',
  'rc',
  'vine',
  'sp',
  'q'
];

function loadCoreCommands() {
  var res = Q.defer();
  require(coreCommands,function() {
    console.log(arguments);
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
