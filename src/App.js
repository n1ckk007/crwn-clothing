import React, { Component } from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import { Switch, Route } from "react-router-dom";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  //close subscription when it unmounts
  unsubscribeFromAuth = null;

  componentDidMount() {
    // method on the auth library from firebase. takes a function where the param is what the user state is of the auth
    this.unsubscribeFromAuth = //this is an open subscription as long as component is mounted on our DOM, whenever any changes occur on firebase eg sign in/out,
      // firebase sends msg saying auth state has changed
      auth.onAuthStateChanged(async (userAuth) => {
        // this.setState({ currentUser: user });
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot((snapShot) => {
            this.setState({
              currentUser: {
                // creating new obj that has both all properties of snapshot that we want as well as the id
                id: snapShot.id,
                ...snapShot.data(),
              },
            });
            console.log(this.state);
          });
        } else {
          //equivalent to saying current user is to null
          this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
