/**
 * animteOneByOne动画类
 * $("obj").animteOneByOne(opts);
 */
!(function ($) {
     var defaultOpts = {
            _loop: false,
            delay: .5,
            duration: 1,
            animation: "fade"
        };
    $.fn.animteOneByOne = function (opts) {
        var opts = $.extend({}, defaultOpts, opts || {});
        var alldelay = 0;
        $(this).find("[data-animation]").each(function (index) {
            var t = $(this);
            if ((!opts._loop) && t.data("isanimated"))return;
            var ani = t.data("animation") || opts.animation;
            var ani_delay = t.data("animation-delay") != undefined && t.data("animation-delay") || opts.delay;
            var ani_duration = t.data("animation-duration") || opts.duration;

            if (index == 0 && !t.data("animation-delay")) {
                ani_delay = 0;
            }
            alldelay += Number(ani_delay);

            if (opts._loop) t.removeClass("animated").removeClass(ani).removeAttr('style');
            t.addClass(ani).addClass("animated").css({
                "-webkit-animation-delay": alldelay + "s",
                "-moz-animation-delay": alldelay + "s",
                "-ms-animation-delay": alldelay + "s",
                "animation-delay": alldelay + "s",
                "-webkit-animation-duration": ani_duration + "s",
                "-moz-animation-duration": ani_duration + "s",
                "-ms-animation-duration": ani_duration + "s",
                "animation-duration": ani_duration + "s"
            }).data("isanimated", true);
        });
    };
   return $;
})(Zepto);