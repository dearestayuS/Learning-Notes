/*=====================================================================================
                                面向对象

1、工厂模式、构造函数模式、原型模式
2、原型链
3、继承
======================================================================================*/
/*======工厂模式======
缺点：1、无法直观识别对象实例的类型，可使用instanceof识别
      2、有n个实例对象，则会有n个getName方法重建，浪费资源*/
var createPerson = function(name, age) {

    // 声明一个中间对象，该对象就是工厂模式的模子
    var o = new Object();

    // 依次添加我们需要的属性与方法
    o.name = name;
    o.age = age;
    o.getName = function() {
        return this.name;
    }

    return o;
}

// 创建两个实例
var perTom = createPerson('TOM', 20);
var PerJake = createPerson('Jake', 22);


/*======构造函数模式======
缺点：有n个实例对象，则会有n个getName方法重建，浪费资源
*/
var Person = function(name, age) {
    this.name = name;
    this.age = age;
    this.getName = function() {
        return this.name;
    }
}

var p1 = new Person('Ness', 20);
console.log(p1.getName());  // Ness

console.log(p1 instanceof Person); // true
//new的过程：
// 先一本正经的创建一个构造函数，其实该函数与普通函数并无区别
var Person = function(name, age) {
    this.name = name;
    this.age = age;
    this.getName = function() {
        return this.name;
    }
}

// 将构造函数以参数形式传入
function New(func) {

    // 声明一个中间对象，该对象为最终返回的实例
    var res = {};
    if (func.prototype !== null) {

        // 将实例的隐式原型指向构造函数的原型
        res.__proto__ = func.prototype;
    }

    // ret为构造函数执行的结果，这里通过apply，将构造函数内部的this指向修改为指向res，即为实例对象
    var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));

    // 当我们在构造函数中明确指定了返回对象时，那么new的执行结果就是该返回对象
    if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
        return ret;
    }

    // 如果没有明确指定返回对象，则默认返回res，这个res就是实例对象
    return res;
}

// 通过new声明创建实例，这里的p1，实际接收的正是new中返回的res
var p1 = New(Person, 'tom', 20);
console.log(p1.getName());

// 当然，这里也可以判断出实例的类型了，其类型为Person
console.log(p1 instanceof Person); // true

/*======原型模式======*/
// 声明构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 通过prototye属性，将方法挂载到原型对象上
Person.prototype.getName = function() {
    return this.name;
}

var p1 = new Person('tim', 10);
var p2 = new Person('jak', 22);
console.log(p1.getName === p2.getName); // true
<img src="img/prototype.png">