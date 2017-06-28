
<script>

export default {
  name: 'svg-item',
  props: ['item'],

  render(createElement) {
    return this.renderElement(createElement, this.item);
    // var options = this.getRenderOptions(createElement, this.item);
    // if (options) {
    //   let svgElement = createElement(this.item.type, options)
    //   return svgElement;
    // }
  },

  methods: {
    renderElement(createElement, item) {
      switch (item.type) {
        case "text":
          return this.renderText(createElement, item);
      }
    },

    renderText(createElement, item) {
      let lines = item.text.split('\n');

      let childElements = [];
      if (lines.length > 1) {
        lines.forEach(l => {
          let options = {
            attrs: {
              x: 0,
              dy: "1em"
            },
            domProps: {
              innerHTML: l
            }
          };
          let tspan = createElement('tspan', options);
          childElements.push(tspan);
        });
      }
      // main text-element
      let obj = {
        on: {
        },
        attrs: {
          gid: item.id,
          transform: `matrix(1,0,0,1,${item.x},${item.y})`,
          'font-size': item.fontSize,
          fill: item.fill
        }
      };
      if (lines.length === 1) {
        obj.domProps = {
          innerHTML: item.text
        }
      }
      if (item.selected) {
        obj.attrs["font-weight"] = 'bolder';
      }

      let textObject = createElement(this.item.type, obj, childElements);
      return textObject;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
