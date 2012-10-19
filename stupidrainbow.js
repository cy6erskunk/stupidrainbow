/*global setTimeout, jQuery*/
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
        options = $.extend({
            arr: [0, 0, 0],
            sign: 1,
            pos: 0,
            timeout: 50,
            crazyBlink : false,
            crazyBlinkIncrement: 10,
            debug: false
        }, options);
        /**
         * Converts array of color components in decimal representation
         * to array of strings - color components in hex, with leading zeroes, if needed
         *
         * @param  {Array} c array of decimal representation of color components
         *
         * @return {Array} hex repsesentation of color
         */
        var parseComponents = function (c) {
            var i = 0, len = c.length;
            for (; i < len; i++ ) {
                c[i] = parseInt(c[i], 10).toString(16);
                if (c[i].length === 1) {
                    c[i] = '0' + c[i];
                }
            }
            return c;
        };
        /**
         * Instant function, initializes loop and starts it
         *
         * @param  {jQuert} elem    jQuery element
         * @param  {Object} options plugin options
         *
         * @return {jQuery}         element for chaining
         */
        (function (elem, options) {
            var arr = options.arr,
                sign = options.sign,
                pos = options.pos,
                timeout = options.timeout,
                bg,
                hexBg,
                /**
                 * Main loop function changing colors in standard mode
                 */
                iterator = function () {
                    // check if we have reached 255 or 0 while increasing/decreasing component
                    // and call itself again to check next component before modifying
                    if (sign === 1 && arr[pos] === 255 || sign === -1 && arr[pos] === 0) {
                        sign *= -1;
                        pos = (pos + 2) % 3;
                        setTimeout(iteratorToUse, 0);
                    }
                    else {
                        arr[pos] += sign;
                        elem.css('background-color', 'rgb(' + arr.join(',') + ')');

                        setTimeout(iteratorToUse, timeout);
                    }
                },
                /**
                 * Crazy mode loop function
                 */
                crazyIterator = function () {
                    bg = elem.css('background-color') || 'rgb( 0, 0, 0)';
                    // IE
                    if (bg.charAt(0) === '#') {
                        bg = bg.slice(1);
                        if (bg.lenth === 3) {
                            for (var i = 0; i < 3; i++) {
                                hexBg = bg.charAt(i) + bg.charAt(i);
                            }
                        } else {
                            hexBg = bg;
                        }
                        hexBg = (parseInt(hexBg, 16) + options.crazyBlinkIncrement).toString(16);
                    } else {
                        hexBg = (parseInt(parseComponents(bg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+))?\)$/).slice(1)).join(''), 16) + options.crazyBlinkIncrement).toString(16);
                    }
                    if (parseInt(hexBg, 16) > 0xffffff) {
                        hexBg = (parseInt(hexBg, 16) - 0xffffff).toString(16);
                    }
                    // add leading zeroes
                    while (hexBg.length < 6) {
                        hexBg = '0' + hexBg;
                    }
                    elem.css('background-color', '#' + hexBg);
                    setTimeout(iteratorToUse, timeout);
                },
                /**
                 * Loop function wrapper, which executes correct one and displays debug infrmation, if needed
                 */
                iteratorToUse = function () {
                    if (options.crazyBlink) {
                        crazyIterator();
                    } else {
                        iterator();
                    }
                    if (options.debug) {
                        elem.text('rgb(' + arr.join(',') + '), ' + pos + ', ' + sign);
                    }
                };

            iteratorToUse();

            return this;

        })(this, options);
    };
}(jQuery));