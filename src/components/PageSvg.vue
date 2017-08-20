// wait for svg-loader directive until svg is loaded

<template>
  <div>
    <svg ref="svg" :viewBox="viewBox">
      <g :transform="transform">
        <g v-if="svg" v-svg-loader="{svg:svg, callback:svgLoaderCallback}">
        </g>
        <g class="graphic">
          <svg-item v-for="ai in allItems" :key="ai.item.gid" :selected="ai.selected" :item="ai.item"></svg-item>
        </g>
        <g class="temorary-graphic">
          <svg-item v-for="item in temporaryItems" :key="item.gid" :selected="true" :item="item"></svg-item>
        </g>
        <g v-if="grips.length" class="grips">
          <rect v-for="grip in grips" class="resizer" :gid="grip.name" :x="grip.x - resizerSize/2" :y="grip.y - resizerSize/2" :width="resizerSize" :height="resizerSize"></rect>
        </g>
  
        <!-- <svg-item :selected="false" :item="tempItems[0]"></svg-item> -->
  
      </g>
    </svg>
    Grips: {{ grips }}
    <code>
      Selected: {{ selectedItems }}
    </code>
  </div>
</template>

<script>
import ProjectService from '../services/project-service'
import FunctionListService from '../services/function-list-service'
import SvgService from '../services/svg-service'
import SvgLoader from '../directives/svg-loader'
import SvgTransformer from '../util/svg-transformer'
import SvgHighlight from '../util/svg-highlight'
import SvgInteraction from '../util/svg-interaction'
import SvgItem from './SvgItem';

import selectionStore from "@/util/selection-store";

export default {
  name: 'page-svg',
  props: [
    'page',
    'search'
  ],
  data() {
    return {
      svg: undefined,
      viewBox: undefined,
      transform: undefined,
      selectedItems: selectionStore.getItems(),
      gripList: selectionStore.getGripList()
    }
  },
  computed: {
    resizerSize() {
      return 8;
    },

    grips: function () {
      return this.gripList.getGrips()
    },

    temporaryItems: function () {
      let graphicItems = this.$store.getters.graphicItems;
      return this.selectedItems.filter(selItem => {
        if (graphicItems.find(gi => gi.id === selItem.id)) {
          return false;
        }
        return true;
      })
    },

    allItems: function () {
      return this.$store.getters.graphicItems.map(gi => {
        let newItem = {
          item: gi
        }
        // do not show items, that are in temporaryData
        if (this.selectedItems.find(ti => gi.id === ti.id)) {
          // item is in tempItems
          newItem.selected = true;
        } else {
          newItem.selected = false;
        }
        return newItem;
      })
    }
  },
  components: {
    SvgLoader,
    SvgItem
  },
  beforeMount() {
    // window.addEventListener('resize', this.handleResize)
    this.projectService = new ProjectService();
    this.svgService = new SvgService();
    this.functionListService = new FunctionListService();
    this.getPageData();
  },

  mounted() {
    this.svgTransformer = new SvgTransformer(this.$refs.svg, this.updateTransform)
    this.svgInteraction = new SvgInteraction(this.$refs.svg, this.svgTransformer);
    this.svgHighlight = new SvgHighlight(this.$refs.svg, 'highlighted');
  },

  watch: {
    page(val) {
      this.getPageData();
    },

    search(val) {
      this.onSearch(val);
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
            this.onSearch(this.search);
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
        });
    },

    onSearch(searchString) {
      if (!searchString) {
        this.svgHighlight.clear();
      } else {
        this.functionListService.getFunctions(this.page, searchString)
          .then(functions => {
            const ids = functions.map(f => {
              let objId = f.objectId;
              objId = objId.replace("/", "_");
              const domId = `Id${objId}`;
              return domId;
            });
            this.svgHighlight.highlightById(ids);
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.graphic {
  cursor: pointer;
}

@keyframes blinkAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.highlighted {
  opacity: 0;
  animation: blinkAnimation 1s infinite;
}

.grips {
  fill: #66c;
  stroke: #000;
  opacity: 0.7;
  cursor: pointer;
}






/* .resizer {
  fill: #eee;
  stroke: #333;
  cursor: pointer;
} */


/*

group, that has attribute id, its value starts with "Id"

g[id^=Id]:not(.highlighted) {
  opacity: 0.1;
}

path[class^=P] {
  opacity: 0.1;  
}

*/
</style>

