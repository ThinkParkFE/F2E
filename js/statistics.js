/**
 * 百度统计代码
 * init 初始化
 */
(function (window, namespace, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        if (define.amd) {
            // AMD 规范，for：requirejs
            define(function () {
                return factory();
            });
        } else if (define.cmd) {
            // CMD 规范，for：seajs
            define(function (require, exports, module) {
                module.exports = factory();
            });
        }
    }else{
        window.tp = window.tp || {};
        window.tp[namespace] = factory();
    }
})(window, 'tongji', function () {
    window._hmt = window._hmt || [];
    var baidutongji = {
        version: "1.0.2"
    };
    baidutongji.init = function (BaiduTongjiSiteID) {
        if (!BaiduTongjiSiteID) {
            return;
        }
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?" + BaiduTongjiSiteID;
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    };
    return baidutongji;
});