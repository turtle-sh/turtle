turtle.addCommand({
  "expr": /^q$/,
  "fn": function(arg) {
    var children = _(this.el.parent().children()).filter(function(el) {
      return el !== this.el[0]
    }.bind(this));
    if(children.length) {
      var siblingEl = $(children[0]);
      if(siblingEl.css('float') === 'left') {
        siblingEl.width(siblingEl.width() + this.el.width() );
      } else {
        siblingEl.height(siblingEl.height() + this.el.height() );
      }
      this.el.remove();
      siblingEl.find('input').focus();
    }
    return true;
  }
});
