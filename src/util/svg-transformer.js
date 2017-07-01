
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

  setTranslate(newTranslate) {
    this.transformData.tx = newTranslate.x;
    this.transformData.ty = newTranslate.y;
    this.updateTransform();
  }

  getTranslate() {
    return {
      x: this.transformData.tx,
      y: this.transformData.ty
    };
  }

  // ----------

  getScreenPoint(event) {
    if (!event) {
      throw new Error("getScreenPoint: event missing");
    }
    const svg = this.svgElement;
    let pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    pt = pt.matrixTransform(svg.getScreenCTM().inverse());
    return pt;
  }

  getSVGPoint(event) {
    if (!event) {
      throw new Error("getSVGPoint: event missing");
    }
    let pt = this.getScreenPoint(event);
    let svgPt = new SvgPoint(
      (pt.x - this.transformData.tx) / this.transformData.sc,
      (pt.y - this.transformData.ty) / this.transformData.sc
    );
    return svgPt;
  }

  zoom(pt, scale) {
    const MAX_SCALE = 20;
    if (scale > MAX_SCALE || scale < (1 / MAX_SCALE)) {
      return;
    }
    const deltaScale = scale - this.transformData.sc;
    this.transformData.sc = scale;
    this.transformData.tx -= deltaScale * pt.x;
    this.transformData.ty -= deltaScale * pt.y;
    this.updateTransform();
  }

  updateTransform() {
    if (this.transformCallback) {
      this.transformCallback(this.transformData.getTransform());
    }
  }
}

export default SvgTransformer;
