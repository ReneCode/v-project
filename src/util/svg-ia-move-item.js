import Vue from 'vue';
import * as types from '@/store/mutation-types';

import store from '@/store';

import * as msgs from './ia-message';

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
    this.active = store.getters.selectedItems.length > 0;
    if (this.active) {
      this.startPoint = this.svgTransformer.getSVGPoint(event);
    }
  }

  stopMove(event) {
    if (this.active) {
      this.active = false;
      store.getters.selectedItems.forEach(item => {
        Vue.set(item, 'temp', undefined);
      });

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
        x: currentPoint.x - this.startPoint.x,
        y: currentPoint.y - this.startPoint.y
      }

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
