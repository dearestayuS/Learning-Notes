
/*========================================================================
1、单文件组件
2、文本渲染 ：v-html，{{}}，v-text
3、列表渲染：数组、对象
4、列表数据同步更新
==========================================================================*/
<template>
  <div v-bind:title="hello"> //将数据hello变量放入title属性中
    <p v-text="hello"></p> //v-text，将数据中的html语言直接打印
    <p v-html="hello"></p> //v-html，将数据中的html语言翻译
    {{ status ? 'success' : num + 1 }} //直接使用表达式渲染
    <componentA v-for="(value, key) in objList " :class="key"></componentA> //组件循环渲染
    <ul>
      <li v-for="(item, index) in list" v-text="`${item.name} - ${item.price} - ${index+1}`" :class="{odd:index%2}"></li> //数组循环渲染
    </ul>
    <ul>
      <li v-for="(value, key) in objList">{{ key }}: {{ value }}</li> //对象循环渲染
    </ul>
    <button v-on:click="addItem">addItem</button>
    <button v-on:click="changeItem">changeItem</button> //增加事件，事件的function放在method中
  </div>
</template>

<script>
  import Vue from 'vue'
  import componentA from './components/a.vue'
  export default {
    components: {
      componentA: componentA
    },
    data () {
      return {
        hello: '<span>world</span>',
        num: 1,
        status: true,
        list:[
          {
            name: 'apple',
            price: 34
          },{
            name: 'banana',
            price: 56
          }
        ],
        objList: {
          name: 'pear',
          price: 26,
          color: 'red',
          weight: 14
        }
      }
    },
    methods: {
      //在触发addItem时，将对象push到该数组中，同时渲染页面
      addItem () {
        this.list.push({
          name: 'strawberry',
          price: 256
        })
      },
      //在触发changeItem时，将数组的值修改
      /*注意：vue中一部分数组操作不能直接渲染页面；
              如this.list[2] = { name: 'grape', price: 36}，
              虽然修改了list中的值，但页面没有更新数据*/
      changeItem () {
        Vue.set(this.list, 2, {
          name: 'grape',
          price: 36
        })
      }
    }
  }
</script>
