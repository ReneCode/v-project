
import Vue from 'vue';

class ItemHelper {

  static setTemp(item) {
    if (!item.temp) {
      Vue.set(item, 'temp', {});
    }
  }

  // static setSelected(item) {
  //   this.setTemp(item);
  //   Vue.set(item.temp, 'selected', true);
  // }

  // static deleteSelected(item) {
  //   this.setTemp(item);
  //   Vue.delete(item.temp, 'selected', true);
  // }

  // static isSelected(item) {
  //   if (item.temp && item.temp.selected) {
  //     return true;
  //   }
  //   return false;
  // }

  static setTranslation(item, translation) {
    this.setTemp(item);
    Vue.set(item.temp, 'dx', translation.dx);
    Vue.set(item.temp, 'dy', translation.dy);
  }

  static deleteTranslation(item, translation) {
    this.setTemp(item);
    Vue.delete(item.temp, 'dx');
    Vue.delete(item.temp, 'dy');
  }

  static getTranslation(item) {
    this.setTemp(item);
    if (item.temp.dx) {
      return {
        dx: item.temp.dx,
        dy: item.temp.dy
      }
    } else {
      return undefined;
    }
  }
}

export default ItemHelper;
