import React from "react";
import Directory from "../../components/directory/directory";
import { HomePageContainer } from "./HomePageStyles";

const HomePage = () => {
  // to test error boundary component
  // throw Error;
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;
