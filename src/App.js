import React, { Component } from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/userActions";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/userSelector";
import CheckoutPage from "./pages/checkout/Checkout";

class App extends Component {
  //close subscription when it unmounts
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // method on the auth library from firebase. takes a function where the param is what the user state is of the auth
    this.unsubscribeFromAuth = //this is an open subscription as long as component is mounted on our DOM, whenever any changes occur on firebase eg sign in/out,
      // firebase sends msg saying auth state has changed
      auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot((snapShot) => {
            setCurrentUser({
              currentUser: {
                // creating new obj that has both all properties of snapshot that we want as well as the id
                id: snapShot.id,
                ...snapShot.data(),
              },
            });
          });
        } else {
          //equivalent to saying current user is to null
          setCurrentUser(userAuth);
        }
        // console.log(user);
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            // if theres a current user signed in it redirects to home page
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
