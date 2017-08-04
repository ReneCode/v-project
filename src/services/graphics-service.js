
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

  postItem(projectId, newItem) {
    return new Promise((resolve, reject) => {
      let url = this.urlService.getUrl("graphicsByProjectId", projectId);
      this.authAxios.post(url, newItem)
        .then(result => {
          if (result.data.length > 0) {
            resolve(result.data[0]._id);
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
        let delUrl = url + "/" + item._id;
        await this.authAxios.delete(delUrl);
      } catch (err) {
        console.error(err)
      }
    }
  }

  // getFunctions(page, q) {
  //   let self = this;
  //   return new Promise((resolve, reject) => {
  //     if (page.id !== self.pageId || q !== self.q) {
  //       self.loadFunctionList(page, q)
  //         .then(functions => {
  //           self.functions = functions;
  //           resolve(functions);
  //         });
  //     } else {
  //       resolve(self.functions);
  //     }
  //   });
  // }

  // loadFunctionList(page, q) {
  //   const projectService = new ProjectService();

  //   return new Promise((resolve, reject) => {
  //     projectService.loadFunctions(page.projectId, q)
  //       .then(functions => {
  //         resolve(functions);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       })
  //   })
  // }
}

let graphicsService = new GraphicsService();
export default graphicsService;
