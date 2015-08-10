/**
 *音乐控制
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
})(window,'audio',function(namespace,window){
    
     namespace={
        version:'1.0.0'
     };
     var isiphone = !navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
     /**
      * audio 控制器
      * @param  {[type]} option audio属性
      * @return {[type]}        audio对象
      */
     namespace['load'] = function(option) {
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

         //todo ios兼容
         _audio.load(function() { //加载
             // console.log(this);
             //this.play();
             //this.pause();
         });
         _audio.oncanplay = function() {
             if ((!this.isload) && isiphone) {
                 this.isload = true;
                 //console.log(this);
                 this.play();
                 if (!this.autoplay || !this.played) this.pause();
             }
         }
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
    return  namespace;
});

