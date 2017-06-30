
import * as types from '@/store/mutation-types';
import store from '@/store';

import * as msgs from './ia-message';

class SvgInteractionSelectItem {
  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  dispatch(msg, event) {
    switch (msg) {
      case msgs.CLICK:
        this.onClick(event);
    }
  }

  // ----------------

  onClick(event) {
    const pt = this.getPoint(event);
    const element = document.elementFromPoint(pt.x, pt.y);
    if (element) {
      let ele;
      switch (element.nodeName) {
        case "text":
          ele = element;
          break;
        case "tspan":
          if (element.parentNode && element.parentNode.nodeName === "text") {
            ele = element.parentNode;
          }
          break;
      }

      if (ele) {
        let id = ele.getAttribute("gid");
        store.commit(types.TOGGLE_SELECT_ITEM, id)
      } else {
        // no element selected
        if (store.getters.selectedItems.length > 0) {
          store.commit(types.CLEAR_SELECTION);
        }
      }
    }
  }

  getPoint(event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }

}

export default SvgInteractionSelectItem;
