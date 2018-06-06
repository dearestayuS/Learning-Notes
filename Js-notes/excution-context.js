/*=====================================================================================
                                执行上下文
一个执行上下文的生命周期分为两部分：（1）创建阶段（2）代码执行阶段
      
      生成变量对象                变量赋值

创建->建立作用域   -------> 执行->函数引用    -------->执行完毕，等待被回收
 
      确定this指向                执行其他代码
======================================================================================*/

/*                               生成变量对象：
1、建立arguments对象，检查当前上下文中的参数，建立该对象下的属性与属性值。
2、检查当前上下文的函数声明，即function关键字声明的函数，属性值为指向该函数所在内存地址
   的引用，如果函数名的属性已经存在，那么该属性将会被新的引用所覆盖。
3、检查当前上下文中的变量声明，每找到一个变量声明，就在变量对象中以变量名建立一个属性，
   属性值为undefined。如果该变量名的属性已经存在，为了防止同名的函数被修改为undefined，
   则会直接跳过，原属性值不会被修改。
*/

//例：
function test() {
	/* 创建开始：
	  （1）创建当前上下文中的函数声明 function foo，属性值为其引用，即foo=<reference foo>
	  （2）创建当前上下文中的变量声明 var bar，属性值为undefined，即bar=undefined；由于变
	       量对象var foo的属性名已经存在，直接跳过
	  （3）创建作用域
	  （4）确定this指向	 
	   创建结束
       
       执行开始：
      （1）执行console.log(foo)，打印结果：function foo() {return 'hello';}
      （2）执行console.log(bar)，打印结果：undefined  
      （3）执行foo = 'Hello'
      （4）执行console.log(foo)，打印结果：Hello
      （5）执行bar = function (){return 'world';}，此时bar=undefined变为bar=<reference bar>
	   执行结束
	*/
    console.log(foo);  
    console.log(bar);

    var foo = 'Hello';
    console.log(foo);
    var bar = function () 
        return 'world';
    }

    function foo() {
        return 'hello';
    }
}

test();


/*                                建立作用域：
作用域一般分为：全局作用域和函数作用域，在JavaScript中，我们可以将作用域定义为一套规则，
                这套规则用来管理引擎如何在当前作用域以及嵌套的子作用域中根据标识符名称进
                行变量查找。
*/
