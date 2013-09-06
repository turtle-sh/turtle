define({
  "expr": /^vim$/,
  "fn": function() {
    this.exec('ace');
    this.editor.commands.addCommand({
      name: 'exit',
      bindKey: {
        mac: 'Q'
      },
      exec: function(editor) {
        console.log('something');
        this.exit();
      }.bind(this)
    });
    this.editor.setKeyboardHandler(ace.require('ace/keyboard/vim').handler );

  }
});
