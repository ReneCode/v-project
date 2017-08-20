
// import * as types from '@/store/mutation-types';
import store from '@/store';

import selectionStore from "@/util/selection-store";
import pickedElementId from './picked-element-id';

// import * as msgs from './ia-message';

const DELTA_LIMIT = 3;

class SvgInteractionSelectItem {
  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  onMouseDown(event) {
    this.mouseDownPoint = this.getPoint(event);
    // copy the event - we will need it later
    this.mouseDownEvent = this.copyEvent(event);
  }

  onMouseUp(event) {
    if (this.getMouseDelta(event) <= DELTA_LIMIT) {
      const elementId = pickedElementId(event);
      selectionStore.clear();
      if (elementId) {
        const item = store.getters.graphicItems.find(i => i.id === elementId);
        if (item) {
          selectionStore.addItem(item);
          selectionStore.getGripList().initFromItem(item);
          return "stop"
        }
      }
    }
  }

  copyEvent(event) {
    if (typeof event.constructor === 'function') {
      return new event.constructor(event.type, event);
    } else {
      // IE11 event.constructor does not work
      let newEvent = {};
      for (let key in event) {
        newEvent[key] = event[key];
      }
      return newEvent;
    }
  }

  getMouseDelta(event) {
    const mouseUpPoint = this.getPoint(event);
    const xDelta = Math.abs(mouseUpPoint.x - this.mouseDownPoint.x);
    const yDelta = Math.abs(mouseUpPoint.y - this.mouseDownPoint.y);
    const delta = Math.max(xDelta, yDelta);
    return delta;
  }

  getPoint(event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }

}

export default SvgInteractionSelectItem;
