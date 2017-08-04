<template>
  <div>
    <headline :title="title"></headline>
    <div class="headline-gap"></div>
    <div class="flex-container-row">
      <toolbar :hasPreviousPage="hasPreviousPage" :hasNextPage="hasNextPage"></toolbar>
      <div class="flex-grow flex-container-column">
        <!--<bread-crumb :crumbs="crumbs"></bread-crumb>-->
        <search v-model="search"></search>
        <page-svg v-if="page" class="svg-page" :search="search" :page="page">
        </page-svg>
      </div>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import BreadCrumb from './BreadCrumb';

import Toolbar from './Toolbar.vue'
import Search from './Search.vue'
import PageSvg from './PageSvg.vue'
import EventBus from '../util/event-bus';
import ProjectService from '../services/project-service';
import PageListService from '../services/page-list-service'
import { UrlService } from "../services/url-service";

import * as msgs from "@/store/mutation-types";
import store from "@/store";

export default {
  name: '',
  data() {
    return {
      project: undefined,
      page: undefined,
      search: "",

      hasPreviousPage: false,
      hasNextPage: false

    }
  },

  components: {
    Headline,
    PageSvg,
    Toolbar,
    Search,
    BreadCrumb
  },
  watch: {
    search(newVal) {
      this.search = newVal;
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.updatePage(to);
    next();
  },

  beforeMount() {
    this.projectService = new ProjectService();
    this.pageListService = new PageListService();
    this.urlService = new UrlService();

    this.updatePage(this.$route);
  },

  computed: {
    title() {
      if (this.page) {
        return `${this.page.properties[11000]} - ${this.page.properties[11011]}`;
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
    EventBus.on('capturePage', this.capturePage);
  },

  beforeDestroy() {
    EventBus.off('previousPage', this.previousPage);
    EventBus.off('nextPage', this.nextPage);
    EventBus.off('capturePage', this.capturePage);
  },

  methods: {
    updatePage(route) {
      this.projectId = route.params.projectId;
      store.dispatch(msgs.SET_PROJECTID, this.projectId);
      const pageId = route.params.pageId;
      const query = route.query;
      const q = query.q;

      // if searched for function than
      if (q && q.indexOf("function:") === 0) {
        this.search = q.replace("function:", "");
      }

      this.projectService.getProject(this.projectId)
        .then(project => {
          this.project = project;
        });

      this.projectService.getPage(this.projectId, pageId)
        .then((page) => {
          this.page = page;
        });

      this.pageListService.getPreviousAndNextPageId(this.projectId, pageId, q)
        .then((previousAndNextPageIds) => {
          this.previousAndNextPageIds = previousAndNextPageIds;
          this.hasPreviousPage = !!this.previousAndNextPageIds[0];
          this.hasNextPage = !!this.previousAndNextPageIds[1];
        });
    },

    previousPage() {
      this.toPage(0);
    },

    nextPage() {
      this.toPage(1);
    },

    capturePage() {
      this.projectService.capturePage(this.projectId, this.page.id);
    },

    toPage(idx) {
      const pageId = this.previousAndNextPageIds[idx];
      if (pageId) {
        const link = this.urlService.getLink('pageByProjectIdAndPageId', this.projectId, pageId);
        const q = this.$route.query.q;
        this.$router.push({ path: link, query: { q: q } });
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
  border: 1px solid #bbb;
  background-color: #eaeaea;
  text-align: center;
  padding: 6px;
  flex-grow: 1;
}

.flex-container-row {
  display: flex;
  flex-direction: row;
}

.flex-container-column {
  display: flex;
  flex-direction: column;
}

.flex-grow {
  flex-grow: 2;
}
</style>

