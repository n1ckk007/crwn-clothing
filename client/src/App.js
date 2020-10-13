import React, { useEffect } from "react";
import { GlobalStyle } from "./globalStyles";
import HomePage from "./pages/homepage/homepage";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/userSelector";
import CheckoutPage from "./pages/checkout/Checkout";
import ContactPage from "./pages/contact/ContactPage";
import { checkUserSession } from "./redux/user/userActions";

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
