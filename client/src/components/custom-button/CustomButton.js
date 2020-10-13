import React from "react";
import { CustomButtonContainer } from "./CustomButtonStyles";

// pull the children off the props that get passed to our customButton
const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
