// import Vue from 'vue';

class TemporaryStore {
  init(data) {
    this.data = data;
  }

  getGrip(name) {
    if (!this.data.selectionObject) {
      return null;
    }
    for (let grip of this.data.selectionObject.grips) {
      if (grip.name === name) {
        return grip;
      }
    }
    return null;
  }

  resize(grip) {
    for (let item of this.data.items) {
      item.resize(grip);
      this.data.selectionObject = item.getSelectionObject();
    }
  }

  addItem(item) {
    // Vue.set(this, "selectionObject", item.getSelectionObject());
    this.data.selectionObject = item.getSelectionObject();
    this.data.items.push(item);
  }

  clear() {
    this.data.selectionObject = null;
    this.data.items.splice(0);
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
