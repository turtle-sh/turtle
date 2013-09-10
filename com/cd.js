define({
  "expr": /^cd/,
  "fn": function(arg) {
    var newPath = path.resolve(this.cwd(), arg[1] );
    this.chdir(newPath);
    this.exit();
  }
});
