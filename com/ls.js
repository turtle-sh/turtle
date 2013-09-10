define({
  "expr": /^ls/,
  "fn": function() {
    console.log(this.fs() );
    if(this.fs() && this.fs() instanceof Github.Repository) {
      this.exit();
      this.exec('github ls-tree master --name-only', true);
    } else {
      this.stdout.log('nothing mounted.');
      this.exit();
    }
  }
});
