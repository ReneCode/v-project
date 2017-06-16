import Vue from 'vue';

// inspired by:
// https://alligator.io/vuejs/global-event-bus/
class EventBus {
  constructor() {
    this.vue = new Vue();
  }

  on(event, callback) {
    this.vue.$on(event, callback);
  }

  off(event, callback) {
    this.vue.$off(event, callback);
  }

  emit(event, ...args) {
    this.vue.$emit(event, ...args);
  }
}

const eventBus = new EventBus();

export default eventBus;
