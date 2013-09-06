turtle.addCommand({
  "expr": /^$/,
  "fn": function(message) {
    this.exit();
  }
});
