import React from "react";
import "./FormInput.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />
    {/* if pass in label property pass in one if not then no need for it */}
    {/* always have classname form-input-label but also add shrink prop whenever the user has typed anything in */}
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
