/**
 * Created by hejun on 15/4/15.
 *  纯前端配置-微信分享
 *  1.加载js后系统会自动加载微信分享相关js
 *  2.当前只能在socialpark.com.cn 域名下使用 其他域名使用无效(受公众账号设置限制)
 */
!(function wxshare() {
    window.tp = window.tp || {};
    window.tp.wx={};
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
    loadScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js",function(){
        var url = "http://www.socialpark.com.cn/wechat/getshare.php?t=" + new Date().getTime() + "&callback=tp.wx.config&url=" + encodeURIComponent(location.href.replace(location.hash, ""));
        loadScript(url);
    });
    
    window.tp.wx.config = function(d) {
        wx.config({
            //debug    : true,
            appId: d.appid,
            timestamp: d.timestamp,
            nonceStr: d.noncestr,
            signature: d.signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
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

    window.tp.wx.setshare = function(d) {
        d = d || {};
        var shareData = {
            title: '报告组织！我的素质击败了杭城0%的人，回去看书！',
            desc: '原来这就是成为全国素质最高城市的秘诀！这个世界不只看颜值，我对世界不失望！',
            link: 'http://yxh.realty.socialpark.com.cn/visa/?' + Math.random(),
            imgUrl: 'http://yxh.realty.socialpark.com.cn/visa/favicon.ico',
            success: function() {

            }
        };

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

        shareData = extend(shareData, d);
        wx.hideMenuItems({
            menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook']
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
                    _hmt.push(['_trackEvent', "分享成功", '分享成功']);
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
                    _hmt.push(['_trackEvent', "分享成功", '分享成功']);
                } catch (e) {}
            }
        });
    }

})();