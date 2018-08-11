// 使用方法 $('.all .test').register('blur');

// $('.btn').click(function(e) {
//     e.preventDefault();
//     console.log($('.all .test').register('testAll'));
// });
// html格式
// <div>
//     <div>
//         <input data-name="isEmp" class="test" type="text">
//     </div>
//     <div class="notice"></div>
// </div>
(function($) {
    // 表单的验证正则
    var vertify = {
        isEmp: {
            test: function(str) {
                var reg = /^\s*$/g || "";
                return !reg.test(str);
            },
            content: '内容不能为空!'
        },
        isCode: {
            test: function(str) {
                var reg = /^[1-9][0-9]{5}$/;
                return reg.test(str);
            },
            content: '邮政编码格式不正确！'
        },
        isQQ: {
            test: function(str) {
                var reg = /^[1-9][0-9]{4,9}$/;
                return reg.test(str);
            },
            content: 'QQ号格式不正确！'
        },
        isCard: {
            test: function(str) {
                var reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
                return reg.test(str);
            },
            content: '身份证号格式不正确，最后一位若为Ｘ，必须大写！'
        },
        isTel: {
            test: function(str) {
                var reg = /^1[34578][0-9]\d{8}$/;
                return reg.test(str);
            },
            content: '手机号格式不正确！'
        },
        isName: {
            test: function(str) {
                var reg = /^[\u4E00-\u9FA5]{2,6}$/;
                return reg.test(str);
            },
            content: '姓名格式不正确！'
        },
    };
    // 公用的方法
    var methods = {
        changeStyle: function(self, content, color) {
            self.parent().siblings('.notice').html(content);
            self.parent().siblings('.notice').css({
                color: color
            });
        }
    };

    $.fn.register = function(judge) {
        // judge等于blur时执行失去焦点的函数等于testAll时执行的是验证所有的函数
        var self = this;
        // 要执行的对象的集合
        var resultFun = {
                // 失去焦点执行的函数
                inputBlur: function() {
                    self.blur(function() {
                        var selfEl = $(this);
                        var dataName = selfEl.attr('data-name');
                        var val = selfEl.val();
                        console.log(dataName);
                        console.log(vertify[dataName]);
                        console.log(val);
                        console.log(vertify[dataName].test(val));
                        if (vertify[dataName].test(val)) {
                            methods.changeStyle(selfEl, '√', 'green');
                        } else {
                            methods.changeStyle(selfEl, vertify[dataName].content, 'red');
                        }
                    });
                },
                // 验证所有执行的函数
                testAll: function() {
                    var allRight = 0;
                    self.each(function() {
                        var selfEl = $(this);
                        var dataName = selfEl.attr('data-name');
                        var val = selfEl.val();
                        if (!vertify[dataName].test(val)) {
                            selfEl.focus();
                            return;
                        } else {
                            allRight++;
                        }
                    });
                    return allRight == self.length;
                }
            }
            // 判断执行的是哪个函数
        switch (judge) {
            case 'blur':
                resultFun.inputBlur();
                break;
            case 'testAll':
                resultFun.testAll();
                break;
        }
        return resultFun.testAll();
    }
})(jQuery);