import React from "react";
import "./CustomButton.scss";

// pull the children off the props that get passed to our customButton
const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  // conditionally render the classname of google-sign-in otherwise render empty string and then always render custom-button
  <button
    className={`${inverted ? "inverted" : ""} ${
      isGoogleSignIn ? "google-sign-in" : ""
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
