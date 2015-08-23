/**
 *音乐控制
 *方法名称： tp.audio.load(opts)
 * opts 为audio原生对应属性
 *说明：   无需实例化
 * load 加载音乐
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
})(window, 'audio', function () {

    var audio = {
        version: '1.0.2'
    };
    var isiphone = !navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
    /**
     * audio 控制器
     * @param option     audio属性
     * @returns {Audio}  audio对象
     */
    audio.load = function (option) {
        var options_audio = {
            loop: true,
            preload: 'load',
            autoplay: true,
            touchstart: true,
            src: '',
            isload: false
        };
        var opts = extend(options_audio, option);

        var _audio = new Audio();
        for (var key in opts) {
            if (opts.hasOwnProperty(key) && (key in _audio)) {
                _audio[key] = opts[key];
            }
        }
        _audio.oncanplay = function () {
            if ((!this.isload) && isiphone) {
                this.isload = true;
                this.play();
                if (!this.autoplay || !this.played) this.pause();
            }
        };
        return _audio;
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

    return audio;
});

