
import ProjectService from './project-service';

class FunctionListService {

  pageId = undefined;
  functions = [];

  getFunctions(page, q) {
    let self = this;
    return new Promise((resolve, reject) => {
      if (page.id !== self.pageId || q !== self.q) {
        self.loadFunctionList(page, q)
          .then(functions => {
            self.functions = functions;
            resolve(functions);
          });
      } else {
        resolve(self.functions);
      }
    });
  }

  // pageIdList = undefined;

  // getPreviousAndNextPageId(projectId, pageId, q) {
  //   let self = this;
  //   return new Promise((resolve, reject) => {
  //     if (self.pageIdList) {
  //       resolve(self.getPreviousAndNextPageIdArray(pageId));
  //     } else {
  //       // lazy loading
  //       self.loadPageIdList(projectId, q)
  //         .then(pageIdList => {
  //           self.pageIdList = pageIdList;
  //           resolve(self.getPreviousAndNextPageIdArray(pageId));
  //         });
  //     }
  //   });
  // }

  // // ------ private ---------

  // getPreviousAndNextPageIdArray(pageId) {
  //   if (!this.pageIdList) {
  //     throw new Error("pageIdList missing");
  //   }

  //   let prevAndNext = [null, null];
  //   // check if there is a previous or next page
  //   let idx = this.pageIdList.indexOf(pageId);
  //   if (idx - 1 >= 0) {
  //     prevAndNext[0] = this.pageIdList[idx - 1];
  //   }

  //   if (idx + 1 < this.pageIdList.length) {
  //     prevAndNext[1] = this.pageIdList[idx + 1];
  //   }

  //   return prevAndNext;
  // }

  loadFunctionList(page, q) {
    const projectService = new ProjectService();

    return new Promise((resolve, reject) => {
      projectService.loadFunctions(page.projectId, q)
        .then(functions => {
          resolve(functions);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
}

export default FunctionListService;

