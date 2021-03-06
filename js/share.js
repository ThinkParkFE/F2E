/**
 * Created by hejun on 15/4/15.
 *  纯前端配置-微信分享
 *  1.加载js后 请先执行init方法
 *  2.当前只能在socialpark.com.cn 域名下使用 其他域名使用无效(受公众账号设置限制)
 *  3.本组件依赖 http://res.wx.qq.com/open/js/jweixin-1.0.0.js 自动加载 自动依赖
 *  4.支持 cmd amd 引用
 *  5.全局对象 window.tp.wx
 *  6.返回对象中wechat为微信jssdk方法
 *  7.自动加上百度渠道统计,可统计 朋友圈 好友 qq
 */
!(function () {

    var WX = {
        version: '2.0.5'
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
    var isInit = false;
    var _currShareData = null;
    var initcallback = null;
    var wechatSdkUrl = "//res.wx.qq.com/open/js/jweixin-1.0.0.js";
    WX.wechat = null;
    WX.setWechat = function (wechat) {
        WX.wechat = wechat;
    };
    var jsApiList= [
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
    ];
    /**
     * 分享初始化
     * @param  {[type]} defaultshareData  默认分享文案
     * @param  {[type]} callback          初始化成功后回调函数
     * @param  {[type]} debug             调试是否打开 默认false
     */
    WX.init = function (defaultshareData, callback, debug) {
        defaultshareData = defaultshareData || {};
        shareData = extend(shareData, defaultshareData);
        debug = debug || isDebug;
        initcallback = typeof(callback) === "function" ? callback : null;
        isDebug = !!debug;
        var url = "http://wechat.thinkpark.com.cn/wechat-service/getshare.php?t=" + new Date().getTime() + "&callback=tp.wx.config&url=" + encodeURIComponent(location.href.replace(location.hash, ""));

        if ("function" == typeof define) {
            require(["http://wechat.thinkpark.com.cn/wechat-service/getshare.php?t=" + new Date().getTime() + "&callback=define&url=" + encodeURIComponent(location.href.replace(location.hash, ""))], function (data) {
                WX.config(data);
            });
        }
        else if (window.wx) {
            WX.setWechat(window.wx);
            loadScript(url);
        } else {
            loadScript(wechatSdkUrl, function () {
                WX.setWechat(window.wx);
                loadScript(url);
            })
        }
    };

    WX.config = function (d) {
        if (d.ret != 200) {
            if (isDebug)alert(JSON.stringify(d));
            return;
        }

        WX.wechat.config({
            debug: isDebug,
            appId: d.appid,
            timestamp: d.timestamp,
            nonceStr: d.noncestr,
            signature: d.signature,
            jsApiList: jsApiList
        });

        WX.wechat.ready(function () {
            WX.wechat.checkJsApi({
                jsApiList:jsApiList,
                success: function(res) {
                    typeof (initcallback) === "function" && initcallback();
                    WX.wechat.hideMenuItems({
                        menuList: ['menuItem:share:weiboApp', 'menuItem:share:facebook']
                    });
                    WX.wechat.showMenuItems({
                        menuList: ['menuItem:profile', 'menuItem:addContact']
                    });
                    isInit = true;

                    WX.setshare(_currShareData);
                }
            });
        });
    };



    WX.setshare = function (d) {

        _currShareData = d || {};

        if (!isInit) {
            return;
        }

        var currShareData = extend(shareData, _currShareData);

        var _link = currShareData.link.split('#')[0] + (currShareData.link.split('#')[0].indexOf("?") != -1 ? '&' : '?') +  "hmsr={from}" + (currShareData.link.split('#').length == 2 ? '#' + currShareData.link.split('#')[1]:'');

        // 分享到微信朋友圈
        WX.wechat.onMenuShareTimeline({
            title: currShareData.title,
            link: _link.replace("hmsr={from}", 'hmsr=%E5%BE%AE%E4%BF%A1%E6%9C%8B%E5%8F%8B%E5%9C%88'),
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
        WX.wechat.onMenuShareAppMessage({
            title: currShareData.title,
            desc: currShareData.desc,
            link: _link.replace("hmsr={from}", 'hmsr=%E5%BE%AE%E4%BF%A1%E5%A5%BD%E5%8F%8B'),
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


        WX.wechat.onMenuShareQQ({
            title: currShareData.title, // 分享标题
            desc: currShareData.desc, // 分享描述
            link: _link.replace("hmsr={from}","hmsr=qq"), // 分享链接
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
                    typeof (callback) === "function" && callback();
                }
            };
        } else { //Others: Firefox, Safari, Chrome, and Opera
            script.onload = function () {
                typeof (callback) === "function" && callback();
            };
        }
        script.src = url;
        DOMReady(function () {
            document.body.appendChild(script);
        });

    }

    var isDOMReady = false;

    function DOMReady(callback) {
        if (isDOMReady) {
            typeof (callback) === "function" && callback();
        } else {
            setTimeout(function () {
                if (document.body) {
                    isDOMReady = true;
                }
                DOMReady(callback);
            }, 1);
        }

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

    "function" == typeof define ? define([wechatSdkUrl], function (wx) {
        WX.setWechat(wx);
        return WX;
    }) : (function () {
        window.tp = window.tp || {};
        window.tp['wx'] = WX;
    })();

})();