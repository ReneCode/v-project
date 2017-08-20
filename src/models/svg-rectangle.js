
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

  setGripList(gripList) {
    gripList.initFromRectangle(this);
    /*
    return {
      resizeGripList: grips,
      // grips: [
      //   { name: "grip-tl", x: this.x, y: this.y },
      //   { name: "grip-tr", x: this.x + this.width, y: this.y },
      //   { name: "grip-bl", x: this.x, y: this.y + this.height },
      //   { name: "grip-br", x: this.x + this.width, y: this.y + this.height }
      // ],
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
    */
  }

}

export default SvgRectangle;
