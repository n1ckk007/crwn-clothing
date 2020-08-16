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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  //create the collection using the collectionKey
  const collectionRef = firestore.collection(collectionKey);
  //firebase will give back ref obj no matter what
  //console.log(collectionRef);
  const batch = firestore.batch();
  //loop over objtoadd array using for each method
  objectsToAdd.forEach((obj) => {
    // will get new doc ref in this collection and randomly generate an id
    const newDocRef = collectionRef.doc();
    // console.log(newDocRef);
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

// cos we want to convert to an object as we're getting back an array
export const convertCollectionsSnapshotToMap = (collections) => {
  // .docs is going to give us our query snapshot array that we had in log
  const transformedCollection = collections.docs.map((doc) => {
    // in each one get doc obj
    // pull off the title and items from the doc data (in order to get data off snapshot we need to call data())
    const { title, items } = doc.data();
    return {
      // encodeURI pass string and it will convert it into version that url can read
      // title eg hats jackets is same string we want for our route name
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  // console.log(transformedCollection);
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

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
