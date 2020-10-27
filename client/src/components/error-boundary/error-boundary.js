import React from "react";
import {
  ErrorImageContainer,
  ErrorImageOverlay,
  ErrorImageText,
} from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  // in order for react to know this is an error boundary comp, we need to use either of these methods that are unique to error boundaries
  static getDerivedStateFromError(error) {
    // catches any error that gets thrown in any of the children of this error boundary component
    // proccess the error
    // return from this method some obj that will set the state inside of this class
    return { hasErrored: true };
  }

  //   gives us access to error and info related to the error and how it got thrown
  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    //   if an error has happened return error msg
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/QIxIKBH.png" />
          <ErrorImageText>
            Hello. You have reached the error ghost. OoOoOoooOooO
          </ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
