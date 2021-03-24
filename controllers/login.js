// import firebase from "firebase/app";
// import "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyA-YJ-CNwCMwAY-P7ehW9M2jTTWHBm_v2A",
//     authDomain: "bugsy-crm.firebaseapp.com",
//     databaseURL: "https://bugsy-crm.firebaseio.com",
//     projectId: "bugsy-crm",
//     storageBucket: "bugsy-crm.appspot.com",
//     messagingSenderId: "720483603929",
//     appId: "1:720483603929:web:0f3b6a791368c5c031f5c8",
//     measurementId: "G-QPR68244WL"
//   };
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyCYo8AkyAO6m-i9yZzyeZfpN_N5CVQrpws",
    authDomain: "mailserver-b68b9.firebaseapp.com",
    projectId: "mailserver-b68b9",
    storageBucket: "mailserver-b68b9.appspot.com",
    messagingSenderId: "241352438849",
    appId: "1:241352438849:web:493e48c135aab62e7282c0",
    measurementId: "G-WT02YXCV97"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// Docs: https://source.corp.google.com/piper///depot/google3/third_party/devsite/firebase/en/docs/auth/web/google-signin.md

function googleProvider() {
  // [START auth_google_provider_create]
  var provider = new firebase.auth.GoogleAuthProvider();
  // [END auth_google_provider_create]

  // [START auth_google_provider_scopes]
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // [END auth_google_provider_scopes]
  
  // [START auth_google_provider_params]
  provider.setCustomParameters({
    'login_hint': 'mehak@abcgenesis.com'
  });
  // [END auth_google_provider_params]
}

// googleProvider()
// var provider = new firebase.auth.FacebookAuthProvider();
function googleSignInPopup() {
    var provider = new firebase.auth.GoogleAuthProvider();
  
  // [START auth_google_signin_popup]
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      console.log("tokennnnn from gmalil" , token)
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(credential,"==", errorCode,"=====" ,errorMessage,"====", email);
      // ...
    });
  // [END auth_google_signin_popup]
}

googleSignInPopup()
function googleSignInRedirectResult() {
  // [START auth_google_signin_redirect_result]
  firebase.auth()
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // ...
        console.log(token)
      }
      // The signed-in user info.
      var user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  // [END auth_google_signin_redirect_result]
}

function googleBuildAndSignIn(id_token) {
  // [START auth_google_build_signin]
  // Build Firebase credential with the Google ID token.
  var credential = firebase.auth.GoogleAuthProvider.credential(id_token);

  // Sign in with credential from the Google user.
  firebase.auth().signInWithCredential(credential).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  // [END auth_google_build_signin]
}

// [START auth_google_callback]
function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
  
      // Sign in with credential from the Google user.
      // [START auth_google_signin_credential]
      firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      // [END auth_google_signin_credential]
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}
// [END auth_google_callback]

// [START auth_google_checksameuser]
function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}



// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
// </script>