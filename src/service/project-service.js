/* eslint-disable indent */

import { UrlService } from "./url-service";
import auth from "./auth-service";
import axios from 'axios';

export class ProjectService {

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
        /*
        axios.defaults.headers.common['Authorization'] = "Bearer " + auth.getIdToken();
        this.httpOption = {
            headers: {
                "Content-Type": 'application/json'
            }
        };
        */
    }

    getProjects() {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("projects");
            this.authAxios.get(url)
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
                    console.log(err);
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
                    console.log(response.data);
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getPages(projectId) {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("pagesByProjectId", projectId);
            this.authAxios.get(url)
                .then((response) => {
                    resolve(response.data);
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
