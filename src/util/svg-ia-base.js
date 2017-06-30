
class SvgInteractionBase {
  translation = {
    x: 0,
    y: 0
  };

  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  startTranslation(event) {
    this.startTranslate = this.svgTransformer.getTranslate();
    this.startPoint = this.svgTransformer.getPoint(event);
  }

  stopTranslation(event) {
    this.startPoint = undefined;
  }

  updateTranslation(event) {
    if (this.startPoint) {
      let currentPoint = this.svgTransformer.getPoint(event);
      this.translation = {
        x: currentPoint.x - this.startPoint.x + this.startTranslate.x,
        y: currentPoint.y - this.startPoint.y + this.startTranslate.y
      }
    }
  }

  getTranslation() {
    return this.translation;
  }

  getPoint(event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }

}

export default SvgInteractionBase;
