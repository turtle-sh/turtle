define({
  "expr": /^clear/,
  "fn": function() {
    this.stdout.clear();
    this.exit();
  }
});
