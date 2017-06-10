import Vue from 'vue'

console.log("abc!!")

Vue.directive('mouse-wheel', {
  inserted() {
    console.log("directive-bind");
  }
});
