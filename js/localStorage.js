/**
 * Created by hejun on 15/9/1.
 */
!(function () {
   var localStorage =
    /**
     * @lends localStorage
     */
    {
        version:'1.0.1',
        /**
         * 设置一个localStorage
         * @param {String} name
         * @param {String} value
         */
        setItem : function(name, value) {
            if(this.isSupports()){
                window.localStorage.setItem(name,JSON.stringify(value));
            }
        },
        /**
         * 根据名字读取值
         * @param {String} name
         * @return {String}
         */
        getItem : function(name) {
            if(this.isSupports()){
                return JSON.parse(window.localStorage.getItem(name)|| '{}');
            }
            return null;
        },
        /**
         * 根据名字移除值
         * @param {String} name
         */
        removeItem : function(name) {
            if(this.isSupports()){
                window.localStorage.removeItem(name);
            }
        },
        /**
         * 清空 localStorage
         */
        clear : function(){
            if(this.isSupports()){
                window.localStorage.clear();
            }
        },
        /**
         * 判断是否支持 localStorage
         */
        isSupports : function(){
            return ('localStorage' in window)&&window['localStorage']!== null;
        }
    };

    "function" == typeof define ? define(function() {
        return localStorage
    }) : "undefined" != typeof exports ? module.exports = localStorage : (window.tp=window.tp||{},window.tp['localStorage']= localStorage);
})();