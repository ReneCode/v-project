import Vue from 'vue'

console.log("svg-loader-directive!!")

Vue.directive('svg-loader', {
  update(el, binding) {
    console.log("svg-bind");
    var template = document.createElement("DIV");
    template.innerHTML = binding.value.svg;
    var svgEle = template.querySelector("svg")
    if (svgEle) {
      const viewBox = svgEle.getAttribute("viewBox");
      console.log("viewBox:", viewBox)
      svgEle.childNodes.forEach(e => {
        if (e.localName) {
          el.appendChild(e);
        }
      })
      binding.value.callback({ msg: "viewBox", val: viewBox })
    }
  }
});
