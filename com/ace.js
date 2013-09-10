define({
  "name": "ace",
  "expr": /^ace$/,
  "fn": function(message) {

    // Set up the html
    this.stdout.el.html('<div class="fill ace"></div>');
    this.stdout.el.addClass('fill');
    this.el.find('form').hide();

    // Define a good exit fn
    this._exit = this.exit;
    this.exit = function() {
      this.stdout.el.find('.ace').remove();
      this.stdout.el.removeClass('fill');
      this.el.find('form').show();
      this.el.find('input').focus();
      delete this.editor;
      this.exit();
    }.bind(this);

    // Initialize ace
    var aceEl = this.stdout.el.find('.ace')[0];
    aceEl.focus();
    this.editor = ace.edit(aceEl);
    this.editor.setTheme("ace/theme/monokai");
    this.editor.getSession().setMode("ace/mode/javascript");

    this.editor.commands.addCommand({
      name: 'exit',
      bindKey: {
        mac: 'command-w'
      },
      exec: function(editor) {
        this.exit();
      }.bind(this)
    });

    this.editor.focus();
    return false;
  }
});
