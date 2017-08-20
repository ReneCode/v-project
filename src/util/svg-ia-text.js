import * as types from '@/store/mutation-types';

import store from '@/store';

import selectionStore from "@/util/selection-store";
import SvgText from "@/models/svg-text";

class SvgInteractionText {

  constructor(svgTransformer, text) {
    this.svgTransformer = svgTransformer
    this.textItem = new SvgText(0, 0, text);
    selectionStore.addItem(this.textItem);
  }

  onMouseDown(event) {
    this.setPosition(event);

    selectionStore.clear();

    store.dispatch(types.ADD_GRAPHIC_ITEM, this.textItem)
      .then(data => {
      }, err => {
        console.log("error:", err);
      });

    this.textItem = null;
    return "finish"
  }

  onMouseMove(event) {
    this.setPosition(event);
    return "stop"
  }

  // -------------

  setPosition(event) {
    if (this.textItem) {
      const p = this.svgTransformer.getSVGPoint(event);
      this.textItem.x = p.x;
      this.textItem.y = p.y;
    }
  }
}

export default SvgInteractionText;
