// wait for svg-loader directive until svg is loaded

<template>
  <svg width="1200" height="700" :viewBox="viewBox">
    <g :transform="transform">
      <g v-if="svg" v-svg-loader="{svg:svg, callback:svgLoaderCallback}">
      </g>
      <g class="redlining">
        <svg-item v-for="item in items" :key="item.id" :item="item"></svg-item>
      </g>
    </g>
  </svg>
</template>

<script>
import { mapGetters } from 'vuex';

import ProjectService from '../services/project-service'
import SvgService from '../services/svg-service'
import SvgLoader from '../directives/svg-loader'
import SvgTransformer from '../util/svg-transformer'
import SvgInteraction from '../util/svg-interaction'
import SvgItem from './SvgItem';
import { SET_ITEMS, CLEAR_ITEMS } from '../store/mutation-types';

export default {
  name: 'page-svg',
  props: [
    'page',
    'width', 'height'
  ],
  data() {
    return {
      svg: undefined,
      viewBox: undefined,
      transform: undefined
    }
  },
  computed: {
    ...mapGetters({
      items: 'svgItems'
    })
  },
  components: {
    SvgLoader,
    SvgItem
  },
  beforeMount() {
    this.projectService = new ProjectService();
    this.svgService = new SvgService();
    this.getPageData();
  },

  mounted() {
    this.svgTransformer = new SvgTransformer(this.$el, this.updateTransform)
    this.svgInteraction = new SvgInteraction(this.$el, this.svgTransformer);
  },

  watch: {
    page(val) {
      this.getPageData();
    }
  },

  methods: {
    updateTransform(transform) {
      this.transform = transform;
    },
    svgLoaderCallback(ev) {
      switch (ev.msg) {
        case "viewBox":
          this.viewBox = ev.val;
          this.getRedlinings();
          break;
        case "svgElement":
          this.svgService.adjustImages(this.page.projectId, ev.val);
          break;
      }
    },

    getPageData() {
      if (!this.page) {
        throw new Error("page not set")
      }
      return this.projectService.getSvg(this.page.projectId, this.page.sortId)
        .then((svg) => {
          // restart the svg-loader by set the svg-property to undefined
          // and on nextTick set the new value
          this.svg = undefined;
          this.$nextTick(() => {
            this.svg = svg;
          })
        });
    },

    getTranslateY() {
      if (!this.viewBox) {
        throw new Error("viewBox not set")
      }
      const coords = this.viewBox.split(' ');
      if (coords.length === 4) {
        return coords[3];
      }
      return undefined;
    },

    getRedlinings() {
      if (!this.page) {
        throw new Error("page not set")
      }
      let options = {
        pageTblObjectId: this.page.tblObjectId,
        translateY: this.getTranslateY()
      };
      return this.projectService.getRedlinings(this.page.projectId, options)
        .then((redlinings) => {
          // this.items = redlinings;
          this.$store.commit(CLEAR_ITEMS);
          this.$store.commit(SET_ITEMS, redlinings);
        });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.redlining {
  cursor: pointer;
}
</style>

