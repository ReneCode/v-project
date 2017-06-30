
import EventBus from '../util/event-bus';
import store from '../store';

import * as types from '../store/mutation-types';

class EventHandler {

  constructor() {
    EventBus.on('addTextItem', this.addText);
    EventBus.on('deleteItems', this.deleteItems);
  }

  addText(textValue) {
    let text = {
      type: "text",
      text: textValue,
      x: Math.floor(Math.random() * 400),
      y: Math.floor(Math.random() * 300),
      fontSize: 5 + Math.floor(Math.random() * 20),
      fill: "#6ad",
      selected: false,
      work: false
    };
    text.id = "id_" + Math.floor(Math.random() * 10E9);
    store.commit(types.ADD_ITEM, text);
  }

  deleteItems(items) {
    store.commit(types.DELETE_ITEMS, items);
  }

}

const eventHandler = new EventHandler();
export default eventHandler;
