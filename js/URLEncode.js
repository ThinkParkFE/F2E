/**
 * url编码及解码
 */
(function (window,namespace,factory) {
    window.tp = window.tp || {};
    window.tp[namespace] = factory(namespace,window);
/////////////////////////// CommonJS /////////////////////////////////
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        if (define.amd) {
            // AMD 规范，for：requirejs
            define(function () {
                return factory(namespace,window);
            });
        } else if (define.cmd) {
            // CMD 规范，for：seajs
            define(function (require, exports, module) {
                module.exports = factory(namespace,window);
            });
        }
    }
})(window,'url',function(namespace,window){
    namespace={
        version:'1.0.0'
    };
    function str2asc(strstr) {
        return ("0" + strstr.charCodeAt(0).toString(16)).slice(-2);
    }

    function asc2str(ascasc) {
        return String.fromCharCode(ascasc);
    }

    /**
     * url编码
     */
    namespace["encode"] = function(str) {
            var ret = "";
            var strSpecial = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
            var tt = "";

            for (var i = 0; i < str.length; i++) {
                var chr = str.charAt(i);
                var c = str2asc(chr);
                tt += chr + ":" + c + "n";
                if (parseInt("0x" + c) > 0x7f) {
                    ret += "%" + c.slice(0, 2) + "%" + c.slice(-2);
                } else {
                    if (chr == " ")
                        ret += "+";
                    else if (strSpecial.indexOf(chr) != -1)
                        ret += "%" + c.toString(16);
                    else
                        ret += chr;
                }
            }
            return ret;
        }
        /**
         * url解码
         */
        
    namespace["decode"] = function(str) {
        var ret = "";
        for (var i = 0; i < str.length; i++) {
            var chr = str.charAt(i);
            if (chr == "+") {
                ret += " ";
            } else if (chr == "%") {
                var asc = str.substring(i + 1, i + 3);
                if (parseInt("0x" + asc) > 0x7f) {
                    ret += asc2str(parseInt("0x" + asc + str.substring(i + 4, i + 6)));
                    i += 5;
                } else {
                    ret += asc2str(parseInt("0x" + asc));
                    i += 2;
                }
            } else {
                ret += chr;
            }
        }
        return ret;
    }

    return  namespace;
});
