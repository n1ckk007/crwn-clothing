import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCqhGrrYY-QfqY0xrPLz91fqwfIPAq-WCk",
  authDomain: "crwn-db-7d26b.firebaseapp.com",
  databaseURL: "https://crwn-db-7d26b.firebaseio.com",
  projectId: "crwn-db-7d26b",
  storageBucket: "crwn-db-7d26b.appspot.com",
  messagingSenderId: "160653164597",
  appId: "1:160653164597:web:bbdb3187e943f0cbca317c",
  measurementId: "G-KQ4S8LM34T",
};

firebase.initializeApp(config);

// export this out anywhere where we need to use anything related to authentication
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// gives access to google auth provider class from authentication library
const provider = new firebase.auth.GoogleAuthProvider();
//takes custom parameters, always trigger the google pop up whenever we use this google auth provider for auth and sign in
provider.setCustomParameters({ prompt: "select_account" });
// takes provider class that we made, we just want the google one
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
