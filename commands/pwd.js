define({
  "expr": /^pwd/,
  "fn": function() {
    this.stdout.write('pwd will be implemented when fileSystem.directory becomes available.');
    this.exit();
  }
});
