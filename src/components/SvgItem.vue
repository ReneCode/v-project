
<script>

export default {
  name: 'svg-item',
  props: ['item'],

  constructor() {
    console.log("abc");
  },

  render(createElement) {
    var options = this.getRenderOptions(this.item);
    if (options) {
      let svgElement = createElement(this.item.type, options)
      return svgElement;
    }
  },

  methods: {
    getRenderOptions(item) {
      switch (item.type) {
        case "text":
          return this.getTextRenderOptions(this.item);
      }
    },

    getTextRenderOptions(item) {
      return {
        on: {
        },
        attrs: {
          x: item.x,
          y: item.y,
          'font-size': item.fontSize
        },
        domProps: {
          innerHTML: item.text
        }
      }
    }
  }

  // updated() {
  //   let svg = this.$el.querySelector('svg');
  //   if (svg) {
  //     if (this.width) {
  //       svg.setAttribute("width", this.width);
  //     }
  //     if (this.height) {
  //       svg.setAttribute("height", this.height)
  //     }
  //     svg.setAttribute("transform", "scale(1)")

  //     //      svg.setAttribute('mouse-wheel', "");
  //   }
  // }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
