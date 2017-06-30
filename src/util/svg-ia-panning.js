
import SvgInteractionBase from "./svg-ia-base";
import * as msgs from './ia-message';

class SvgInteractionPanning extends SvgInteractionBase {
  /* eslint-disable no-useless-constructor */
  constructor(svgTransformer) {
    super(svgTransformer);
  }

  dispatch(msg, event) {
    switch (msg) {
      case msgs.START_DRAGGING:
        super.startTranslation(event);
        break;

      case msgs.STOP_DRAGGING:
        super.stopTranslation(event);
        break;

      case msgs.UPDATE_DRAGGING:
        super.updateTranslation(event);
        this.svgTransformer.setTranslate(super.getTranslation());
        break;
    }
  }
}

export default SvgInteractionPanning;
