import * as types from '@/store/mutation-types';

import store from '@/store';

class SvgInteractionRectangle {

  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer
    this.draw = false;
  }

  onMouseDown(event) {
    const p1 = this.svgTransformer.getSVGPoint(event);
    this.rectangle = this.createRectangle(p1, p1);
    store.commit(types.ADD_ITEM, this.rectangle);
  }

  onMouseUp(event) {
    this.setPoint2(event);
    this.rectangle = null;
  }

  onMouseMove(event) {
    this.setPoint2(event);
    return "stop"
  }

  // -------------

  setPoint2(event) {
    if (this.rectangle) {
      const p2 = this.svgTransformer.getSVGPoint(event);
      this.rectangle.x2 = p2.x;
      this.rectangle.y2 = p2.y;
    }
  }

  createRectangle(p1, p2) {
    let rectangle = {
      type: "rect",
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y,
      stroke: "#333",
      fill: "#ea4",
      selected: false
    };
    return rectangle;

    // store.dispatch(types.ADD_ITEM, rectangle).then((data) => {
    //   console.log("finish create rectangle");
    //   this.rectangle = data;
    // })
  }
}

export default SvgInteractionRectangle;
