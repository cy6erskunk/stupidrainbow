$ = jQuery
###
@param {Object} options - options to suppress defaults
@param {Array} options.arr - array of RGB color components to initialize with
@param {int} options.sign - 1 or -1
@param {int} options.position - position in options.arr
@param {boolean} options.crazyBlink - enables strznge fuzzy blinking, which requires no other options
@param {boolean} options.debug - replace element content with some debug data when 'true'
###
$.fn.stupidrainbow = (options) ->
    # replace default values with options provided
    options = $.extend({
              arr: [0, 0, 0],
              sign: 1,
              pos: 0,
              timeout: 50,
              crazyBlink : false,
              crazyBlinkIncrement: 10,
              debug: false
            },
            options)
    parseComponent = (c) ->
        component = parseInt(c, 10).toString(16)
        component = '0' + component if component.length == 1

    parseComponents = (c) ->
        parseComponent component for component in c

    ((_elem, options) ->
        elem = _elem
        arr = options.arr
        sign = options.sign
        pos = options.pos
        timeout = options.timeout

        do () ->
            if options.crazyBlink
                bg = $(elem).css('background-color') || 'rgb( 0, 0, 0)'
                # IE
                if bg.charAt(0) == '#'
                    bg = bg.slice(1);
                    hexBg = if bg.lenth == 3 then bg.charAt(i) + bg.charAt(i) for i in [0..2] else bg;
                    hexBg = (parseInt(hexBg, 16) + options.crazyBlinkIncrement).toString(16);
                else
                    hexBg = (parseInt(parseComponents(bg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+))?\)$/).splice(1, 3)).join(''), 16) + options.crazyBlinkIncrement).toString(16);
                hexBg = (parseInt(hexBg, 16) - 0xffffff).toString(16) if parseInt(hexBg, 16) > 0xffffff
                # add leading zeroes
                hexBg = '0' + hexBg while hexBg.length < 6
                $(elem).css('background-color', '#' + hexBg);
                setTimeout(arguments.callee, timeout);
            else
                    # check if we have reached 255 or 0 while increasing/decreasing component
                    # and call itself again to check next component before modifying
                    if sign == 1 && arr[pos] == 255 || sign == -1 && arr[pos] == 0 
                        sign *= -1;
                        pos = (pos + 2) % 3;
                        setTimeout(arguments.callee, 0);
                    else
                        arr[pos] += sign;
                        $(elem).css('background-color', 'rgb(' + arr.join(',') + ')');
                        setTimeout(arguments.callee, timeout);
            # display some debug information
            $(elem).text('rgb(' + arr.join(',') + '), ' + pos + ', ' + sign) if options.debug
    )(this, options)
    return this;
