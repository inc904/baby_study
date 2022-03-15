<template>
  <div :class="['todo-item', todo.completed ? 'completed' :'']">
    <label>
      <input type="checkbox"
             class="toggle"
             v-model="todo.completed"
      >
    </label>

    <label>
      {{todo.content}}
    </label>
    <button class="destroy" @click="deleteTodo"/>

  </div>
</template>
<script>
  export default {
    name: 'item',
    props: {
      todo: {
        type: Object,
        required: true
      }
    },
    methods: {
      deleteTodo() {
        console.log(11)
        this.$emit('delOption',this.todo.id)
      }
    }
  }
</script>
<style lang="scss">
  .todo-item {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 80px;
    background-color: #fff;
    font-size: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);

    &:hover {
      .destroy:after {
        content: '×'
      }
    }

    label {
      display: block;
      /*white-space: pre-line;*/
      word-break: break-all;
      /*padding: 15px 60px 15px 15px;*/
      margin-left: 15px;
      line-height: 40px;
      transition: color 0.4s;
      box-sizing: border-box;

    }

    &.completed {
      label {
        color: #d9d9d9;
        text-decoration: line-through;
      }
    }
  }

  .toggle {
    text-align: center;
    width: 40px;
    height: 40px;
    /*top: 0;*/
    /*bottom: 0;*/
    /*margin: auto 0;*/
    border: 1px solid #cc9a9a;
    margin: 0;
    appearance: none;
    outline: none;

    &:after {
      content: url('../../assets/images/round.svg');
      width: 100%;
      height: 100%;
      display: block;
    }

    &:checked:after {
      background-color: #fff;
      content: url('../../assets/images/done.svg');
    }
  }

  .destroy {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    /*margin-bottom: 11px;*/
    transition: color 0.2s ease-out;
    background-color: transparent;
    appearance: none;
    border-width: 0;
    cursor: pointer;
    outline: none;
  }
</style>