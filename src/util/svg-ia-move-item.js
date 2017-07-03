import * as types from '@/store/mutation-types';

import store from '@/store';

import * as msgs from './ia-message';
import pickedElementId from './picked-element-id';
import ItemHelper from '@/util/item-helper';

class SvgInteractionMoveItem {
  active = false;

  /* eslint-disable no-useless-constructor */
  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  dispatch(msg, event) {
    switch (msg) {
      case msgs.START_MOVING:
        this.startMove(event);
        break;

      case msgs.STOP_MOVING:
        this.stopMove(event);
        break;

      case msgs.UPDATE_MOVING:
        this.updateMove(event);
        break;
    }
  }

  // -----------

  startMove(event) {
    this.pickedElementId = pickedElementId(event);
    if (!this.pickedElementId) {
      return;
    }
    this.active = true;
    store.dispatch(types.SELECT_ITEM_BY_ID, this.pickedElementId)
    this.startPoint = this.svgTransformer.getSVGPoint(event);
  }

  stopMove(event) {
    if (this.active) {
      this.active = false;
      store.getters.selectedItems.forEach(item => ItemHelper.deleteTranslation(item));

      const currentPoint = this.svgTransformer.getSVGPoint(event);
      const translation = {
        x: currentPoint.x - this.startPoint.x,
        y: currentPoint.y - this.startPoint.y
      }

      store.commit(types.MOVE_ITEMS,
        {
          items: store.getters.selectedItems,
          translation: translation
        });
    }
  }

  updateMove(event) {
    if (this.active) {
      const currentPoint = this.svgTransformer.getSVGPoint(event);
      const translation = {
        dx: currentPoint.x - this.startPoint.x,
        dy: currentPoint.y - this.startPoint.y
      };
      store.dispatch(types.SET_TRANSLATION_BY_ID, {
        itemId: this.pickedElementId,
        translation: translation
      });
    }
  }
}

export default SvgInteractionMoveItem;
