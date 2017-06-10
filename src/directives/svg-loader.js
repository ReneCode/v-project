import Vue from 'vue'

Vue.directive('svg-loader', {
  bind(el, binding) {
    var template = document.createElement("DIV");
    template.innerHTML = binding.value.svg;
    var svgEle = template.querySelector("svg")
    if (svgEle) {
      const viewBox = svgEle.getAttribute("viewBox");
      svgEle.childNodes.forEach(e => {
        if (e.localName) {
          el.appendChild(e);
        }
      })
      binding.value.callback({ msg: "viewBox", val: viewBox })
    }
  }
});
