<template>
  <div id="app">
    <div class="cover"></div>
    <Header />
    <Todo />
    <Footer />
  </div>
</template>
<script>
import Header from './views/todo/Header.vue'
import Footer from './views/todo/Footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    Todo
  },
  data() {
    return {
      text: 'abc',
    }
  },
}
</script>
<style lang="scss" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    opacity: 0.9;
    z-index: -1;
  }
}
</style>
