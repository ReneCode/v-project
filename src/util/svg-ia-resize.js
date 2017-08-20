import * as types from '@/store/mutation-types';

import store from '@/store';

import temporaryStore from "@/models/temporary-store";
import pickedElementId from './picked-element-id';

class SvgInteractionResize {

  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
    this.grip = null;
    this.pickDelta = { x: 0, y: 0 }
  }

  onMouseDown(event) {
    const elementId = pickedElementId(event);
    if (elementId) {
      if (this.isResizeElement(elementId)) {
        let startPoint = this.svgTransformer.getSVGPoint(event);
        this.grip = temporaryStore.getGrip(elementId);
        if (!this.grip) {
          throw new Error("grip not found", elementId);
        }
        this.pickDelta = {
          x: this.grip.x - startPoint.x,
          y: this.grip.y - startPoint.y
        }
        this.oppositeGrip = temporaryStore.getOppositeGrip(this.grip);
        return "stop"
      }
    }
  }

  onMouseMove(event) {
    this.updateGrip(event);
  }

  onMouseUp(event) {
    this.updateGrip(event);

    let items = temporaryStore.getItems();
    store.dispatch(types.UPDATE_GRAPHIC, items)
    .then(() => {
      this.grip = null;
    })
  }

  updateGrip(event) {
    if (!this.grip) {
      return;
    }
    const currentPoint = this.svgTransformer.getSVGPoint(event);
    this.grip.x = currentPoint.x + this.pickDelta.x;
    this.grip.y = currentPoint.y + this.pickDelta.y;

    temporaryStore.initFromTwoPoints(this.grip, this.oppositeGrip);
    temporaryStore.updateItemsFromGripList();
  }

  getTranslation(event) {
    const currentPoint = this.svgTransformer.getSVGPoint(event);
    const translation = {
      dx: currentPoint.x - this.startPoint.x,
      dy: currentPoint.y - this.startPoint.y
    };
    return translation;
  }

  isResizeElement(elementId) {
    switch (elementId) {
      case "grip-tl":
      case "grip-tr":
      case "grip-bl":
      case "grip-br":
        return true;
    }
    return false;
  }

}

export default SvgInteractionResize;
