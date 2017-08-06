import * as types from '@/store/mutation-types';

import store from '@/store';

import * as msgs from './ia-message';
import pickedElementId from './picked-element-id';
import ItemHelper from '@/util/item-helper';

class SvgInteractionMoveItem {

  /* eslint-disable no-useless-constructor */
  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
    this.pickedElement = undefined;
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
    const elementId = pickedElementId(event);
    if (!elementId) {
      return;
    }
    this.pickedElement = store.getters.graphicItems.find(i => i.id === elementId);
    if (this.pickedElement) {
      // store.dispatch(types.SELECT_GRAPHIC_BY_ID, this.pickedElementId)
      this.startPoint = this.svgTransformer.getSVGPoint(event);
    }
  }

  stopMove(event) {
    if (this.pickedElement) {
      ItemHelper.deleteTranslation(this.pickedElement);

      let translation = this.getTranslation(event);
      if (this.pickedElement.translate) {
        this.pickedElement.translate(translation.dx, translation.dy);
      } else {
        console.error("bad element", this.pickedElement);
      }
      store.dispatch(types.UPDATE_GRAPHIC, this.pickedElement)
        .then(() => {
          this.pickedElement = undefined;
        })
    }
  }

  updateMove(event) {
    if (this.pickedElement) {
      let translation = this.getTranslation(event);
      ItemHelper.setTranslation(this.pickedElement, translation);
    }
  }

  getTranslation(event) {
    const currentPoint = this.svgTransformer.getSVGPoint(event);
    const translation = {
      dx: currentPoint.x - this.startPoint.x,
      dy: currentPoint.y - this.startPoint.y
    };
    return translation;
  }
}

export default SvgInteractionMoveItem;
