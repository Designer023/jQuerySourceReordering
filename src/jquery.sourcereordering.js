(function ($) {
    'use strict';
    $.fn.extend({
        sourceReorder: function (target, ops) {
            var defaults = {
                resize: false// Allow the order to be recaluclated on window resize.
              };

            var options = $.extend(defaults, ops);

            return this.each(function () {
              var wrapper = $(this);
              var block = target;
              var screenResize = options.resize;

              function precidence(o) {
                var winWid = $(window).width();
                var oo;
                if (typeof o.dataset.order !== 'undefined') {
                  //use order
                  var dat = $(o).data('order');
                  if (typeof dat === 'object') {
                    //get keys
                    var num = null;
                    for (var key in dat) {
                      var opts = key.split('-');
                      var min = opts[0];
                      var max = opts[1];
                      //if between these points
                      if (winWid > min && winWid < max) {
                        num = dat[key];
                      }
                    }
                    if (num === null)  {
                      num = $(o).data('origin');
                    }
                    oo = num;
                  } else {
                    oo = $(o).data('order');
                  }
                }  else {
                  //use origin
                  oo = $(o).data('origin');
                }
                return oo;
              }

              function reorderTo() {
                  var $wrapper = $(wrapper);
                  $wrapper.find(block).sort(function (a, b) {
                    var aa = precidence(a);
                    var bb = precidence(b);
                    return +aa - +bb;
                  })
                  .appendTo($wrapper);
                }

                //set the default starting positions
              $(block).each(function (index) {
                $(this).data('origin', index + 1);
                $(this).addClass('origin-' + (index + 1));
              });

                //start the reorder;
              reorderTo();

              //setup for resize if needed
              if (screenResize) {
                $(window).resize(function () {
                  reorderTo();
                });
              }

            });
          }
      });
})(jQuery);