
import SvgItem from "./svg-item";

class SvgRectangle extends SvgItem {
  constructor(x, y, width, height) {
    super();
    this.type = "rect";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.stroke = "#333";
    this.fill = "#decebe";
  }

  translate(dx, dy) {
    console.log("translate text")
    this.x += dx;
    this.y += dy;
  }
}

export default SvgRectangle;
