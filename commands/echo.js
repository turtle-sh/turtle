define({
  name: "echo",
  "expr": /^echo (.*)/,
  "fn": function(message) {
    this.stdout.write(message);
    this.exit();
  }
});
