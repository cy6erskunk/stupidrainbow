// Generated by CoffeeScript 1.3.3
(function() {
  var $;

  $ = jQuery;

  /*
  @param {Object} options - options to suppress defaults
  @param {Array} options.arr - array of RGB color components to initialize with
  @param {int} options.sign - 1 or -1
  @param {int} options.position - position in options.arr
  @param {boolean} options.crazyBlink - enables strznge fuzzy blinking, which requires no other options
  @param {boolean} options.debug - replace element content with some debug data when 'true'
  */


  $.fn.stupidrainbow = function(options) {
    var parseComponent, parseComponents;
    options = $.extend({
      arr: [0, 0, 0],
      sign: 1,
      pos: 0,
      timeout: 50,
      crazyBlink: false,
      crazyBlinkIncrement: 10,
      debug: false
    }, options);
    parseComponent = function(c) {
      var component;
      component = parseInt(c, 10).toString(16);
      if (component.length === 1) {
        return component = '0' + component;
      }
    };
    parseComponents = function(c) {
      var component, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = c.length; _i < _len; _i++) {
        component = c[_i];
        _results.push(parseComponent(component));
      }
      return _results;
    };
    (function(_elem, options) {
      var arr, elem, pos, sign, timeout;
      elem = _elem;
      arr = options.arr;
      sign = options.sign;
      pos = options.pos;
      timeout = options.timeout;
      return (function() {
        var bg, hexBg, i;
        if (options.crazyBlink) {
          bg = $(elem).css('background-color') || 'rgb( 0, 0, 0)';
          if (bg.charAt(0) === '#') {
            bg = bg.slice(1);
            hexBg = (function() {
              var _i, _results;
              if (bg.lenth === 3) {
                _results = [];
                for (i = _i = 0; _i <= 2; i = ++_i) {
                  _results.push(bg.charAt(i) + bg.charAt(i));
                }
                return _results;
              } else {
                return bg;
              }
            })();
            hexBg = (parseInt(hexBg, 16) + options.crazyBlinkIncrement).toString(16);
          } else {
            hexBg = (parseInt(parseComponents(bg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+))?\)$/).splice(1, 3)).join(''), 16) + options.crazyBlinkIncrement).toString(16);
          }
          if (parseInt(hexBg, 16) > 0xffffff) {
            hexBg = (parseInt(hexBg, 16) - 0xffffff).toString(16);
          }
          while (hexBg.length < 6) {
            hexBg = '0' + hexBg;
          }
          $(elem).css('background-color', '#' + hexBg);
          setTimeout(arguments.callee, timeout);
        } else {
          if (sign === 1 && arr[pos] === 255 || sign === -1 && arr[pos] === 0) {
            sign *= -1;
            pos = (pos + 2) % 3;
            setTimeout(arguments.callee, 0);
          } else {
            arr[pos] += sign;
            $(elem).css('background-color', 'rgb(' + arr.join(',') + ')');
            setTimeout(arguments.callee, timeout);
          }
        }
        if (options.debug) {
          return $(elem).text('rgb(' + arr.join(',') + '), ' + pos + ', ' + sign);
        }
      })();
    })(this, options);
    return this;
  };

}).call(this);
