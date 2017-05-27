/* eslint-disable indent */

import Vue from "vue";
import { UrlService } from "./url-service";

export class ProjectService {

    urlService = undefined;

    constructor() {
        this.urlService = new UrlService();
    }

    getProjects() {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("projects");
            Vue.http.get(url)
                .then((response) => {
                    resolve(response.body);
                },
                (err) => {
                    reject(err);
                });
        });
    }

    getPages(projectId) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("pagesByProjectId", projectId);
            Vue.http.get(url)
                .then((response) => {
                    resolve(response.body);
                })
                .catch((err) => {
                    reject(err);
                });
        });
        // .then((response) => {
        //   console.log(response.body);
        // },
        // (err) => {
        //   console.log("error", err);
        // });
    }
}
