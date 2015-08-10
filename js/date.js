 /**
  * 时间格式化 及时间差
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
})(window,'date',function(namespace,window){
    namespace = {
        version: '1.0.0'
    };
    /**
      * 时间格式化方法--对Date的扩展，将 Date 转化为指定格式的String
      * @param  {[type]} format  
      * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
      * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
      * @return {[type]}        格式化后的时间
      *
      * 例子：
      *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
      *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
      */
     Date.prototype.format = function(fmt) {
         var o = {
             "M+": this.getMonth() + 1, //month
             "d+": this.getDate(), //day
             "h+": this.getHours(), //hour
             "m+": this.getMinutes(), //minute
             "s+": this.getSeconds(), //second
             "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
             "S": this.getMilliseconds() //millisecond
         }

         if (/(y+)/.test(fmt)) {
             fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
         }

         for (var k in o) {
             if (new RegExp("(" + k + ")").test(fmt)) {
                 fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
             }
         }
         return fmt;
     };
    /**
      * 时间差方法
      * @param  {[type]} interval  差值 D:天 H:小时 M:分钟 S:秒 T:毫秒
      * @param  {[type]} startdate 开始时间 2015-01-10
      * @param  {[type]} enddate   结束时间 2015-04-12
      * @return {[type]}           差值
      */
     namespace['diff'] = function(interval, startdate, enddate) {
         var objInterval = {
             'D': 1000 * 60 * 60 * 24,
             'H': 1000 * 60 * 60,
             'M': 1000 * 60,
             'S': 1000,
             'T': 1
         };
         interval = interval.toUpperCase();
         var dt1 = new Date(Date.parse(startdate.replace(/-/g, '/')));
         var dt2 = new Date(Date.parse(enddate.replace(/-/g, '/')));
         try {
             return Math.round((dt2.getTime() - dt1.getTime()) / objInterval[interval]);
         } catch (e) {
             return e.message;
         }
     }
    return  namespace;
});
