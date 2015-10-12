/**
 * 百度统计代码
 *  初始化 new tp.tongji(id)
 *  全局对象 window.tp.tongji
 */
!(function() {
    window._hmt = window._hmt || [];
    var baidutongji= function (id) {
        if (!id) {return;}
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?" + id;
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    };
    baidutongji.version="1.0.4";

    "function" == typeof define ? define(function() {
        return baidutongji
    }) : "undefined" != typeof exports ? module.exports = baidutongji : (window.tp=window.tp||{},window.tp['tongji']= baidutongji);
})();