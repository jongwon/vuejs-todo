
<template>
  <div id="app">
    <h4> VueJS 를 이용해 TODO 만들기 </h4>
    <todo-list></todo-list>
    <todo-editor></todo-editor>
  </div>
</template>

<script>
import TodoList from './todo-list.vue'
import TodoEdit from './todo-edit.vue'

export default {
    
    el:'#app',
    data(){
      return{
        ctx:'/vuejs-todo2',
        bus:new Vue()
      }
    },

    methods:{

    },

    components:{
      TodoList,
      TodoEdit
    }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
