
import { UrlService } from "./url-service";
import auth from "./auth-service";
import axios from 'axios';
import ProjectService from './project-service';

export default class SvgService {

  urlService = undefined;
  httpOption = undefined;
  authAxios = undefined

  constructor() {
    this.urlService = new UrlService();
    this.authAxios = axios.create({
      headers: {
        "Content-Type": 'application/json',
        'Authorization': "Bearer " + auth.getIdToken()
      }
    });
    this.projectService = new ProjectService();
  }

  getSvgAsImage(projectId, svgFile) {
    const url = this.urlService.getUrl('svgPngByProjectIdAndSortId', projectId, svgFile);
    // const url = "http://placekitten.com/g/240/200";
    return new Promise((resolve, reject) => {
      this.authAxios.get(url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  adjustImages(projectId, svgElement) {
    if (!projectId || !svgElement) {
      return;
    }
    const images = svgElement.getElementsByTagName("image");
    // do not use images.forEach.
    // that does not work with phantomjs
    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      this.adjustImage(projectId, image);
    }
  }

  adjustImage(projectId, imageElement) {
    const href = imageElement.getAttribute("xlink:href");
    imageElement.setAttribute("xlink:href", "");

    return this.projectService.loadImage(projectId, href)
      .then((image) => {
        const objUrl = window.URL.createObjectURL(image);
        imageElement.setAttribute("xlink:href", objUrl);
      });
  }
}

