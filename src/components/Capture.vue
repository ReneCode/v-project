<template>
  <div>
    <page-svg v-if="page" class="svg-page" :page="page" :width="500" :height="400">
    </page-svg>
  </div>
</template>

<script>
import PageSvg from './PageSvg.vue'
import ProjectService from '../services/project-service';
import PageListService from '../services/page-list-service'
import { UrlService } from "../services/url-service";
import auth from '../services/auth-service'

export default {
  name: '',
  data() {
    return {
      project: undefined,
      page: undefined
    }
  },

  components: {
    PageSvg
  },

  beforeMount() {
    // auth.setIdTokenFromLocation();

    const query = this.$route.query;
    if (query) {
      const idToken = query.id_token;
      if (idToken) {
        auth.setIdToken(idToken);
      }
      console.log("id:", auth.getIdToken());
    }

    this.projectService = new ProjectService();
    this.pageListService = new PageListService();
    this.urlService = new UrlService();
    this.updatePage(this.$route);
  },

  methods: {
    updatePage(route) {
      this.projectId = route.params.projectId;
      const pageId = route.params.pageId;

      this.projectService.getProject(this.projectId)
        .then(project => {
          this.project = project;
        });

      this.projectService.getPage(this.projectId, pageId)
        .then((page) => {
          this.page = page;
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

