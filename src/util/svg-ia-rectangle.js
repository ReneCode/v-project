import * as types from '@/store/mutation-types';

import store from '@/store';

import selectionStore from "@/util/selection-store";
import SvgRectangle from "@/models/svg-rectangle";

class SvgInteractionRectangle {

  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer
    this.draw = false;
    this.startPoint = null;
    this.gripList = selectionStore.getGripList();
  }

  onMouseDown(event) {
    let pt = this.svgTransformer.getSVGPoint(event);
    this.startPoint = pt;
    this.rectangle = new SvgRectangle(pt.x, pt.y, 0, 0);
    selectionStore.addItem(this.rectangle);

    return "stop"
  }

  onMouseUp(event) {
    this.setPoint2(event);

    selectionStore.clear();

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
}

export default SvgInteractionRectangle;
