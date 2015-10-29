/**
 * Created by hejun on 15/9/1.
 */
!(function () {
    function isType(type) {
        return function(obj) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]"
        }
    }
    var isObject = isType("Object");
    var isString = isType("String");
    var isArray =  isType("Array");
    var isFunction = isType("Function");

    function toJson(value){
        return JSON.stringify(value);
    }
    function isStringNumber(num) {
        return  /^-?\d+\.?\d*$/.test(num.replace(/["']/g, ''));
    }
    function reviver(key, value) {
        if (value === 'true' || value === 'false') return value === 'true';
        return value;
    }
   var localStorage =
    /**
     * @lends localStorage
     */
    {
        version:'1.0.2',
        /**
         * 设置一个localStorage
         * @param {String} name
         * @param {String} value
         */
        setItem : function(name, value) {
            if(this.isSupports()){
                if ( (typeof(value) == "undefined")) {
                    return false;
                } else if(isArray(value) || isObject(value)) {
                    value = toJson(value);
                }
                window.localStorage.setItem(name,value);
            }
        },
        /**
         * 根据名字读取值
         * @param {String} name
         * @return {String}
         */
        getItem : function(name) {

            if(this.isSupports()){
                var item=window.localStorage.getItem(name);
                if (!item || item === 'null') {
                    return null;
                }

                if (item.charAt(0) === "{" || item.charAt(0) === "[" || isStringNumber(item)) {
                    return JSON.parse(item, reviver);
                }

                return item;
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