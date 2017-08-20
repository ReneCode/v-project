
class Grip {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

class GripList {
  constructor() {
    this.gripList = [];
  }

  getBoundingBox() {
    let minX, maxX, minY, maxY;
    let first = true;
    for (let grip of this.gripList) {
      if (first) {
        first = false;
        minX = grip.x;
        maxX = grip.x;
        minY = grip.y;
        maxY = grip.y;
      } else {
        minX = Math.min(minX, grip.x);
        maxX = Math.max(maxX, grip.x);
        minY = Math.min(minY, grip.y);
        maxY = Math.max(maxY, grip.y);
      }
    }
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    }
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
    this.gripList.push(new Grip("grip-tl", minX, minY));
    this.gripList.push(new Grip("grip-tr", maxX, minY));
    this.gripList.push(new Grip("grip-bl", minX, maxY));
    this.gripList.push(new Grip("grip-br", maxX, maxY));
  }

}

export { Grip };
export default GripList;
