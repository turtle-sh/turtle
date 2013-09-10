define({
  "expr": /^(v?sp)$/,
  "fn": function(arg) {

    var oldContents = this.el.find('.output').html();
    this.el.empty();
    this.el.append('<div class="turtle">');
    this.el.append('<div class="turtle">');
    if(arg === 'vsp') {
      var width = this.el.width();
      this.el.find('.turtle').css({
        width: width/2,
        float: 'left'
      });
      this.el.find('.turtle').first().css({
        'border-right': '1px solid #ccc',
        width: '-=1'
      });
    } else {
      var height = this.el.height();
      this.el.find('.turtle').css({
        height: height/2
      });
      this.el.find('.turtle').first().css({
        'border-bottom': '1px solid #ccc',
        height: '-=1'
      });
    }
    var t2 = new Turtle({
      el: $(this.el.find('.turtle')[1])
    });

    this.el = $(this.el.find('.turtle')[0]);

    this.render();
    this.el.find('.output').html(oldContents);
    this.exit();
  }
});
