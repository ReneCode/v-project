import Vue from 'vue';
import * as types from '@/store/mutation-types';
import store from '@/store';

import SvgInteractionBase from "./svg-ia-base"

class SvgInteractionMoveItem extends SvgInteractionBase {
  active = false;

  onMouseDown(event) {
    this.active = store.getters.selectedItems.length > 0;
    if (this.active) {
      super.startTranslation(event);
    }
  }

  onMouseUp(event) {
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

  onMouseMove(event) {
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
