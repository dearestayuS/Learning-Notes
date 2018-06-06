/*=====================================================================================
                                this的指向
一个执行上下文的生命周期分为两部分：（1）创建阶段（2）代码执行阶段
      
      生成变量对象                变量赋值

创建->建立作用域   -------> 执行->函数引用    -------->执行完毕，等待被回收
 
      确定this指向                执行其他代码
其中this的指向对象是在执行上下文的创建阶段确立的，一旦确立就不可更改
======================================================================================*/

/*1、全局对象的this指向本身*/
this.a2 = 20;// 通过this绑定到全局对象
var a1 = 10;// 通过声明绑定到变量对象，但在全局环境中，变量对象就是它自身
a3 = 30;// 仅仅只有赋值操作，标识符会隐式绑定到全局对象

console.log(a1); //10
console.log(a2); //20
console.log(a3); //30


/*2、函数中的this：如果调用者函数，被某一个对象所拥有，那么该函数在调用时，
     内部的this指向该对象。如果函数独立调用，那么该函数内部的this，则指向
     undefined。但是在非严格模式中，当this指向undefined时，它会被自动指向
     全局对象。
*/
//例1：
'use strict';//使用严格模式
var a = 20;
function foo () {
    var a = 1;
    var obj = {
        a: 10,
        c: this.a + 20,
        fn: function () {
            return this.a;
        }
    }
    return obj.c;

}
console.log(foo());    /*报错，在严格模式下独立调用foo，this指向undefined，
                         因此找不到this.a，会报错*/
console.log(window.foo());  //40，this指向全局对象，this.a = 20

//例2：
function foo() {
    console.log(this.a)
}

function active(fn) {
    fn(); // 真实调用者，为独立调用
}

var a = 20;
var obj = {
    a: 10,
    getA: foo
}

active(obj.getA) //在非严格模式下，active()独立调用，因此this指向全局对象

/*3、使用call，apply显示指定this：call与applay后面的参数，都是向将要执行的函
     数传递参数。其中call以一个一个的形式传递，apply以数组的形式传递。
*/
//例1：
function fn(num1, num2) {
    console.log(this.a + num1 + num2);
}
var obj = {
    a: 20
}

fn.call(obj, 100, 10); // 130，this指向obj
fn.apply(obj, [20, 10]); // 50，this指向obj

//例2：实现继承
var Person = function(name, age) { // 定义父级的构造函数
    this.name = name;
    this.age  = age;
    this.gender = ['man', 'woman'];
}

var Student = function(name, age, high) { // 定义子类的构造函数

    // use call
    Person.call(this, name, age);
    this.high = high;
}
Student.prototype.message = function() {
    console.log('name:'+this.name+', age:'+this.age+', high:'+this.high+', gender:'+this.gender[0]+';');
}

new Student('xiaom', 12, '150cm').message();

//例3：
var obj = {
    a: 20,
    getA: function() {
        setTimeout(function() {
            console.log(this.a)
        }, 1000)
    }
}

obj.getA(); //由于getA()函数中有无名函数function，因此会出现this指向丢失的现象，从而指向全局

//保存this指针
var obj = {
    a: 20,
    var self = this;
    getA: function() {
        setTimeout(function() {
            console.log(self.a)
        }, 1000)
    }
}

obj.getA();

//借助闭包与apply方法，封装一个bind方法。
function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    }
}

var obj = {
    a: 20,
    getA: function() {
        setTimeout(bind(function() {
            console.log(this.a)
        }, this), 1000)
    }
}

obj.getA();

//例4：构造函数与原型方法上的this
function Person(name, age) {

    // 这里的this指向p1?
    this.name = name;
    this.age = age;   
}

Person.prototype.getName = function() {

    // 这里的this指向p1？
    return this.name;
}

var p1 = new Person('Nick', 20);
p1.getName()