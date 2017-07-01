import Emitter from './emitter';

// inspired by:
// https://alligator.io/vuejs/global-event-bus/
class EventBus {
  constructor() {
    this.emitter = new Emitter();
  }

  on(event, callback) {
    this.emitter.on(event, callback);
  }

  off(event, callback) {
    this.emitter.off(event, callback);
  }

  emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
}

const eventBus = new EventBus();

export default eventBus;
