import * as types from '@/store/mutation-types';

import store from '@/store';

import selectionStore from "@/util/selection-store";
import SvgText from "@/models/svg-text";

class SvgInteractionText {

  constructor(svgTransformer, text) {
    this.svgTransformer = svgTransformer
    this.text = new SvgText(0, 0, text);
    selectionStore.addItem(this.text);
  }

  onMouseDown(event) {
    this.setPosition(event);

    selectionStore.clear();

    store.dispatch(types.ADD_GRAPHIC_ITEM, this.text)
      .then(data => {
      }, err => {
        console.log("error:", err);
      });

    this.text = null;
    return "finish"
  }

  onMouseMove(event) {
    this.setPosition(event);
    return "stop"
  }

  // -------------

  setPosition(event) {
    if (this.text) {
      const p = this.svgTransformer.getSVGPoint(event);
      this.text.x = p.x;
      this.text.y = p.y;
    }
  }
}

export default SvgInteractionText;
