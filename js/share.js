/**
 * Created by hejun on 15/4/15.
 *  纯前端配置-微信分享
 *  1.加载js后 请先执行init方法
 *  2.当前只能在socialpark.com.cn 域名下使用 其他域名使用无效(受公众账号设置限制)
 *  3.本组件依赖 http://res.wx.qq.com/open/js/jweixin-1.0.0.js
 */
(function (window, namespace, factory) {
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
    } else {
        window.tp = window.tp || {};
        window.tp[namespace] = factory(namespace, window);
    }
})(window, 'wx', function (namespace, window) {
    namespace = {
        version: '1.0.5'
    };
    var shareData = {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        success: function () {
        },
        cancel: function () {
        }
    };
    var isDebug = false;
    /**
     * 分享初始化
     * @param  {[type]} defaultshareData  默认分享文案
     * @param  {[type]} callback          初始化成功后回调函数
     * @param  {[type]} debug             调试是否打开 默认false
     */
    namespace.init = function (defaultshareData, callback, debug) {
        defaultshareData = defaultshareData || {};
        shareData = extend(shareData, defaultshareData);
        debug = debug || isDebug;
        callback = typeof(callback) === "function" ? callback : null;
        isDebug = !!debug;
        var url = "http://www.socialpark.com.cn/wechat/getshare.php?t=" + new Date().getTime() + "&callback=tp.wx.config&url=" + encodeURIComponent(location.href.replace(location.hash, ""));
        if (window.wx) {
            loadScript(url, callback);
        } else {
            loadScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function () {
                loadScript(url, callback);
            });
        }
    }
    namespace.config = function (d) {
        wx.config({
            debug: isDebug,
            appId: d.appid,
            timestamp: d.timestamp,
            nonceStr: d.noncestr,
            signature: d.signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ]
        });

        wx.ready(function () {
            wx.checkJsApi({
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ],
                success: function checkJsApisuccess(res) {
                    namespace.setshare();
                }
            });
        });
    };


    namespace.setshare = function (d) {
        d = d || {};
        var currShareData = extend(shareData, d);
        wx.hideMenuItems({
            menuList: ['menuItem:share:weiboApp', 'menuItem:share:facebook']
        });
        wx.showMenuItems({
            menuList: ['menuItem:profile', 'menuItem:addContact']
        });
        // 分享到微信朋友圈
        wx.onMenuShareTimeline({
            title: currShareData.title,
            link: currShareData.link,
            imgUrl: currShareData.imgUrl,
            success: function () {
                currShareData.success && currShareData.success();
                try {
                    _hmt.push(['_trackEvent', "分享成功", '分享到朋友圈']);
                } catch (e) {
                }
            },
            cancel: function () {
                currShareData.cancel && currShareData.cancel();
                try {
                    _hmt.push(['_trackEvent', "取消分享", '取消分享']);
                } catch (e) {
                }
            }
        });
        // 发送给指定微信好友
        wx.onMenuShareAppMessage({
            title: currShareData.title,
            desc: currShareData.desc,
            link: currShareData.link,
            imgUrl: currShareData.imgUrl,
            success: function () {
                currShareData.success && currShareData.success();
                try {
                    _hmt.push(['_trackEvent', "分享成功", '分享给好友']);
                } catch (e) {
                }
            },
            cancel: function () {
                currShareData.cancel && currShareData.cancel();
                try {
                    _hmt.push(['_trackEvent', "取消分享", '取消分享']);
                } catch (e) {
                }
            }
        });
        wx.onMenuShareQQ({
            title: currShareData.title, // 分享标题
            desc: currShareData.desc, // 分享描述
            link: currShareData.link, // 分享链接
            imgUrl: currShareData.imgUrl, // 分享图标
            success: function () {
                currShareData.success && currShareData.success();
                try {
                    _hmt.push(['_trackEvent', "分享成功", '分享成功']);
                } catch (e) {
                }
            },
            cancel: function () {
                currShareData.cancel && currShareData.cancel();
                try {
                    _hmt.push(['_trackEvent', "取消分享", '取消分享']);
                } catch (e) {
                }
            }
        });
    };

    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) { //IE 
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others: Firefox, Safari, Chrome, and Opera 
            script.onload = function () {
                callback && callback();
            };
        }
        script.src = url;
        document.body.appendChild(script);
    }

    function extend(target, source) {
        target = target || {};
        var result = {};
        for (var p in target) {
            if (source.hasOwnProperty(p)) {
                result[p] = source[p];
            } else {
                result[p] = target[p];
            }
        }
        return result;
    }

    return namespace;
});