
class SvgItemStore {
  items = [];

  addItems(newItems) {
    console.log("add Items")
    newItems.forEach(i => {
      this.items.push(i);
    });
  }

  getItems() {
    return this.items;
  }

  clearItems() {
    this.Items = [];
  }
};

const svgItemStore = new SvgItemStore();
export default svgItemStore;
