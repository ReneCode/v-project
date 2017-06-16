<template>
  <div>
    <headline :title="title"></headline>

    <div class="headline-gap"></div>

    <search title="Pages" @search="onSearch" />

    <div class="flex-container">
     <div v-for="page in filteredPages" class="flex-item page-preview" v-on:click="selectPage(page)">
       <page-card :page="page" />
     </div>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import PageCard from './PageCard.vue'
import Search from './Search.vue'
import { ProjectService } from "../services/project-service";
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
      projectId: 0,
      title: "",
      pages: [],
      searchValue: ''
    }
  },

  computed: {
    filteredPages() {
      const val = this.searchValue.toUpperCase();
      return this.pages.filter((p) => {
        if (!p.properties) {
          return true;
        }
        return p.properties[11000].toUpperCase().indexOf(val) >= 0 ||
               p.properties[11011].toUpperCase().indexOf(val) >= 0;
      });
    }
  },

  beforeMount() {
    this.projectId = this.$route.params.projectId;
    const projectService = new ProjectService();
    projectService.getPages(this.projectId)
    .then((pages) => {
      this.pages = pages;
    })

    projectService.getProject(this.projectId)
    .then(project => {
      this.title = `${project.name} [${project.version}]`;
    })
  },

  methods: {
    selectPage(page) {
      const urlService = new UrlService();
      const link = urlService.getLink('pageByProjectIdAndPageId', this.projectId, page.id);
      this.$router.push(link);
    },

    onSearch(value) {
      this.searchValue = value;
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
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.flex-item {
  border: 1px solid #bbb;
  margin: 10px;
  height: 150px;
  width: 200px;
  background-color: #eaeaea;
}

.page-preview {
  cursor: pointer;
  font-size: 12px;
}

</style>
