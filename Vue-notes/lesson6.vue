/*===============================================================================
1、css阶段类名：
   Enter：Opacity:0->Opacity:1（v-leave -----v-enter-acive-----> v-enter）
   Leave：Opacity:1->Opacity:0（v-leave -----v-leave-acive-----> v-enter）
2、多元素过渡：（1）v-show（2）v-if、v-else（3）动态组件
3、多元素过渡模式mode：过渡模式默认为先进后出“in-out”，可通过mode修改为“out-in”
4、标签相同情况下要使用key来区分过渡元素
=================================================================================*/

<template>
	<div>
		<button v-on:click="show =!show">Toggle</button>
		<div class="ab">
			<transition name="my-trans">
				<p v-show="show">I am show</p>
			</transition>
			<transition name="fade">
				<p v-if="show" key="1">I am show</p> //标签相同情况下要使用key来区分过渡元素
				<p v-else key="2">I am not show</p>
			</transition>
		</div>
		<transition name="fade" mode="out-in"> //过渡模式默认为先进后出“in-out”，可通过mode修改为“out-in”
			<div :is="currentView"></div>
		</transition>
		<button v-on:click="toggleCom()">ToggleCom</button>
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
		data(){
			return {
				show: true,
				currentView: 'com-a'
			}
		},
		methods:{
			toggleCom(){
				if(this.currentView == 'com-a'){
					this.currentView = 'com-b'
				}else{
					this.currentView = 'com-a'
				}
			}
		}
	}
</script>

<style>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0;
	}

	.my-trans-enter-active, .my-trans-leave-active {
		transition: all .5s ease-out;
	}
	.my-trans-enter{
		transform: translateY(-500px);
		opacity: 0;
	}
	.my-trans-leave-active {
		transform: translateY(500px);
	}
</style>