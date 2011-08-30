(function ($) {
    /**
     * @param {Object} options - options to suppress defaults
     * @param {Array} options.arr - array of RGB color components to initialize with
     * @param {int} options.sign - 1 or -1
     * @param {int} options.position - position in options.arr
     * @param {boolean} options.debug - replace element content with some debug data when 'true'
     */
    $.fn.stupidrainbow = function (options) {
        // replace default values with options provided
        var options = $.extend({
                  arr: [0, 0, 0],
                  sign: 1,
                  pos: 0,
                  debug: false
                }, 
                options);

            (function (elem, options) {
                var elem = elem,
                    arr = options.arr,
                    sign = options.sign,
                    pos = options.pos;
                (function () {
                    // check if we have reached 255 or 0 while increasing/decreasing component
                    // and call itself again to check next component before modifying
                    if ( sign === 1 && arr[pos] === 255 || sign === -1 && arr[pos] === 0 ) {
                        sign *= -1;
                        pos = (pos + 2) % 3;
                        setTimeout( arguments.callee, 0);
                    }
                    else {
                        arr[pos] += sign;
                        $(elem).css('background-color', 'rgb(' + arr[0] + ',' + arr[1] + ',' + arr[2] + ')');

                        setTimeout( arguments.callee, 50);
                    }
                    // display some debug information
                    if(options.debug) {
                        $(elem).text('rgb(' + arr[0] + ',' + arr[1] + ',' + arr[2] + '), ' + pos + ', ' + sign);
                    }
                })();
            })(this, options);
        return this;
    };
})(jQuery);
