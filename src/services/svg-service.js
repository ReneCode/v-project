
import { UrlService } from "./url-service";
import auth from "./auth-service";
import axios from 'axios';

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
}

