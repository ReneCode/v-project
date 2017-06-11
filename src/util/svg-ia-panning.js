
class SvgInteractionPanning {
  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  onMouseDown(event) {
    this.startPoint = this.svgTransformer.getSVGPoint(event);
  }

  onMouseUp(event) {
    this.onMouseMove(event);
    this.startPoint = undefined;
  }
  onMouseMove(event) {
    if (this.startPoint) {
      let currentPoint = this.svgTransformer.getSVGPoint(event);
      let delta = {
        x: currentPoint.x - this.startPoint.x,
        y: currentPoint.y - this.startPoint.y
      }
      this.svgTransformer.pan(delta);
    }
  }
}

export default SvgInteractionPanning;
