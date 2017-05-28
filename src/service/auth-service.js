/* eslint-disable no-undef */
import decode from 'jwt-decode';
// import auth0 from 'auth0-js';
import Router from 'vue-router';
// import Auth0Lock from 'auth0-lock';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

// auth0 Client "v-project"  settings
const CLIENT_ID = 'bJGXNSwOrFznt6ZYey6xDOsSb2IOGw6K';
const CLIENT_DOMAIN = 'relang.eu.auth0.com';
const REDIRECT = 'http://localhost:8080/callback';
// const SCOPE = 'read:project';
// const AUDIENCE = 'https://epl-projectservice.azurewebsites.net/';

const options = {
  auth: {
    redirect: true,
    redirectUrl: REDIRECT,
    responseType: 'token id_token'
//    audience: AUDIENCE,
  }
//  oidcConformat: true
}

class AuthService {
  lock = undefined;
  router = undefined;

  constructor() {
    this.lock = new Auth0Lock(CLIENT_ID, CLIENT_DOMAIN, options);

    this.router = new Router({
      mode: 'history'
    });

    const self = this;
    this.lock.on("authenticated", function (authResult) {
      console.log("## auth:", authResult);

      // Use the token in authResult to getUserInfo() and save it to localStorage
      self.lock.getUserInfo(authResult.accessToken, function (error, profile) {
        debugger;
        if (error) {
          // Handle error
          return;
        }

        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });
  }

  login() {
    this.lock.show((err, profile, idToken, tok) => {
      if (err) {
        throw err;
      }
      debugger;
    });
  }

  logout() {
    this.clearIdToken();
    this.clearAccessToken();
    this.router.go('/');
  }

  isLoggedIn() {
    const idToken = this.getIdToken();
    return !!idToken && !this.isTokenExpired(idToken);
  }

  // Get and store access_token in local storage
  setAccessToken() {
    let accessToken = this.getParameterByName('access_token');
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  // Get and store id_token in local storage
  setIdToken() {
    let idToken = this.getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
  }

  getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  // Helper function that will allow us to extract the access_token and id_token
  getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
  }

  clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  }

  isTokenExpired(token) {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate < new Date();
  }
}
var auth = new AuthService();
export default auth;

/*
const lock = new Auth0Lock(CLIENT_ID, CLIENT_DOMAIN);

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  console.log(Auth0Lock);
  console.log("login")

  const options = {
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE
  };
  lock.show(options);
  return;

  const  url = `https://${CLIENT_DOMAIN}/authorize?scope=full_access&audience=${AUDIENCE}&response_type=id_token%20token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT}&nonce=`;
  console.log(url);
  // window.location.href = url;

  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE
  });
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

*/
