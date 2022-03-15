<template>
  <div>
    <button @click="flag = !flag">click</button>
    <transition name="fade">
      <p v-show="flag">hello Vue!</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true
    };
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>