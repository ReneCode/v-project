import * as types from '@/store/mutation-types';

import store from '@/store';

import SvgRectangle from "@/models/svg-rectangle";

class SvgInteractionRectangle {

  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer
    this.draw = false;
    this.startPoint = null;
  }

  onMouseDown(event) {
    this.startPoint = this.svgTransformer.getSVGPoint(event);
    this.rectangle = this.createRectangle(this.startPoint);
    store.commit(types.ADD_ITEM, this.rectangle);
    return "stop"
  }

  onMouseUp(event) {
    this.setPoint2(event);
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

  createRectangle(pt) {
    return new SvgRectangle(pt.x, pt.y, 0, 0);

    // let rectangle = {
    //   type: "rect",
    //   x1: p1.x,
    //   y1: p1.y,
    //   x2: p2.x,
    //   y2: p2.y,
    //   stroke: "#333",
    //   fill: "#ea4",
    //   selected: false
    // };
    // return rectangle;

    // store.dispatch(types.ADD_ITEM, rectangle).then((data) => {
    //   console.log("finish create rectangle");
    //   this.rectangle = data;
    // })
  }
}

export default SvgInteractionRectangle;
