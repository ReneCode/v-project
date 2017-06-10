/*
const ZOOM_FACTOR = 0.05;

export class SvgTransformData {
  tx = 0;
  ty = 0;
  sc = 1.0;
}

export class SvgPoint {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

}

export class SvgTransformer {
  transformData = new SvgTransformData();

  constructor(
    svgElement,
    svgTransformGroup) {
  }

  zoomIn(event) {
    const scale = this.transform.sc * (1 + ZOOM_FACTOR);
    const pt = this.getSVGPoint(event);
    this.zoom(pt, scale);
  }

  zoomOut(event) {
    const scale = this.transform.sc * (1 - ZOOM_FACTOR);
    const pt = this.getSVGPoint(event);
    this.zoom(pt, scale);
  }

  getSVGPoint(event) {
    const svg = this.svgElement;
    let pt = svg.createSVGPoint();

    pt.x = event.clientX;
    pt.y = event.clientY;
    pt = pt.matrixTransform(svg.getScreenCTM().inverse());

    // return pt as "un-transformed" data
    return new SvgPoint(
      (pt.x - this.transform.tx) / this.transform.sc,
      (pt.y - this.transform.ty) / this.transform.sc
    );
  }

  zoom(pt, scale) {
    const deltaScale = scale - this.transform.sc;
    this.transform.sc = scale;
    this.transform.tx -= deltaScale * pt.x;
    this.transform.ty -= deltaScale * pt.y;
    this.svgTransformGroup.updateTransform(this.transform);
  }
}
*/