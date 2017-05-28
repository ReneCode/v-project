/* eslint-disable indent */

import { UrlService } from "./url-service";
import auth from "./auth-service";
import axios from 'axios';

export class ProjectService {

    urlService = undefined;
    http = undefined;

    constructor() {
        this.urlService = new UrlService();
        this.http = axios.create({
            headers: {
                Authorization: "Bearer " + auth.getAccessToken()
            }
        })
    }

    getProjects() {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("projects");
            this.http.get(url)
                .then((response) => {
                    resolve(response.body);
                },
                (err) => {
                    reject(err);
                });
        });
    }

    getProject(projectId) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("projectById", projectId);
            axios.get(url)
                .then((response) => {
                    resolve(response.body);
                },
                (err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getPages(projectId) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("pagesByProjectId", projectId);
            axios.get(url)
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
