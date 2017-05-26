export class UrlService {

  urls = {};

  constructor() {
    const host = environment.backendHost;

    this.urls = {
      projects:                   `${host}/api/v1/projects`,
      projectById:                `${host}/api/v1/projects/{1}`,

      pagesByProjectId:           `${host}/api/v1/{1}/pages`,
      pageByProjectIdAndPageId:   `${host}/api/v1/{1}/pages/{2}`,

      svgByProjectIdAndSortId:    `${host}/api/v1/{1}/svg/{2}.svg`
    };

  }

  getUrl(type, ...args) {
    let url = this.urls[type];
    if (!url) {
      throw Error("bad url type:" + type);
    }

    const count = args.length;
    for (let i = 0; i < count; i++) {
      const arg = args[i];
      const replace = "{" + (i + 1) + "}";
      url = url.replace(replace, arg);
    }

    return url;
  }

}
