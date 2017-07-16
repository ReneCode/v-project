<template>
  <div>
    <div class="name">
      {{page.properties[11000]}} {{page.properties[11011]}}
    </div>
    <img :src="pageImage" width="194" height="125" :alt="page.properties[11000]">
  </div>
</template>

<script>
import { UrlService } from "../services/url-service";

export default {
  name: 'page-card',
  components: {
  },
  props:
  ['page'],
  data() {
    return {
      pageImage: ""
    }
  },
  mounted() {
    const urlService = new UrlService();
    const captureUrl = urlService.getUrl('capturePictureByProjectIdAndPageId', this.page.projectId, this.page.id);
    console.log(captureUrl)
    this.pageImage = captureUrl;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  margin-left: 2px;
  margin-top: 2px;
}
.name {
  margin-top: 5px;
  margin-left: 5px;
  height: 1.2em;
  /* white-space: nowrap; */
}
</style>
