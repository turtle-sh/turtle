define({
  "expr": /^cat /,
  "fn": function(args) {
    if(this.fs && this.fs instanceof Github.Repository) {
      this.exit();
      var newArgs = args.slice(0);
      newArgs.unshift('github');
      this.exec(newArgs.join(' ') );
    } else {
      this.stdout.log('no filesystem mounted.');
      this.exit();
    }
  }
});
