/**
 *音乐控制
 */
 !(function() {
     window.tp = window.tp || {};
     var isiphone = !navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
     /**
      * audio 控制器
      * @param  {[type]} option audio属性
      * @return {[type]}        audio对象
      */
     window.tp.audio = function(option) {
         var options_audio = {
             loop: true,
             preload: 'load',
             autoplay: true,
             touchstart: true,
             src: '',
             isload: false
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


 })();