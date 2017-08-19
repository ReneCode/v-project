// import Vue from 'vue';

class TemporaryStore {
  init(data) {
    this.data = data;
    /*
      items: []
      selectionObject: null
      resizeGripList: new ResizeGripList()
    */
  }

  getGrip(name) {
    return this.data.resizeGripList.getGrip(name);
  }

  initFromTwoPoints(p1, p2) {
    this.data.resizeGripList.initFromTwoPoints(p1, p2);
    for (let item of this.items) {
      item.resizeFromGripList(this.data.resizeGripList);
    }
  }

  getOppositeGrip(grip) {
    return this.data.resizeGripList.getOppositeGrip(grip);
  }

  addItem(item) {
    item.setResizeGripList(this.data.resizeGripList);
    this.data.items.push(item);
  }

  clear() {
    this.data.selectionObject = null;
    this.data.items.splice(0);
    this.data.resizeGripList.clear();
  }

  removeItem(item) {
    let index = this.data.items.indexOf(item);
    if (index >= 0) {
      this.data.items.splice(index, 1);
    }
  }

  getItems() {
    return this.data.items;
  }
};

let temporaryStore = new TemporaryStore();
export default temporaryStore;
