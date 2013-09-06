turtle.addCommand({
  "expr": /^clear/,
  "fn": function() {
    this.stdout.clear();
  }
});
