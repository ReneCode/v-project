import Vue from 'vue';
import * as types from '@/store/mutation-types';

import store from '@/store';

import * as msgs from './ia-message';
import SvgInteractionBase from "./svg-ia-base"

class SvgInteractionMoveItem extends SvgInteractionBase {
  active = false;

  /* eslint-disable no-useless-constructor */
  constructor(svgTransformer) {
    super(svgTransformer);
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
    this.active = store.getters.selectedItems.length > 0;
    if (this.active) {
      super.startTranslation(event);
    }
  }

  stopMove(event) {
    if (this.active) {
      this.active = false;
      super.stopTranslation(event);
      store.getters.selectedItems.forEach(item => {
        Vue.set(item, 'temp', undefined);
      });

      store.commit(types.MOVE_ITEMS,
        {
          items: store.getters.selectedItems,
          translation: super.getTranslation()
        });
    }
  }

  updateMove(event) {
    if (this.active) {
      super.updateTranslation(event);

      const translation = super.getTranslation();
      store.getters.selectedItems.forEach(item => {
        Vue.set(item, 'temp', {
          dx: translation.x,
          dy: translation.y
        });
      });
    }
  }
}

export default SvgInteractionMoveItem;
