define({
  "expr": /^ls/,
  "fn": function() {
    this.stdout.write('ls will be implemented when fileSystem.directory becomes available.');
    this.exit();
  }
});
