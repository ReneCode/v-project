
import * as types from '@/store/mutation-types';
import store from '@/store';

class SvgInteractionSelectItem {
  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  onClick(event) {
    const pt = this.getPoint(event);
    const element = document.elementFromPoint(pt.x, pt.y);
    if (element && element.nodeName === "text") {
      let id = element.getAttribute("gid");

      store.commit(types.TOGGLE_SELECT_ITEM, id)
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
