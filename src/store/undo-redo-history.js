
let cloneDeep = require('lodash.clonedeep');

import Emitter from '../util/emitter';

class UndoRedoHistory {
  store;
  history = [];
  currentIndex = -1;

  emitter = new Emitter();

  init(store) {
    this.store = store;
  }

  onUpdate(callback) {
    this.emitter.on('update', callback);
  }

  emitUpdate() {
    this.emitter.emit('update', {
      canUndo: this.canUndo(),
      canRedo: this.canRedo()
    });
  }

  addState(state) {
    // may be we have to remove redo steps
    if (this.currentIndex + 1 < this.history.length) {
      this.history.splice(this.currentIndex + 1);
    }
    this.history.push(state);
    this.currentIndex++;

    if (this.currentIndex + 1 !== this.history.length) {
      throw new Error("addState history - PANIC!");
    }

    this.emitUpdate();
  }

  undo() {
    if (!this.canUndo()) {
      throw new Error("UndoRedoHistory: no more undo steps");
    }

    const prevState = this.history[this.currentIndex - 1];
    // take a copy of the history state
    // because it would be changed during store mutations
    // what would corrupt the undo-redo-history
    // (same on redo)
    this.store.replaceState(cloneDeep(prevState));
    this.currentIndex--;
    this.emitUpdate();
  }

  redo() {
    if (!this.canRedo()) {
      throw new Error("UndoRedoHistory: no more redo steps")
    }

    const nextState = this.history[this.currentIndex + 1];
    this.store.replaceState(cloneDeep(nextState));
    this.currentIndex++;
    this.emitUpdate();
  }

  // -------------------------

  canUndo() {
    return this.currentIndex > 0;
  }

  canRedo() {
    return this.currentIndex + 1 < this.history.length;
  }
}

const undoRedoHistory = new UndoRedoHistory();

export default undoRedoHistory;
