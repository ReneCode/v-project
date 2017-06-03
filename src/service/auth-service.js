/* eslint-disable no-undef */
import decode from 'jwt-decode';
import Router from 'vue-router';
import Auth0Lock from 'auth0-lock';

const ID_TOKEN_KEY = 'id_token';
const PROFILE_KEY = 'profile';

const CLIENT_ID = 'bJGXNSwOrFznt6ZYey6xDOsSb2IOGw6K';
const CLIENT_DOMAIN = 'relang.eu.auth0.com';
const REDIRECT = `${window.location.origin}/callback`;

class AuthService {
  lock = undefined;
  router = undefined;

  constructor() {
    const options = {
      auth: {
        redirect: true,
        redirectUrl: REDIRECT,
        responseType: "id_token token"
      }
    }
    this.lock = new Auth0Lock(CLIENT_ID, CLIENT_DOMAIN, options);

    this.router = new Router({
      mode: 'history'
    });

    let self = this;
    this.lock.on("authenticated", function (authResult) {
      self.lock.getUserInfo(authResult.accessToken, function (error, profile) {
        if (error) {
          // Handle error
          console.log("ERROR:", error)
          return;
        }
        localStorage.setItem(ID_TOKEN_KEY, authResult.idToken);
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        window.location.href = '/';
      });
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    this.clearIdToken();
    this.clearProfile();

    this.router.push('/');
  }

  isLoggedIn() {
    let idToken = this.getIdToken();
    if (idToken === "null") {
      return false;
    }
    return !!idToken && !this.isTokenExpired(idToken);
  }

  getUserName() {
    if (this.isLoggedIn()) {
      const profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
      if (profile) {
        return profile.name;
      }
    }
    return null;
  }

  // Get and store id_token in local storage
  setIdTokenFromLocation() {
    let idToken = this.getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
  }

  getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
  }

  // Helper function that will allow us to extract the access_token and id_token
  getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
  }

  clearProfile() {
    localStorage.removeItem(PROFILE_KEY);
  }

  getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  }

  isTokenExpired(token) {
    const expirationDate = this.getTokenExpirationDate(token);
    if (expirationDate == null) {
      return true;
    }
    return expirationDate < new Date();
  }
}

var auth = new AuthService();
export default auth;
