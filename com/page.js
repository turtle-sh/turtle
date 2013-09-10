define({
  "name": "page",
  "expr": /^page$/,
  "fn": function(message) {
    var self = this;
    var line = 0;
    var windowHeight = 20;
    function render() {
      self.stdout.clear();
      self.stdout.write(self.text.split('\n').slice(line, line + windowHeight).join('\n') + '\n:');
    }
    this.stdin.on('write', function(data) {
      this.text = data;
      render();
    }.bind(this));

    key('j', function() {
      if(line < self.text.split('\n').length - windowHeight) {
        line++;
      }
      render();
      return false;
    }.bind(this));

    key('k', function() {
      if(line) {
        line--;
      }
      render();
      return false;
    }.bind(this));

    key('q', function() {
      this.exit();
      this.trigger('exit');
      return false;
    }.bind(this));

  }
});
