define({
  "expr": /^pwd/,
  "fn": function() {
    this.stdout.log(this.cwd());
    this.exit();
  }
});
