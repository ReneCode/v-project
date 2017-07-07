<template>
  <div>
    <headline :title="title"></headline>
    <div class="headline-gap"></div>
    <div class="flex-container">
      <toolbar></toolbar>
      <div class="flex-column">
        <!--<bread-crumb :crumbs="crumbs"></bread-crumb>-->
        <page-svg v-if="page" class="svg-page" :page="page" :width="500" :height="400">
        </page-svg>
      </div>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import BreadCrumb from './BreadCrumb';

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
      project: undefined,
      page: undefined
    }
  },

  components: {
    Headline,
    PageSvg,
    Toolbar,
    BreadCrumb
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
    },

    crumbs() {
      let crumbs = [];
      if (this.project && this.page) {
        crumbs.push({
          name: this.project.name,
          url: this.urlService.getLink('projects')
        });
        crumbs.push({
          name: this.project.version,
          url: this.urlService.getLink('projectByProjectId', this.project.id)
        });
        crumbs.push({
          name: this.page.properties[11011]
        });
      }
      return crumbs;
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

      this.projectService.getProject(this.projectId)
        .then(project => {
          this.project = project;
        });

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

.flex-column {
  display: flex;
  flex-direction: column;
}
</style>

