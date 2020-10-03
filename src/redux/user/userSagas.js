import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./userTypes";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  signUpSuccess,
} from "./userActions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    // console.log(userRef);
    //get back our userref and generate the snapshot if we need one
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    // get the snapshot using user ref
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    //create googlesign in pop up in our app
    //   once user selects right user, we get back user auth obj that has user details on this user key
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    // after our signout comes through yield our put signoutsuccess
    yield auth.signOut();
    // if we succeed
    yield put(signOutSuccess());
  } catch (error) {
    // if we fail
    yield put(signOutFailure(error));
  }
}

// here we get our usercredentials which we're passing through as the actions payload
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    // create the userAuth with email and password
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    // if it succeeds and we get back the right obj we call signupsuccess with the user and our additionaldata as the payload inside an obj
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    // get back our userAuth obj when we call this method
    const userAuth = yield getCurrentUser;
    // if userauth is null / user has never signed in, end the function
    if (!userAuth) return;
    // if there is a val, call the same getsnapshotfromuser auth except use our userAuth
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
