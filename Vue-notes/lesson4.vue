/*====================================
1、计算属性computed选项
2、属性监听watch选项
======================================*/
<template>
	<div>
		<input type="text" v-model="myValue">
		<p>This is computed:{{ myValueWithoutNum }}</p>
		<p>This is methods:{{ getMyValueDate() }}</p>
	</div>
</template>

<script>
	import Vue from 'vue'
	import componentA from '../components/a.vue'
	export default {
		components: {
      		componentA: componentA
    	},
		data (){
			return{
				myValue:''
			}
		},
		methods:{
			getMyValueDate(){
				return this.myValue.replace(/\d/g, '')+' '+Date.now();
			}
		},
		computed: {
			myValueWithoutNum (){
				return Date.now();
			}
		},
		watch: {
			myValue: function (val, oldVal){
				console.log(val, oldVal)
			}
		}
	}
</script>