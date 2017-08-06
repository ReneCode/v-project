
// import store from '@/store';
import * as msgs from './ia-message'
import pickedElementId from './picked-element-id';

// import * as types from '@/store/mutation-types';
// import store from '@/store';

const DELTA_LIMIT = 3;

const MODE_NONE = 0;
const MODE_START = 1;
const MODE_MOVING = 9;
const MODE_DRAGGING = 10;

class SvgInteractionPreprocess {

  constructor(svgTransformer, interactionRoot) {
    this.svgTransformer = svgTransformer;
    this.interactionRoot = interactionRoot;
    this.mode = MODE_NONE;
  }

  onMouseDown(event) {
    if (this.mode !== MODE_NONE) {
      throw new Error("illegal mode on mouse down");
    }

    this.mouseDownPoint = this.getPoint(event);
    // copy the event - we will need it later
    this.mouseDownEvent = this.copyEvent(event);
    this.mode = MODE_START;
    this.pickedElementId = pickedElementId(event)
  }

  onMouseUp(event) {
    if (this.mode === MODE_NONE) {
      throw new Error("illegal mode");
    }
    if (this.getMouseDelta(event) <= DELTA_LIMIT) {
      this.interactionRoot.dispatch(msgs.CLICK, this.mouseDownEvent);
    } else {
      if (this.pickedElementId) {
        this.interactionRoot.dispatch(msgs.STOP_MOVING, event);
      } else {
        this.interactionRoot.dispatch(msgs.STOP_DRAGGING, event);
      }
    }
    this.mode = MODE_NONE;
  }

  onMouseMove(event) {
    switch (this.mode) {
      case MODE_START:
        if (this.getMouseDelta(event) >= DELTA_LIMIT) {
          if (this.pickedElementId) {
            // store.commit(types.SELECT_ITEM, this.pickedElementId);
            this.interactionRoot.dispatch(msgs.START_MOVING, this.mouseDownEvent);
            this.mode = MODE_MOVING;
          } else {
            this.interactionRoot.dispatch(msgs.START_DRAGGING, this.mouseDownEvent);
            this.mode = MODE_DRAGGING;
          }
        }
        break;

      case MODE_MOVING:
        this.interactionRoot.dispatch(msgs.UPDATE_MOVING, event);
        break;

      case MODE_DRAGGING:
        this.interactionRoot.dispatch(msgs.UPDATE_DRAGGING, event);
        break;
    }
  }

  // ------------

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
}

export default SvgInteractionPreprocess;
