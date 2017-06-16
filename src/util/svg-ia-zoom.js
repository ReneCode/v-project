
class SvgInteractionZoom {
  svgTransformer;

  constructor(svgTransformer) {
    this.svgTransformer = svgTransformer;
  }

  onMouseWheel(event) {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      console.log(delta, event);
      if (delta > 0) {
        this.svgTransformer.zoomIn(event);
      } else if (delta < 0) {
        this.svgTransformer.zoomOut(event);
      }
      // for IE
      event.returnValue = false;
      // for Chrome and Firefox
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }
}

export default SvgInteractionZoom;

