// takeevery listens for every action of a specific type that we pass to it
import { takeLatest, call, put, all } from "redux-saga/effects";
import ShopActionTypes from "./shopTypes";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shopActions";

// all generator functions must have yields in them
export function* fetchCollectionsAsync() {
  // functions pause whenever we hit yield until we call .next and our functions continue

  try {
    const collectionRef = firestore.collection("collections");

    // whenever collectionRef updates or gets run for the first time this collectionRef
    // will send us the snapshot representing the code of our collections obj array
    const snapshot = yield collectionRef.get();
    // when this value comes back it comes back in a promise form that gets resolved with the val of our collectionref which is our snapshot
    //  call is the code/effect inside our generator function that envokes the function but we want to yield this incase this call takes longer than we expect
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    // put is the saga effect for creating actions/ equiv to dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  // pause whenever a specific action type that we want comes in
  //   takevery creates a non blocking call in order to not stop our app to continue running other sagas or whatever the user wants to do
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
