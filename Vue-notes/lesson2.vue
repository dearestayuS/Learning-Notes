/*===============================================================================
1、v-bind：（1）动态绑定标签属性，可以直接简略用“:”代替
           （2）使用v-bind绑定class和内联样式
2、v-if、v-else、v-show：（1）进行条件渲染
                         （2）v-if在条件为假时，会删除标签，条件为真时重新写标签
                         （3）v-show通过css中的display来控制标签的显示，消耗较小

=================================================================================*/
<template>
	<div>
		<a v-bind:href="link" v-bind:title="hello">Go to baidu</a>		
		<a v-bind:href="link" v-bind:style="linkCss">bind the style</a>		
		<p class="font" v-bind:class="classStr">Class was bound by object</p>		
		<p class="font" v-bind:class="className">Class was bound by list1</p>		
		<p class="font" v-bind:class="[classA, classB]">Class was bound by list2</p><p class="font" v-bind:class="[classA, {'has-error':hasError}]">Class was bound by list and object</p>
		<componentA :dataA="dataA"></componentA>

		<p v-if="isPartA">partA: v-if will delete the partA's tag, if the ispartA=false</p>
		<p v-show="!isPartA">partB: v-show will change the PartB's style(dispaly:none) if the isPartA=true, but the tag is exist</p>

		<p v-if="isPartA">v-if: show the partA</p>
		<p v-else>v-else: delete the partA</p>
		<button v-on:click="toggle">toggleItem</button>
	</div>
</template>

<script>
	import Vue from 'vue'
	import componentA from '../components/a.vue'
	export default {
		components: {
      		componentA: componentA
    	},
		data () {
			return {
				link : 'http://www.baidu.com',
				hello: 'word',
				dataA: 'dataA',
				classStr:{
					'red-font':true,
					'blue-font':false
				},
				className: ['small-font', 'big-font'],
				classA: 'classA',
				classB: 'classB',
				hasError: true,
				linkCss: {
					'color':'red',
					'font-size':'17px',
					'font-weight':'700'
				},
				isPartA:true
			}
		},
		methods:{
			toggle () {
				this.isPartA = !this.isPartA
			}
		}
	}
</script>