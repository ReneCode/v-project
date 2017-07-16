/* eslint-disable indent */

import { UrlService } from "./url-service";
import auth from "./auth-service";
import axios from 'axios';

class ProjectService {

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
        })
    }

    getProjects(q) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("projects");
            const options = {
                params: {
                    q: q
                }
            }
            this.authAxios.get(url, options)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getProject(projectId) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("projectById", projectId);
            this.authAxios.get(url)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    countPages(projectId) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("pagesByProjectId", projectId);
            const options = {
                params: {
                    meta: "count"
                }
            }
            this.authAxios.get(url, options)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getPages(projectId, q) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("pagesByProjectId", projectId);
            const options = {
                params: {
                    q: q
                }
            }
            this.authAxios.get(url, options)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getPage(projectId, pageId) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl('pageByProjectIdAndPageId', projectId, pageId);
            this.authAxios.get(url)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getRedlinings(projectId, opt) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl('redliningsByProject', projectId);
            const options = {
                params: {
                    pageTblObjectId: opt.pageTblObjectId,
                    translateY: opt.translateY
                }
            }
            this.authAxios.get(url, options)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    getSvg(projectId, svgName) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl('svgByProjectIdAndSortId', projectId, svgName);
            this.authAxios.get(url)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    loadImage(projectId, imageName) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl('imageByProjectIdAndName', projectId, imageName);
            const options = {
                responseType: "blob"
            };
            this.authAxios.get(url, options)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    loadFunctions(projectId, q) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl('functionsByProjectId', projectId);
            const options = {
                params: {
                    q: q
                }
            };
            this.authAxios.get(url, options)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    capturePage(projectId, pageId) {
        let pageUrl = window.location.origin +
            this.urlService.getLink('capturePageByProjectIdAndPageId', projectId, pageId) +
            "?id_token=" + auth.getIdToken();

        const data = {
            projectId,
            pageId,
            url: pageUrl
        };
        const url = this.urlService.getUrl('capture');
        return this.authAxios.post(url, data);
    }
}

export default ProjectService;
