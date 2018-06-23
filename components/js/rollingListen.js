// html样式
//  <ul class="nav">
//         <li>
//             <a href="#tab1">yi</a>
//         </li>
//         <li>
//             <a href="#tab2">er</a>
//         </li>
//         <li>
//             <a href="#tab3">san</a>
//         </li>
//     </ul>
//     <ul id="app">
//         <li id="tab1" class="yi">yi</li>
//         <li id="tab2" class="er">er</li>
//         <li id="tab3" class="san">san</li>
//     </ul>

// 调用方法
//   $('#app').rollingListen({
//       topDistance: 300, //距离滚动元素多少距离触发
//       el: '.nav', //导航的父元素
//       color: 'red' //导航的子元素触发时候的颜色
//   });





(function($) {
    $.fn.rollingListen = function(ctf) {
        var self = $(this),
            rollrange = [],
            el = $(ctf.el),
            color = ctf.color,
            topDistance = ctf.topDistance;
        self.children().each(function() {
            var selfEl = $(this);
            rollrange.push([selfEl.offset().top, selfEl.offset().top + selfEl.height()]);
        });
        $(window).scroll(function() {
            var rollDistance = $(window).scrollTop() + topDistance;
            if (rollDistance >= rollrange[0][0] && rollDistance <= rollrange[rollrange.length - 1][1]) {
                el.show()
            } else {
                el.hide()
            }
            $.each(rollrange, function(index, val) {
                if (rollDistance >= val[0] && rollDistance <= val[1]) {
                    el.children().css({
                        background: ''
                    });
                    el.children().eq(index).css({
                        background: color
                    });
                }
            });
        });
    }
})(jQuery);