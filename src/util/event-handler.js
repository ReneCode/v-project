
import EventBus from '../util/event-bus';

import undoRedoHistore from '../store/undo-redo-history';

class EventHandler {

  constructor() {
    EventBus.on('undo', this.undo);
    EventBus.on('redo', this.redo);
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

}

const eventHandler = new EventHandler();
export default eventHandler;
