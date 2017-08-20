// import Vue from 'vue';
import ResizeGripList from '@/util/resize-grip-list'

class TemporaryStore {
  constructor() {
    this.items = [];
    this.gripList = new ResizeGripList();
  }

  getGrip(name) {
    return this.gripList.getGrip(name);
  }

  getGripList() {
    return this.gripList;
  }

  addItem(item) {
    item.setGripList(this.gripList);
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }

  initFromTwoPoints(p1, p2) {
    this.gripList.initFromTwoPoints(p1, p2);
  }

  updateItemsFromGripList() {
    for (let item of this.items) {
      item.updateFromGripList(this.gripList);
    }
  }

  getOppositeGrip(grip) {
    return this.gripList.getOppositeGrip(grip);
  }

  clear() {
    this.items.splice(0);
    this.gripList.clear();
  }

  removeItem(item) {
    let index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

};

let temporaryStore = new TemporaryStore();
export default temporaryStore;
