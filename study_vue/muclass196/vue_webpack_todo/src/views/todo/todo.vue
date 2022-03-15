<template>
  <section class="real-app">
    <label>
      <input type="text"
             class="add-input"
             autofocus="autofocus"
             placeholder="接下去要做什么？"
             @keyup.enter="addTodo"
      >
    </label>
    <Item :todo="item" v-for="item in filterList " :key="item.id" @delOption="deleteItem"/>
    <Tabs :filter="filter"
          :list="list"
          @toggle="toggleFilter"
          @clearAllComputed="clearAllComputed"
          v-if="list.length"
    />
  </section>
</template>
<script>
  import Item from './item.vue'
  import Tabs from './tabs.vue'

  let id = 0
  export default {
    name: 'todo',
    components: {
      Item,
      Tabs
    },
    data() {
      return {
        list: [],
        activeList: [],
        completedList: [],
        todo: {
          id: 0,
          content: 'this is a todo',
          completed: false
        },
        filter: 'all'
      }
    },
    computed: {
      filterList() {
        if (this.filter === 'all') return this.list
        const completed = this.filter === 'completed'
        return this.list.filter(todo => completed === todo.completed)
      }
    },
    methods: {
      addTodo(e) {
        if(!e.target.value) return
        this.list.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        })
        e.target.value = ''
      },
      deleteItem(id) {
        console.log(id)
        this.list = this.list.filter(item => item.id !== id)
      },
      toggleFilter(value) {
        this.filter = value
      },
      clearAllComputed(){
        this.list = this.list.filter(item => !item.completed)
      }
    }
  }
</script>
<style lang="scss">
  .real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
  }

  .add-input {
    position: relative;
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
    outline: none;
    padding: 16px 16px 16px 60px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
</style>
