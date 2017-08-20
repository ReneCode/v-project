
import SvgItem from "./svg-item";
// import ResizeGripList from "@/util/resize-grip-list";

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
    this.x += dx;
    this.y += dy;
  }

  updateFromGripList(gripList) {
    const bbox = gripList.getBoundingBox();
    this.x = bbox.x;
    this.y = bbox.y;
    this.width = bbox.width;
    this.height = bbox.height;
  }

  setGrips(gripList) {
    gripList.initFromRectangle(this);
  }

}

export default SvgRectangle;
