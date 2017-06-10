
<script>

export default {
  name: 'render-svg',
  props: ['svg', 'width', 'height'],

  render(createElement) {
    // console.log("rendered:", this.svg)
    // https://vuejs.org/v2/guide/render-function

    var options = {
      // 'class': { abc: true },
      on: {
        wheel: this.mouseWheel,
        click: this.click
      },
      domProps: {
        innerHTML: this.svg
      }
    }

    let div = createElement("DIV", options)
    return div;
  },

  methods: {
    mouseWheel(ev) {
      const event = window.event || ev; // old IE support
      const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      if (delta > 0) {
        this.$emit("mouse-wheel-down", event);
      } else if (delta < 0) {
        this.$emit("mouse-wheel-up", event);
      }
      // for IE
      event.returnValue = false;
      // for Chrome and Firefox
      if (event.preventDefault) {
        event.preventDefault();
      }
    },

    click() {
      console.log("click")
    }
  },

  updated() {
    let svg = this.$el.querySelector('svg');
    if (svg) {
      if (this.width) {
        svg.setAttribute("width", this.width);
      }
      if (this.height) {
        svg.setAttribute("height", this.height)
      }
      svg.setAttribute("transform", "scale(1)")

      //      svg.setAttribute('mouse-wheel', "");
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
