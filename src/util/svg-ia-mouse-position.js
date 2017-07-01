
class SvgInteractionMousePosition {
  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  // onMouseMove(event) {
  //   let p1 = this.svgTransformer.getScreenPoint(event);
  //   let p2 = this.svgTransformer.getSVGPoint(event);
  //   console.log("Pt:", p1, "   SVG-Pt:", p2)
  // }
}

export default SvgInteractionMousePosition;
