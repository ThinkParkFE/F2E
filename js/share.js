/**
 * Created by hejun on 15/4/15.
 *  纯前端配置-微信分享
 *  1.加载js后 请先执行init方法
 *  2.当前只能在socialpark.com.cn 域名下使用 其他域名使用无效(受公众账号设置限制)
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
})(window,'wx',function(namespace,window){
    namespace = {
        version: '1.0.0'
    };
    var shareData = {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        success: function() {},
        cancel: function() {}
    };
    var isDebug = !1;
    /**
     * 分享初始化
     * @param  {[type]} defaultshareData  默认分享文案
     * @param  {[type]} debug             调试是否打开 默认false
     */
    namespace["init"] = function(defaultshareData, debug) {
        defaultshareData = defaultshareData || {};
        shareData = extend(shareData, defaultshareData);
        debug = debug || isDebug;
        isDebug = !!Debug;
        loadScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {
            var url = "http://www.socialpark.com.cn/wechat/getshare.php?t=" + new Date().getTime() + "&callback=tp.wx.config&url=" + encodeURIComponent(location.href.replace(location.hash, ""));
            loadScript(url);
        });
    }

    namespace["config"] = function(d) {
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
                'hideMenuItems',
                'openLocation'
            ]
        });

        wx.ready(function() {
            wx.checkJsApi({
                jsApiList: [
                    'getNetworkType',
                    'previewImage',
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'onMenuShareQQ',
                    'openLocation'
                ],
                success: function checkJsApisuccess(res) {
                    setshare();
                }
            });
        });
    }


    namespace["setshare"] = function(d) {
        d = d || {};
        shareData = extend(shareData, d);
        wx.hideMenuItems({
            menuList: ['menuItem:share:weiboApp', 'menuItem:share:facebook']
        });
        wx.showMenuItems({
            menuList: ['menuItem:profile', 'menuItem:addContact']
        });
        // 分享到微信朋友圈
        wx.onMenuShareTimeline({
            title: shareData.title,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            success: function() {
                shareData.success && shareData.success();
                try {
                    _hmt.push(['_trackEvent', "分享成功", '分享到朋友圈']);
                } catch (e) {}
            },
            cancel: function() {
                shareData.cancel && shareData.cancel();
                try {
                    _hmt.push(['_trackEvent', "取消分享", '取消分享']);
                } catch (e) {}
            }
        });
        // 发送给指定微信好友
        wx.onMenuShareAppMessage({
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            success: function() {
                shareData.success && shareData.success();
                try {
                    _hmt.push(['_trackEvent', "分享成功", '分享给好友']);
                } catch (e) {}
            },
            cancel: function() {
                shareData.cancel && shareData.cancel();
                try {
                    _hmt.push(['_trackEvent', "取消分享", '取消分享']);
                } catch (e) {}
            }
        });
        wx.onMenuShareQQ({
            title: shareData.title, // 分享标题
            desc: shareData.desc, // 分享描述
            link: shareData.link, // 分享链接
            imgUrl: shareData.imgUrl, // 分享图标
            success: function() {
                shareData.success && shareData.success();
                try {
                    _hmt.push(['_trackEvent', "分享成功", '分享成功']);
                } catch (e) {}
            },
            cancel: function() {
                shareData.cancel && shareData.cancel();
                try {
                    _hmt.push(['_trackEvent', "取消分享", '取消分享']);
                } catch (e) {}
            }
        });
    }

    function loadScript(url, callback) {
        var script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState) { //IE 
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others: Firefox, Safari, Chrome, and Opera 
            script.onload = function() {
                callback();
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
    return  namespace;
});
