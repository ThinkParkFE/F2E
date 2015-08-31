/**
 * url处理
 * 1 queryParams url参数
 * 2 encode 编码
 * 3 decode 解码
 *  全局对象 window.tp.url
 */
!(function () {
    var url = {
        version: '1.0.3'
    };
    function str2asc(strstr) {
        return ("0" + strstr.charCodeAt(0).toString(16)).slice(-2);
    }

    function asc2str(ascasc) {
        return String.fromCharCode(ascasc);
    }

    //url参数获取
    url.queryParams = function (uri) {
        var regExp = /(?:\?|&)?(\w+)=([^&=]*)/gi;
        var url = (uri&&uri.split('#')[0])||window.location.href.split('#')[0];
        var result, params = {};
        while ((result = regExp.exec(url)) !== null) {
            params[result[1]] = result[2];
        }
        return params;
    };
    /**
     * url编码
     */
    url.encode= function (str) {
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
    };
    /**
     * url解码
     */

    url.decode = function (str) {
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
    };

    "function" == typeof define ? define(function() {
        return url
    }) : "undefined" != typeof exports ? module.exports = url : window.tp=window.tp||{},window.tp['url']= url;
})();
