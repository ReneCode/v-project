
import EventBus from '../util/event-bus';
import store from '../store';

import { ADD_ITEM, DELETE_ITEMS } from '../store/mutation-types';

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
      selected: false
    };
    text.id = "id_" + Math.floor(Math.random() * 10E9);
    store.commit(ADD_ITEM, text);
  }

  deleteItems(items) {
    store.commit(DELETE_ITEMS, items);
  }

}

const eventHandler = new EventHandler();
export default eventHandler;
