
<script>
export default {
  data() {
    return {
      svg: `
      <?xml version="1.0" encoding="utf-8" ?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
 <svg xmlns="http://www.w3.org/2000/svg">
<circle cx=60 cy=60 r=60 class="selected"/>
</svg>`
    }
  },
  render(createElement) {
    console.log("render");
    var template = document.createElement('DIV');
    template.innerHTML = this.svg;
    // // var ele = template.content.firstChild;
    var svgEle = template.querySelector("svg")
    console.log(svgEle);
    // var rawSvg = svgEle.cloneNode(true);
    var item = createElement("h1", "hallo")
    console.log(item);
    var options = {
      'class': { abc: true },
      domProps: {
        innerHTML: this.svg
      }
    }
    return createElement("DIV", options)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
