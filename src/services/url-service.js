/* eslint-disable key-spacing */

export class UrlService {

  urls = {};
  links = {};

  constructor() {
    const hostProject = process.env.BACKEND_PROJECT_HOST;
    const hostPicture = process.env.BACKEND_PICTURE_HOST;
    const hostCapture = process.env.BACKEND_CAPTURE_HOST;

    this.urls = {
      projects:                   `${hostProject}/api/v1/projects`,
      projectById:                `${hostProject}/api/v1/projects/{1}`,

      pagesByProjectId:           `${hostProject}/api/v1/projects/{1}/pages`,
      pageByProjectIdAndPageId:   `${hostProject}/api/v1/projects/{1}/pages/{2}`,

      redliningsByProject:        `${hostProject}/api/v1/projects/{1}/redlinings`,

      functionsByProjectId:       `${hostProject}/api/v1/projects/{1}/functions`,

      svgByProjectIdAndSortId:    `${hostPicture}/api/v1/svgs/{1}/{2}.svg`,
      svgPngByProjectIdAndSortId: `${hostPicture}/api/v1/svgs/{1}/{2}.svg/png`,

      imageByProjectIdAndName:    `${hostPicture}/api/v1/images/{1}/{2}`,

      capture:                    `${hostCapture}/api/v1/captures`,
      capturePictureByProjectIdAndPageId: `${hostCapture}/api/v1/captures/{1}/{2}`
    };

    this.links = {
      projects:                    '/projects',
      projectByProjectId:          '/project/{1}',
      pageByProjectIdAndPageId:    '/project/{1}/page/{2}',
      capturePageByProjectIdAndPageId: '/project/{1}/page/{2}/capture'
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
