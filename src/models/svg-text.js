
import SvgItem from "./svg-item";

class SvgText extends SvgItem {
  constructor(x, y, text) {
    super();
    this.type = "text";
    this.x = x;
    this.y = y;
    this.text = text;
    this.stroke = "#2f9";
    this.fill = "#39f";
  }

  translate(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

export default SvgText;
