/* eslint-disable indent */

import { UrlService } from "./url-service";
import auth from "./auth-service";
import axios from 'axios';

export class ProjectService {

    urlService = undefined;
    httpOption = undefined;

    constructor() {
        this.urlService = new UrlService();
        // axios.defaults.headers.common['Authorization'] = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3JlbGFuZy5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NThjMzFmZjc0ZjIyMDkzZjkyN2VjNDY2IiwiYXVkIjoidVE1QVNkYlZjdVVhUmpUU2FSd0tLTUs0MGdqbDQ0ZnAiLCJleHAiOjE0OTYwMzc0NjIsImlhdCI6MTQ5NjAwMTQ2Mn0.Lj6XNGfeNcwXhhwdFfkpLMo2wAMki-5npej1GL8zVPQ";
        axios.defaults.headers.common['Authorization'] = "Bearer " + auth.getIdToken();
        this.httpOption = {
            headers: {
                "Content-Type": 'application/json'
            }
        };
    }

    getProjects() {
        return new Promise((resolve, reject) => {
            const url = this.urlService.getUrl("projects");
            console.log(url);
            axios.get(url)
                .then((response) => {
                    resolve(response.data);
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
                    resolve(response.data);
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
