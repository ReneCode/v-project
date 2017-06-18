
import ProjectService from './project-service';

class PageListService {

  pageIdList = undefined;

  getPreviousAndNextPageId(projectId, pageId, q) {
    let self = this;
    return new Promise((resolve, reject) => {
      if (self.pageIdList) {
        resolve(self.getPreviousAndNextPageIdArray(pageId));
      } else {
        // lazy loading
        self.loadPageIdList(projectId, q)
          .then(pageIdList => {
            self.pageIdList = pageIdList;
            resolve(self.getPreviousAndNextPageIdArray(pageId));
          });
      }
    });
  }

  // ------ private ---------

  getPreviousAndNextPageIdArray(pageId) {
    if (!this.pageIdList) {
      throw new Error("pageIdList missing");
    }

    let prevAndNext = [null, null];
    // check if there is a previous or next page
    let idx = this.pageIdList.indexOf(pageId);
    if (idx - 1 >= 0) {
      prevAndNext[0] = this.pageIdList[idx - 1];
    }

    if (idx + 1 < this.pageIdList.length) {
      prevAndNext[1] = this.pageIdList[idx + 1];
    }

    return prevAndNext;
  }

  loadPageIdList(projectId, q) {
    const projectService = new ProjectService();

    return new Promise((resolve, reject) => {
      projectService.getPages(projectId, q)
        .then(pages => {
          let ids = pages.map(p => p.id);
          resolve(ids);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
}

export default PageListService;

