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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if there is no userAuth, we want to exit from this function
  if (!userAuth) return;
  //if it does exist we query inside of firestore for the document to see if it already exists
  // console.log(firestore.doc("users/1288sdjsadad"));
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  //console.log(snapShot);
  // if this snapShot doesn't exist, we'll create data in that place
  if (!snapShot.exists) {
    // we want displayName and email from userAuth
    const { displayName, email } = userAuth;
    //know when we made that document
    const createdAt = new Date();
    try {
      // .set being the create method, pass in obj where we have displayName, email etc
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
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
