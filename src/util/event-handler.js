
import EventBus from '../util/event-bus';
import store from '../store';

import * as types from '../store/mutation-types';

import undoRedoHistore from '../store/undo-redo-history';

class EventHandler {

  constructor() {
    EventBus.on('undo', this.undo);
    EventBus.on('redo', this.redo);
    EventBus.on('deleteItems', this.deleteItems);
  }

  undo() {
    if (undoRedoHistore.canUndo()) {
      undoRedoHistore.undo();
    }
  }

  redo() {
    if (undoRedoHistore.canRedo()) {
      undoRedoHistore.redo();
    }
  }

  deleteItems(items) {
    store.dispatch(types.DELETE_ITEMS, items);
  }

}

const eventHandler = new EventHandler();
export default eventHandler;
