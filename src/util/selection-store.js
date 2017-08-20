// import Vue from 'vue';
import GripList from '@/util/grip-list'

class SelectionStore {
  constructor() {
    this.items = [];
    this.gripList = new GripList();
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

  updateItemsFromGripList() {
    for (let item of this.items) {
      item.updateFromGripList(this.gripList);
    }
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

let selectionStore = new SelectionStore();
export default selectionStore;
