/*=====================================================================================
                                闭包（closure）
闭包是指这样的作用域，它包含有一个函数，这个函数可以调用被这个作用域所封闭的变量、
函数、或者闭包等内容。通常我们通过闭包所对应的函数来获得对闭包的访问。
======================================================================================*/

//例1：模块
// demo05
(function() {

    var a = 10;
    var b = 20;

    var test = {
        m: 20,
        add: function(x) {
            return a + x;
        },
        sum: function() {
            return a + b + this.m;
        },
        mark: function(k, j) {
            return k + j;
        }
    }

    window.test = test; //将test对象保存在全局的test中，否则在执行完函数后test对象会被清空

})();

//var a、b为闭包
test.add(100);
test.sum();
test.mark();

var _mark = test.mark;
_mark();

//例2：
//虽然fn2并没有访问到foo的变量，但是foo执行时仍然变成了闭包。
//而当我将fn1的声明去掉时，闭包便不会出现了。
function foo() {
    var a = 10;

    function fn1() {
        return a;
    }

    function fn2() {
        return 10;
    }

    fn2();
}

foo();