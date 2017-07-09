<template>
  <div>
    <headline :title="title"></headline>
  
    <div class="headline-gap"></div>
  
    <search title="Pages" v-model="search"></search>
  
    <div class="flex-container">
      <div v-for="page in pages" :key="page.id" class="flex-item page-preview" v-on:click="selectPage(page)">
        <page-card :page="page"></page-card>
      </div>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import PageCard from './PageCard.vue'
import Search from './Search.vue'
import ProjectService from "../services/project-service";
import { UrlService } from "../services/url-service";

export default {
  name: '',
  components: {
    Headline,
    PageCard,
    Search
  },
  data() {
    return {
      title: "",
      pages: [],
      search: '',
      projectId: 0
    }
  },

  watch: {
    search(newVal) {
      this.search = newVal;
      const url = window.location.pathname;
      this.$router.push({
        path: url,
        query: { q: newVal }
      });
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.updatePageList(to);
    next();
  },

  beforeMount() {
    this.projectService = new ProjectService();

    this.updatePageList(this.$route);
  },

  methods: {
    updatePageList(route) {
      const query = route.query;
      const q = query.q;
      this.search = q;

      this.projectId = this.$route.params.projectId;

      this.projectService.getProject(this.projectId).then(
        project => {
          this.title = `${project.name} [${project.version}]`;
        },
        err => {
          console.error(err);
        });

      this.projectService.getPages(this.projectId, q).then(
        pages => {
          this.pages = pages;
        },
        err => {
          console.error(err);
        });
    },

    selectPage(page) {
      const urlService = new UrlService();
      const link = urlService.getLink('pageByProjectIdAndPageId', this.projectId, page.id);
      this.$router.push({ path: link, query: { q: this.search } });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headline-gap {
  margin-top: 50px;
}

.flex-container {
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.flex-item {
  margin: 10px;
  height: 150px;
  width: 200px;
}

.page-preview {
  cursor: pointer;
  font-size: 12px;
  border: 1px solid #bbb;
  background-color: #eaeaea;
}
</style>
