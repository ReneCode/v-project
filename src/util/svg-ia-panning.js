
import * as msgs from './ia-message';

class SvgInteractionPanning {
  startScreenPoint = undefined;
  currentTranslate = undefined;

  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  dispatch(msg, event) {
    switch (msg) {
      case msgs.START_DRAGGING:
        this.startScreenPoint = this.svgTransformer.getScreenPoint(event);
        this.currentTranslate = this.svgTransformer.getTranslate();
        break;

      case msgs.STOP_DRAGGING:
        this.startScreenPoint = undefined;
        this.currentTranslate = undefined;
        break;

      case msgs.UPDATE_DRAGGING:
        const currentScreenPoint = this.svgTransformer.getScreenPoint(event);
        const translation = {
          x: currentScreenPoint.x - this.startScreenPoint.x + this.currentTranslate.x,
          y: currentScreenPoint.y - this.startScreenPoint.y + this.currentTranslate.y
        }

        this.svgTransformer.setTranslate(translation);
        break;
    }
  }
}

export default SvgInteractionPanning;
