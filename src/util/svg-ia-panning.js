
class SvgInteractionPanning {
  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
    this.counter = 0;
  }

  onMouseDown(event) {
    this.startTranslate = this.svgTransformer.getTranslate();
    this.startPoint = this.svgTransformer.getPoint(event);
  }

  onMouseUp(event) {
    this.onMouseMove(event);
    this.startPoint = undefined;
  }
  onMouseMove(event) {
    if (this.startPoint) {
      this.counter++;
      let currentPoint = this.svgTransformer.getPoint(event);
      let newTranslate = {
        x: currentPoint.x - this.startPoint.x + this.startTranslate.x,
        y: currentPoint.y - this.startPoint.y + this.startTranslate.y
      }
      this.svgTransformer.setTranslate(newTranslate);
    }
  }
}

export default SvgInteractionPanning;
