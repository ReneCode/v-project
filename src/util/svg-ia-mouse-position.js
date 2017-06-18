
class SvgInteractionMousePosition {
  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  onMouseMove(event) {
    // let p1 = this.svgTransformer.getPoint(event);
    // let p2 = this.svgTransformer.getUntransformedPoint(event);
    // console.log("position:", p1, p2)
  }
}

export default SvgInteractionMousePosition;
