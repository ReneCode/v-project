
import * as types from '@/store/mutation-types';
import store from '@/store';

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
        if (elementId) {
          store.dispatch(types.SELECT_ITEM_BY_ID, elementId);
        } else {
          store.dispatch(types.CLEAR_SELECTION);
        }
        break;
    }
  }

}

export default SvgInteractionSelectItem;
