/* eslint-disable */
import decode from 'jwt-decode';
import auth0 from 'auth0-js';
import Router from 'vue-router';
// import Auth0Lock from 'auth0-lock';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

// auth0 Client "v-project"  settings
const CLIENT_ID = 'bJGXNSwOrFznt6ZYey6xDOsSb2IOGw6K';
const CLIENT_DOMAIN = 'relang.eu.auth0.com';
const REDIRECT = 'http://localhost:8080/callback';
const SCOPE = 'read:project';
const AUDIENCE = 'abc'; // https://epl-projectservice.azurewebsites.net/';


const options = {
  auth: {
    redirect: true,
    redirectUrl: REDIRECT,
    responseType: 'token id_token'
  }
}

var lock = new Auth0Lock(CLIENT_ID, CLIENT_DOMAIN, options);


var router = new Router({
  mode: 'history'
});

export function login() {
  lock.show();
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  router.go('/');
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
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



export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}



// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

*/