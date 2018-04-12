/*===============================================================================
1、v-on：（1）事件绑定，可以直接简略用“@”代替，事件方法放入methods中
         （2）修饰符可以指定键盘事件
         （3）$emit
2、v-model：（1）表单数据模型双向绑定
            （2）修饰符：.lazy .number .trim

=================================================================================*/
<template>
	<div>
		<input v-on:keydown.13="onKeydown"/> //指定按下键盘某个按钮时触发事件
		<input v-on:keydown.enter="onKeydown"/>
		<componentA @my-event="onComponentAMyEvent"></componentA> //通过$emit自定义事件

		<p>
			Please enter your value:{{ myValue }}
			<input v-model.lazy="myValue" type="text"> //在input框blur时才显示
			<input v-model.number="myValue" type="text"> //强制将输入信息转换为数字类型			
			<input v-model.trim="myValue" type="text"> //裁剪输入信息前后的空格
		</p>
		<p>
			<label>apple</label>
			<input v-model="myCheckbox" type="checkbox" value="apple">
			<label>banana</label>
			<input v-model="myCheckbox" type="checkbox" value="banana">
			<label>pinapple</label>
			<input v-model="myCheckbox" type="checkbox" value="pinapple">
			{{ myCheckbox }}
		</p>		
		<p>
			<label>apple</label>
			<input v-model="myRadio" type="radio" value="apple">
			<label>banana</label>
			<input v-model="myRadio" type="radio" value="banana">
			<label>pinapple</label>
			<input v-model="myRadio" type="radio" value="pinapple">
			{{ myRadio }}
		</p>
		<p>
			<select v-model='mySelect'>
				<option v-for="list in selectOption" v-text="list.text" :value="list.value"></option>
			</select>
			{{mySelect}}
		</p>
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
				myValue: "",
				myCheckbox: [],
				myRadio: "",
				mySelect: null,
				selectOption: [
					{
						text: 'apple',
						value: 0
					},{
						text: 'banana',
						value: 1
					},{
						text: 'pinapple',
						value: 2
					}
				],
			}
		},
		methods:{
			onKeydown(){
				console.log('on key down');
			},
			onComponentAMyEvent(paramfromA){
				console.log(`on ComponentAMyEvent ${paramfromA}`);
			}
		}
	}
</script>