
class TemporaryStore {
  constructor() {
    this.items = [];
  }

  setItems(items) {
    console.log(this.items.length, "setItems:", items);
    this.items = items;
  }

  addItem(item) {
    console.log(this.items.length, "addItem:", item);
    this.items.push(item);
  }

  clear() {
    this.items.splice(0);
  }

  removeItem(item) {
    console.log(this.items.length, "removeItem:", item);
    let index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }
};

let temporaryStore = new TemporaryStore();
export default temporaryStore;
