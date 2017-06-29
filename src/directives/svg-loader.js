import Vue from 'vue'

Vue.directive('svg-loader', {
  bind(el, binding) {
    var template = document.createElement("DIV");
    template.innerHTML = binding.value.svg;
    var svgEle = template.querySelector("svg")
    if (svgEle) {
      const viewBox = svgEle.getAttribute("viewBox");
      for (let child of svgEle.childNodes) {
        if (child.localName) {
          el.appendChild(child);
        }
      }
      binding.value.callback({ msg: "svgElement", val: el });
      binding.value.callback({ msg: "viewBox", val: viewBox });
    }
  }
});
