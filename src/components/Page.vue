<template>
  <div>
    <headline :title="title"></headline>
    <div class="headline-gap"></div>
    <div class="flex-container">
      <toolbar></toolbar>
      <page-svg v-if="page" class="svg-page" :page="page" :width="500" :height="400">
      </page-svg>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import Toolbar from './Toolbar.vue'
import PageSvg from './PageSvg.vue'
import EventBus from '../util/event-bus';
import ProjectService from '../services/project-service';
import PageListService from '../services/page-list-service'
import { UrlService } from "../services/url-service";

export default {
  name: '',
  data() {
    return {
      page: undefined
    }
  },

  components: {
    Headline,
    PageSvg,
    Toolbar
  },

  beforeMount() {
    this.projectService = new ProjectService();
    this.pageListService = new PageListService();
    this.urlService = new UrlService();
    this.updatePage(this.$route);
  },

  watch: {
    $route(to, from) {
      this.updatePage(to);
    }
  },

  computed: {
    title() {
      if (this.page) {
        return `${this.page.properties[11000]} ${this.page.properties[11011]}`;
      }
    }
  },

  mounted() {
    EventBus.on('previousPage', this.previousPage);
    EventBus.on('nextPage', this.nextPage);
  },

  beforeDestroy() {
    EventBus.off('previousPage', this.previousPage);
    EventBus.off('nextPage', this.nextPage);
  },

  methods: {
    updatePage(route) {
      this.projectId = route.params.projectId;
      const pageId = route.params.pageId;
      const query = route.query;
      this.q = query.q;

      this.projectService.getPage(this.projectId, pageId)
        .then((page) => {
          this.page = page;
        });

      this.pageListService.getPreviousAndNextPageId(this.projectId, pageId, this.q)
        .then((previousAndNextPageIds) => {
          this.previousAndNextPageIds = previousAndNextPageIds;
        });
    },

    previousPage() {
      this.toPage(0);
    },

    nextPage() {
      this.toPage(1);
    },

    toPage(idx) {
      const pageId = this.previousAndNextPageIds[idx];
      if (pageId) {
        const link = this.urlService.getLink('pageByProjectIdAndPageId', this.projectId, pageId);
        this.$router.push({ path: link, query: { q: this.q } });
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.headline-gap {
  margin-top: 50px;
}

.svg-page {
  text-align: center;
  padding: 10px;
  background-color: #eee;
  flex-grow: 1;
}

.flex-container {
  display: flex;
  flex-direction: row;
}
</style>

