import React, { useState } from "react";
import "./SignIn.scss";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";

import { connect } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/userActions";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  // convert this.state over to useState
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // getting this.emailsignin no longer from props so we destructure when it comes in as our props
    // const {emailSignInStart} = this.props;

    // instead of state we get it from userCredentials
    // const { email, password } = this.state;
    emailSignInStart(email, password);
  };

  const handleChange = (event) => {
    //if name is password it will say password and point to the value that is typed in, same for email. this allows to pass the same function into the same input
    const { value, name } = event.target;
    // instead of this.setState we'll call setCredentials
    // this.setState({ [name]: value });
    // spread in all of our usercredentials and update the val that needs to be changed
    setCredentials({ ...userCredentials, [name]: value });
  };

  // const { googleSignInStart } = this.props;
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit" className="sign-in-btn">
            {" "}
            Sign in{" "}
          </CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
