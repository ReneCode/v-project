
const ZOOM_FACTOR = 0.05;

class SvgPoint {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class SvgTransformData {
  tx = 0;
  ty = 0;
  sc = 1.0;

  getTransform() {
    return `translate(${this.tx},${this.ty})scale(${this.sc})`;
  }
}

class SvgTransformer {
  svgElement
  transformCallback
  transformData = new SvgTransformData()

  constructor(svgElement, transformCallback) {
    this.svgElement = svgElement;
    this.transformCallback = transformCallback;
  }

  zoomIn(event) {
    const scale = this.transformData.sc * (1 + ZOOM_FACTOR);
    const pt = this.getSVGPoint(event);
    this.zoom(pt, scale);
  }

  zoomOut(event) {
    const scale = this.transformData.sc * (1 - ZOOM_FACTOR);
    const pt = this.getSVGPoint(event);
    this.zoom(pt, scale);
  }

  // ----------

  getSVGPoint(event) {
    const svg = this.svgElement;
    let pt = svg.createSVGPoint();

    pt.x = event.clientX;
    pt.y = event.clientY;
    pt = pt.matrixTransform(svg.getScreenCTM().inverse());

    // return pt as "un-transformed" data
    return new SvgPoint(
      (pt.x - this.transformData.tx) / this.transformData.sc,
      (pt.y - this.transformData.ty) / this.transformData.sc
    );
  }

  zoom(pt, scale) {
    const deltaScale = scale - this.transformData.sc;
    this.transformData.sc = scale;
    this.transformData.tx -= deltaScale * pt.x;
    this.transformData.ty -= deltaScale * pt.y;
    if (this.transformCallback) {
      this.transformCallback(this.transformData.getTransform());
    }
  }
}

export default SvgTransformer;