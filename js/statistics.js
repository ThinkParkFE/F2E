/**
 * 百度统计代码
 */
(function (window, namespace, factory) {
    window.tp = window.tp || {};
    window.tp[namespace] = factory(namespace, window);
    /////////////////////////// CommonJS /////////////////////////////////
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        if (define.amd) {
            // AMD 规范，for：requirejs
            define(function () {
                return factory(namespace, window);
            });
        } else if (define.cmd) {
            // CMD 规范，for：seajs
            define(function (require, exports, module) {
                module.exports = factory(namespace, window);
            });
        }
    }
})(window, 'tongji', function (namespace, window) {
    window._hmt = window._hmt || [];
    namespace = {
        version: "1.0.1"
    };
    namespace.init = function (BaiduTongjiSiteID) {
        if (!BaiduTongjiSiteID) {
            return;
        }
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?" + BaiduTongjiSiteID;
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    };
    return namespace;
});