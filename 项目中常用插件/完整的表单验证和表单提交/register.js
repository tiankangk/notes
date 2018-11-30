// new Register({
//     formName: $('#form'),//要提交表单的元素,必需有
//     type: 'blur',//是失去焦点验证用值为'blur',验证全部值为'testAll'必需有
//     contrastEl: $('#pass')//验证值是否一致,用来判断元素，可选
// });

// 验证值
function Register(obj) {
    if (typeof obj === 'object' && obj !== null) {
        this.allInput = obj.formName.find('.test');
        this.type = obj.type;
        this.contrastEl = obj.hasOwnProperty('contrastEl') ? obj.contrastEl : '';
        if (this.type === 'blur') {
            this.inputBlur();
            this.addNotice();
        } else {
            return [this.testAll()];
        }
    }
}

Register.prototype = {
    addNotice: function () {
        var this_ = this;
        var vertify = this.vertify();
        this.allInput.each(function () {
            var self = $(this);
            self.parent().css({
                'position': 'relative',
                'marginBottom': '30px'
            });
            self.parent().append('<div class="notice"></div>');
            self.siblings('.notice').css(this_.style.notice);
            self.siblings('.notice').html(vertify[self.attr('data-name')]['content']);
        });
    },
    inputBlur: function () {
        var vertify = this.vertify();
        var this_ = this;
        this.allInput.blur(function () {
            var self = $(this);
            var dataName = self.attr('data-name');
            if (vertify[dataName].test(self.val())) {
                self.siblings('.notice').css(this_.style.notice);
            } else {
                self.siblings('.notice').css(this_.style.active);
            }
        });
    },
    testAll: function () {
        var allRight = 0;
        var this_ = this;
        var vertify = this.vertify();
        this.allInput.each(function () {
            var self = $(this);
            var dataName = self.attr('data-name');
            if (!vertify[dataName].test(self.val())) {
                self.focus();
                self.siblings('.notice').css(this_.style.active);
                return;
            } else {
                self.siblings('.notice').css(this_.style.notice);
                allRight++;
            }
        });
        return allRight == this.allInput.length;
    },
    style: {
        notice: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            color: 'red',
            padding: '5px',
            zIndex: '100',
            transformOrigin: 'left top',
            transform: 'translateY(100%) rotateX(-90deg)',
            transition: 'transform 1s',
        },
        active: {
            transform: 'translateY(100%) rotateX(0deg)',
        }
    },
    vertify: function () {
        var self = this;
        return {
            isDiff: {
                test: function (val) {
                    console.log(self.contrastEl);
                    var reg = self.contrastEl ? self.contrastEl.val() : '';
                    return val === reg;
                },
                content: '密码不一致！'
            },
            isPass: {
                test: function (val) {
                    var reg = /^[a-zA-Z][a-zA-Z0-9_]{6,}$/g;
                    return reg.test(val);
                },
                content: '请输入字母开头至少6位，允许字母数字下划线！'
            },
            isEmp: {
                test: function (val) {
                    var reg = /^\s*$/g || "";
                    return !reg.test(val);
                },
                content: '内容不能为空!'
            },
            isCode: {
                test: function (val) {
                    var reg = /^[1-9][0-9]{5}$/;
                    return reg.test(val);
                },
                content: '邮政编码格式不正确！'
            },
            isQQ: {
                test: function (val) {
                    var reg = /^[1-9][0-9]{4,9}$/;
                    return reg.test(val);
                },
                content: 'QQ号格式不正确！'
            },
            isCard: {
                test: function (val) {
                    var reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
                    return reg.test(val);
                },
                content: '身份证号格式不正确，最后一位若为Ｘ，必须大写！'
            },
            isTel: {
                test: function (val) {
                    var reg = /^1[345678][0-9]\d{8}$/;
                    return reg.test(val);
                },
                content: '手机号格式不正确！'
            },
            isName: {
                test: function (val) {
                    var reg = /^[\u4E00-\u9FA5]{2,6}$/;
                    return reg.test(val);
                },
                content: '姓名格式不正确！'
            },
            isEmail: {
                test: function (val) {
                    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    return reg.test(val);
                },
                content: '邮箱格式不正确！'
            },
            isAge: {
                test: function (val) {
                    var reg = /^[1-9]\d*$/;
                    return reg.test(val);
                },
                content: '请输入正确的格式！'
            }
        }
    }



}



// new SubmitForm({
//     formName: $('#login'),
//     url: '/home/login/login',
//     contrastEl:$('#diff'),//验证值是否一致,用来判断元素，可选
//     success: function (data) {
       
//     }
// });
// 结合jquery.form.js提交表单
// 提交表单的构造函数
function SubmitForm(obj) {
    if (typeof obj === 'object' && obj !== null) {
        this.url = obj.url;
        this.contrastEl = obj.hasOwnProperty('contrastEl') ? obj.contrastEl : '';
        this.success = obj.success;
        this.formName = obj.formName;
        this.init();
    }
}

SubmitForm.prototype = {
    init: function () {
        new Register({
            formName: this.formName, //要提交表单的元素,必需有
            type: 'blur', //是失去焦点验证用值为'blur',验证全部值为'testAll'必需有
            contrastEl: this.contrastEl //验证值是否一致,用来判断元素，可选
        });
        this.formName.ajaxForm({
            target: '#form_value',
            beforeSubmit: this.showRequest.bind(this),
            success: this.success,
            url: this.url
        }).submit(function (data) {});
    },
    showRequest: function () {
        var result = new Register({
            formName: this.formName, //要提交表单的元素,必需有
            type: 'testAll', //是失去焦点验证用值为'blur',验证全部值为'testAll'必需有
            contrastEl: this.contrastEl //验证值是否一致,用来判断元素，可选
        });
        return result[0];
    }
}