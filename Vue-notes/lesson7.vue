/*===============================================================================
					js动画过渡
1、js钩子：<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
=================================================================================*/
<template>
	<div>
		<button v-on:click="show = !show">Toggle</button>

		<div class="ab">
			<transition
			v-on:before-enter="beforEnter"
			v-on:enter="enter"
			v-on:leave="leave"
			v-bind:css="false"> //取消css，以免受css影响
				<p class="animate-p" v-show="show">I am show</p>
			</transition>
		</div>
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

<!-- Add "scoped" attribute to limit CSS to this component only-->
<style scoped>
	.animate-p {
		position: absolute;
	}
</style>
