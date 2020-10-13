// new saga file we need to bring into our root saga aswell as creating base saga
import { all, call, put, takeLatest } from "redux-saga/effects";
import UserActionTypes from "../user/userTypes";
import { clearCart } from "./cartActions";
// import useractiontypes cos thats what we're listening for

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  // yield takelatest where we're listening for user actions
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

// base saga , add to root saga and update cartreducer
export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
