turtle.addCommand({
  "expr": /^echo (.*)/,
  "fn": function(message) {
    this.stdout.write(message);
    this.exit();
  }
});
