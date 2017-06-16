<template>
  <div>
    {{project.name}} [{{project.version}}] / {{countPages}}
    <img :src="pageImage" alt="first page">
  </div>
</template>

<script>
import SvgService from "../services/svg-service";
import { ProjectService } from "../services/project-service";
import { UrlService } from "../services/url-service";

export default {
  name: 'project-card',
  components: {
  },
  props: ['project'],

  data() {
    return {
      countPages: 0,
      pageImage: undefined
    }
  },

  beforeMount() {
    this.urlService = new UrlService();
    let projectService = new ProjectService();
    projectService.countPages(this.project.id)
      .then(count => {
        this.countPages = count;
      });

    let svgService = new SvgService();
    svgService.getSvgAsImage(this.project.id, "1")
      .then((image) => {
        let array = new Uint8Array(image);
        let blob = new Blob([array]);
        const urlCreator = window.URL || window.webkitURL || window;
        const imageUrl = urlCreator.createObjectURL(blob);
        this.pageImage = imageUrl;
        // var encoded = new TextEncoderLite('utf-8').encode(image);
        // console.log(encoded);
        // var b64encoded = base64js.fromByteArray(encoded);
        // console.log(b64encoded);
        // let str = "data:image/png;base64," + b64encoded;
        // console.log(str);
        // this.pageImage = str;

        // let ec = this.b64EncodeUnicode(image);
        // console.log(ec);
        // this.pageImage = "data:image/png;base64," + ec;
        /*
                const reader = new FileReader();
                reader.onloadend = () => {
                  console.log(reader.result);
                  this.pageImage = reader.result;
                }
                // reader.onerror = reject
                reader.readAsDataURL(blob)
                */
      })
  },

  computed: {
    pageUrl() {
      const url = this.urlService.getUrl('svgPngByProjectIdAndSortId', this.project.id, "1");
      return url;
    }

  },

  methods: {
    b64EncodeUnicode(str) {
      // first we use encodeURIComponent to get percent-encoded UTF-8,
      // then we convert the percent encodings into raw bytes which
      // can be fed into btoa.
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
        }));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
