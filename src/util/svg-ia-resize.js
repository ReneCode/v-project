// import * as types from '@/store/mutation-types';

// import store from '@/store';

import temporaryStore from "@/models/temporary-store";
// import SvgRectangle from "@/models/svg-rectangle";
import pickedElementId from './picked-element-id';

class SvgInteractionResize {

  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
    this.draw = false;
    this.startPoint = null;
    this.grip = null;
    this.pickDelta = { dx: 0, dy: 0 }
  }

  onMouseDown(event) {
    const elementId = pickedElementId(event);
    if (elementId) {
      console.log(elementId);
      if (this.isResizeElement(elementId)) {
        this.startPoint = this.svgTransformer.getSVGPoint(event);
        this.grip = temporaryStore.getGrip(elementId);
        this.pickDelta = {
          x: this.grip.x - this.startPoint.x,
          y: this.grip.y - this.startPoint.y
        }
        return "stop"
      }
    }
  }

  onMouseMove(event) {
    if (!this.grip) {
      return;
    }
    const currentPoint = this.svgTransformer.getSVGPoint(event);
    this.grip.x = currentPoint.x + this.pickDelta.x;
    this.grip.y = currentPoint.y + this.pickDelta.y;

    temporaryStore.resize(this.grip);
  }

  onMouseUp(event) {
    this.grip = null;
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

  /*
  onMouseUp(event) {
    this.setPoint2(event);

    temporaryStore.removeItem(this.rectangle);

    store.dispatch(types.ADD_GRAPHIC_ITEM, this.rectangle)
      .then(data => {
        console.log("finish create rectangle");
      }, err => {
        console.log("error:", err);
      });

    this.rectangle = null;
    return "finish"
  }

  onMouseMove(event) {
    this.setPoint2(event);
    return "stop"
  }

  // -------------

  setPoint2(event) {
    if (this.rectangle) {
      const p2 = this.svgTransformer.getSVGPoint(event);
      this.rectangle.x = Math.min(this.startPoint.x, p2.x);
      this.rectangle.y = Math.min(this.startPoint.y, p2.y);
      this.rectangle.width = Math.abs(this.startPoint.x - p2.x);
      this.rectangle.height = Math.abs(this.startPoint.y - p2.y);
    }
  }
  */
}

export default SvgInteractionResize;
