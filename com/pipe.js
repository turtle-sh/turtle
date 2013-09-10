define({
  "name": "pipe",
  "expr": /\|/,
  "fn": function(command) {
    var commands = command.join(' ').split(' | ');

    var p2 = this.spawn();
    var p1 = p2.spawn();
    this.stdin.on('write', this.stdout.write.bind(this.stdout) );
    this.stdin.on('clear', this.stdout.clear.bind(this.stdout) );

    window.s = p2.stdin
    window.o = p2.stdout
    p2.exec(commands[1], true);
    p1.exec(commands[0], true);
    p2.on('exit', this.exit.bind(this) );

    
  }
});
