turtle.addCommand({
  "expr": /^(ace|vim) ~\/(.*)/,
  "fn": function(editor, fileName) {
    console.log(fileName);
    this.exec(editor);
    this.storage.get(fileName, function(file) {
      this.editor.getSession().setValue(JSON.stringify(file, null, 2) );
    }.bind(this));
    this.editor.commands.addCommand({
      name: 'exit',
      bindKey: {
        mac: 'command-s'
      },
      exec: function(editor) {
        this.storage.set(fileName, JSON.parse(this.editor.getSession().getValue() ), function() {
          // TODO: this
          } )
      }.bind(this)
    });
  }
});
