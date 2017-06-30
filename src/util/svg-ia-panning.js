
import SvgInteractionBase from "./svg-ia-base"

class SvgInteractionPanning extends SvgInteractionBase {

  onMouseDown(event) {
    super.startTranslation(event)
    // this.startTranslate = this.svgTransformer.getTranslate();
    // this.startPoint = this.svgTransformer.getPoint(event);
  }

  onMouseUp(event) {
    super.stopTranslation(event);
    // this.onMouseMove(event);
    // this.startPoint = undefined;
  }

  onMouseMove(event) {
    super.updateTranslation(event);
    // if (this.startPoint) {
    //   this.counter++;
    //   let currentPoint = this.svgTransformer.getPoint(event);
    //   let newTranslate = {
    //     x: currentPoint.x - this.startPoint.x + this.startTranslate.x,
    //     y: currentPoint.y - this.startPoint.y + this.startTranslate.y
    //   }

    this.svgTransformer.setTranslate(super.getTranslation());
  }
}

export default SvgInteractionPanning;
