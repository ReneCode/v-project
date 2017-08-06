
import SvgRectangle from "./svg-rectangle";
import SvgText from "./svg-text";

class SvgItemFactory {
  createFromObject(obj) {
    if (Array.isArray(obj)) {
      let items = [];
      for (let o of obj) {
        let item = this.createFromObject(o);
        items.push(item);
      }
      return items;
    }

    switch (obj.type) {
      case "text":
        return this.createTextItem(obj);
      case "rect":
        return this.createRectangleItem(obj);
      default:
        throw new Error("bad object type:", obj);
    }
  }

  // -------------------

  createTextItem(obj) {
    let item = new SvgText(0, 0, "");
    this.copyProperties(obj, item);
    return item;
  }

  createRectangleItem(obj) {
    let item = new SvgRectangle(0, 0, 0, 0);
    this.copyProperties(obj, item);
    return item;
  }

  copyProperties(obj, item) {
    for (let prop in obj) {
      item[prop] = obj[prop];
    }
  }
}

let svgItemFactory = new SvgItemFactory();
export default svgItemFactory;
