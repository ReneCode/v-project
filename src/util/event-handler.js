
import EventBus from '../util/event-bus';
import store from '../store';

import { ADD_ITEM } from '../store/mutation-types';

class EventHandler {

  constructor() {
    EventBus.on('addTextItem', this.addText);
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
}

const eventHandler = new EventHandler();
export default eventHandler;
