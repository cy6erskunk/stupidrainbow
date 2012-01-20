(function ($) {
    /**
     * @param {Object} options - options to suppress defaults
     * @param {Array} options.arr - array of RGB color components to initialize with
     * @param {int} options.sign - 1 or -1
     * @param {int} options.position - position in options.arr
     * @param {boolean} options.crazyBlink - enables strznge fuzzy blinking, which requires no other options
     * @param {boolean} options.debug - replace element content with some debug data when 'true'
     */
    $.fn.stupidrainbow = function (options) {
        // replace default values with options provided
        var options = $.extend({
                  arr: [0, 0, 0],
                  sign: 1,
                  pos: 0,
                  crazyBlink : false,
                  crazyBlinkIncrement: 10,
                  debug: false
                }, 
                options),
            parseComponents = function (c) {
                for (var i = 0; i < c.length; i++ ) {
                    c[i] = parseInt(c[i], 10).toString(16);
                    if (c[i].length == 1) {
                        c[i] = '0' + c[i];
                    }
                }
                return c;
            };

            (function (elem, options) {
                var elem = elem,
                    arr = options.arr,
                    sign = options.sign,
                    pos = options.pos;
                (function () {
                    if (options.crazyBlink) {
                        // crazy color blinking
                        var hexBg = (parseInt(parseComponents(($(elem).css('background-color') || 'rgb( 0, 0, 0)').match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1)).join(''), 16) + options.crazyBlinkIncrement).toString(16);
                        if (parseInt(hexBg, 16) > 0xffffff) {
                            hexBg = (parseInt(hexBg, 16) - 0xffffff).toString(16);
                        }
                        // add leading zeroes 
                        while (hexBg.length < 6) {
                            hexBg = '0' + hexBg;
                        }
                        $(elem).css('background-color', '#' + hexBg);
                        setTimeout( arguments.callee, 50);
                    } else {
                            // check if we have reached 255 or 0 while increasing/decreasing component
                            // and call itself again to check next component before modifying
                            if ( sign === 1 && arr[pos] === 255 || sign === -1 && arr[pos] === 0 ) {
                                sign *= -1;
                                pos = (pos + 2) % 3;
                                setTimeout( arguments.callee, 0);
                            }
                            else {
                                arr[pos] += sign;
                                $(elem).css('background-color', 'rgb(' + arr.join(',') + ')');

                                setTimeout( arguments.callee, 50);
                            }
                    }
                    // display some debug information
                    if(options.debug) {
                        $(elem).text('rgb(' + arr.join(',') + '), ' + pos + ', ' + sign);
                    }
                })();
            })(this, options);
        return this;
    };
})(jQuery);
