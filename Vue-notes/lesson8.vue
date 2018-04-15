/*===============================================================================
								自定义指令directives
1、钩子函数参数(el, binding):
   le：指令所绑定的元素，可以用来直接操作DOM
   binding：对象，包含以下属性：
      ·name：指令名，不包括v-前缀
      ·value：指令的绑定值
      ·oldValue：指令绑定的前一个值
      ·expression：绑定值的字符串形式
      ·arg：传给指令的参数
      ·modifiers：一个包含修饰符的对象
   vnode：编译生成的虚拟节点
   oldVnode：上一个虚拟节点
2、钩子函数：
   bind：只调用一次，指令第一次绑定到元素时调用
   inserted：被绑定元素插入父节点时调用
   update：被绑定元素所在的模板更新时调用
   componentUpdate：被绑定元素所在模板完成一次更新周期时调用
   unbind：只调用一次，指令与元素解绑时调用
=================================================================================*/
<template>
	<div>
		<p v-color="'green'">Hello World</p>
		<p>
			<button>Search</button>
			<input type="text" v-focus>
		</p>
	</div>
</template>
<script>
	import Vue from 'vue'
	import comA from '../components/a.vue'
	import comB from '../components/b.vue'
	export default{
		components: {
			comA, comB
		},
		directives: {
			color: function(el, binding) {
				el.style.color = binding.value
			},
			focus: {
				inserted (el, binding) {
					el.focus()
				}
			}
		},
		data(){
			return {
				show: true,
				currentView: 'com-a'
			}
		},
		methods:{
			beforEnter: function (el) {
				$(el).animate({
					left: '-500px',
					opacity: 0
				});
			},
			enter: function (el, done){ //回调函数 done 是必须的。否则，它们会被同步调用，过渡会立即完成。
				$(el).animate({
					left: 0,
					opacity: 1
				},{
					duration: 1500,
					complete: done
				});
			},
			leave: function (el, done) {
				$(el).animate({
					left: '500px',
					opacity: 0
				}, {
					duration: 1500,
					complete: done
				});
			}
		}
	}
</script>