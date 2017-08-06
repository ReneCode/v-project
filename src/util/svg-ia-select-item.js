
// import * as types from '@/store/mutation-types';
import store from '@/store';

import temporaryStore from "@/models/temporary-store";
// import ItemHelper from "@/util/item-helper";

import * as msgs from './ia-message';
import pickedElementId from './picked-element-id';

class SvgInteractionSelectItem {
  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  dispatch(msg, event) {
    switch (msg) {
      case msgs.CLICK:
        const elementId = pickedElementId(event);
        this.deselectAll();
        if (elementId) {
          temporaryStore.clear();
          const item = store.getters.graphicItems.find(i => i.id === elementId);
          if (item) {
            item.selected = true;
          }
        }
        break;
    }
  }

  deselectAll() {
    store.getters.graphicItems.forEach(i => {
      i.selected = false;
    });
  }

}

export default SvgInteractionSelectItem;
