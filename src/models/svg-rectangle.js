
import SvgItem from "./svg-item";

class SvgRectangle extends SvgItem {
  constructor(x1, y1, x2, y2) {
    super();
    this.type = "rect";
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.stroke = "#333";
    this.fill = "#5e2";
  }

  translate(dx, dy) {
    this.x1 += dx;
    this.y1 += dy;
    this.x2 += dx;
    this.y2 += dy;
  }
}

export default SvgRectangle;
