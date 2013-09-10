define({
  name: "echo",
  "expr": /^echo (.*)/,
  "fn": function(argv) {
    this.stdout.write(argv.slice(1).join(' ') );
    this.trigger('exit');
    this.exit();
  }
});
