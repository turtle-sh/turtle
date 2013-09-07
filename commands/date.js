define({
  "expr": /^date/,
  "fn": function(argv) {
    stdout = this.stdout;
    exit = this.exit;
    argv.unshift('node');
    var program = new Commander();
    try {
    program
      .option('-r, --represent [seconds]', 'Seconds since epoch date', parseInt)
      .parse(argv);
    } catch(e) {
      return;
    }
    var date;
    if(typeof program.represent === 'number') {
      date = new Date(program.represent);
    } else {
      date = new Date()
    }
    this.stdout.log(date.toString());
    this.exit();
  }
});
