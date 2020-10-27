import React, { lazy, Suspense, useEffect } from "react";
import { GlobalStyle } from "./globalStyles";
// import HomePage from "./pages/homepage/homepage";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/Header";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/userSelector";
import { checkUserSession } from "./redux/user/userActions";
import Spinner from "./components/spinner/Spinner";
import ErrorBoundary from "./components/error-boundary/error-boundary";

// declare the const that we want to dynamically import and wrap it in lazy
// component = lazy which is a func that gets passed a func that gets called import and then a string to the path that we want
const HomePage = lazy(() => import("./pages/homepage/homepage"));
const ShopPage = lazy(() => import("./pages/shop/ShopPage"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up")
);
const CheckoutPage = lazy(() => import("./pages/checkout/Checkout"));
const ContactPage = lazy(() => import("./pages/contact/ContactPage"));

const App = ({ checkUserSession, currentUser }) => {
  //close subscription when it unmounts
  // unsubscribeFromAuth = null;
  useEffect(() => {
    // we need to call checkusersession but we only want it the first time when we actually pass it in like CDM
    checkUserSession();
  }, [checkUserSession]);

  // use useEffect instead now
  // componentDidMount() {
  //   const { checkUserSession } = this.props;
  //   checkUserSession();
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route
              exact
              path="/signin"
              // if theres a current user signed in it redirects to home page
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
            <Route exact path="/contact" component={ContactPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
