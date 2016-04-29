/**
 * Created by andy on 15/12/18.
 * html5Report
 * 收集客户端 ua width height devicePixelRatio
 * 使用方法：html5Report();
 */
!(function () {

    var html5Report=function () {
           var report =new Image();
            report.src="//api.menma.me/v1/?service=Report.Add&width="+window.screen.width+"&height="+window.screen.height+"&devicePixelRatio="+window.devicePixelRatio+"&ua="+navigator.userAgent
    };

    html5Report.version="0.0.3";

    "function" == typeof define ? define(function() {
        return html5Report
    }) : "undefined" != typeof exports ? module.exports = html5Report : (window.tp=window.tp||{},window.tp['html5Report']= html5Report);
})();