
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

  resize(grip) {
    switch (grip.name) {
      case "grip-br":
        this.width = grip.x - this.x;
        this.height = grip.y - this.y;
        break;
      case "grip-bl":
        this.width -= grip.x - this.x;
        this.x = grip.x
        this.height = grip.y - this.y;
        break;
      case "grip-tl":
        this.height -= grip.y - this.y;
        this.width -= grip.x - this.x;
        this.x = grip.x
        this.y = grip.y
        break;
      case "grip-tr":
        this.height -= grip.y - this.y;
        this.width = grip.x - this.x;
        this.y = grip.y
        break;
      default:
        throw new Error("bad grip name");
    }
    if (this.width < 0) {
      console.log("rect:", this, grip)
      // this.x = grip.x;
      // this.width = -this.width;
    }
  }

  setResizeGripList(resizeGripList) {
    resizeGripList.initFromRectangle(this);
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
