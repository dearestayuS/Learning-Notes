/*===============================================================================
1、使用组件树设计项目，配置文件链接各个组件：
  （1）命名转换：以大写开头的驼峰格式在html中转换为中线划分的格式，标签属性或组件属性也需转换
  （2）动态组件：is，用is绑定当前展示的组件，<keep-alive>标签可以缓存转换前的组件
2、父子组件通信：（1）父->子：props，即通过动态属性传递父组件的值，子组件需加props来获取该属性值
                 （2）子->父：emit，即子组件使用emit命名一个新的事件名并向外发布事件
3、slot插槽传递模板：具名slot

=================================================================================*/
<template>
	<div>
		<p :is="comtoRender"></p>
		<input type="text" v-model.number="myVal">
		<com-a :number-to-do="myVal" @my-event="getMyEvent">
			<p slot="header">xxx header</p>
		</com-a>
		<keep-alive>
			<p :is="currentView"></p>
		</keep-alive>
	</div>
</template>

<script>
	import Vue from 'vue'
	import ComA from '../components/a.vue'
	export default {
		components: {
			ComA
		},
		data (){
			return{
				comtoRender: 'com-a',
				myVal:"",
				currentView: 'com-a'
			}
		},
		methods: {
			getMyEvent (hello) {
				console.log(`I got my event ${hello}` )
			}
		}
	}
</script>