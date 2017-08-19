
class ResizeGrip {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

class ResizeGripList {
  constructor() {
    this.gripList = [];
  }

  getGripList() {
    return this.gripList;
  }

  getGrip(name) {
    for (let grip of this.gripList) {
      if (grip.name === name) {
        return grip;
      }
    }
    return null;
  }

  clear() {
    this.gripList.splice(0);
  }

  initFromRectangle(rect) {
    this.addGrips(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height);
  }

  initFromTwoPoints(p1, p2) {
    this.addGrips(
      Math.min(p1.x, p2.x),
      Math.min(p1.y, p2.y),
      Math.max(p1.x, p2.x),
      Math.max(p1.y, p2.y));
  }

  updateGrip(newGrip) {
    let minX = newGrip.x;
    let maxX = newGrip.x;
    let minY = newGrip.y;
    let maxY = newGrip.y;
    let oppisiteGrip = this.getGrip(this.getOppositeGripName(newGrip.name));
    minX = Math.min(minX, oppisiteGrip.x);
    maxX = Math.max(maxX, oppisiteGrip.x);
    minY = Math.min(minY, oppisiteGrip.y);
    maxY = Math.max(maxY, oppisiteGrip.y);
    this.clear();
    this.addGrips(minX, minY, maxX, maxY);
  }

  getOppositeGrip(grip) {
    return this.getGrip(this.getOppositeGripName(grip.name));
  }

  // ---------------------------

  getOppositeGripName(name) {
    switch (name) {
      case "grip-tl":
        return "grip-br";
      case "grip-tr":
        return "grip-bl";
      case "grip-bl":
        return "grip-tr";
      case "grip-br":
        return "grip-tl";
    }
    throw new Error("bad name:", name);
  }

  addGrips(minX, minY, maxX, maxY) {
    this.clear();
    // console.log("addGrips:", minX, minY, maxX, maxY)
    this.gripList.push(new ResizeGrip("grip-tl", minX, minY));
    this.gripList.push(new ResizeGrip("grip-tr", maxX, minY));
    this.gripList.push(new ResizeGrip("grip-bl", minX, maxY));
    this.gripList.push(new ResizeGrip("grip-br", maxX, maxY));
  }

}

export { ResizeGrip };
export default ResizeGripList;
