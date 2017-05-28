import auth0 from 'auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

// auth0 Client "v-project"  settings
const CLIENT_ID = 'bJGXNSwOrFznt6ZYey6xDOsSb2IOGw6K';
const CLIENT_DOMAIN = 'relang.eu.auth0.com';
const REDIRECT = 'http://localhost:8080/callback';
const SCOPE = 'read:project';
const AUDIENCE = 'https://epl-projectservice.azurewebsites.net/';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

function login() {
  console.log(Auth0Lock);
  console.log("login")
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE
  });
}


login();

