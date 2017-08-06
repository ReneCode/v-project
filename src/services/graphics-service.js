
import { UrlService } from "./url-service";
import auth from "./auth-service";
import axios from 'axios';

class GraphicsService {
  constructor() {
    this.urlService = new UrlService();
    this.authAxios = axios.create({
      headers: {
        "Content-Type": 'application/json',
        'Authorization': "Bearer " + auth.getIdToken()
      }
    });
  }

  getAllItems(projectId, filter) {
    return new Promise((resolve, reject) => {
      let url = this.urlService.getUrl("graphicsByProjectId", projectId);
      let options = {
      }
      if (filter) {
        options.params = filter;
      }
      this.authAxios.get(url, options)
        .then(result => {
          resolve(result.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  postItem(projectId, newItem) {
    return new Promise((resolve, reject) => {
      let url = this.urlService.getUrl("graphicsByProjectId", projectId);
      this.authAxios.post(url, newItem)
        .then(result => {
          if (result.data.length > 0) {
            resolve(result.data[0]);
          } else {
            reject();
          }
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  deleteItems(projectId, items) {
    return new Promise((resolve, reject) => {
      this.delItems(projectId, items);
      resolve();
    });
  }

  async delItems(projectId, items) {
    let url = this.urlService.getUrl("graphicsByProjectId", projectId);
    for (let item of items) {
      try {
        let delUrl = url + "/" + item.id;
        await this.authAxios.delete(delUrl);
      } catch (err) {
        console.error(err)
      }
    }
  }

  updateItems(items) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(items)) {
        items = [items];
      }
      this.updateOneAsync(items);
      resolve();
    });
  }

  async updateOneAsync(items) {
    for (let item of items) {
      try {
        let url = this.urlService.getUrl("graphicsByProjectId", item.projectId);
        url = url + "/" + item.id;
        await this.authAxios.put(url, item);
      } catch (err) {
        console.error(err);
      }
    }
  }
}

let graphicsService = new GraphicsService();
export default graphicsService;
