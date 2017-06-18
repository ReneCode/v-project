/* eslint-disable key-spacing */

export class UrlService {

  urls = {};
  links = {};

  constructor() {
    const hostProject = process.env.BACKEND_PROJECT_HOST;
    const hostPicture = process.env.BACKEND_PICTURE_HOST;

    this.urls = {
      projects:                   `${hostProject}/api/v1/projects`,
      projectById:                `${hostProject}/api/v1/projects/{1}`,

      pagesByProjectId:           `${hostProject}/api/v1/projects/{1}/pages`,
      pageByProjectIdAndPageId:   `${hostProject}/api/v1/projects/{1}/pages/{2}`,

      redliningsByProject:        `${hostProject}/api/v1/projects/{1}/redlinings`,

      svgByProjectIdAndSortId:    `${hostPicture}/api/v1/svgs/{1}/{2}.svg`,
      svgPngByProjectIdAndSortId: `${hostPicture}/api/v1/svgs/{1}/{2}.svg/png`
    };

    this.links = {
      projectByProjectId:          '/project/{1}',
      pageByProjectIdAndPageId:    '/project/{1}/page/{2}'
    }
  }

  getLink(type, ...args) {
    let link = this.links[type];
    if (!link) {
      throw Error("bad link type:" + type);
    }
    return this.fillParameter(link, ...args);
  }

  getUrl(type, ...args) {
    let url = this.urls[type];
    if (!url) {
      throw Error("bad url type:" + type);
    }
    return this.fillParameter(url, ...args);
  }

  fillParameter(text, ...args) {
    const count = args.length;
    for (let i = 0; i < count; i++) {
      const arg = args[i];
      const replace = "{" + (i + 1) + "}";
      text = text.replace(replace, arg);
    }

    return text;
  }

}
