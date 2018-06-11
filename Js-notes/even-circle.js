/*=====================================================================================
                                时间循环机制

·我们知道JavaScript的一大特点就是单线程，而这个线程中拥有唯一的一个事件循环。

·当然新标准中的web worker涉及到了多线程，我对它了解也不多，这里就不讨论了。

·JavaScript代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞
 定另外一些代码的执行。

·一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。

·任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs。

·macro-task大概包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。

·micro-task大概包括: process.nextTick, Promise, Object.observe(已废弃), MutationObserver(html5新特性)

·setTimeout/Promise等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。

·来自不同任务源的任务会进入到不同的任务队列。其中setTimeout与setInterval是同源的。

·事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。之后全局上下文进
 入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的micro-task。当所有可执行的micro-task执行完毕之
 后。循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task，这样一直循环
 下去。

·其中每一个任务的执行，无论是macro-task还是micro-task，都是借助函数调用栈来完成
======================================================================================*/

console.log('golb1');

setTimeout(function() {
    console.log('timeout1');
    process.nextTick(function() {
        console.log('timeout1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function() {
        console.log('timeout1_then')
    })
})

setImmediate(function() {
    console.log('immediate1');
    process.nextTick(function() {
        console.log('immediate1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function() {
        console.log('immediate1_then')
    })
})

process.nextTick(function() {
    console.log('glob1_nextTick');
})
new Promise(function(resolve) {
    console.log('glob1_promise');
    resolve();
}).then(function() {
    console.log('glob1_then')
})

setTimeout(function() {
    console.log('timeout2');
    process.nextTick(function() {
        console.log('timeout2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function() {
        console.log('timeout2_then')
    })
})

process.nextTick(function() {
    console.log('glob2_nextTick');
})
new Promise(function(resolve) {
    console.log('glob2_promise');
    resolve();
}).then(function() {
    console.log('glob2_then')
})

setImmediate(function() {
    console.log('immediate2');
    process.nextTick(function() {
        console.log('immediate2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate2_promise');
        resolve();
    }).then(function() {
        console.log('immediate2_then')
    })
})
<img src="img/event-circle.png">