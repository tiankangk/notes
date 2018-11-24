// 用法
/* <div class="scroll-floor">
<ul class="side">

  <li class="active">1</li>
  <li >1</li>
  <li >1</li>
{/loop}
</ul> 
<div class="shopContentItem">
    滚动区的内容
</div>
 // 调用方法  
    $(function(){  
            $(".scroll-floor").scrollFloor({  
                'sideBtn':'.side li',  
                'contEle':'.shopContentItem'  
            });   
    }); 
*/

//楼城点亮
(function ($, window, document, undefined) {
    //定义构造函数  
    var ScrollFloor = function (option) {
        this.defaults = {}
        this.options = $.extend({}, this.defaults, option)
    };
    ScrollFloor.prototype = {
        //定义点击滚动方法  
        clickScroll: function () {
            var sideEle = this.options.sideBtn;
            var contTarget = this.options.contEle;
            $(sideEle).click(function (e) {
                var $index = $(this).index();
                //计算页面滚动距离  
                var $scrollHeight = $(contTarget).eq($index).offset().top;
                $('html, body').animate({
                    scrollTop: $scrollHeight
                }, 500);
                //$(window).unbind('scroll');  

                $(sideEle).removeClass("active");
                $(this).addClass("active");

                //$(window).one("scroll");  
            });
        },
        scrollSwitch: function () {
            var sideEle = this.options.sideBtn;
            var contTarget = this.options.contEle;
            var n;
            document.body.onmousewheel = function () {
                for (var i = 0; i < $(sideEle).length; i++) {
                    if ($(sideEle).eq(i).hasClass("active")) {
                        n = i;
                    }
                };
                var $scrollHeight = $(contTarget).eq(n).offset().top;

                var $docScroll = $(document).scrollTop();
                if ($docScroll >= $scrollHeight + $(contTarget).eq(n).height() + 20) {
                    n = n + 1;
                    $(sideEle).removeClass("active");
                    $(sideEle).eq(n).addClass("active");
                }
                if ($docScroll < $scrollHeight) {
                    n = n - 1;
                    if (n < 0) {
                        return n = 0;
                    }
                    $(sideEle).removeClass("active");
                    $(sideEle).eq(n).addClass("active");
                }
            };
        },
        posiOnload: function () {
            var sideEle = this.options.sideBtn;
            var contTarget = this.options.contEle;
            for (var i = 0; i < $(sideEle).length; i++) {
                if ($(sideEle).eq(i).hasClass("active")) {
                    n = i;
                }
            };
        }
    };
    $.fn.scrollFloor = function (options) {
        var objFloor = new ScrollFloor(options);
        _init = function () {
            objFloor.clickScroll();
            objFloor.scrollSwitch();
            objFloor.posiOnload();
        };
        _init();
    };
})(jQuery, window, document);