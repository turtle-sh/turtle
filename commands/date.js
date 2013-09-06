define({
  "expr": /^date$/,
  "fn": function(message) {
    this.stdout.log(new Date().toString());
    this.exit();
  }
});
